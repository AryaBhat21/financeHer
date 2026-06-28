'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OnboardingData } from '@/types/onboarding';
import {
  StepOccupationIncome,
  StepFixedExpenses,
  StepSavings,
  StepDebts,
  StepDependents,
  StepGoals,
  StepExperience,
  StepRisk,
  StepSuccess,
} from '@/components/onboarding';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    occupation: '',
    monthlyIncome: '',
    fixedExpenses: '',
    savings: '',
    debts: '',
    dependents: 2,
    goals: ['Retirement'],
    experience: 'some',
    riskTolerance: 3,
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 9));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAndExit = () => {
    // Navigate back to the homepage
    router.push('/');
  };

  const handleComplete = () => {
    console.log('Onboarding Completed:', formData);
    // Navigate to the dashboard
    router.push('/auth'); // Or direct to dashboard if authenticated
  };

  // Calculate progress percent
  const progressPercent = (step / 9) * 100;

  return (
    <div className="bg-surface-bright dark:bg-dark-surface min-h-screen text-on-surface dark:text-dark-on-surface flex flex-col font-inter transition-colors duration-300">
      {/* Top Bar with Brand and Progress (Mandatory Suppression of Navigation) */}
      <header className="sticky top-0 z-50 bg-surface-bright/80 backdrop-blur-xl dark:bg-dark-surface/80 px-margin-desktop py-4 flex flex-col gap-2 border-b border-outline-variant/20">
        <div className="flex justify-between items-center max-w-container-max mx-auto w-full">
          <span className="font-poppins font-bold text-headline-md text-primary dark:text-dark-primary select-none">
            FinanceHer
          </span>
          <button
            type="button"
            className="text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary transition-colors font-label-md uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            onClick={handleSaveAndExit}
          >
            Save &amp; Exit
          </button>
        </div>
        {/* Progress Indicator */}
        <div
          className="w-full max-w-container-max mx-auto h-1 bg-surface-container-high dark:bg-dark-surface-container-high rounded-full overflow-hidden"
          role="img"
          aria-label={`Onboarding progress: ${Math.round(progressPercent)}%`}
        >
          <div
            className="h-full bg-primary dark:bg-dark-primary transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Form content */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg">
        <div className="w-full max-w-5xl mx-auto">
          {step === 1 && (
            <StepOccupationIncome
              data={formData}
              updateData={updateData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <StepFixedExpenses
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <StepSavings
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <StepDebts
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 5 && (
            <StepDependents
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 6 && (
            <StepGoals
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 7 && (
            <StepExperience
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 8 && (
            <StepRisk
              data={formData}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 9 && (
            <StepSuccess
              data={formData}
              onBack={prevStep}
              onComplete={handleComplete}
            />
          )}
        </div>
      </main>

      {/* Footer (Mandatory Component) */}
      <footer className="w-full py-stack-lg border-t border-outline-variant/30 dark:border-dark-outline-variant/30 bg-surface-container-lowest dark:bg-dark-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-stack-md">
          <span className="font-poppins font-bold text-headline-md text-primary dark:text-dark-primary select-none">
            FinanceHer
          </span>
          <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant">
            &copy; {new Date().getFullYear()} FinanceHer. All rights reserved.
          </p>
          <div className="flex gap-stack-md">
            <Link
              className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary transition-colors"
              href="#"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
