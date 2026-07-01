'use client';

import { type CategoryBreakdown } from '@/types/expense';
import { cn } from '@/lib/utils';

interface CategoryBreakdownChartProps {
  breakdowns: CategoryBreakdown[];
  totalExpenses: number;
}

export function CategoryBreakdownChart({
  breakdowns,
  totalExpenses,
}: CategoryBreakdownChartProps) {
  // Only show top 5 categories in the donut chart
  const top5 = breakdowns.slice(0, 5);

  // Build SVG donut segments
  // Circumference of a circle with r=15.915 ≈ 100 (makes dasharray === percentage)
  const segments: { breakdown: CategoryBreakdown; offset: number }[] = [];
  let cumulativePercent = 0;
  top5.forEach((bd) => {
    segments.push({ breakdown: bd, offset: -cumulativePercent });
    cumulativePercent += bd.percentage;
  });

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 h-full flex flex-col transition-all duration-300">
      <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold mb-6">
        Category Breakdown
      </h3>

      {/* Donut Chart */}
      <div className="flex flex-col items-center">
        <div className="relative w-44 h-44 mb-6" role="img" aria-label="Category spending donut chart">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            {/* Track */}
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="15.915"
              className="stroke-surface-container dark:stroke-dark-surface-container-high"
              strokeWidth="4"
            />
            {/* Segments */}
            {segments.map(({ breakdown, offset }) => (
              <circle
                key={breakdown.category}
                cx="18"
                cy="18"
                fill="transparent"
                r="15.915"
                stroke={breakdown.strokeColor}
                strokeDasharray={`${breakdown.percentage} ${100 - breakdown.percentage}`}
                strokeDashoffset={offset}
                strokeWidth="4"
                strokeLinecap="butt"
                className="transition-all duration-1000"
              />
            ))}
          </svg>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-inter text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant/70 font-bold uppercase tracking-widest">
              Total
            </span>
            <span className="font-poppins text-lg font-bold text-on-surface dark:text-dark-on-surface leading-tight">
              ₹{(totalExpenses / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        {/* Legend */}
        <ul className="w-full space-y-3" aria-label="Category legend">
          {breakdowns.slice(0, 6).map((bd) => (
            <li key={bd.category} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', bd.colorClass)}
                  style={{ backgroundColor: bd.strokeColor }}
                />
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="material-symbols-outlined text-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 flex-shrink-0"
                    style={{ fontSize: '14px' }}
                    aria-hidden="true"
                  >
                    {bd.icon}
                  </span>
                  <span className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/80 truncate">
                    {bd.category}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-inter text-label-md font-bold text-on-surface dark:text-dark-on-surface block">
                  {bd.percentage}%
                </span>
                <span className="font-inter text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant/60">
                  ₹{bd.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
