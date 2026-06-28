'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { OnboardingData } from '@/types/onboarding';

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepFixedExpenses({ data, updateData, onNext, onBack }: StepProps) {
  const handleExpenseChange = (val: string) => {
    const parsed = val === '' ? '' : Number(val);
    updateData({ fixedExpenses: parsed });
  };

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="hidden md:block">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-surface-container-low dark:bg-dark-surface-container-low flex items-center justify-center p-12 relative">
          <div className="w-full h-full relative rounded-2xl overflow-hidden">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              alt="A clean, minimalist flat-lay of everyday financial essentials: a smartphone displaying a budgeting app, keys on a leather keychain, and a cup of coffee on a marble surface."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQb9f3WJ015CDV1-kvjsvBYgDfCj0BC6DJJG9SNXq-E5gDOlw11jU2mCnNwX6iJh6G3WawqCImHVrzmHX9t1wy5vyb_xpYpSNzAmBW1Fk7pOY5Knfj3NGhn9j5UfNJx1-xuM5B3acYLLxYRRNQy4JWIvzDikEumJrC__Ra2q59pxR49sq9FBZ3BAbRFm0jwC261PIWTTA7XcUwcdOpVJ47VsSI5HKSFNwif3cw9IREPhYV4imNUCvlC8i5v5kw1rkpFOiDNK4PxUQw"
            />
          </div>
        </div>
      </div>

      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 2 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Monthly Commitments.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          Rent, mortgage, subscriptions, or utilities. What are your non-negotiable monthly outflows?
        </p>

        <div className="space-y-stack-sm pt-4">
          <label
            htmlFor="fixedExpenses"
            className="block font-label-md text-on-surface-variant dark:text-dark-on-surface-variant mb-1.5"
          >
            Total fixed monthly expenses
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-dark-on-surface-variant select-none pointer-events-none"
            >
              Rs.
            </span>
            <input
              id="fixedExpenses"
              type="number"
              min="0"
              className="w-full bg-white dark:bg-dark-surface-container-low border border-outline-variant dark:border-dark-outline-variant rounded-xl pl-12 pr-4 py-3 focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 outline-none transition-all text-body-md text-on-surface dark:text-dark-on-surface"
              placeholder="2,200"
              value={data.fixedExpenses}
              onChange={(e) => handleExpenseChange(e.target.value)}
            />
          </div>
          <p className="text-label-md text-outline dark:text-dark-on-surface-variant/60 italic">
            Don&apos;t worry about being exact, an estimate works perfectly for now.
          </p>
        </div>

        <div className="pt-stack-md flex gap-4">
          <Button variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
          <Button
            size="md"
            onClick={onNext}
            disabled={data.fixedExpenses === ''}
            rightIcon={
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
