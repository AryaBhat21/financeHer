'use client';

import { useState, useEffect, useMemo } from 'react';
import { SidebarNav, DashboardFooter } from '@/components/dashboard';
import {
  GoalsOverviewCards,
  GoalCard,
  GoalProgressRace,
  GoalInsightsPanel,
  GoalAIBanner,
  AddGoalModal,
} from '@/components/goals';
import {
  MOCK_GOALS,
  MOCK_GOAL_INSIGHTS,
  GOAL_CATEGORIES,
} from '@/constants/goal.mock';
import { cn } from '@/lib/utils';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { type Goal, type GoalViewModel, type GoalsOverview, type GoalCategory } from '@/types/goal';
import { type AddGoalFormData } from '@/types/goal';

const CATEGORY_CONFIGS: Record<string, { icon: string; color: string; hex: string }> = {
  'Emergency Fund': { icon: 'health_and_safety', color: 'bg-primary', hex: '#43257d' },
  'Home': { icon: 'home', color: 'bg-[#E57373]', hex: '#E57373' },
  'Travel': { icon: 'flight_takeoff', color: 'bg-sky-500', hex: '#0ea5e9' },
  'Retirement': { icon: 'beach_access', color: 'bg-secondary', hex: '#65558c' },
  'Education': { icon: 'school', color: 'bg-amber-500', hex: '#f59e0b' },
  'Vehicle': { icon: 'directions_car', color: 'bg-emerald-500', hex: '#10b981' },
  'Wedding': { icon: 'favorite', color: 'bg-pink-500', hex: '#ec4899' },
  'Health': { icon: 'medical_services', color: 'bg-red-500', hex: '#ef4444' },
  'Business': { icon: 'storefront', color: 'bg-indigo-500', hex: '#6366f1' },
  'Other': { icon: 'flag', color: 'bg-outline', hex: '#7a7582' },
};

function toViewModel(goal: Goal): GoalViewModel {
  const completionPercent = goal.targetAmount > 0
    ? Math.round((goal.currentAmount / goal.targetAmount) * 100 * 10) / 10
    : 0;
  const remainingAmount = Math.max(goal.targetAmount - goal.currentAmount, 0);
  const monthsRemaining = Math.ceil(
    remainingAmount / Math.max(goal.monthlyContribution, 1)
  );

  const projected = new Date();
  projected.setMonth(projected.getMonth() + monthsRemaining);
  const projectedCompletionDate = projected.toISOString().split('T')[0];
  const projectedCompletionDisplay = projected.toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });

  const target = new Date(goal.targetDate);
  const isOnTrack = projected <= target;

  return {
    ...goal,
    completionPercent,
    remainingAmount,
    monthsRemaining,
    projectedCompletionDate,
    projectedCompletionDisplay,
    isOnTrack,
  };
}

function deriveGoalsOverview(goals: GoalViewModel[]): GoalsOverview {
  const totalSaved = goals.reduce((s, g) => s + g.currentAmount, 0);
  const totalTargeted = goals.reduce((s, g) => s + g.targetAmount, 0);
  const activeGoals = goals.filter((g) => g.status === 'Active');
  const completedGoals = goals.filter((g) => g.status === 'Completed');

  const activeNotFinished = activeGoals.filter((g) => g.completionPercent < 100);
  activeNotFinished.sort((a, b) => b.completionPercent - a.completionPercent);
  const nextMilestone = activeNotFinished[0];

  return {
    totalSaved,
    totalTargeted,
    overallCompletionPercent: totalTargeted > 0 ? Math.round((totalSaved / totalTargeted) * 100 * 10) / 10 : 0,
    activeGoalCount: activeGoals.length,
    completedGoalCount: completedGoals.length,
    nextMilestoneGoalId: nextMilestone ? nextMilestone.id : '',
    nextMilestoneDisplay: nextMilestone ? nextMilestone.displayTargetDate : 'N/A',
    totalMonthlyContribution: activeGoals.reduce((s, g) => s + g.monthlyContribution, 0),
    savingsAllocationRate: 0.83,
  };
}

/**
 * GoalsPage — /goals
 *
 * Implements client-side state synchronization with localStorage (financeher_goals).
 */
