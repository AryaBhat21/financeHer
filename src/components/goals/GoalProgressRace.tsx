'use client';

import { type GoalsOverview } from '@/types/goal';
import { MOCK_GOALS } from '@/constants/goal.mock';

interface GoalProgressRaceProps {
  overview: GoalsOverview;
}

/**
 * GoalProgressRace — horizontal bar chart ranking all goals by completion %.
 * Replaces the Expenses trend chart in the equivalent grid slot.
 */
export function GoalProgressRace({ overview }: GoalProgressRaceProps) {
  // Sort by completion % descending for the race view
  const sorted = [...MOCK_GOALS].sort(
    (a, b) => b.completionPercent - a.completionPercent
  );

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 h-full flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold">
            Goal Progress Race
          </h3>
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-0.5">
            All goals ranked by completion
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-inter text-on-surface-variant dark:text-dark-on-surface-variant/60">
          <span className="material-symbols-outlined text-sm text-primary dark:text-dark-primary" aria-hidden="true">
            bar_chart
          </span>
          {overview.activeGoalCount} active
        </div>
      </div>

      {/* Race bars */}
      <ul className="flex flex-col gap-5 flex-1 justify-center" role="list" aria-label="Goals by completion percentage">
        {sorted.map((goal) => {
          const pct = Math.min(goal.completionPercent, 100);
          return (
            <li key={goal.id}>
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="material-symbols-outlined text-sm shrink-0"
                    style={{
                      color: goal.accentHex,
                      fontVariationSettings: "'FILL' 1",
                      fontSize: '18px',
                    }}
                    aria-hidden="true"
                  >
                    {goal.icon}
                  </span>
                  <span className="font-inter text-body-sm font-semibold text-on-surface dark:text-dark-on-surface truncate">
                    {goal.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-inter text-label-md font-bold text-on-surface dark:text-dark-on-surface">
                    {pct}%
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontSize: '14px' }}
                    aria-hidden="true"
                    title={goal.isOnTrack ? 'On track' : 'Behind schedule'}
                  >
                    {goal.isOnTrack ? (
                      <span className="text-emerald-500">check_circle</span>
                    ) : (
                      <span className="text-amber-500">schedule</span>
                    )}
                  </span>
                  {goal.isOnTrack
                    ? <span className="text-emerald-500 text-[10px] font-bold hidden sm:inline">On track</span>
                    : <span className="text-amber-500 text-[10px] font-bold hidden sm:inline">Behind</span>
                  }
                </div>
              </div>
              <div
                className="h-2.5 w-full bg-surface-container-high dark:bg-dark-surface-container-high rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${goal.name}: ${pct}%`}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: goal.accentHex,
                    boxShadow: `0 0 8px ${goal.accentHex}40`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summary footer */}
      <div className="mt-5 pt-4 border-t border-outline-variant/20 dark:border-dark-outline-variant/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary dark:text-dark-primary text-sm" aria-hidden="true">
            savings
          </span>
          <span className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70">
            Combined monthly contribution
          </span>
        </div>
        <span className="font-poppins text-body-sm font-bold text-primary dark:text-dark-primary">
          ₹{overview.totalMonthlyContribution.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
