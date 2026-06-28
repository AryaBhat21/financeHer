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

export function StepExperience({ data, updateData, onNext, onBack }: StepProps) {
  const options = [
    {
      value: 'new' as const,
      label: 'New to Investing',
      description: "I've mostly used savings accounts so far.",
    },
    {
      value: 'some' as const,
      label: 'Some Experience',
      description: 'I own some stocks or ETFs through an app.',
    },
    {
      value: 'confident' as const,
      label: 'Confident Investor',
      description: 'I actively manage a diverse portfolio.',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 7 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Your Investing History.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          Whether you&apos;re a seasoned trader or just starting to learn about stocks, we&apos;ll meet you where you are.
        </p>

        <fieldset className="space-y-4 pt-4">
          <legend className="sr-only">Select your investment experience</legend>
          {options.map((opt) => {
            const isSelected = data.experience === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition-all hover:border-primary dark:hover:border-dark-primary select-none focus-within:ring-2 focus-within:ring-primary/20 ${
                  isSelected
                    ? 'border-primary bg-primary-container/5 dark:border-dark-primary dark:bg-dark-primary-container/10'
                    : 'border-outline-variant dark:border-dark-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="experience"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => updateData({ experience: opt.value })}
                  className="mt-1 text-primary focus:ring-primary dark:text-dark-primary dark:focus:ring-dark-primary"
                />
                <div>
                  <p className="font-bold text-body-md text-on-surface dark:text-dark-on-surface">
                    {opt.label}
                  </p>
                  <p className="text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant">
                    {opt.description}
                  </p>
                </div>
              </label>
            );
          })}
        </fieldset>

        <div className="pt-stack-md flex gap-4">
          <Button variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
          <Button
            size="md"
            onClick={onNext}
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
            alt="Sleek table displaying candle charts representing stock market data, emphasizing clear financial insights."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd2Fma8L3EEps7SmFXONkUaDS9t39lHDQ5n-UWEvyzXjV1rIsgNvCEz4DMlvklh68ECgnhffbnzeTxku3SJXIPOtyzDX315KTPu8ZgcXKumD-ZBY_ZyFE3jqQ584z1FtjIpxFlTHUOyexhARJG7D5tvDkds0ohymduFjJYOXrE-uUpAwXbNRXqs_WTLlW_qr6c67vlZeATQlxkDB4lTSJbAMRkoUygjlyGn5I0h2Lc2Ofk4yFi1jS1gOB6fpP4x4fR-gWkNakJW99q"
          />
        </div>
      </div>
    </div>
  );
}
