'use client';

interface LegendItem {
  name: string;
  percentage: number;
  colorClass: string;
  strokeColor: string;
}

const legendItems: LegendItem[] = [
  { name: 'Housing', percentage: 45, colorClass: 'bg-primary dark:bg-dark-primary', strokeColor: '#43257d' },
  { name: 'Entertainment', percentage: 25, colorClass: 'bg-secondary dark:bg-dark-secondary', strokeColor: '#65558c' },
  { name: 'Food & Dining', percentage: 30, colorClass: 'bg-[#E57373] dark:bg-rose-400', strokeColor: '#E57373' },
];

export function SpendingBreakdownCard() {
  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col justify-between h-full transition-all duration-300">
      <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface mb-6 font-semibold">
        Spending Breakdown
      </h3>

      <div className="flex flex-col items-center">
        {/* Simulated Donut Chart using SVG */}
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            {/* Background Track */}
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="15.915"
              className="stroke-surface-container dark:stroke-dark-surface-container-high"
              strokeWidth="4"
            />
            {/* Housing: 45% (dasharray = "45 55", offset = 0) */}
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="15.915"
              stroke="#43257d"
              strokeDasharray="45 55"
              strokeDashoffset="0"
              strokeWidth="4"
              className="dark:stroke-dark-primary transition-all duration-1000"
            />
            {/* Entertainment: 25% (dasharray = "25 75", offset = -45) */}
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="15.915"
              stroke="#65558c"
              strokeDasharray="25 75"
              strokeDashoffset="-45"
              strokeWidth="4"
              className="dark:stroke-dark-secondary transition-all duration-1000"
            />
            {/* Food: 30% (dasharray = "30 70", offset = -70) */}
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="15.915"
              stroke="#E57373"
              strokeDasharray="30 70"
              strokeDashoffset="-70"
              strokeWidth="4"
              className="dark:stroke-rose-400 transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-inter text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant/70 font-bold uppercase tracking-widest">
              Total
            </span>
            <span className="font-poppins text-xl font-bold text-on-surface dark:text-dark-on-surface">
              Rs. 2,840
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3">
          {legendItems.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${item.colorClass}`} />
                <span className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/80">
                  {item.name}
                </span>
              </div>
              <span className="font-inter text-label-md font-bold text-on-surface dark:text-dark-on-surface">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
