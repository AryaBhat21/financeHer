'use client';

import { type AIRecommendation, type RecommendationSeverity } from '@/types/assistant';
import { cn } from '@/lib/utils';

interface AIRecommendationsPanelProps {
  recommendations: AIRecommendation[];
}

const SEVERITY_STYLES: Record<
  RecommendationSeverity,
  { wrapper: string; icon: string; dot: string }
> = {
  warning: {
    wrapper: 'border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10',
    icon: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  success: {
    wrapper: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-900/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  info: {
    wrapper: 'border-sky-200 bg-sky-50 dark:border-sky-900/40 dark:bg-sky-900/10',
    icon: 'text-sky-600 dark:text-sky-400',
    dot: 'bg-sky-500',
  },
  tip: {
    wrapper: 'border-primary/20 bg-primary/5 dark:border-dark-primary/20 dark:bg-dark-primary/10',
    icon: 'text-primary dark:text-dark-primary',
    dot: 'bg-primary dark:bg-dark-primary',
  },
};

const MODULE_LABELS: Record<string, string> = {
  expenses: 'Expenses',
  goals: 'Goals',
  budget: 'Budget',
  general: 'General',
};

/**
 * AIRecommendationsPanel — proactive insight cards in the right sidebar.
 *
 * AI INTEGRATION POINT: Replace `recommendations` prop source with
 * GET /api/assistant/insights when Gemini is connected.
 * Flip `isAIGenerated` to true on live AI-produced cards.
 */
export function AIRecommendationsPanel({ recommendations }: AIRecommendationsPanelProps) {
  return (
    <section
      aria-labelledby="ai-recs-heading"
      className="bg-white dark:bg-dark-surface-container rounded-2xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            id="ai-recs-heading"
            className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold"
          >
            Proactive Insights
          </h3>
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/60 mt-0.5">
            Across your portfolio
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 dark:bg-dark-primary/10 border border-primary/20 dark:border-dark-primary/20"
          title="AI integration point"
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

      {/* Recommendations */}
      <ul className="flex flex-col gap-3" role="list">
        {recommendations.map((rec) => {
          const styles = SEVERITY_STYLES[rec.severity];
          return (
            <li
              key={rec.id}
              className={cn(
                'border rounded-xl p-4 flex gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-default',
                styles.wrapper
              )}
            >
              <div className="shrink-0 mt-0.5">
                <span
                  className={cn('material-symbols-outlined', styles.icon)}
                  style={{ fontSize: '20px' }}
                  aria-hidden="true"
                >
                  {rec.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-inter text-body-sm font-semibold text-on-surface dark:text-dark-on-surface leading-snug">
                    {rec.title}
                  </p>
                  <span
                    className={cn('w-2 h-2 rounded-full mt-1 shrink-0', styles.dot)}
                    aria-hidden="true"
                  />
                </div>
                <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 mt-1 leading-relaxed">
                  {rec.body}
                </p>
                <span className="inline-block mt-2 font-inter text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/40 dark:text-dark-on-surface-variant/30">
                  {MODULE_LABELS[rec.sourceModule]}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
