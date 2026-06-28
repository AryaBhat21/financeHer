'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { OnboardingData } from '@/types/onboarding';

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function StepOccupationIncome({ data, updateData, onNext }: StepProps) {
  const handleIncomeChange = (val: string) => {
    const parsed = val === '' ? '' : Number(val);
    updateData({ monthlyIncome: parsed });
  };

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 1 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Let&apos;s start with your professional world.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          Understanding your career path helps us tailor wealth strategies that match your industry&apos;s unique rhythm.
        </p>

        <div className="space-y-stack-sm pt-4">
          <div>
            <label
              htmlFor="occupation"
              className="block font-label-md text-on-surface-variant dark:text-dark-on-surface-variant mb-1.5"
            >
              What is your current occupation?
            </label>
            <input
              id="occupation"
              type="text"
              className="w-full bg-white dark:bg-dark-surface-container-low border border-outline-variant dark:border-dark-outline-variant rounded-xl px-4 py-3 focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 outline-none transition-all text-body-md text-on-surface dark:text-dark-on-surface"
              placeholder="e.g. Senior Software Engineer"
              value={data.occupation}
              onChange={(e) => updateData({ occupation: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="monthlyIncome"
              className="block font-label-md text-on-surface-variant dark:text-dark-on-surface-variant mb-1.5"
            >
              Estimated monthly net income
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-dark-on-surface-variant select-none pointer-events-none"
              >
                Rs.
              </span>
              <input
                id="monthlyIncome"
                type="number"
                min="0"
                className="w-full bg-white dark:bg-dark-surface-container-low border border-outline-variant dark:border-dark-outline-variant rounded-xl pl-12 pr-4 py-3 focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 outline-none transition-all text-body-md text-on-surface dark:text-dark-on-surface"
                placeholder="50,000"
                value={data.monthlyIncome}
                onChange={(e) => handleIncomeChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pt-stack-md">
          <Button
            onClick={onNext}
            disabled={!data.occupation || data.monthlyIncome === ''}
            rightIcon={
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            }
          >
            Continue
          </Button>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
            alt="A professional woman of color sitting confidently in a bright modern office with minimalist furniture, wearing a plum-colored blazer."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwlkTouBVv93SXu8ByJiUFBMlRXX7O8oMrJogAv2xK8l8f9h8ZX8aaSrwrBxC3Emexh33wB5rd93GOHM-5hcUhA9ZkJFeAquCmuo1qocWq25PtMPSCtCS_l_ZBK7PK2nRO2GaXWxYL1sABFnWdNOcTJ0HkZByXDZgiggxiyo-zXMNeyVdbZfy5WJciINEoq0yDtAiypLzZHztV4q0RGEfN7x1ez6I0vnb7YzAD82hZTG9r3IzgWcs4f54J3QjbyX7tNWowjwmK2-QA"
          />
        </div>
      </div>
    </div>
  );
}
