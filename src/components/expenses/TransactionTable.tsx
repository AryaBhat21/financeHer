'use client';

import { useState, useMemo } from 'react';
import { type Transaction, type ExpenseFilters } from '@/types/expense';
import { EXPENSE_CATEGORIES, ITEMS_PER_PAGE } from '@/constants/expense.mock';
import { cn } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
  onAddExpense: () => void;
  onDeleteExpense?: (id: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  Cleared:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Pending:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Failed: 'bg-red-100 text-error dark:bg-red-900/30 dark:text-red-400',
  Recurring:
    'bg-surface-container text-on-surface-variant dark:bg-dark-surface-container-high dark:text-dark-on-surface-variant',
};

const STATUS_DOT: Record<string, string> = {
  Cleared: 'bg-emerald-500',
  Pending: 'bg-amber-500 animate-pulse',
  Failed: 'bg-error',
  Recurring: 'bg-outline',
};

const DEFAULT_FILTERS: ExpenseFilters = {
  search: '',
  category: 'All',
  status: 'All',
  sortField: 'date',
  sortDirection: 'desc',
};

export function TransactionTable({ transactions, onAddExpense, onDeleteExpense }: TransactionTableProps) {
  const [filters, setFilters] = useState<ExpenseFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  // ─── Filtering & Sorting ───────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...transactions];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.name.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q) ||
          tx.note?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter((tx) => tx.category === filters.category);
    }

    // Status filter
    if (filters.status !== 'All') {
      result = result.filter((tx) => tx.status === filters.status);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (filters.sortField === 'date') {
        cmp = a.isoDate.localeCompare(b.isoDate);
      } else if (filters.sortField === 'amount') {
        cmp = a.amount - b.amount;
      } else if (filters.sortField === 'name') {
        cmp = a.name.localeCompare(b.name);
      }
      return filters.sortDirection === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [transactions, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setFilters((f) => ({ ...f, search: value }));
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setFilters((f) => ({ ...f, category: cat as ExpenseFilters['category'] }));
    setPage(1);
  };

  const toggleSort = (field: ExpenseFilters['sortField']) => {
    setFilters((f) => ({
      ...f,
      sortField: field,
      sortDirection:
        f.sortField === field && f.sortDirection === 'desc' ? 'asc' : 'desc',
    }));
    setPage(1);
  };

  const sortIcon = (field: ExpenseFilters['sortField']) => {
    if (filters.sortField !== field) return 'unfold_more';
    return filters.sortDirection === 'desc' ? 'expand_more' : 'expand_less';
  };

  return (
    <section aria-labelledby="transactions-heading">
      {/* ─── Search & Filters ───────────────────────────────────── */}
      <div className="bg-surface-container-low dark:bg-dark-surface-container-low rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-dark-on-surface-variant/50 text-[20px]"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search transactions, categories, notes…"
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-surface-container border border-outline-variant dark:border-dark-outline-variant rounded-lg font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/50 dark:placeholder:text-dark-on-surface-variant/40 transition-all"
            aria-label="Search transactions"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                status: e.target.value as ExpenseFilters['status'],
              }))
            }
            className="px-3 py-2.5 bg-white dark:bg-dark-surface-container border border-outline-variant dark:border-dark-outline-variant rounded-lg font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-all cursor-pointer"
            aria-label="Filter by status"
          >
            <option value="All">All Status</option>
            <option value="Cleared">Cleared</option>
            <option value="Pending">Pending</option>
            <option value="Recurring">Recurring</option>
            <option value="Failed">Failed</option>
          </select>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary dark:bg-dark-primary text-white rounded-lg font-inter text-body-sm font-medium hover:opacity-90 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none shrink-0"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              add
            </span>
            Add
          </button>
        </div>
      </div>

      {/* ─── Category Chip Filter ───────────────────────────────── */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin"
        role="group"
        aria-label="Filter by category"
      >
        {EXPENSE_CATEGORIES.slice(0, 10).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full font-inter text-label-md transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none',
              filters.category === cat
                ? 'bg-primary dark:bg-dark-primary text-white shadow-sm'
                : 'bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container'
            )}
            aria-pressed={filters.category === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─── Table ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-dark-surface-container rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Transaction list">
            <thead className="bg-surface-container-low dark:bg-dark-surface-container-low">
              <tr>
                <th className="px-6 py-4 font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-widest font-semibold">
                  Transaction
                </th>
                <th className="px-6 py-4 font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-widest font-semibold hidden md:table-cell">
                  Category
                </th>
                <th className="px-6 py-4 font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-widest font-semibold hidden lg:table-cell">
                  <button
                    className="flex items-center gap-1 hover:text-primary dark:hover:text-dark-primary transition-colors"
                    onClick={() => toggleSort('date')}
                    aria-label="Sort by date"
                  >
                    Date
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      {sortIcon('date')}
                    </span>
                  </button>
                </th>
                <th className="px-6 py-4 font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-widest font-semibold text-right">
                  <button
                    className="flex items-center gap-1 ml-auto hover:text-primary dark:hover:text-dark-primary transition-colors"
                    onClick={() => toggleSort('amount')}
                    aria-label="Sort by amount"
                  >
                    Amount
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      {sortIcon('amount')}
                    </span>
                  </button>
                </th>
                <th className="px-6 py-4 font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-widest font-semibold text-center hidden sm:table-cell">
                  Status
                </th>
                <th className="px-6 py-4 font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-widest font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 dark:divide-dark-outline-variant/20">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span
                        className="material-symbols-outlined text-4xl text-on-surface-variant/40 dark:text-dark-on-surface-variant/30"
                        aria-hidden="true"
                      >
                        search_off
                      </span>
                      <p className="font-inter text-body-md text-on-surface-variant dark:text-dark-on-surface-variant/60">
                        No transactions match your filters.
                      </p>
                      <button
                        onClick={() => setFilters(DEFAULT_FILTERS)}
                        className="font-inter text-body-sm text-primary dark:text-dark-primary hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-surface-container-low/60 dark:hover:bg-dark-surface-container-low/40 transition-colors cursor-pointer group"
                  >
                    {/* Transaction name + icon */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container dark:bg-dark-surface-container-high flex items-center justify-center text-primary dark:text-dark-primary group-hover:bg-primary dark:group-hover:bg-dark-primary group-hover:text-white transition-all shrink-0">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '20px' }}
                            aria-hidden="true"
                          >
                            {tx.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-inter text-body-sm font-semibold text-on-surface dark:text-dark-on-surface truncate max-w-[160px] lg:max-w-[220px]">
                            {tx.name}
                          </p>
                          <p className="font-inter text-[11px] text-on-surface-variant dark:text-dark-on-surface-variant/60 truncate">
                            {tx.paymentMethod} · {tx.accountId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1.5 bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant px-2.5 py-1 rounded-full font-inter text-label-md">
                        {tx.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 hidden lg:table-cell whitespace-nowrap">
                      {tx.displayDate}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 text-right">
                      <span
                        className={cn(
                          'font-poppins text-body-sm font-bold',
                          tx.type === 'income'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-on-surface dark:text-dark-on-surface'
                        )}
                      >
                        {tx.type === 'income' ? '+' : '-'}₹
                        {tx.amount.toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center hidden sm:table-cell">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-inter text-label-md font-bold whitespace-nowrap',
                          STATUS_STYLES[tx.status] ?? STATUS_STYLES.Cleared
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            STATUS_DOT[tx.status] ?? STATUS_DOT.Cleared
                          )}
                        />
                        {tx.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onDeleteExpense) {
                            onDeleteExpense(tx.id);
                          }
                        }}
                        className="text-error hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        aria-label={`Delete transaction ${tx.name}`}
                      >
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Pagination ───────────────────────────────────────── */}
        <div className="px-6 py-4 bg-surface-container-low dark:bg-dark-surface-container-low border-t border-outline-variant/10 dark:border-dark-outline-variant/20 flex items-center justify-between">
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60">
            Showing{' '}
            <span className="font-semibold text-on-surface dark:text-dark-on-surface">
              {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-on-surface dark:text-dark-on-surface">
              {filtered.length}
            </span>{' '}
            transactions
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-dark-surface-container transition-colors text-on-surface-variant dark:text-dark-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary outline-none"
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_left
              </span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'w-8 h-8 rounded-full font-inter text-body-sm transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none',
                  p === page
                    ? 'bg-primary dark:bg-dark-primary text-white font-bold'
                    : 'hover:bg-surface-container-high dark:hover:bg-dark-surface-container text-on-surface-variant dark:text-dark-on-surface-variant'
                )}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-dark-surface-container transition-colors text-on-surface-variant dark:text-dark-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary outline-none"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
