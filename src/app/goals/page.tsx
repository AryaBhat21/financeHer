'use client';

import { useState, useMemo } from 'react';
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
  MOCK_GOALS_OVERVIEW,
  MOCK_GOAL_INSIGHTS,
  GOAL_CATEGORIES,
} from '@/constants/goal.mock';
import { cn } from '@/lib/utils';

/**
 * GoalsPage — /goals
 *
 * AI INTEGRATION POINTS (summary — see individual components for details):
 *   1. MOCK_GOALS          → replace with useSWR('/api/goals')
 *   2. MOCK_GOALS_OVERVIEW → replace with useSWR('/api/goals/summary')
 *   3. MOCK_GOAL_INSIGHTS  → replace with useSWR('/api/insights?module=goals')
 *   4. AddGoalModal        → POST /api/goals on submit
 *   5. GoalAIBanner        → onOptimise → open AI Assistant or route /assistant
 *
 * BACKEND INTEGRATION POINTS:
 *   - goal.service.ts will be the single file updated when the API is ready.
 *   - All types in src/types/goal.ts remain the stable contract.
 */
export default function GoalsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePriority, setActivePriority] = useState<string>('All');

  // Client-side filter (mirrors TransactionTable pattern)
  const filteredGoals = useMemo(() => {
    let result = [...MOCK_GOALS];
    if (activeCategory !== 'All') {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (activePriority !== 'All') {
      result = result.filter((g) => g.priority === activePriority);
    }
    return result;
  }, [activeCategory, activePriority]);

  const handleOptimise = () => {
    // AI INTEGRATION POINT: open AI Assistant modal or route to /assistant
    console.info('[GoalsPage] Optimise clicked — AI assistant integration pending');
  };

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
            <GoalsOverviewCards overview={MOCK_GOALS_OVERVIEW} />
          </div>

          {/* ── Charts Row ──────────────────────────────────────────── */}
          <div className="grid grid-cols-12 gap-6 mb-stack-lg">
            {/* Progress race — 8 of 12 */}
            <div className="col-span-12 lg:col-span-8">
              <GoalProgressRace overview={MOCK_GOALS_OVERVIEW} />
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
            {filteredGoals.length === 0 ? (
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
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={(id) => console.info('[GoalsPage] Edit goal:', id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── AI Acceleration Banner ───────────────────────────────── */}
          <div className="mb-stack-lg">
            <GoalAIBanner overview={MOCK_GOALS_OVERVIEW} onOptimise={handleOptimise} />
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
      />
    </div>
  );
}
