'use client';

import { MOCK_MONTHLY_TREND } from '@/constants/expense.mock';

export function SpendingTrendChart() {
  const maxValue = Math.max(...MOCK_MONTHLY_TREND.map((d) => d.income));

  const barHeight = (value: number) => {
    const pct = (value / maxValue) * 100;
    return `${pct}%`;
  };

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 h-full flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold">
            6-Month Trend
          </h3>
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-0.5">
            Income vs. Expenses — 2026
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-inter">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary dark:bg-dark-primary" />
            <span className="text-on-surface-variant dark:text-dark-on-surface-variant/70">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#E57373]" />
            <span className="text-on-surface-variant dark:text-dark-on-surface-variant/70">Expenses</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        className="flex-1 flex items-end gap-2 sm:gap-3"
        role="img"
        aria-label="Bar chart showing monthly income and expense trends over 6 months"
      >
        {MOCK_MONTHLY_TREND.map((data) => (
          <div key={data.month} className="flex-1 flex flex-col items-center gap-1.5 group">
            {/* Bars container */}
            <div className="w-full flex items-end gap-0.5 justify-center" style={{ height: '160px' }}>
              {/* Income bar */}
              <div
                className="flex-1 rounded-t-md bg-primary/20 dark:bg-dark-primary/20 relative overflow-hidden group-hover:bg-primary/30 dark:group-hover:bg-dark-primary/30 transition-colors"
                style={{ height: barHeight(data.income) }}
                title={`Income: ₹${data.income.toLocaleString('en-IN')}`}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-primary dark:bg-dark-primary rounded-t-md transition-all duration-700"
                  style={{ height: barHeight(data.income) }}
                />
              </div>
              {/* Expense bar */}
              <div
                className="flex-1 rounded-t-md relative overflow-hidden"
                style={{ height: barHeight(data.expenses) }}
                title={`Expenses: ₹${data.expenses.toLocaleString('en-IN')}`}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#E57373] rounded-t-md transition-all duration-700"
                  style={{ height: '100%' }}
                />
              </div>
            </div>

            {/* Month label */}
            <span className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/60">
              {data.month}
            </span>

            {/* Hover tooltip */}
            <div className="absolute opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-inverse-surface text-inverse-on-surface text-[10px] font-bold px-2 py-1 rounded-lg pointer-events-none whitespace-nowrap z-10 bottom-16 hidden md:block">
              ₹{(data.expenses / 1000).toFixed(1)}k spent
            </div>
          </div>
        ))}
      </div>

      {/* Savings summary row */}
      <div className="mt-4 pt-4 border-t border-outline-variant/20 dark:border-dark-outline-variant/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm" aria-hidden="true">
            savings
          </span>
          <span className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70">
            Avg. monthly savings
          </span>
        </div>
        <span className="font-poppins text-body-sm font-bold text-emerald-600 dark:text-emerald-400">
          ₹{(
            MOCK_MONTHLY_TREND.reduce((acc, d) => acc + d.savings, 0) /
            MOCK_MONTHLY_TREND.length
          ).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
}
