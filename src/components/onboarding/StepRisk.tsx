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

export function StepRisk({ data, updateData, onNext, onBack }: StepProps) {
  const getRiskDescription = (val: number) => {
    if (val <= 2) {
      return 'I prefer slow, steady growth and hate the idea of losing capital.';
    } else if (val === 3) {
      return 'I am comfortable with some fluctuations for a balanced return.';
    } else {
      return 'I target high returns and can accept significant short-term losses.';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="hidden md:block">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            alt="A serene woman practicing yoga in a bright minimalist studio, symbolizing balance and mindfulness in wealth strategies."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu82WY0UKwaD9DHJFgSRGppqqFJK1V08CPIq5V0mZX2hsvPqzdUEQ5AMbGZbBKQb38K1-tfaWkJ4CfeWDEBk7MxV2NKvpvIOaSCSH5-uJyzugO_8IoWZhtGo4iMl8IUcFajIOKZ95Yj0GevnpRadSugVDZlTKq6DZQufsFGBMYRot1O7Xg76gXcdQd7C4jhlz3iB_M6Nwgm6Vxr36vsQMyrLYNDqeIpA4FET0bPR0bQhg5hFy6yfvYYj_46DNcwd-VPc_4tQX_T5Yu"
          />
        </div>
      </div>

      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 8 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          Risk Appetite.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          How would you feel if your portfolio dropped 10% in a month? This helps us choose the right assets.
        </p>

        <div className="pt-8 px-4">
          <label htmlFor="riskTolerance" className="sr-only">
            Risk Tolerance level from 1 (Conservative) to 5 (Aggressive)
          </label>
          <input
            id="riskTolerance"
            type="range"
            min="1"
            max="5"
            step="1"
            className="w-full h-2 bg-surface-container-high dark:bg-dark-surface-container-high rounded-full appearance-none cursor-pointer accent-primary dark:accent-dark-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            value={data.riskTolerance}
            onChange={(e) => updateData({ riskTolerance: Number(e.target.value) })}
          />
          <div className="flex justify-between mt-4 font-label-md text-on-surface-variant dark:text-dark-on-surface-variant uppercase tracking-tighter select-none">
            <span className={data.riskTolerance <= 2 ? 'text-primary dark:text-dark-primary font-bold' : ''}>
              Conservative
            </span>
            <span className={data.riskTolerance === 3 ? 'text-primary dark:text-dark-primary font-bold' : ''}>
              Moderate
            </span>
            <span className={data.riskTolerance >= 4 ? 'text-primary dark:text-dark-primary font-bold' : ''}>
              Aggressive
            </span>
          </div>
        </div>

        <p className="bg-surface-container-low dark:bg-dark-surface-container-low p-4 rounded-xl text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant mt-4 transition-all duration-200 italic">
          &ldquo;{getRiskDescription(data.riskTolerance)}&rdquo;
        </p>

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
    </div>
  );
}
