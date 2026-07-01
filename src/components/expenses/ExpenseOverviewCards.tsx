'use client';

import { type MonthlySummary } from '@/types/expense';
import { cn } from '@/lib/utils';

interface ExpenseOverviewCardsProps {
  summary: MonthlySummary;
}

export function ExpenseOverviewCards({ summary }: ExpenseOverviewCardsProps) {
  const isUnderBudget = summary.budgetUtilisationPercent < 85;
  const savingsRatePct = Math.round(summary.savingsRate * 100);
  const remaining = summary.budgetLimit - summary.totalExpenses;

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter"
      aria-label="Expense summary"
    >
      {/* Card 1 — Monthly Spend */}
      <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col gap-2 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(67,37,125,0.08)] hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-dark-primary/10 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-dark-primary transition-colors">
            <span
              className="material-symbols-outlined text-primary dark:text-dark-primary group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              account_balance_wallet
            </span>
          </div>
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-bold rounded-full px-2.5 py-1',
              summary.expenseDeltaPercent <= 0
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-red-100 text-error dark:bg-red-900/30 dark:text-red-400'
            )}
            aria-label={`${Math.abs(summary.expenseDeltaPercent)}% ${summary.expenseDeltaPercent <= 0 ? 'decrease' : 'increase'} from last month`}
          >
            <span className="material-symbols-outlined text-xs" aria-hidden="true">
              {summary.expenseDeltaPercent <= 0 ? 'trending_down' : 'trending_up'}
            </span>
            {Math.abs(summary.expenseDeltaPercent)}%
          </span>
        </div>
        <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1">
          Monthly Spend
        </p>
        <p className="font-poppins text-display-md text-on-surface dark:text-dark-on-surface font-bold">
          ₹{summary.totalExpenses.toLocaleString('en-IN')}
        </p>
        <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
          {summary.label}
        </p>
      </div>

      {/* Card 2 — Savings This Month */}
      <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col gap-2 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(67,37,125,0.08)] hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
            <span
              className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              savings
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold rounded-full px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            {savingsRatePct}% rate
          </span>
        </div>
        <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1">
          Savings This Month
        </p>
        <p className="font-poppins text-display-md text-emerald-600 dark:text-emerald-400 font-bold">
          ₹{summary.savingsAmount.toLocaleString('en-IN')}
        </p>
        <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
          via SIP & manual transfers
        </p>
      </div>

      {/* Card 3 — Top Category */}
      <div className="bg-white dark:bg-dark-surface-container p-6 rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col gap-2 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(67,37,125,0.08)] hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#E57373]/10 dark:bg-[#E57373]/20 flex items-center justify-center group-hover:bg-[#E57373] transition-colors">
            <span
              className="material-symbols-outlined text-[#E57373] group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              restaurant
            </span>
          </div>
          <span className="text-xs font-bold text-[#E57373] bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full">
            Top spend
          </span>
        </div>
        <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1">
          Top Category
        </p>
        <p className="font-poppins text-headline-lg text-on-surface dark:text-dark-on-surface font-bold truncate">
          Dining
        </p>
        <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
          ₹6,080 — 11% of total
        </p>
      </div>

      {/* Card 4 — Budget Health */}
      <div
        className={cn(
          'p-6 rounded-2xl flex flex-col gap-2 transition-all duration-300 group hover:-translate-y-0.5',
          isUnderBudget
            ? 'bg-primary-container dark:bg-dark-primary-container text-on-primary-container dark:text-dark-on-surface'
            : 'bg-[#853638] text-white'
        )}
      >
        <div className="flex items-center justify-between">
          <span className="material-symbols-outlined opacity-80" aria-hidden="true">
            {isUnderBudget ? 'check_circle' : 'warning'}
          </span>
          <span className="text-xs font-bold opacity-80 bg-white/20 px-2.5 py-1 rounded-full">
            {summary.budgetUtilisationPercent}% used
          </span>
        </div>
        <p className="font-inter text-label-md opacity-70 mt-1">Budget Health</p>
        <p className="font-poppins text-headline-lg font-bold">
          ₹{remaining.toLocaleString('en-IN')} left
        </p>
        {/* Progress bar */}
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-1">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000',
              isUnderBudget ? 'bg-white' : 'bg-amber-300'
            )}
            style={{ width: `${Math.min(summary.budgetUtilisationPercent, 100)}%` }}
            role="progressbar"
            aria-valuenow={summary.budgetUtilisationPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Budget utilisation: ${summary.budgetUtilisationPercent}%`}
          />
        </div>
        <p className="font-inter text-[11px] opacity-60">
          of ₹{summary.budgetLimit.toLocaleString('en-IN')} monthly limit
        </p>
      </div>
    </section>
  );
}
