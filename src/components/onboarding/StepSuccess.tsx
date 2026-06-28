'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { OnboardingData } from '@/types/onboarding';

interface StepProps {
  data: OnboardingData;
  onBack: () => void;
  onComplete: () => void;
}

export function StepSuccess({ data, onBack, onComplete }: StepProps) {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScale(1.1);
      setRotate(15);
      setTimeout(() => {
        setScale(1);
        setRotate(0);
      }, 1000);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Compute a smart insight based on actual onboarding data
  const getTailoredInsight = () => {
    const income = Number(data.monthlyIncome) || 0;
    const expenses = Number(data.fixedExpenses) || 0;
    const savings = Number(data.savings) || 0;
    const debts = Number(data.debts) || 0;

    if (debts > 0 && debts > savings) {
      return {
        title: 'Debt Reduction Strategy',
        message: 'Prioritize paying down high-interest liabilities. We can save you up to Rs. 4,500 in interest fees annually.',
      };
    }

    if (income > 0) {
      const savingsRate = ((income - expenses) / income) * 100;
      if (savingsRate < 20) {
        return {
          title: 'Savings Optimization Plan',
          message: 'Your current fixed expenses represent a large portion of your income. We found 3 immediate ways to optimize subscriptions and lower utility rates.',
        };
      }
    }

    if (savings < income * 3) {
      return {
        title: 'Safety Net Builder',
        message: 'Building a 3-month emergency fund is your best next step. We can help automate a recurring savings plan of Rs. 5,000 monthly.',
      };
    }

    return {
      title: 'Wealth Acceleration Plan',
      message: 'Your safety net is strong! Let&apos;s put your extra cash to work. Based on your moderate/aggressive appetite, we recommend a diversified ETF plan.',
    };
  };

  const insight = getTailoredInsight();

  return (
    <div className="text-center max-w-2xl mx-auto space-y-stack-lg animate-fade-in">
      <div
        className="w-24 h-24 bg-primary-container dark:bg-dark-primary-container rounded-full flex items-center justify-center mx-auto text-white shadow-xl transition-transform duration-1000 ease-in-out"
        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
      >
        <span className="material-symbols-outlined text-5xl" aria-hidden="true">
          auto_awesome
        </span>
      </div>

      <div className="space-y-stack-sm">
        <h1 className="font-display-md text-display-md text-primary dark:text-dark-primary font-poppins">
          Your tailored plan is ready.
        </h1>
        <p className="text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
          We&apos;ve analyzed your responses and crafted a wealth-building path that respects your goals and lifestyle.
        </p>
      </div>

      <div className="p-stack-md bg-white dark:bg-dark-surface-container-low rounded-3xl shadow-lg border border-outline-variant/30 dark:border-dark-outline-variant/30 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 text-left">
          <p className="font-bold text-lg text-on-surface dark:text-dark-on-surface">
            {insight.title}
          </p>
          <p className="text-on-surface-variant dark:text-dark-on-surface-variant text-sm mt-1">
            {insight.message}
          </p>
        </div>
        <Button onClick={onComplete} className="whitespace-nowrap">
          Go to Dashboard
        </Button>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary transition-colors underline font-medium text-body-sm"
        >
          Wait, I need to change something
        </button>
      </div>
    </div>
  );
}
