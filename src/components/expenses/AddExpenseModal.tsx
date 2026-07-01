'use client';

import { useState } from 'react';
import { type AddExpenseFormData, type ExpenseCategory, type PaymentMethod } from '@/types/expense';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/constants/expense.mock';
import { cn } from '@/lib/utils';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (expense: AddExpenseFormData) => void;
}

const INITIAL_FORM: AddExpenseFormData = {
  name: '',
  amount: '',
  category: 'Dining',
  isoDate: new Date().toISOString().split('T')[0],
  paymentMethod: 'UPI',
  note: '',
  isRecurring: false,
};

/**
 * AddExpenseModal — modal form for adding a new expense.
 *
 * AI INTEGRATION POINT: The `handleSubmit` function currently logs the form
 * data. When the backend is ready, replace with:
 *   await expenseService.createExpense(formData);
 * The `expense.service.ts` stub will handle POST /api/expenses.
 *
 * BACKEND INTEGRATION POINT: On success, invalidate the expenses query cache
 * (TanStack Query) so the table auto-refreshes.
 */
export function AddExpenseModal({ isOpen, onClose, onAdd }: AddExpenseModalProps) {
  const [form, setForm] = useState<AddExpenseFormData>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const updateField = <K extends keyof AddExpenseFormData>(
    key: K,
    value: AddExpenseFormData[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // AI INTEGRATION POINT — replace with: await expenseService.createExpense(form)
    console.info('[AddExpenseModal] Form submitted (mock):', form);
    setTimeout(() => {
      setIsLoading(false);
      if (onAdd) {
        onAdd(form);
      }
      setForm(INITIAL_FORM);
      onClose();
    }, 800);
  };

  const filterableCategories = EXPENSE_CATEGORIES.filter(
    (c) => c !== 'All'
  ) as ExpenseCategory[];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto bg-white dark:bg-dark-surface-container rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20 dark:border-dark-outline-variant/20">
            <div>
              <h2
                id="modal-title"
                className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold"
              >
                Add Transaction
              </h2>
              <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60 mt-0.5">
                Log a new expense or income entry
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            {/* Merchant name */}
            <div className="space-y-1.5">
              <label
                htmlFor="expense-name"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Merchant / Description <span aria-hidden="true" className="text-error">*</span>
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-dark-on-surface-variant/50"
                  style={{ fontSize: '18px' }}
                  aria-hidden="true"
                >
                  store
                </span>
                <input
                  id="expense-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  placeholder="e.g. Swiggy, Amazon, Rent…"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
                />
              </div>
            </div>

            {/* Amount + Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="expense-amount"
                  className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
                >
                  Amount (₹) <span aria-hidden="true" className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-poppins font-bold text-on-surface-variant/60 dark:text-dark-on-surface-variant/40">
                    ₹
                  </span>
                  <input
                    id="expense-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => updateField('amount', e.target.value)}
                    required
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="expense-date"
                  className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
                >
                  Date <span aria-hidden="true" className="text-error">*</span>
                </label>
                <input
                  id="expense-date"
                  type="date"
                  value={form.isoDate}
                  onChange={(e) => updateField('isoDate', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="expense-category"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Category
              </label>
              <select
                id="expense-category"
                value={form.category}
                onChange={(e) =>
                  updateField('category', e.target.value as ExpenseCategory)
                }
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-all cursor-pointer"
              >
                {filterableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment method */}
            <div className="space-y-1.5">
              <label
                htmlFor="expense-payment"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Payment Method
              </label>
              <select
                id="expense-payment"
                value={form.paymentMethod}
                onChange={(e) =>
                  updateField('paymentMethod', e.target.value as PaymentMethod)
                }
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-all cursor-pointer"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <label
                htmlFor="expense-note"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Note (optional)
              </label>
              <textarea
                id="expense-note"
                value={form.note}
                onChange={(e) => updateField('note', e.target.value)}
                placeholder="Add a personal note…"
                rows={2}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all resize-none"
              />
            </div>

            {/* Recurring toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <div
                className={cn(
                  'w-11 h-6 rounded-full relative transition-colors duration-200',
                  form.isRecurring
                    ? 'bg-primary dark:bg-dark-primary'
                    : 'bg-outline-variant dark:bg-dark-outline-variant'
                )}
                onClick={() => updateField('isRecurring', !form.isRecurring)}
                role="switch"
                aria-checked={form.isRecurring}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter')
                    updateField('isRecurring', !form.isRecurring);
                }}
                aria-label="Mark as recurring"
              >
                <span
                  className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
                    form.isRecurring ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </div>
              <div>
                <p className="font-inter text-body-sm font-medium text-on-surface dark:text-dark-on-surface">
                  Recurring transaction
                </p>
                <p className="font-inter text-[11px] text-on-surface-variant dark:text-dark-on-surface-variant/60">
                  Mark subscriptions and monthly bills
                </p>
              </div>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-outline-variant dark:border-dark-outline-variant font-inter text-body-sm font-medium text-on-surface dark:text-dark-on-surface hover:bg-surface-container dark:hover:bg-dark-surface-container-high transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !form.name || !form.amount}
                className="flex-1 py-3 px-4 rounded-xl bg-primary dark:bg-dark-primary text-white font-inter text-body-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary outline-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      add
                    </span>
                    Add Transaction
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
