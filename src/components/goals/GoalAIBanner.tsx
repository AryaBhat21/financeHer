'use client';

import { type GoalsOverview } from '@/types/goal';
import { cn } from '@/lib/utils';

interface GoalAIBannerProps {
  overview: GoalsOverview;
  onOptimise: () => void;
}

/**
 * GoalAIBanner — full-width CTA section with AI insight and optimise button.
 *
 * Matches the design of the "Accelerate Your Wealth Journey" section in the
 * provided reference HTML. Replaces the generic CtaBanner for this page.
 *
 * AI INTEGRATION POINT: The body copy and projected values will come from
 * GET /api/insights?module=goals when Gemini is connected.
 * `onOptimise` → open AI Assistant modal or route to /assistant.
 */
export function GoalAIBanner({ overview, onOptimise }: GoalAIBannerProps) {
  return (
    <section
      className="bg-primary-container dark:bg-dark-primary-container rounded-2xl relative overflow-hidden"
      aria-labelledby="ai-banner-heading"
    >
      {/* Decorative blob */}
      <div
        className="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed/20 dark:bg-dark-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary-container/30 dark:bg-dark-secondary/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Text column */}
        <div className="max-w-2xl">
          {/* AI badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 border border-white/30">
              <span
                className="material-symbols-outlined text-on-primary-container dark:text-dark-on-surface"
                style={{ fontSize: '14px' }}
                aria-hidden="true"
              >
                smart_toy
              </span>
              <span className="font-inter text-label-md font-bold text-on-primary-container dark:text-dark-on-surface opacity-90">
                AI Insight
              </span>
            </div>
          </div>

          <h3
            id="ai-banner-heading"
            className="font-poppins text-headline-lg text-on-primary-container dark:text-dark-on-surface font-bold mb-3"
          >
            Accelerate Your Wealth Journey
          </h3>
          <p className="font-inter text-body-md text-on-primary-container dark:text-dark-on-surface opacity-80 mb-6 leading-relaxed">
            Based on your spending patterns, our AI suggests you could reach your{' '}
            <strong>Home Purchase</strong> goal{' '}
            <strong>4 months earlier</strong> by redirecting ₹5,000 from dining
            and lifestyle spend — saving ₹86,668 in total contributions.
          </p>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { label: 'Current monthly surplus', value: '₹11,333' },
              { label: 'Recommended top-up', value: '₹5,000/mo' },
              { label: 'Time saved', value: '4 months' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/15 border border-white/20 rounded-xl px-4 py-3"
              >
                <p className="font-inter text-[10px] font-bold uppercase tracking-wider text-on-primary-container/60 dark:text-dark-on-surface/60 mb-0.5">
                  {stat.label}
                </p>
                <p className="font-poppins text-body-md font-bold text-on-primary-container dark:text-dark-on-surface">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onOptimise}
            className="bg-white text-primary dark:bg-dark-surface-container dark:text-dark-primary px-8 py-3 rounded-xl font-inter text-body-sm font-bold hover:scale-105 hover:shadow-lg active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none flex items-center gap-2"
            aria-label="Optimise my goals with AI"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              auto_awesome
            </span>
            Optimise My Goals
          </button>
        </div>

        {/* Visual column — allocation donut */}
        <div className="w-full md:w-56 shrink-0">
          <div
            className="bg-white/15 border border-white/20 rounded-2xl p-5"
            aria-label="Savings allocation breakdown"
          >
            <p className="font-inter text-label-md font-bold uppercase tracking-wider text-on-primary-container/70 dark:text-dark-on-surface/70 mb-4">
              Allocation Split
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Emergency Fund', pct: 11, color: '#43257d' },
                { label: 'Home Purchase', pct: 28, color: '#E57373' },
                { label: 'Retirement', pct: 33, color: '#65558c' },
                { label: 'Education', pct: 20, color: '#f59e0b' },
                { label: 'Other goals', pct: 8, color: '#0ea5e9' },
              ].map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    />
                    <span className="font-inter text-[11px] text-on-primary-container/80 dark:text-dark-on-surface/80 truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-inter text-[11px] font-bold text-on-primary-container dark:text-dark-on-surface shrink-0">
                    {item.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
