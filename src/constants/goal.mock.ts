/**
 * goal.mock.ts — Mock data for the FinanceHer Goals Module
 *
 * All data is static and lives here as the single source of truth for the UI.
 *
 * AI INTEGRATION POINT: Replace these exports with API calls from
 * `src/services/goal.service.ts` when the backend is ready.
 * The type contracts (Goal[], GoalsOverview, etc.) remain stable —
 * only the data source changes.
 */

import type {
  Goal,
  GoalViewModel,
  GoalsOverview,
  GoalInsight,
} from '@/types/goal';

// ─── Helper — compute ViewModel fields ───────────────────────────────────────

function toViewModel(goal: Goal): GoalViewModel {
  const completionPercent = Math.round(
    (goal.currentAmount / goal.targetAmount) * 100 * 10
  ) / 10;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
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

// ─── Raw Goals ────────────────────────────────────────────────────────────────

const RAW_GOALS: Goal[] = [
  {
    id: 'goal_001',
    name: 'Emergency Fund',
    description: 'Safety net & Security',
    category: 'Emergency Fund',
    icon: 'health_and_safety',
    priority: 'High',
    tag: 'High Priority',
    status: 'Active',
    targetAmount: 200000,
    currentAmount: 150000,
    targetDate: '2027-01-01',
    displayTargetDate: 'Jan 2027',
    monthlyContribution: 8500,
    createdAt: '2025-01-01',
    note: '6 months of expenses at ~₹33k/month',
    accentColor: 'bg-primary',
    accentHex: '#43257d',
  },
  {
    id: 'goal_002',
    name: 'Home Purchase',
    description: 'Down payment fund',
    category: 'Home',
    icon: 'home',
    priority: 'High',
    tag: 'Long Term',
    status: 'Active',
    targetAmount: 1000000,
    currentAmount: 220000,
    targetDate: '2029-06-01',
    displayTargetDate: 'Jun 2029',
    monthlyContribution: 21667,
    createdAt: '2025-01-01',
    accentColor: 'bg-[#E57373]',
    accentHex: '#E57373',
  },
  {
    id: 'goal_003',
    name: 'European Summer',
    description: 'Vacation & Experience',
    category: 'Travel',
    icon: 'flight_takeoff',
    priority: 'Medium',
    tag: 'Almost There',
    status: 'Active',
    targetAmount: 50000,
    currentAmount: 35000,
    targetDate: '2026-09-01',
    displayTargetDate: 'Sep 2026',
    monthlyContribution: 5000,
    createdAt: '2025-10-01',
    accentColor: 'bg-sky-500',
    accentHex: '#0ea5e9',
  },
  {
    id: 'goal_004',
    name: 'EV Upgrade',
    description: 'Sustainable mobility',
    category: 'Vehicle',
    icon: 'directions_car',
    priority: 'Medium',
    tag: 'Standard',
    status: 'Active',
    targetAmount: 120000,
    currentAmount: 20000,
    targetDate: '2027-07-01',
    displayTargetDate: 'Jul 2027',
    monthlyContribution: 8334,
    createdAt: '2025-06-01',
    accentColor: 'bg-emerald-500',
    accentHex: '#10b981',
  },
  {
    id: 'goal_005',
    name: 'MBA Degree',
    description: 'Executive MBA — full fees',
    category: 'Education',
    icon: 'school',
    priority: 'High',
    tag: 'Long Term',
    status: 'Active',
    targetAmount: 600000,
    currentAmount: 60000,
    targetDate: '2028-06-01',
    displayTargetDate: 'Jun 2028',
    monthlyContribution: 15000,
    createdAt: '2025-04-01',
    note: 'ISB Executive MBA program',
    accentColor: 'bg-amber-500',
    accentHex: '#f59e0b',
  },
  {
    id: 'goal_006',
    name: 'Retirement Corpus',
    description: 'FIRE at 45 — 30× expenses',
    category: 'Retirement',
    icon: 'beach_access',
    priority: 'High',
    tag: 'Long Term',
    status: 'Active',
    targetAmount: 10000000,
    currentAmount: 850000,
    targetDate: '2035-01-01',
    displayTargetDate: 'Jan 2035',
    monthlyContribution: 25000,
    createdAt: '2024-01-01',
    note: 'FIRE corpus with 7% real return assumption',
    accentColor: 'bg-secondary',
    accentHex: '#65558c',
  },
];

// ─── View Models (computed) ───────────────────────────────────────────────────

export const MOCK_GOALS: GoalViewModel[] = RAW_GOALS.map(toViewModel);

// ─── Overview Summary ─────────────────────────────────────────────────────────

const totalSaved = RAW_GOALS.reduce((s, g) => s + g.currentAmount, 0);
const totalTargeted = RAW_GOALS.reduce((s, g) => s + g.targetAmount, 0);
const activeGoals = RAW_GOALS.filter((g) => g.status === 'Active');

export const MOCK_GOALS_OVERVIEW: GoalsOverview = {
  totalSaved,
  totalTargeted,
  overallCompletionPercent: Math.round((totalSaved / totalTargeted) * 100 * 10) / 10,
  activeGoalCount: activeGoals.length,
  completedGoalCount: RAW_GOALS.filter((g) => g.status === 'Completed').length,
  nextMilestoneGoalId: 'goal_003', // European Summer is closest to completion
  nextMilestoneDisplay: 'Sep 2026',
  totalMonthlyContribution: activeGoals.reduce(
    (s, g) => s + g.monthlyContribution,
    0
  ),
  savingsAllocationRate: 0.83, // 83% of savings allocated to goals
};

// ─── AI-Ready Goal Insights ───────────────────────────────────────────────────

/**
 * Rule-based insights designed to mirror the shape the AI will return.
 *
 * AI INTEGRATION POINT: Replace with GET /api/insights?module=goals when
 * the Gemini RAG pipeline is connected. Flip `isAIGenerated` to `true`.
 */
export const MOCK_GOAL_INSIGHTS: GoalInsight[] = [
  {
    id: 'gins_001',
    title: '🏖️ European Summer — on track!',
    body: 'You\'re 70% there with ₹35,000 saved. At ₹5,000/month, you\'ll hit your ₹50,000 goal by Sep 2026 — right on time. Well done!',
    severity: 'success',
    icon: 'flight_takeoff',
    dataRefs: ['goal_003'],
    isAIGenerated: false,
  },
  {
    id: 'gins_002',
    title: 'Accelerate Home Purchase by 4 months',
    body: 'You have ₹11,333/month unallocated. Redirecting ₹5,000 to your Home goal cuts 4 months off the timeline — reaching it by Feb 2029 instead of Jun 2029.',
    severity: 'tip',
    icon: 'home',
    dataRefs: ['goal_002'],
    isAIGenerated: false,
  },
  {
    id: 'gins_003',
    title: 'Emergency Fund — final stretch',
    body: 'Only ₹50,000 remains! At your current ₹8,500/month rate you\'ll finish in ~6 months (Jan 2027). Consider a one-time lump sum from your annual bonus to close it sooner.',
    severity: 'info',
    icon: 'health_and_safety',
    dataRefs: ['goal_001'],
    isAIGenerated: false,
  },
  {
    id: 'gins_004',
    title: 'Retirement corpus below schedule',
    body: 'You\'ve saved ₹8.5L of a ₹1Cr target (8.5%). To FIRE at 45, you need ₹29,400/month at 7% real return — increase SIP by ₹4,400 to stay on track.',
    severity: 'warning',
    icon: 'beach_access',
    dataRefs: ['goal_006'],
    isAIGenerated: false,
  },
];

// ─── Goal Categories ──────────────────────────────────────────────────────────

export const GOAL_CATEGORIES = [
  'All',
  'Emergency Fund',
  'Home',
  'Travel',
  'Retirement',
  'Education',
  'Vehicle',
  'Wedding',
  'Health',
  'Business',
  'Other',
] as const;
