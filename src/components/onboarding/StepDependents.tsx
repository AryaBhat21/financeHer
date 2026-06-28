'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { OnboardingData } from '@/types/onboarding';
import { useId } from 'react';

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDependents({ data, updateData, onNext, onBack }: StepProps) {
  const options = [0, 1, 2, 3];
  const groupLabelId = useId();

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 5 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Who are you building for?
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          Whether it&apos;s children, parents, or partners, knowing who relies on you helps us secure their future too.
        </p>

        <div className="space-y-stack-sm pt-4" role="group" aria-labelledby={groupLabelId}>
          <span id={groupLabelId} className="block font-label-md text-on-surface-variant dark:text-dark-on-surface-variant mb-1.5">
            Number of dependents
          </span>
          <div className="flex gap-4">
            {options.map((opt) => {
              const isSelected = data.dependents === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={isSelected}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-semibold text-body-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-primary-container text-white border-primary-container dark:bg-dark-primary-container dark:border-dark-primary-container'
                      : 'border-outline-variant dark:border-dark-outline-variant hover:border-primary dark:hover:border-dark-primary text-on-surface dark:text-dark-on-surface hover:bg-surface-container-low dark:hover:bg-dark-surface-container-low'
                  }`}
                  onClick={() => updateData({ dependents: opt })}
                >
                  {opt === 3 ? '3+' : opt}
                </button>
              );
            })}
          </div>
        </div>

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
            alt="A warm, multi-generational family dining together in a brightly lit room, showcasing the emotional driver behind wealth building."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTzr-1GBRQXOWAJGOcg7b4DRkSB2-7alnQmPa477e8KEms3paeIMjIeuCv78axDEluGEYX4SxnXaDt_FAjmjA2dYJAVuEuN4g8udThI2JaG6JtpukSQcPsdiCuPHtDWn3XZ-8AXWHvyjh96xqrb7BcNeEQz5xJ4-DYZ8B3F8K9ieeMBY-nkySZFCrEetaCb97q1BUwlWnqVKZ2j19rrIyX-4aUe4HZbG_bFdr4ojUEohctFJb3UA0tZ_heAcQbxlwPb2SFPkRWaiiy"
          />
        </div>
      </div>
    </div>
  );
}
