'use client';

import { type SuggestedPrompt } from '@/types/assistant';
import { cn } from '@/lib/utils';

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelect: (promptText: string) => void;
  /** If provided, only show prompts of this category */
  filterCategory?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  budgeting: 'text-primary dark:text-dark-primary',
  goals: 'text-emerald-600 dark:text-emerald-400',
  investing: 'text-sky-600 dark:text-sky-400',
  expenses: 'text-amber-600 dark:text-amber-400',
  general: 'text-on-surface-variant dark:text-dark-on-surface-variant',
};

/**
 * SuggestedPrompts — horizontally scrollable chip strip above the input bar.
 *
 * AI INTEGRATION POINT: Prompts can be personalised per-user by fetching
 * GET /api/assistant/prompts?userId=... when backend is ready.
 */
export function SuggestedPrompts({ prompts, onSelect, filterCategory }: SuggestedPromptsProps) {
  const visible = filterCategory
    ? prompts.filter((p) => p.category === filterCategory)
    : prompts;

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
      role="group"
      aria-label="Suggested questions"
    >
      {visible.map((prompt) => (
        <button
          key={prompt.id}
          onClick={() => onSelect(prompt.promptText)}
          className={cn(
            'shrink-0 flex items-center gap-1.5 px-4 py-2 bg-surface-container dark:bg-dark-surface-container-high rounded-full font-inter text-body-sm hover:bg-primary-container hover:text-on-primary-container dark:hover:bg-dark-primary/20 dark:hover:text-dark-primary transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none active:scale-95'
          )}
        >
          <span
            className={cn('material-symbols-outlined shrink-0', CATEGORY_STYLES[prompt.category])}
            style={{ fontSize: '16px' }}
            aria-hidden="true"
          >
            {prompt.icon}
          </span>
          <span className="text-on-surface-variant dark:text-dark-on-surface-variant whitespace-nowrap">
            {prompt.label}
          </span>
        </button>
      ))}
    </div>
  );
}
