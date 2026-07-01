/**
 * goal.ts — FinanceHer Goals Module Types
 *
 * These types form the data contract for the Goals module.
 * Designed so future AI modules can derive:
 *  - Goal completion velocity (savings per month vs. target)
 *  - Optimal reallocation (shift funds between lower-priority goals)
 *  - Projected completion dates (targetAmount - currentAmount / monthlyContribution)
 *  - Priority-weighted savings recommendations
 *
 * AI INTEGRATION POINT: When the AI layer is added, GoalSummary and GoalInsight
 * arrays will be serialised into the RAG pipeline as structured user context.
 */

// ─── Primitives ──────────────────────────────────────────────────────────────

/** Categories for financial goals. */
export type GoalCategory =
  | 'Emergency Fund'
  | 'Home'
  | 'Travel'
  | 'Retirement'
  | 'Education'
  | 'Vehicle'
  | 'Wedding'
  | 'Health'
  | 'Business'
  | 'Other';

/** Priority level for goal sorting and AI weighting. */
export type GoalPriority = 'High' | 'Medium' | 'Low';

/** Visual label shown as a pill badge on each goal card. */
export type GoalTag =
  | 'High Priority'
  | 'Long Term'
  | 'Lifestyle'
  | 'Standard'
  | 'Almost There'
  | 'Just Started';

/** Completion status of a goal. */
export type GoalStatus = 'Active' | 'Completed' | 'Paused' | 'Archived';

// ─── Core Goal ───────────────────────────────────────────────────────────────

/**
 * A single savings goal.
 *
 * AI INTEGRATION POINT: The AI will read `targetAmount`, `currentAmount`,
 * `monthlyContribution`, and `targetDate` to compute:
 *  - projected completion date
 *  - required monthly contribution to meet `targetDate`
 *  - reallocation suggestions from lower-priority goals
 */
export interface Goal {
  id: string;
  name: string;
  description: string;
  category: GoalCategory;
  /** Material Symbol icon name. */
  icon: string;
  priority: GoalPriority;
  tag: GoalTag;
  status: GoalStatus;
  targetAmount: number;
  currentAmount: number;
  /** ISO 8601 date string — the desired completion date. */
  targetDate: string;
  /** Human-readable target date (e.g., "Dec 2027"). */
  displayTargetDate: string;
  /** Monthly contribution the user has committed to. */
  monthlyContribution: number;
  /** ISO 8601 date string when the goal was created. */
  createdAt: string;
  /**
   * Optional note for AI context.
   * AI INTEGRATION POINT: Used as enrichment in RAG retrieval.
   */
  note?: string;
  /**
   * Colour token for the progress bar and icon accent.
   * Uses Tailwind bg-* class strings.
   */
  accentColor: string;
  /** Hex color for SVG or non-Tailwind usage. */
  accentHex: string;
}

// ─── Derived fields (computed, not stored) ────────────────────────────────────

/**
 * Computed view model — enriches a Goal with derived display data.
 * Created by `deriveGoalViewModel()` in goal.utils.ts (future).
 *
 * AI INTEGRATION POINT: `monthsRemaining` and `projectedCompletionDate`
 * are the primary outputs the AI will surface to the user.
 */
export interface GoalViewModel extends Goal {
  /** (currentAmount / targetAmount) * 100, rounded to 1 dp. */
  completionPercent: number;
  /** targetAmount - currentAmount */
  remainingAmount: number;
  /** Math.ceil(remainingAmount / monthlyContribution) */
  monthsRemaining: number;
  /** ISO date string — today + monthsRemaining months. */
  projectedCompletionDate: string;
  /** Human-readable (e.g., "Jan 2029"). */
  projectedCompletionDisplay: string;
  /** true if projectedCompletionDate <= targetDate */
  isOnTrack: boolean;
}

// ─── Goals Overview Summary ───────────────────────────────────────────────────

/**
 * Aggregated data for the overview cards at the top of the Goals page.
 *
 * AI INTEGRATION POINT: `overallCompletionPercent` and `totalSaved` are used
 * by the AI to calibrate financial health score contributions.
 */
export interface GoalsOverview {
  totalSaved: number;
  totalTargeted: number;
  /** (totalSaved / totalTargeted) * 100 */
  overallCompletionPercent: number;
  activeGoalCount: number;
  completedGoalCount: number;
  /** Next milestone — the goal closest to completion. */
  nextMilestoneGoalId: string;
  /** Month label of the closest upcoming goal completion (e.g., "Oct 2026"). */
  nextMilestoneDisplay: string;
  /** Combined monthly contributions across all active goals. */
  totalMonthlyContribution: number;
  /** totalMonthlyContribution / monthlyIncome (0–1). */
  savingsAllocationRate: number;
}

// ─── Goal Insight ─────────────────────────────────────────────────────────────

export type GoalInsightSeverity = 'info' | 'warning' | 'success' | 'tip';

/**
 * A single AI-ready insight related to a specific goal or the goal portfolio.
 *
 * AI INTEGRATION POINT: `dataRefs` links the insight to specific goal IDs.
 * When Gemini is connected, `isAIGenerated` flips to true and the UI
 * renders an "AI" badge beside the insight.
 */
export interface GoalInsight {
  id: string;
  title: string;
  body: string;
  severity: GoalInsightSeverity;
  icon: string;
  /** IDs of goals this insight references. */
  dataRefs: string[];
  /**
   * false = rule-based stub; true = AI-generated.
   * AI INTEGRATION POINT: Flip to true when Gemini pipeline is connected.
   */
  isAIGenerated: boolean;
}

// ─── Add Goal Form ────────────────────────────────────────────────────────────

/**
 * Form data for the "Add Goal" modal.
 *
 * AI INTEGRATION POINT: On submit, this payload is sent to POST /api/goals.
 * The AI layer subscribes to new goal events to update its planning context.
 */
export interface AddGoalFormData {
  name: string;
  description: string;
  category: GoalCategory;
  targetAmount: string; // String for controlled input; parse to number on submit.
  currentAmount: string;
  targetDate: string;
  monthlyContribution: string;
  priority: GoalPriority;
  note: string;
}
