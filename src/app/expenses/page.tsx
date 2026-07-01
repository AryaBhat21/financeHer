'use client';

import { useState } from 'react';
import { SidebarNav, DashboardFooter } from '@/components/dashboard';
import {
  ExpenseOverviewCards,
  CategoryBreakdownChart,
  SpendingTrendChart,
  TransactionTable,
  InsightsPanel,
  AddExpenseModal,
} from '@/components/expenses';
import {
  MOCK_MONTHLY_SUMMARY,
  MOCK_INSIGHTS,
  MOCK_TRANSACTIONS,
} from '@/constants/expense.mock';

/**
 * ExpensesPage — /expenses
 *
 * This page is part of the AI input layer of FinanceHer. All data displayed
 * here is mock state, designed to match the exact type contracts that will be
 * consumed by future AI modules.
 *
 * AI INTEGRATION POINTS (summary — see individual components for details):
 *   1. MOCK_MONTHLY_SUMMARY → replace with useSWR('/api/expenses/summary')
 *   2. MOCK_INSIGHTS        → replace with useSWR('/api/insights')
 *   3. MOCK_TRANSACTIONS    → replace with useSWR('/api/expenses/transactions')
 *   4. AddExpenseModal      → POST /api/expenses on submit
 *
 * BACKEND INTEGRATION POINTS:
 *   - expense.service.ts will be the single file updated when the API is ready.
 *   - All types in src/types/expense.ts remain the stable contract.
 */
export default function ExpensesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background dark:bg-dark-background text-on-background dark:text-dark-on-background min-h-screen flex transition-colors duration-300">
      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <SidebarNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* ── Main Canvas ─────────────────────────────────────────────── */}
      <main
        className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop overflow-x-hidden flex flex-col min-h-screen"
        id="main-content"
      >
        <div className="flex-1">
          {/* ── Page Header ──────────────────────────────────────────── */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-surface-container dark:bg-dark-surface-container-low text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-all active:scale-95 shrink-0"
                aria-label="Open navigation menu"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  menu
                </span>
              </button>

              <div>
                <h1 className="font-poppins text-headline-lg text-primary dark:text-dark-primary font-bold">
                  Expense Tracker
                </h1>
                <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-0.5">
                  Monitor your monthly spending and optimise your wealth — {MOCK_MONTHLY_SUMMARY.label}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary dark:bg-dark-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-inter text-body-sm font-semibold hover:shadow-primary-glow hover:-translate-y-0.5 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none shrink-0"
              aria-label="Add a new transaction"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add
              </span>
              Add Transaction
            </button>
          </header>

          {/* ── Overview Cards ───────────────────────────────────────── */}
          <div className="mb-stack-lg">
            <ExpenseOverviewCards summary={MOCK_MONTHLY_SUMMARY} />
          </div>

          {/* ── Charts Row ───────────────────────────────────────────── */}
          <div className="grid grid-cols-12 gap-6 mb-stack-lg">
            {/* Trend chart — takes 8 of 12 columns on desktop */}
            <div className="col-span-12 lg:col-span-8">
              <SpendingTrendChart />
            </div>

            {/* Donut breakdown chart — takes 4 of 12 columns on desktop */}
            <div className="col-span-12 lg:col-span-4">
              <CategoryBreakdownChart
                breakdowns={MOCK_MONTHLY_SUMMARY.categoryBreakdowns}
                totalExpenses={MOCK_MONTHLY_SUMMARY.totalExpenses}
              />
            </div>
          </div>

          {/* ── Transactions + Insights Row ──────────────────────────── */}
          <div className="grid grid-cols-12 gap-6 mb-stack-lg">
            {/* Transaction table — 8 columns */}
            <div className="col-span-12 lg:col-span-8">
              <h2
                id="transactions-heading"
                className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold mb-4"
              >
                Transactions
              </h2>
              <TransactionTable
                transactions={MOCK_TRANSACTIONS}
                onAddExpense={() => setIsModalOpen(true)}
              />
            </div>

            {/* AI Insights panel — 4 columns */}
            <div className="col-span-12 lg:col-span-4">
              <InsightsPanel insights={MOCK_INSIGHTS} />
            </div>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <DashboardFooter />
      </main>

      {/* ── Mobile FAB ───────────────────────────────────────────────── */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary dark:bg-dark-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-150 z-50 md:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Add new transaction"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          add
        </span>
      </button>

      {/* ── Add Expense Modal ─────────────────────────────────────────── */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
