'use client';

import { type AIMessage, type AssistantCard } from '@/types/assistant';
import { cn } from '@/lib/utils';

// ─── Rich Card Renderers ──────────────────────────────────────────────────────

function MetricCard({ card }: { card: AssistantCard }) {
  const value = card.data.value as number;
  const recommended = card.data.recommended as number;
  const isOver = value > recommended;
  const statusSeverity = card.data.statusSeverity as string;

  return (
    <div className="bg-background dark:bg-dark-background rounded-xl p-5 border border-outline-variant/30 dark:border-dark-outline-variant/30 flex flex-col md:flex-row gap-6 items-stretch">
      {/* Bar chart */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-2">
          <span className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-wide">
            {card.title}
          </span>
          <span
            className={cn(
              'font-poppins text-headline-md font-bold',
              isOver
                ? 'text-[#853638] dark:text-[#ffacab]'
                : 'text-emerald-600 dark:text-emerald-400'
            )}
          >
            {value}%
          </span>
        </div>
        <div
          className="w-full h-3 bg-surface-container dark:bg-dark-surface-container-high rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${card.title}: ${value}%`}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000',
              isOver ? 'bg-[#853638]' : 'bg-emerald-500'
            )}
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="font-inter text-[10px] text-on-surface-variant/60 dark:text-dark-on-surface-variant/40">0%</span>
          <span className="font-inter text-[10px] text-primary dark:text-dark-primary font-bold">
            Recommended: {recommended}%
          </span>
          <span className="font-inter text-[10px] text-on-surface-variant/60 dark:text-dark-on-surface-variant/40">100%</span>
        </div>
      </div>

      {/* Status + detail */}
      <div className="flex flex-col gap-2 md:w-44 shrink-0">
        <div
          className={cn(
            'p-3 rounded-lg',
            isOver
              ? 'bg-[#853638]/10 dark:bg-[#853638]/20'
              : 'bg-emerald-50 dark:bg-emerald-900/20'
          )}
        >
          <p
            className={cn(
              'font-inter text-[10px] font-bold uppercase tracking-wider mb-0.5',
              isOver
                ? 'text-[#853638] dark:text-[#ffacab]'
                : 'text-emerald-700 dark:text-emerald-400'
            )}
          >
            Status
          </p>
          <p className="font-inter text-body-sm font-semibold text-on-surface dark:text-dark-on-surface">
            {card.data.status as string}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-surface-container dark:bg-dark-surface-container-high rounded-lg p-2">
            <p className="font-inter text-[9px] uppercase tracking-wider text-on-surface-variant/60 dark:text-dark-on-surface-variant/50">Rent</p>
            <p className="font-poppins text-label-md font-bold text-on-surface dark:text-dark-on-surface">
              ₹{(card.data.currentRent as number).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="bg-surface-container dark:bg-dark-surface-container-high rounded-lg p-2">
            <p className="font-inter text-[9px] uppercase tracking-wider text-on-surface-variant/60 dark:text-dark-on-surface-variant/50">Income</p>
            <p className="font-poppins text-label-md font-bold text-on-surface dark:text-dark-on-surface">
              ₹{((card.data.monthlyIncome as number) / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonCard({ card }: { card: AssistantCard }) {
  const rows = [
    {
      label: 'Needs',
      actual: card.data.needsActual as number,
      target: card.data.needsTarget as number,
      icon: 'home',
      color: '#43257d',
    },
    {
      label: 'Wants',
      actual: card.data.wantsActual as number,
      target: card.data.wantsTarget as number,
      icon: 'shopping_bag',
      color: '#0ea5e9',
    },
    {
      label: 'Savings',
      actual: card.data.savingsActual as number,
      target: card.data.savingsTarget as number,
      icon: 'savings',
      color: '#10b981',
    },
  ];

  return (
    <div className="bg-background dark:bg-dark-background rounded-xl p-5 border border-outline-variant/30 dark:border-dark-outline-variant/30">
      <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70 uppercase tracking-wide mb-4">
        {card.title}
      </p>
      <div className="flex flex-col gap-3">
        {rows.map((row) => {
          const isOver = row.label === 'Needs' && row.actual > row.target;
          const isUnder = row.label === 'Savings' && row.actual < row.target;
          return (
            <div key={row.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ color: row.color, fontSize: '16px' }}
                    aria-hidden="true"
                  >
                    {row.icon}
                  </span>
                  <span className="font-inter text-body-sm text-on-surface dark:text-dark-on-surface">
                    {row.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'font-poppins text-body-sm font-bold',
                      isOver ? 'text-[#853638]' : isUnder ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400'
                    )}
                  >
                    {row.actual}%
                  </span>
                  <span className="font-inter text-[11px] text-on-surface-variant/50 dark:text-dark-on-surface-variant/40">
                    / {row.target}%
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${row.actual}%`, backgroundColor: row.color }}
                />
                {row.target > row.actual && (
                  <div
                    className="h-2 rounded-full opacity-20"
                    style={{ width: `${row.target - row.actual}%`, backgroundColor: row.color }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AssistantDataCard({ card }: { card: AssistantCard }) {
  if (card.type === 'metric') return <MetricCard card={card} />;
  if (card.type === 'comparison') return <ComparisonCard card={card} />;
  return null;
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

interface ChatMessageProps {
  message: AIMessage;
  onActionClick: (promptText: string) => void;
}

export function ChatMessage({ message, onActionClick }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  // Parse basic bold markdown (**text**)
  const parseBold = (text: string) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-on-surface dark:text-dark-on-surface">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );

  const renderContent = (content: string) =>
    content.split('\n\n').map((para, i) => (
      <p key={i} className={i > 0 ? 'mt-3' : ''}>
        {parseBold(para)}
      </p>
    ));

  if (isAssistant) {
    return (
      <div className="flex gap-4 max-w-4xl animate-[fadeInUp_0.35s_ease-out_forwards]">
        {/* AI Avatar */}
        <div
          className="w-10 h-10 rounded-full bg-primary dark:bg-dark-primary shrink-0 flex items-center justify-center text-white shadow-sm"
          aria-hidden="true"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}
          >
            smart_toy
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {/* Text bubble */}
          <div className="bg-white dark:bg-dark-surface-container border border-surface-container/30 dark:border-dark-outline-variant/30 rounded-2xl rounded-tl-none p-5 shadow-[0_2px_12px_rgba(67,37,125,0.04)] dark:shadow-none">
            <div className="font-inter text-body-md leading-relaxed text-on-surface dark:text-dark-on-surface">
              {renderContent(message.content)}
            </div>

            {/* Rich card */}
            {message.card && (
              <div className="mt-4">
                <AssistantDataCard card={message.card} />
              </div>
            )}
          </div>

          {/* Action chips */}
          {message.actions && message.actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onActionClick(action.promptText)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-primary/40 dark:border-dark-primary/40 text-primary dark:text-dark-primary rounded-full font-inter text-body-sm hover:bg-primary/5 dark:hover:bg-dark-primary/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }} aria-hidden="true">
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <span className="font-inter text-[10px] text-on-surface-variant/50 dark:text-dark-on-surface-variant/40 px-1">
            {message.displayTime} · AI Support
          </span>
        </div>
      </div>
    );
  }

  // ── User message ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-row-reverse gap-4 max-w-3xl ml-auto animate-[fadeInUp_0.35s_ease-out_forwards]">
      {/* User avatar */}
      <div
        className="w-10 h-10 rounded-full bg-secondary-container dark:bg-dark-secondary-container shrink-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="material-symbols-outlined text-on-surface-variant dark:text-dark-on-surface-variant"
          style={{ fontSize: '20px' }}
        >
          person
        </span>
      </div>

      <div className="flex flex-col gap-1.5 items-end">
        <div className="bg-primary dark:bg-dark-primary text-white rounded-2xl rounded-tr-none p-5 shadow-md max-w-xl">
          <p className="font-inter text-body-md leading-relaxed">{message.content}</p>
        </div>
        <span className="font-inter text-[10px] text-on-surface-variant/50 dark:text-dark-on-surface-variant/40 px-1">
          {message.displayTime}
        </span>
      </div>
    </div>
  );
}
