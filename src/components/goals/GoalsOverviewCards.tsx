'use client';

import { type GoalsOverview } from '@/types/goal';
import { cn } from '@/lib/utils';

interface GoalsOverviewCardsProps {
  overview: GoalsOverview;
}

export function GoalsOverviewCards({ overview }: GoalsOverviewCardsProps) {
  const monthlySavingsRatePct = Math.round(overview.savingsAllocationRate * 100);

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter"
      aria-label="Goals summary"
    >
      {/* Card 1 — Total Saved */}
      <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col gap-2 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(67,37,125,0.08)] hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-dark-primary/10 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-dark-primary transition-colors">
            <span
              className="material-symbols-outlined text-primary dark:text-dark-primary group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              savings
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold rounded-full px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="material-symbols-outlined text-xs" aria-hidden="true">trending_up</span>
            +12%
          </span>
        </div>
        <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1">
          Total Saved
        </p>
        <p className="font-poppins text-display-md text-primary dark:text-dark-primary font-bold">
          ₹{(overview.totalSaved / 100000).toFixed(2)}L
        </p>
        <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
          of ₹{(overview.totalTargeted / 100000).toFixed(1)}L total targets
        </p>
      </div>

      {/* Card 2 — Active Goals */}
      <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col gap-2 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(67,37,125,0.08)] hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
            <span
              className="material-symbols-outlined text-sky-600 dark:text-sky-400 group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              ads_click
            </span>
          </div>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/20 dark:text-sky-400 px-2.5 py-1 rounded-full">
            {overview.completedGoalCount} completed
          </span>
        </div>
        <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1">
          Active Goals
        </p>
        <p className="font-poppins text-display-md text-on-surface dark:text-dark-on-surface font-bold">
          {overview.activeGoalCount}
        </p>
        <div className="flex items-center gap-1.5 font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">event</span>
          Next milestone: {overview.nextMilestoneDisplay}
        </div>
      </div>

      {/* Card 3 — Monthly Contribution */}
      <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col gap-2 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(67,37,125,0.08)] hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
            <span
              className="material-symbols-outlined text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              calendar_month
            </span>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-2.5 py-1 rounded-full">
            Monthly
          </span>
        </div>
        <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1">
          Monthly Commitment
        </p>
        <p className="font-poppins text-display-md text-on-surface dark:text-dark-on-surface font-bold">
          ₹{overview.totalMonthlyContribution.toLocaleString('en-IN')}
        </p>
        <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
          across all active goals
        </p>
      </div>

      {/* Card 4 — Overall Progress */}
      <div className="bg-primary-container dark:bg-dark-primary-container text-on-primary-container dark:text-dark-on-surface p-6 rounded-2xl flex flex-col gap-2 transition-all duration-300 group hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <span className="material-symbols-outlined opacity-80" aria-hidden="true">
            donut_large
          </span>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
            {overview.overallCompletionPercent}% done
          </span>
        </div>
        <p className="font-inter text-label-md opacity-70 mt-1">Portfolio Progress</p>
        <p className="font-poppins text-headline-lg font-bold">
          ₹{(overview.totalSaved / 100000).toFixed(1)}L / ₹{(overview.totalTargeted / 1000000).toFixed(1)}Cr
        </p>
        {/* Progress bar */}
        <div
          className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-1"
          role="progressbar"
          aria-valuenow={overview.overallCompletionPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall goal progress: ${overview.overallCompletionPercent}%`}
        >
          <div
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(overview.overallCompletionPercent, 100)}%` }}
          />
        </div>
        <p className="font-inter text-[11px] opacity-60">
          savings allocation rate: {monthlySavingsRatePct}%
        </p>
      </div>
    </section>
  );
}
