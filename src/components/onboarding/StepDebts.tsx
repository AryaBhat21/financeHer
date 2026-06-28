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

export function StepDebts({ data, updateData, onNext, onBack }: StepProps) {
  const handleDebtsChange = (val: string) => {
    const parsed = val === '' ? '' : Number(val);
    updateData({ debts: parsed });
  };

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="hidden md:block">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            alt="Architectural blueprints and a sleek silver pen on a white desk, symbolizing financial strategy and precision debt management."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFoJbLFP9nrDD78HvOTj6Trezkf4cmFBhxjkHPqAalmT7EMHRGJLk7RRgoF48r0h9X0mBnRuG3G3G6ahj_BRj-qyy1fCrU1K1mqFMkuK9PbkSECXvw_a9t7-WHsFoJ4YcabvKtUKsSBBgN8SVepQl7EioZXTmrWLB3FK9WiSmdN3rKt9uAKmlgwIgqoUjwX_bqje_n8nQmZ8nOcmvWDtDbhY6QVlcv8WQPFLJJJrUmTztfiJTomhUkLKh8D48D7fefeo2ITCn6xXF"
          />
        </div>
      </div>

      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 4 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Total Liabilities.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          No judgment here—this is about the full picture. Include credit cards, loans, or mortgages.
        </p>

        <div className="space-y-stack-sm pt-4">
          <label
            htmlFor="debts"
            className="block font-label-md text-on-surface-variant dark:text-dark-on-surface-variant mb-1.5"
          >
            Total debt amount
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-dark-on-surface-variant select-none pointer-events-none"
            >
              Rs.
            </span>
            <input
              id="debts"
              type="number"
              min="0"
              className="w-full bg-white dark:bg-dark-surface-container-low border border-outline-variant dark:border-dark-outline-variant rounded-xl pl-12 pr-4 py-3 focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 outline-none transition-all text-body-md text-on-surface dark:text-dark-on-surface"
              placeholder="45,000"
              value={data.debts}
              onChange={(e) => handleDebtsChange(e.target.value)}
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
            disabled={data.debts === ''}
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
