'use client';

interface BudgetRecommendationCardProps {
  surplusAmount?: number;
  expectedInterest?: number;
}

export function BudgetRecommendationCard({
  surplusAmount = 450,
  expectedInterest = 22,
}: BudgetRecommendationCardProps) {
  return (
    <div className="bg-surface-container dark:bg-dark-surface-container-low p-6 rounded-xl border border-outline-variant/30 dark:border-dark-outline-variant/30 flex flex-col justify-between h-full transition-all duration-300">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-container dark:bg-dark-primary-container p-2 rounded-lg shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl" aria-hidden="true">
              account_balance_wallet
            </span>
          </div>
          <h3 className="font-poppins text-headline-md font-semibold text-primary dark:text-dark-primary">
            Budget Tip
          </h3>
        </div>
        <p className="font-inter text-body-md text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          Based on your surplus this month, moving an extra{' '}
          <span className="font-bold text-primary dark:text-dark-primary">Rs. {surplusAmount}</span> to your{' '}
          <span className="underline decoration-primary/50 dark:decoration-dark-primary/50 font-medium">High-Yield Savings</span> could earn you an
          additional Rs. {expectedInterest} in interest by year-end.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          className="w-full bg-primary dark:bg-dark-primary text-white py-3 rounded-xl font-inter text-label-md font-semibold shadow-lg shadow-primary/20 dark:shadow-none hover:opacity-90 active:scale-98 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Accept Recommendation
        </button>
        <button
          type="button"
          className="w-full bg-transparent text-primary dark:text-dark-primary py-3 rounded-xl font-inter text-label-md font-semibold border border-primary dark:border-dark-primary hover:bg-primary/5 dark:hover:bg-dark-primary/5 active:scale-98 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
