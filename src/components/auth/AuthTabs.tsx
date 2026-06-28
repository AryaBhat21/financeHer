'use client';

import type { AuthView } from '@/types/auth';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────
interface Tab {
  id: Extract<AuthView, 'login' | 'signup'>;
  label: string;
}

const TABS: Tab[] = [
  { id: 'login', label: 'Log In' },
  { id: 'signup', label: 'Sign Up' },
];

interface AuthTabsProps {
  activeTab: AuthView;
  onTabChange: (tab: Extract<AuthView, 'login' | 'signup'>) => void;
}

// ─── Component ────────────────────────────────────────────
export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  // Hide tabs during forgot-password flow
  const isVisible = activeTab !== 'forgot';

  if (!isVisible) return null;

  return (
    <div
      role="tablist"
      aria-label="Authentication options"
      className="flex gap-8 mb-10 border-b border-outline-variant dark:border-dark-outline-variant"
    >
      {TABS.map(({ id, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${id}-panel`}
            id={`${id}-tab`}
            onClick={() => onTabChange(id)}
            className={cn(
              'pb-3 font-poppins text-headline-md transition-all duration-200',
              'border-b-2 -mb-px',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              isActive
                ? 'text-primary dark:text-dark-primary border-primary dark:border-dark-primary'
                : 'text-on-surface-variant dark:text-dark-on-surface-variant border-transparent hover:text-primary dark:hover:text-dark-primary hover:border-primary/50'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
