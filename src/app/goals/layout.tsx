import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goals | FinanceHer',
  description:
    'Plan your financial future with precision. Track Emergency Fund, Home, Travel, Retirement and Education goals with AI-powered savings suggestions and projected completion dates.',
};

export default function GoalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
