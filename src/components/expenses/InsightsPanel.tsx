'use client';

import { type ExpenseInsight, type InsightSeverity } from '@/types/expense';
import { cn } from '@/lib/utils';

interface InsightsPanelProps {
  insights: ExpenseInsight[];
}

const SEVERITY_STYLES: Record<InsightSeverity, { wrapper: string; icon: string; dot: string }> = {
  warning: {
    wrapper:
      'border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10',
    icon: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  success: {
    wrapper:
      'border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-900/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  info: {
    wrapper:
      'border-sky-200 bg-sky-50 dark:border-sky-900/40 dark:bg-sky-900/10',
    icon: 'text-sky-600 dark:text-sky-400',
    dot: 'bg-sky-500',
  },
  tip: {
    wrapper:
      'border-primary/20 bg-primary/5 dark:border-dark-primary/20 dark:bg-dark-primary/10',
    icon: 'text-primary dark:text-dark-primary',
    dot: 'bg-primary dark:bg-dark-primary',
  },
};

/**
 * InsightsPanel — AI-ready insights section.
 *
 * AI INTEGRATION POINT: The `isAIGenerated` flag on each insight will be used
 * to show a "Powered by AI" badge when the Gemini layer is connected.
 * Replace the `insights` prop source with GET /api/insights in the service layer.
 */
export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <section
      aria-labelledby="insights-heading"
      className="bg-white dark:bg-dark-surface-container rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 p-6 h-full flex flex-col transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3
            id="insights-heading"
            className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold"
          >
            Smart Insights
          </h3>
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60 mt-0.5">
            AI-ready analysis of your spending
          </p>
        </div>
        {/* AI badge — will be active when Gemini is connected */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 dark:bg-dark-primary/10 border border-primary/20 dark:border-dark-primary/20"
          title="AI integration point — rules-based until Gemini is connected"
        >
          <span
            className="material-symbols-outlined text-primary dark:text-dark-primary"
            style={{ fontSize: '14px' }}
            aria-hidden="true"
          >
            smart_toy
          </span>
          <span className="font-inter text-label-md text-primary dark:text-dark-primary">
            AI Ready
          </span>
        </div>
      </div>

      {/* Insights list */}
      <ul className="flex flex-col gap-3 flex-1" role="list">
        {insights.map((insight) => {
          const styles = SEVERITY_STYLES[insight.severity];
          return (
            <li
              key={insight.id}
              className={cn(
                'border rounded-xl p-4 flex gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm',
                styles.wrapper
              )}
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                <span
                  className={cn('material-symbols-outlined', styles.icon)}
                  style={{ fontSize: '22px' }}
                  aria-hidden="true"
                >
                  {insight.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-inter text-body-sm font-semibold text-on-surface dark:text-dark-on-surface leading-snug">
                    {insight.title}
                  </p>
                  {/* Severity dot */}
                  <span
                    className={cn('w-2 h-2 rounded-full mt-1 shrink-0', styles.dot)}
                    aria-hidden="true"
                  />
                </div>
                <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1 leading-relaxed">
                  {insight.body}
                </p>
                {/* Source refs (hidden until AI layer populates them) */}
                {insight.dataRefs.length > 0 && (
                  <p className="font-inter text-[10px] text-on-surface-variant/50 dark:text-dark-on-surface-variant/40 mt-1.5">
                    Based on {insight.dataRefs.length} transaction
                    {insight.dataRefs.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* CTA — links to AI assistant (future) */}
      <button className="mt-5 w-full py-2.5 flex items-center justify-center gap-2 font-inter text-label-md font-semibold text-primary dark:text-dark-primary hover:bg-primary/5 dark:hover:bg-dark-primary/10 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none">
        <span className="material-symbols-outlined text-sm" aria-hidden="true">
          smart_toy
        </span>
        Ask AI for personalised advice
        {/* AI INTEGRATION POINT: onClick → open AI Assistant modal or route to /assistant */}
      </button>
    </section>
  );
}
