'use client';

import { useEffect, useState } from 'react';

interface ChartDataPoint {
  month: string;
  income: number;   // Percentage height
  expense: number;  // Percentage height
  incomeLabel: string;
  expenseLabel: string;
}

const defaultData: ChartDataPoint[] = [
  { month: 'JAN', income: 70, expense: 45, incomeLabel: 'Rs. 3,500', expenseLabel: 'Rs. 2,250' },
  { month: 'FEB', income: 85, expense: 50, incomeLabel: 'Rs. 4,250', expenseLabel: 'Rs. 2,500' },
  { month: 'MAR', income: 65, expense: 40, incomeLabel: 'Rs. 3,250', expenseLabel: 'Rs. 2,000' },
  { month: 'APR', income: 90, expense: 55, incomeLabel: 'Rs. 4,500', expenseLabel: 'Rs. 2,750' },
  { month: 'MAY', income: 75, expense: 48, incomeLabel: 'Rs. 3,750', expenseLabel: 'Rs. 2,400' },
  { month: 'JUN', income: 82, expense: 42, incomeLabel: 'Rs. 4,100', expenseLabel: 'Rs. 2,100' },
];

export function IncomeExpenseChart() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation frame after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col justify-between h-full transition-all duration-300">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold">
          Income vs Expenses
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary dark:bg-dark-primary" />
            <span className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70">
              Income
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary-container dark:bg-dark-secondary-container" />
            <span className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70">
              Expenses
            </span>
          </div>
        </div>
      </div>

      {/* Simple bar chart visualization */}
      <div 
        className="flex items-end justify-between h-48 px-2 sm:px-4 gap-2 sm:gap-4"
        role="img"
        aria-label="Bar chart showing monthly income and expense trends from January to June"
      >
        {defaultData.map((data) => (
          <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group relative">
            <div className="w-full flex items-end gap-1 sm:gap-1.5 h-full">
              {/* Income Bar */}
              <div 
                className="flex-1 bg-primary dark:bg-dark-primary rounded-t-sm transition-all duration-700 ease-out"
                style={{ height: animate ? `${data.income}%` : '0%' }}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-inverse-surface dark:bg-dark-surface-container-high text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow z-20 pointer-events-none">
                  Income: {data.incomeLabel}
                </div>
              </div>
              {/* Expense Bar */}
              <div 
                className="flex-1 bg-secondary-container dark:bg-dark-secondary-container rounded-t-sm transition-all duration-700 ease-out"
                style={{ height: animate ? `${data.expense}%` : '0%' }}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-inverse-surface dark:bg-dark-surface-container-high text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow z-20 pointer-events-none">
                  Expenses: {data.expenseLabel}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-on-surface-variant dark:text-dark-on-surface-variant/70 tracking-wider">
              {data.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
