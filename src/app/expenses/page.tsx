'use client';

import { useState, useEffect } from 'react';
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
  MOCK_INSIGHTS,
  MOCK_TRANSACTIONS,
} from '@/constants/expense.mock';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { type Transaction, type MonthlySummary, type CategoryBreakdown, type ExpenseCategory } from '@/types/expense';
import { type AddExpenseFormData } from '@/types/expense';

const CATEGORY_COLORS: Record<string, { bg: string; stroke: string }> = {
  Housing: { bg: 'bg-primary', stroke: '#43257d' },
  Dining: { bg: 'bg-[#E57373]', stroke: '#E57373' },
  Groceries: { bg: 'bg-emerald-500', stroke: '#10b981' },
  Investments: { bg: 'bg-secondary', stroke: '#65558c' },
  Shopping: { bg: 'bg-amber-500', stroke: '#f59e0b' },
  Transport: { bg: 'bg-sky-500', stroke: '#0ea5e9' },
  Bills: { bg: 'bg-orange-500', stroke: '#f97316' },
  Other: { bg: 'bg-outline', stroke: '#7a7582' },
};

const CATEGORY_ICONS: Record<string, string> = {
  Housing: 'home',
  Income: 'work',
  Dining: 'restaurant',
  Groceries: 'shopping_cart',
  Transport: 'commute',
  Subscriptions: 'subscriptions',
  Shopping: 'shopping_bag',
  Bills: 'electric_bolt',
  Health: 'health_and_safety',
  Entertainment: 'movie',
  Investments: 'trending_up',
  Education: 'school',
  Travel: 'flight',
};

function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] || 'receipt';
}

function formatDisplayDate(isoDateStr: string): string {
  try {
    const d = new Date(isoDateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return isoDateStr;
  }
}

function deriveMonthlySummary(transactions: Transaction[]): MonthlySummary {
  let totalExpenses = 0;
  let totalIncome = 0;
  const categorySums: Record<string, { sum: number; count: number }> = {};

  transactions.forEach((tx) => {
    if (tx.type === 'income') {
      totalIncome += tx.amount;
    } else {
      totalExpenses += tx.amount;
      const cat = tx.category;
      if (!categorySums[cat]) {
        categorySums[cat] = { sum: 0, count: 0 };
      }
      categorySums[cat].sum += tx.amount;
      categorySums[cat].count += 1;
    }
  });

  const categoryBreakdowns: CategoryBreakdown[] = Object.keys(categorySums).map((cat) => {
    const { sum, count } = categorySums[cat];
    const colors = CATEGORY_COLORS[cat] || { bg: 'bg-outline', stroke: '#7a7582' };
    const pct = totalExpenses > 0 ? Math.round((sum / totalExpenses) * 100) : 0;
    return {
      category: cat as ExpenseCategory,
      totalAmount: sum,
      percentage: pct,
      transactionCount: count,
      icon: getCategoryIcon(cat),
      colorClass: colors.bg,
      strokeColor: colors.stroke,
    };
  });

  categoryBreakdowns.sort((a, b) => b.totalAmount - a.totalAmount);

  const netCashFlow = totalIncome - totalExpenses;
  const budgetLimit = 65000;
  const budgetUtilisationPercent = budgetLimit > 0 ? Math.round((totalExpenses / budgetLimit) * 100) : 0;

  const savingsAmount = categorySums['Investments']?.sum || 0;
  const savingsRate = totalIncome > 0 ? savingsAmount / totalIncome : 0;

  return {
    monthKey: '2026-07',
    label: 'July 2026',
    totalExpenses,
    totalIncome,
    netCashFlow,
    savingsAmount,
    savingsRate,
    expenseDeltaPercent: -8.2,
    budgetLimit,
    budgetUtilisationPercent,
    categoryBreakdowns,
    transactions,
  };
}

/**
 * ExpensesPage — /expenses
 *
 * Implements client-side state synchronization with localStorage (financeher_expenses).
 * In the future, replace loadFromStorage/saveToStorage calls with API service hooks.
 */
export default function ExpensesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = loadFromStorage<Transaction[]>(STORAGE_KEYS.EXPENSES, MOCK_TRANSACTIONS);
    setTransactions(data);
  }, []);

  const handleAddExpense = (formData: AddExpenseFormData) => {
    const amountNum = typeof formData.amount === 'string' ? parseFloat(formData.amount) || 0 : formData.amount;
    const newTx: Transaction = {
      id: `txn_${Date.now()}`,
      name: formData.name,
      icon: getCategoryIcon(formData.category),
      category: formData.category,
      isoDate: formData.isoDate,
      displayDate: formatDisplayDate(formData.isoDate),
      amount: amountNum,
      type: formData.category === 'Income' ? 'income' : 'expense',
      status: formData.isRecurring ? 'Recurring' : 'Cleared',
      paymentMethod: formData.paymentMethod,
      accountId: '8812',
      note: formData.note,
      isRecurring: formData.isRecurring,
    };
    const updatedList = [newTx, ...transactions];
    setTransactions(updatedList);
    saveToStorage(STORAGE_KEYS.EXPENSES, updatedList);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedList = transactions.filter((t) => t.id !== id);
    setTransactions(updatedList);
    saveToStorage(STORAGE_KEYS.EXPENSES, updatedList);
  };

  // Derive layout stats from current state
  const summary = mounted ? deriveMonthlySummary(transactions) : deriveMonthlySummary([]);

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
                  Monitor your monthly spending and optimise your wealth — {summary.label}
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
            <ExpenseOverviewCards summary={summary} />
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
                breakdowns={summary.categoryBreakdowns}
                totalExpenses={summary.totalExpenses}
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
              {mounted && (
                <TransactionTable
                  transactions={transactions}
                  onAddExpense={() => setIsModalOpen(true)}
                  onDeleteExpense={handleDeleteExpense}
                />
              )}
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
        onAdd={handleAddExpense}
      />
    </div>
  );
}
