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

export function StepSavings({ data, updateData, onNext, onBack }: StepProps) {
  const handleSavingsChange = (val: string) => {
    const parsed = val === '' ? '' : Number(val);
    updateData({ savings: parsed });
  };

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 3 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Your Safety Net.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          How much do you currently have set aside in liquid savings or emergency funds?
        </p>

        <div className="space-y-stack-sm pt-4">
          <label
            htmlFor="savings"
            className="block font-label-md text-on-surface-variant dark:text-dark-on-surface-variant mb-1.5"
          >
            Current total savings
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-dark-on-surface-variant select-none pointer-events-none"
            >
              Rs.
            </span>
            <input
              id="savings"
              type="number"
              min="0"
              className="w-full bg-white dark:bg-dark-surface-container-low border border-outline-variant dark:border-dark-outline-variant rounded-xl pl-12 pr-4 py-3 focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 outline-none transition-all text-body-md text-on-surface dark:text-dark-on-surface"
              placeholder="15,000"
              value={data.savings}
              onChange={(e) => handleSavingsChange(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-stack-md flex gap-4">
          <Button variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
          <Button
            size="md"
            onClick={onNext}
            disabled={data.savings === ''}
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

      <div className="hidden md:block">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            alt="A tranquil, high-end bedroom interior representing security and peace of mind. Soft linen bedding in neutral tones with warm sunlight filtering through sheer curtains."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmoZLxbY9auEQ3fvyeLHS27_jgdUE6yzgJDMx3EEurJL_a2nJG0VZaGlBD0ZpKVUxHb6KTUuvvUo9boKhqAv7UI07jT3lUqZYO5pasOf1gpi-n7DvUIEoCmZlApNMid9ByVQg_HGH7foP5nW_bKYMRYmtv4q8oxnlvDJSM8PH2uZe74nx0yObFugdtz1waBpyPbwNVwcZ297H3cnC_SVKEWA8sosFKOOdaqiTtRTSXFfv2tJdFlnILTTFzUbXNdxjNV3uzY7pefThA"
          />
        </div>
      </div>
    </div>
  );
}
