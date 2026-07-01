'use client';

interface Goal {
  name: string;
  current: number;
  target: number;
  colorClass: string;
}

const defaultGoals: Goal[] = [
  { name: "European Summer '25", current: 4200, target: 8000, colorClass: 'bg-primary dark:bg-dark-primary' },
  { name: 'Home Downpayment', current: 125000, target: 250000, colorClass: 'bg-[#E57373] dark:bg-rose-400' },
  { name: 'Emergency Fund', current: 180000, target: 200000, colorClass: 'bg-emerald-500 dark:bg-emerald-400' },
];

export function ActiveGoalsCard() {
  const formatCurrency = (val: number) => {
    return `Rs. ${val.toLocaleString()}`;
  };

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col justify-between h-full transition-all duration-300">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold">
            Active Goals
          </h3>
          <button className="text-primary dark:text-dark-primary hover:underline font-inter text-label-md">
            View All
          </button>
        </div>

        <div className="space-y-6">
          {defaultGoals.map((goal) => {
            const percent = Math.min((goal.current / goal.target) * 100, 100);
            return (
              <div key={goal.name} className="space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <p className="font-inter text-body-sm text-on-surface dark:text-dark-on-surface font-semibold truncate">
                    {goal.name}
                  </p>
                  <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 shrink-0">
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </p>
                </div>
                <div 
                  className="h-2 w-full bg-surface-container dark:bg-dark-surface-container-high rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={goal.current}
                  aria-valuemin={0}
                  aria-valuemax={goal.target}
                  aria-label={`${goal.name} savings progress: ${Math.round(percent)}%`}
                >
                  <div
                    className={`${goal.colorClass} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="w-full mt-8 py-3 border-2 border-dashed border-outline-variant dark:border-dark-outline-variant rounded-xl text-outline dark:text-dark-on-surface-variant/60 hover:border-primary dark:hover:border-dark-primary hover:text-primary dark:hover:text-dark-primary transition-colors flex items-center justify-center gap-2 font-inter text-body-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="material-symbols-outlined" aria-hidden="true">
          add_circle
        </span>
        Create New Goal
      </button>
    </div>
  );
}
