import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// ─── Bar Chart (pure CSS) ─────────────────────────────────
// Extracted so the budgeting card stays readable.
const BAR_HEIGHTS = ['40%', '65%', '30%', '90%', '50%'];
const BAR_COLOURS = [
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/10',
  'bg-primary/80',
  'bg-tertiary/60',
];

function BarChart() {
  return (
    <div
      role="img"
      aria-label="Bar chart showing monthly spending categories"
      className="flex-1 w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-low"
    >
      <div className="m-4 bg-white rounded-xl shadow-md h-[calc(100%-2rem)] p-4">
        <div className="flex justify-between items-end h-full gap-2">
          {BAR_HEIGHTS.map((height, i) => (
            <div
              key={i}
              className={`${BAR_COLOURS[i]} w-full rounded-t-lg transition-all duration-500`}
              style={{ height }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────
export function FeaturesBentoSection() {
  return (
    <section
      id="product"
      aria-labelledby="features-heading"
      className="max-w-container-max mx-auto px-6 sm:px-8 md:px-margin-desktop py-16 md:py-24"
    >
      <header className="mb-14">
        <h2
          id="features-heading"
          className="font-poppins text-headline-lg text-primary mb-3"
        >
          Master Your Money
        </h2>
        <p className="font-inter text-body-md text-on-surface-variant">
          Precision tools built for your unique financial landscape.
        </p>
      </header>

      {/* Bento grid — Tailwind grid replaces custom .bento-grid CSS class */}
      <div className="grid grid-cols-12 gap-5 sm:gap-6">

        {/* Card 1: Intuitive Budgeting (8 cols) */}
        <ScrollReveal className="col-span-12 md:col-span-8">
          <article className="h-full bg-surface-container-lowest p-7 sm:p-8 rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary mb-6">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  account_balance_wallet
                </span>
              </div>
              <h3 className="font-poppins text-headline-md text-primary mb-3">
                Intuitive Budgeting
              </h3>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                Automatically categorise your spending and see where every cent
                goes with our AI-powered engine. No more manual spreadsheets —
                just pure clarity.
              </p>
              <ul className="mt-5 space-y-3 list-none">
                {['Real-time transaction tracking', 'Smart category suggestions'].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-inter text-body-sm text-on-surface-variant">
                    <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <BarChart />
          </article>
        </ScrollReveal>

        {/* Card 2: Goal Tracking (4 cols) */}
        <ScrollReveal className="col-span-12 md:col-span-4" delay={100}>
          <article className="h-full bg-surface-container-low p-7 sm:p-8 rounded-3xl border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary mb-6">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  ads_click
                </span>
              </div>
              <h3 className="font-poppins text-headline-md text-primary mb-3">
                Goal Tracking
              </h3>
              <p className="font-inter text-body-sm text-on-surface-variant leading-relaxed">
                Visualise your dreams. Whether it's a first home or a world
                tour, we map the path to your goals.
              </p>
            </div>
            {/* Progress indicator */}
            <div className="mt-8 pt-6 border-t border-outline-variant/20">
              <div className="flex justify-between font-inter text-label-md text-primary mb-2">
                <span>Japan Trip</span>
                <span>75%</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Japan Trip savings goal: 75% complete"
                className="w-full bg-outline-variant/30 h-2 rounded-full overflow-hidden"
              >
                <div className="bg-primary h-full w-[75%] rounded-full" />
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* Card 3: AI Insights (4 cols) */}
        <ScrollReveal className="col-span-12 md:col-span-4" delay={150}>
          <article className="h-full bg-primary text-white p-7 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <span
                aria-hidden="true"
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                smart_toy
              </span>
            </div>
            <div>
              <h3 className="font-poppins text-headline-md mb-3">
                AI Insights
              </h3>
              <p className="font-inter text-body-sm text-on-primary-container leading-relaxed">
                Get proactive alerts when you're overspending and tips on how to
                save more effectively based on your habits.
              </p>
            </div>
          </article>
        </ScrollReveal>

        {/* Card 4: Financial Literacy Hub (8 cols) */}
        <ScrollReveal className="col-span-12 md:col-span-8" delay={50}>
          <article className="h-full bg-surface-container-highest/40 p-7 sm:p-8 rounded-3xl border border-outline-variant/20 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="font-poppins text-headline-md text-primary mb-3">
                Financial Literacy Hub
              </h3>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                Knowledge is wealth. Access a library of bite-sized courses on
                investing, taxes, and wealth building curated for your journey.
              </p>
              <a
                href="#literacy"
                className="mt-6 inline-flex items-center gap-2 text-primary font-inter font-semibold group hover:gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Explore the financial literacy library"
              >
                Explore the Library
                <span aria-hidden="true" className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="relative w-full sm:w-auto sm:flex-1 h-44 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwqrZIuW_C0u5GHqh8tVow3UcpaYwNPgjeB58t6zfyOM9UQ_D5nJHvwynSojL-YBNQaIAAxYrFUWrmivbZlA5JywleJ_oj-i-ZjktXYcFBgl3WXlehsdGuyQSHAltvx0B9NOkHaxADMfOfaWHl7xr-uwEtn3Lotp893JK9X4MK_6IKG5XJmKtLX_J57RjCOxY9sRpCgF2RJ2SAX0zkxHfj_tuaWFTpEMj6nYFCo2ysvqNrntgwRAPK60dGIIIMzKncAD7G-X1Nijc"
                alt="Premium finance and personal growth books arranged on a minimalist desk"
                fill
                sizes="(max-width: 640px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </article>
        </ScrollReveal>

      </div>
    </section>
  );
}
