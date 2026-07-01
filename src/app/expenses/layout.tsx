import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expenses',
  description:
    'Track your monthly spending, analyse category breakdowns, and get AI-powered insights to optimise your financial habits.',
};

export default function ExpensesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
