'use client';

import { type ConversationSession } from '@/types/assistant';
import { cn } from '@/lib/utils';

interface ConversationHistoryProps {
  sessions: ConversationSession[];
  activeSessionId?: string;
  onSelect: (sessionId: string) => void;
  onClose?: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  budgeting: 'account_balance_wallet',
  goals: 'ads_click',
  investing: 'show_chart',
  expenses: 'payments',
  general: 'chat',
};

const CATEGORY_COLORS: Record<string, string> = {
  budgeting: 'text-primary dark:text-dark-primary bg-primary/10 dark:bg-dark-primary/20',
  goals: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
  investing: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20',
  expenses: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  general: 'text-on-surface-variant dark:text-dark-on-surface-variant bg-surface-container dark:bg-dark-surface-container-high',
};

/**
 * ConversationHistory — collapsible sidebar or drawer listing past sessions.
 *
 * AI INTEGRATION POINT: Replace sessions with GET /api/assistant/history.
 * Add real session loading on `onSelect`.
 */
export function ConversationHistory({
  sessions,
  activeSessionId,
  onSelect,
  onClose,
}: ConversationHistoryProps) {
  return (
    <aside
      aria-label="Conversation history"
      className="bg-white dark:bg-dark-surface-container rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold">
            History
          </h3>
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60 mt-0.5">
            {sessions.length} conversations
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container dark:hover:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant transition-colors"
            aria-label="Close history"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        )}
      </div>

      {/* Session list */}
      <ul className="flex flex-col gap-1.5" role="list">
        {sessions.map((session) => {
          const isActive = session.id === activeSessionId;
          const catColor = CATEGORY_COLORS[session.category] ?? CATEGORY_COLORS.general;
          const catIcon = CATEGORY_ICONS[session.category] ?? 'chat';

          return (
            <li key={session.id}>
              <button
                onClick={() => onSelect(session.id)}
                className={cn(
                  'w-full text-left rounded-xl p-3 flex gap-3 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none hover:bg-surface-container dark:hover:bg-dark-surface-container-high group',
                  isActive && 'bg-primary/5 dark:bg-dark-primary/10 border border-primary/20 dark:border-dark-primary/20'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Category icon */}
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                    catColor
                  )}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }} aria-hidden="true">
                    {catIcon}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-inter text-body-sm font-semibold text-on-surface dark:text-dark-on-surface truncate">
                      {session.title}
                    </p>
                    <span className="font-inter text-[10px] text-on-surface-variant/50 dark:text-dark-on-surface-variant/40 shrink-0">
                      {session.displayDate}
                    </span>
                  </div>
                  <p className="font-inter text-[11px] text-on-surface-variant dark:text-dark-on-surface-variant/60 mt-0.5 truncate">
                    {session.preview}
                  </p>
                  <p className="font-inter text-[9px] text-on-surface-variant/40 dark:text-dark-on-surface-variant/30 mt-1">
                    {session.messageCount} messages
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* New chat CTA */}
      <button className="w-full py-2.5 flex items-center justify-center gap-2 font-inter text-label-md font-semibold text-primary dark:text-dark-primary hover:bg-primary/5 dark:hover:bg-dark-primary/10 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none border border-primary/20 dark:border-dark-primary/20">
        <span className="material-symbols-outlined text-sm" aria-hidden="true">add</span>
        New Conversation
      </button>
    </aside>
  );
}
