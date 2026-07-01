'use client';

import { useState } from 'react';
import { type AddGoalFormData, type GoalCategory, type GoalPriority } from '@/types/goal';
import { GOAL_CATEGORIES } from '@/constants/goal.mock';
import { cn } from '@/lib/utils';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM: AddGoalFormData = {
  name: '',
  description: '',
  category: 'Emergency Fund',
  targetAmount: '',
  currentAmount: '0',
  targetDate: '',
  monthlyContribution: '',
  priority: 'Medium',
  note: '',
};

const PRIORITY_STYLES: Record<GoalPriority, string> = {
  High: 'bg-primary/10 text-primary border-primary/30 dark:bg-dark-primary/20 dark:text-dark-primary dark:border-dark-primary/30',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/40',
  Low: 'bg-surface-container text-on-surface-variant border-outline-variant dark:bg-dark-surface-container-high dark:text-dark-on-surface-variant dark:border-dark-outline-variant',
};

/**
 * AddGoalModal — modal form for creating a new savings goal.
 *
 * AI INTEGRATION POINT: `handleSubmit` currently logs the form data.
 * Replace with: await goalService.createGoal(formData)
 * POST /api/goals — the AI layer subscribes to new goal events to
 * update its planning context automatically.
 */
export function AddGoalModal({ isOpen, onClose }: AddGoalModalProps) {
  const [form, setForm] = useState<AddGoalFormData>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const updateField = <K extends keyof AddGoalFormData>(
    key: K,
    value: AddGoalFormData[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // AI INTEGRATION POINT — replace with: await goalService.createGoal(form)
    console.info('[AddGoalModal] Form submitted (mock):', form);
    setTimeout(() => {
      setIsLoading(false);
      setForm(INITIAL_FORM);
      onClose();
    }, 800);
  };

  const filterableCategories = GOAL_CATEGORIES.filter(
    (c) => c !== 'All'
  ) as GoalCategory[];

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
        aria-labelledby="add-goal-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto bg-white dark:bg-dark-surface-container rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20 dark:border-dark-outline-variant/20">
            <div>
              <h2
                id="add-goal-modal-title"
                className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold"
              >
                Create New Goal
              </h2>
              <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60 mt-0.5">
                Define your target and start tracking progress
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            {/* Goal name */}
            <div className="space-y-1.5">
              <label
                htmlFor="goal-name"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Goal Name <span className="text-error" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-dark-on-surface-variant/50"
                  style={{ fontSize: '18px' }}
                  aria-hidden="true"
                >
                  flag
                </span>
                <input
                  id="goal-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  placeholder="e.g. Emergency Fund, Dream Home…"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label
                htmlFor="goal-description"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Short Description
              </label>
              <input
                id="goal-description"
                type="text"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="e.g. 6 months expenses safety net"
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="goal-category"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Category
              </label>
              <select
                id="goal-category"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value as GoalCategory)}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-all cursor-pointer"
              >
                {filterableCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Amounts row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="goal-target"
                  className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
                >
                  Target (₹) <span className="text-error" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-poppins font-bold text-on-surface-variant/60 dark:text-dark-on-surface-variant/40">₹</span>
                  <input
                    id="goal-target"
                    type="number"
                    min="1"
                    value={form.targetAmount}
                    onChange={(e) => updateField('targetAmount', e.target.value)}
                    required
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="goal-current"
                  className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
                >
                  Current (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-poppins font-bold text-on-surface-variant/60 dark:text-dark-on-surface-variant/40">₹</span>
                  <input
                    id="goal-current"
                    type="number"
                    min="0"
                    value={form.currentAmount}
                    onChange={(e) => updateField('currentAmount', e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Monthly contribution + target date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="goal-monthly"
                  className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
                >
                  Monthly (₹) <span className="text-error" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-poppins font-bold text-on-surface-variant/60 dark:text-dark-on-surface-variant/40">₹</span>
                  <input
                    id="goal-monthly"
                    type="number"
                    min="1"
                    value={form.monthlyContribution}
                    onChange={(e) => updateField('monthlyContribution', e.target.value)}
                    required
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="goal-date"
                  className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
                >
                  Target Date <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  id="goal-date"
                  type="date"
                  value={form.targetDate}
                  onChange={(e) => updateField('targetDate', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-all"
                />
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide">
                Priority
              </p>
              <div className="flex gap-2" role="radiogroup" aria-label="Goal priority">
                {(['High', 'Medium', 'Low'] as GoalPriority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => updateField('priority', p)}
                    role="radio"
                    aria-checked={form.priority === p}
                    className={cn(
                      'flex-1 py-2.5 rounded-xl font-inter text-label-md font-bold border transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none',
                      form.priority === p
                        ? PRIORITY_STYLES[p]
                        : 'border-outline-variant/30 text-on-surface-variant hover:bg-surface-container dark:border-dark-outline-variant/30 dark:text-dark-on-surface-variant dark:hover:bg-dark-surface-container-high'
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <label
                htmlFor="goal-note"
                className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/80 font-semibold uppercase tracking-wide"
              >
                Note (optional)
              </label>
              <textarea
                id="goal-note"
                value={form.note}
                onChange={(e) => updateField('note', e.target.value)}
                placeholder="Why this goal matters to you…"
                rows={2}
                className="w-full px-4 py-3 bg-surface-container-low dark:bg-dark-surface-container-high border border-outline-variant dark:border-dark-outline-variant rounded-xl font-inter text-body-sm text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary placeholder:text-on-surface-variant/40 transition-all resize-none"
              />
            </div>

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
                disabled={isLoading || !form.name || !form.targetAmount || !form.monthlyContribution || !form.targetDate}
                className="flex-1 py-3 px-4 rounded-xl bg-primary dark:bg-dark-primary text-white font-inter text-body-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary outline-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">add</span>
                    Create Goal
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
