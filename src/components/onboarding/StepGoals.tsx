'use client';

import { Button } from '@/components/ui/Button';
import { OnboardingData } from '@/types/onboarding';

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepGoals({ data, updateData, onNext, onBack }: StepProps) {
  const goalOptions = ['Home', 'Retirement', 'Travel', 'Security'];

  const toggleGoal = (goal: string) => {
    const updated = data.goals.includes(goal)
      ? data.goals.filter((g) => g !== goal)
      : [...data.goals, goal];
    updateData({ goals: updated });
  };

  return (
    <div className="grid md:grid-cols-2 gap-gutter items-center animate-fade-in">
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-primary-container dark:bg-dark-primary-container rounded-2xl flex flex-col items-center justify-center text-white p-4 text-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-4xl" aria-hidden="true">home</span>
            <span className="text-label-md font-semibold font-poppins">Home Ownership</span>
          </div>
          <div className="aspect-square bg-secondary-container dark:bg-dark-secondary-container rounded-2xl flex flex-col items-center justify-center text-primary dark:text-dark-primary p-4 text-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-4xl" aria-hidden="true">beach_access</span>
            <span className="text-label-md font-semibold font-poppins">Early Retirement</span>
          </div>
          <div className="aspect-square bg-surface-container-high dark:bg-dark-surface-container-high rounded-2xl flex flex-col items-center justify-center text-primary dark:text-dark-primary p-4 text-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-4xl" aria-hidden="true">school</span>
            <span className="text-label-md font-semibold font-poppins">Education Fund</span>
          </div>
          <div className="aspect-square bg-tertiary-container rounded-2xl flex flex-col items-center justify-center text-white p-4 text-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-4xl" aria-hidden="true">rocket_launch</span>
            <span className="text-label-md font-semibold font-poppins">Business Launch</span>
          </div>
        </div>
      </div>

      <div className="space-y-stack-md">
        <span className="text-primary dark:text-dark-primary font-label-md tracking-wider uppercase">
          Step 6 of 9
        </span>
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary leading-tight">
          What are we aiming for?
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          Select your top priorities. This helps us focus your dashboard on what truly matters to you.
        </p>

        <fieldset className="space-y-stack-sm pt-4">
          <legend className="sr-only">Choose your financial goals</legend>
          <div className="grid grid-cols-2 gap-3">
            {goalOptions.map((goal) => {
              const isChecked = data.goals.includes(goal);
              return (
                <label key={goal} className="relative cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={() => toggleGoal(goal)}
                  />
                  <div className="p-4 border border-outline-variant dark:border-dark-outline-variant rounded-xl text-center font-medium text-body-md text-on-surface dark:text-dark-on-surface transition-all hover:bg-surface-container-low dark:hover:bg-dark-surface-container-low peer-checked:bg-primary-container peer-checked:text-white dark:peer-checked:bg-dark-primary-container peer-checked:border-primary-container dark:peer-checked:border-dark-primary-container peer-focus-visible:ring-2 peer-focus-visible:ring-primary dark:peer-focus-visible:ring-dark-primary peer-focus-visible:ring-offset-2">
                    {goal}
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="pt-stack-md flex gap-4">
          <Button variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
          <Button
            size="md"
            onClick={onNext}
            disabled={data.goals.length === 0}
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