export default function GoalsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePriority, setActivePriority] = useState<string>('All');
  const [goals, setGoals] = useState<GoalViewModel[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = loadFromStorage<GoalViewModel[]>(STORAGE_KEYS.GOALS, MOCK_GOALS);
    setGoals(data);
  }, []);

  const handleAddGoal = (formData: AddGoalFormData) => {
    const targetVal = parseFloat(formData.targetAmount) || 0;
    const currentVal = parseFloat(formData.currentAmount) || 0;
    const monthlyVal = parseFloat(formData.monthlyContribution) || 0;

    const categoryConfig = CATEGORY_CONFIGS[formData.category] || {
      icon: 'flag',
      color: 'bg-outline',
      hex: '#7a7582',
    };

    let displayTargetDate = formData.targetDate;
    try {
      const d = new Date(formData.targetDate);
      displayTargetDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {}

    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      name: formData.name,
      description: formData.description || `Savings for ${formData.category}`,
      category: formData.category,
      icon: categoryConfig.icon,
      priority: formData.priority,
      tag: currentVal / targetVal >= 0.8 ? 'Almost There' : 'Just Started',
      status: currentVal >= targetVal ? 'Completed' : 'Active',
      targetAmount: targetVal,
      currentAmount: currentVal,
      targetDate: formData.targetDate,
      displayTargetDate,
      monthlyContribution: monthlyVal,
      createdAt: new Date().toISOString().split('T')[0],
      note: formData.note,
      accentColor: categoryConfig.color,
      accentHex: categoryConfig.hex,
    };

    const viewGoal = toViewModel(newGoal);
    const updatedGoals = [...goals, viewGoal];
    setGoals(updatedGoals);
    saveToStorage(STORAGE_KEYS.GOALS, updatedGoals);
  };

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    setGoals(updatedGoals);
    saveToStorage(STORAGE_KEYS.GOALS, updatedGoals);
  };

  const handleOptimise = () => {
    console.info('[GoalsPage] Optimise clicked — AI assistant integration pending');
  };

  // Client-side filter
  const filteredGoals = useMemo(() => {
    let result = [...goals];
    if (activeCategory !== 'All') {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (activePriority !== 'All') {
      result = result.filter((g) => g.priority === activePriority);
    }
    return result;
  }, [goals, activeCategory, activePriority]);

  const overview = mounted ? deriveGoalsOverview(goals) : deriveGoalsOverview([]);

  return (
    <div className="bg-background dark:bg-dark-background text-on-background dark:text-dark-on-background min-h-screen flex transition-colors duration-300">
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <SidebarNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* ── Main Canvas ────────────────────────────────────────────── */}
      <main
        className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop overflow-x-hidden flex flex-col min-h-screen"
        id="main-content"
      >
        <div className="flex-1">
          {/* ── Page Header ─────────────────────────────────────────── */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-surface-container dark:bg-dark-surface-container-low text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-all active:scale-95 shrink-0"
                aria-label="Open navigation menu"
              >
                <span className="material-symbols-outlined" aria-hidden="true">menu</span>
              </button>
              <div>
                <h1 className="font-poppins text-headline-lg text-primary dark:text-dark-primary font-bold">
                  Financial Goals
                </h1>
                <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-0.5">
                  Plan your future with precision — track, optimise, and achieve your milestones
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary dark:bg-dark-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-inter text-body-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(67,37,125,0.3)] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none shrink-0"
              aria-label="Create a new financial goal"
            >
              <span className="material-symbols-outlined" aria-hidden="true">add</span>
              Create New Goal
            </button>
          </header>

          {/* ── Overview Cards ──────────────────────────────────────── */}
          <div className="mb-stack-lg">
            <GoalsOverviewCards overview={overview} />
          </div>

          {/* ── Charts Row ──────────────────────────────────────────── */}
          <div className="grid grid-cols-12 gap-6 mb-stack-lg">
            {/* Progress race — 8 of 12 */}
            <div className="col-span-12 lg:col-span-8">
              <GoalProgressRace overview={overview} />
            </div>

            {/* AI Insights panel — 4 of 12 */}
            <div className="col-span-12 lg:col-span-4">
              <GoalInsightsPanel insights={MOCK_GOAL_INSIGHTS} />
            </div>
          </div>

          {/* ── Goals Grid ──────────────────────────────────────────── */}
          <section aria-labelledby="goals-grid-heading" className="mb-stack-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <h2
                id="goals-grid-heading"
                className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold"
              >
                Active Goals
              </h2>

              {/* Filters row */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter goals">
                {/* Priority filter */}
                {(['All', 'High', 'Medium', 'Low'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePriority(p)}
                    className={cn(
                      'px-3 py-1.5 rounded-full font-inter text-label-md transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none',
                      activePriority === p
                        ? 'bg-primary dark:bg-dark-primary text-white shadow-sm'
                        : 'bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container'
                    )}
                    aria-pressed={activePriority === p}
                  >
                    {p === 'All' ? 'All Priority' : `${p} Priority`}
                  </button>
                ))}
              </div>
            </div>

            {/* Category chip filter */}
            <div
              className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-thin"
              role="group"
              aria-label="Filter by category"
            >
              {GOAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'shrink-0 px-3 py-1.5 rounded-full font-inter text-label-md transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none',
                    activeCategory === cat
                      ? 'bg-primary dark:bg-dark-primary text-white shadow-sm'
                      : 'bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container'
                  )}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 2-column bento grid */}
            {mounted && filteredGoals.length === 0 ? (
              <div className="bg-white dark:bg-dark-surface-container rounded-2xl border border-surface-container/20 dark:border-dark-outline-variant/30 py-20 flex flex-col items-center gap-4">
                <span
                  className="material-symbols-outlined text-4xl text-on-surface-variant/40 dark:text-dark-on-surface-variant/30"
                  aria-hidden="true"
                >
                  filter_list_off
                </span>
                <p className="font-inter text-body-md text-on-surface-variant dark:text-dark-on-surface-variant/60">
                  No goals match your filters.
                </p>
                <button
                  onClick={() => { setActiveCategory('All'); setActivePriority('All'); }}
                  className="font-inter text-body-sm text-primary dark:text-dark-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mounted && filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={(id) => console.info('[GoalsPage] Edit goal:', id)}
                    onDelete={handleDeleteGoal}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── AI Acceleration Banner ───────────────────────────────── */}
          <div className="mb-stack-lg">
            <GoalAIBanner overview={overview} onOptimise={handleOptimise} />
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <DashboardFooter />
      </main>

      {/* ── Mobile FAB ──────────────────────────────────────────────── */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary dark:bg-dark-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-150 z-50 md:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Create new goal"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">add</span>
      </button>

      {/* ── Add Goal Modal ───────────────────────────────────────────── */}
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGoal}
      />
    </div>
  );
}
