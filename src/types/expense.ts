/**
 * expense.ts — FinanceHer Expenses Module Types
 *
 * These types form the data contract for the Expenses module.
 * They are deliberately designed so that future AI modules can derive:
 *  - spending patterns (category distributions, day-of-week trends)
 *  - savings rate (income - totalExpenses / income)
 *  - expense trends (month-over-month deltas)
 *  - monthly cash flow (income - expenses)
 *  - behavioral indicators (impulse spend score, recurring vs. discretionary)
 *
 * AI INTEGRATION POINT: When the AI layer is added, these types will be
 * serialised and sent to the RAG pipeline as structured user context.
 */

// ─── Primitives ──────────────────────────────────────────────────────────────

/** Every expense category in the system. Extend as needed. */
export type ExpenseCategory =
  | 'Housing'
  | 'Dining'
  | 'Groceries'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills'
  | 'Health'
  | 'Education'
  | 'Travel'
  | 'Subscriptions'
  | 'Investments'
  | 'Income'
  | 'Other';

/** Payment method used for a transaction. */
export type PaymentMethod =
  | 'Credit Card'
  | 'Debit Card'
  | 'UPI'
  | 'Net Banking'
  | 'Cash'
  | 'ACH Transfer'
  | 'Apple Pay'
  | 'Direct Debit'
  | 'Wallet';

/** Transaction settlement status. */
export type TransactionStatus = 'Cleared' | 'Pending' | 'Failed' | 'Recurring';

/** Direction of money flow. */
export type TransactionType = 'expense' | 'income';

// ─── Core Transaction ─────────────────────────────────────────────────────────

/**
 * A single financial transaction.
 *
 * AI INTEGRATION POINT: This is the atomic unit the AI will analyse.
 * Ensure `isoDate`, `category`, and `type` are always populated — these are
 * the primary axes for AI pattern detection.
 */
export interface Transaction {
  id: string;
  /** Human-readable merchant or payee name. */
  name: string;
  /** Material Symbol icon name for the category. */
  icon: string;
  category: ExpenseCategory;
  /** ISO 8601 date string — used for time-series analysis. */
  isoDate: string;
  /** Display date string for the UI (e.g., "Jun 28, 2026"). */
  displayDate: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  /** Last 4 digits of card/account for display (never full number). */
  accountId: string;
  /**
   * Optional note attached by the user.
   * AI INTEGRATION POINT: Use notes as enrichment context for RAG retrieval.
   */
  note?: string;
  /**
   * Whether this transaction is a recurring subscription or bill.
   * AI INTEGRATION POINT: Recurring flag drives fixed-cost detection.
   */
  isRecurring?: boolean;
}

// ─── Category Breakdown ───────────────────────────────────────────────────────

/**
 * Aggregated spending for a single category in a period.
 *
 * AI INTEGRATION POINT: Category distributions are the primary input for
 * "category analysis" and "budget rebalancing" recommendations.
 */
export interface CategoryBreakdown {
  category: ExpenseCategory;
  totalAmount: number;
  /** Percentage of total spend this period. */
  percentage: number;
  /** Count of transactions in this category. */
  transactionCount: number;
  icon: string;
  /** Tailwind color class for the UI chart segment. */
  colorClass: string;
  /** Hex color for SVG strokes. */
  strokeColor: string;
}

// ─── Monthly Summary ──────────────────────────────────────────────────────────

/**
 * Financial summary for a single calendar month.
 *
 * AI INTEGRATION POINT: Monthly summaries drive trend analysis. The AI can
 * compare `totalExpenses`, `totalIncome`, and `savingsAmount` across multiple
 * months to identify patterns and make forward-looking recommendations.
 */
export interface MonthlySummary {
  /** "YYYY-MM" format for easy sorting and grouping. */
  monthKey: string;
  /** Display label (e.g., "June 2026"). */
  label: string;
  totalExpenses: number;
  totalIncome: number;
  /** totalIncome - totalExpenses */
  netCashFlow: number;
  /** Amount transferred to savings/investments that month. */
  savingsAmount: number;
  /** savingsAmount / totalIncome (0–1). */
  savingsRate: number;
  /** Percentage change in expenses vs prior month. */
  expenseDeltaPercent: number;
  /** Monthly budget limit set by the user. */
  budgetLimit: number;
  /** (totalExpenses / budgetLimit) * 100. Capped at 100 for UI. */
  budgetUtilisationPercent: number;
  categoryBreakdowns: CategoryBreakdown[];
  transactions: Transaction[];
}

// ─── Insight ──────────────────────────────────────────────────────────────────

export type InsightSeverity = 'info' | 'warning' | 'success' | 'tip';

/**
 * A single AI-generated or rule-based financial insight.
 *
 * AI INTEGRATION POINT: The `dataRefs` field links insights back to specific
 * transactions or categories so the AI can justify its recommendations.
 */
export interface ExpenseInsight {
  id: string;
  title: string;
  body: string;
  severity: InsightSeverity;
  icon: string;
  /** IDs of transactions or categories this insight is derived from. */
  dataRefs: string[];
  /**
   * Whether this insight was generated by the AI layer (true) or
   * derived from a deterministic rule (false).
   * AI INTEGRATION POINT: false = rule-based stub; true = AI-generated.
   */
  isAIGenerated: boolean;
}

// ─── Filter & Sort State ─────────────────────────────────────────────────────

export type SortField = 'date' | 'amount' | 'name';
export type SortDirection = 'asc' | 'desc';

/** UI filter state for the transaction table. */
export interface ExpenseFilters {
  search: string;
  category: ExpenseCategory | 'All';
  status: TransactionStatus | 'All';
  sortField: SortField;
  sortDirection: SortDirection;
  /** If set, only show transactions on or after this ISO date. */
  dateFrom?: string;
  /** If set, only show transactions on or before this ISO date. */
  dateTo?: string;
}

// ─── Add Expense Form ─────────────────────────────────────────────────────────

/**
 * Form data shape for the "Add Expense" modal.
 *
 * AI INTEGRATION POINT: When the backend is added, this payload is sent to
 * POST /api/expenses. The AI layer subscribes to new expense events to
 * incrementally update its context.
 */
export interface AddExpenseFormData {
  name: string;
  amount: string; // String for controlled input; parse to number on submit.
  category: ExpenseCategory;
  isoDate: string;
  paymentMethod: PaymentMethod;
  note: string;
  isRecurring: boolean;
}
