'use client';

interface HealthScoreCardProps {
  score?: number;
  delta?: number;
  percentile?: number;
  debtRatioChange?: number;
}

export function HealthScoreCard({
  score = 782,
  delta = 12,
  percentile = 15,
  debtRatioChange = 4,
}: HealthScoreCardProps) {
  // We represent the progress bar length by formatting the score relative to 1000
  const progressPercent = Math.min((score / 1000) * 100, 100);

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col justify-between h-full transition-all duration-300">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-inter text-label-md font-semibold text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-wider">
              Health Score
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-poppins text-display-md text-primary dark:text-dark-primary">
                {score}
              </span>
              <span className="font-inter text-body-sm text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5" aria-label={`Score increased by ${delta} points`}>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  trending_up
                </span>
                {delta}
              </span>
            </div>
          </div>
          {/* Radial progress representation or decorative badge */}
          <div className="w-12 h-12 rounded-full border-4 border-surface-container dark:border-dark-surface-container-high border-t-primary dark:border-t-dark-primary rotate-45" aria-hidden="true" />
        </div>

        <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          You&apos;re in the top {percentile}% of savers in your demographic. Your debt-to-income ratio improved by {debtRatioChange}% this month.
        </p>
      </div>

      <div className="mt-6">
        <div 
          className="h-1.5 w-full bg-surface-container dark:bg-dark-surface-container-high rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={1000}
          aria-label={`Financial Health Score: ${score} out of 1000`}
        >
          <div
            className="h-full bg-primary dark:bg-dark-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
