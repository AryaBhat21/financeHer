'use client';

import { type GoalViewModel } from '@/types/goal';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: GoalViewModel;
  onEdit?: (goalId: string) => void;
}

const TAG_STYLES: Record<string, string> = {
  'High Priority':
    'bg-primary/10 text-primary dark:bg-dark-primary/20 dark:text-dark-primary',
  'Long Term':
    'bg-[#ffdad9] text-[#853638] dark:bg-[#853638]/30 dark:text-[#ffacab]',
  'Lifestyle':
    'bg-primary-fixed text-primary dark:bg-dark-primary/20 dark:text-dark-primary',
  'Standard':
    'bg-surface-container text-on-surface-variant dark:bg-dark-surface-container-high dark:text-dark-on-surface-variant',
  'Almost There':
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Just Started':
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export function GoalCard({ goal, onEdit }: GoalCardProps) {
  const clampedPercent = Math.min(goal.completionPercent, 100);
  const tagStyle = TAG_STYLES[goal.tag] ?? TAG_STYLES['Standard'];

  return (
    <article
      className="bg-white dark:bg-dark-surface-container p-7 rounded-2xl shadow-[0_4px_30px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/30 dark:border-dark-outline-variant/30 hover:shadow-[0_8px_40px_rgba(67,37,125,0.09)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6"
      aria-label={`Goal: ${goal.name}`}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${goal.accentHex}18` }}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{
                color: goal.accentHex,
                fontVariationSettings: "'FILL' 1",
              }}
              aria-hidden="true"
            >
              {goal.icon}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold truncate">
              {goal.name}
            </h3>
            <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-0.5">
              {goal.description}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap',
            tagStyle
          )}
        >
          {goal.tag}
        </span>
      </div>

      {/* ── Amounts ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-inter text-[10px] font-bold text-outline dark:text-dark-on-surface-variant/50 uppercase tracking-wider mb-1">
            Current Savings
          </p>
          <p
            className="font-poppins text-headline-md font-bold"
            style={{ color: goal.accentHex }}
          >
            ₹{goal.currentAmount.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="text-right">
          <p className="font-inter text-[10px] font-bold text-outline dark:text-dark-on-surface-variant/50 uppercase tracking-wider mb-1">
            Target Amount
          </p>
          <p className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-bold">
            ₹{goal.targetAmount.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-inter text-body-sm font-bold text-on-surface dark:text-dark-on-surface">
            {clampedPercent}% Achieved
          </span>
          <span className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
            ₹{goal.remainingAmount.toLocaleString('en-IN')} left
          </span>
        </div>
        <div
          className="h-3 w-full bg-surface-container-high dark:bg-dark-surface-container-high rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={clampedPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${goal.name} progress: ${clampedPercent}%`}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${clampedPercent}%`,
              backgroundColor: goal.accentHex,
              boxShadow: `0 0 12px ${goal.accentHex}40`,
            }}
          />
        </div>
      </div>

      {/* ── Footer row ─────────────────────────────────────────── */}
      <div className="bg-surface-container-low dark:bg-dark-surface-container-low rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="font-inter text-[10px] font-bold text-outline dark:text-dark-on-surface-variant/50 uppercase tracking-wider">
            Monthly Contribution
          </p>
          <p
            className="font-inter text-body-md font-bold mt-0.5"
            style={{ color: goal.accentHex }}
          >
            ₹{goal.monthlyContribution.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="text-right">
          <p className="font-inter text-[10px] font-bold text-outline dark:text-dark-on-surface-variant/50 uppercase tracking-wider">
            {goal.isOnTrack ? 'On Track — Done by' : 'Projected Completion'}
          </p>
          <p className="font-inter text-body-md text-on-surface dark:text-dark-on-surface font-semibold mt-0.5 flex items-center gap-1 justify-end">
            {goal.isOnTrack ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  check_circle
                </span>
                {goal.projectedCompletionDisplay}
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  schedule
                </span>
                {goal.projectedCompletionDisplay}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* ── Edit CTA ───────────────────────────────────────────── */}
      {onEdit && (
        <button
          onClick={() => onEdit(goal.id)}
          className="w-full py-2 rounded-xl border border-outline-variant/30 dark:border-dark-outline-variant/30 font-inter text-body-sm font-medium text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container dark:hover:bg-dark-surface-container-high hover:text-primary dark:hover:text-dark-primary transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none flex items-center justify-center gap-2"
          aria-label={`Edit ${goal.name} goal`}
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            edit
          </span>
          Adjust Goal
        </button>
      )}
    </article>
  );
}
