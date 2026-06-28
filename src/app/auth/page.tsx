import type { Metadata } from 'next';
import { Header } from '@/components/layout';
import { AuthCard } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Log in or create your FinanceHer account to access personalised AI-powered financial wellness tools.',
};

export default function AuthPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-inter focus:text-body-sm"
      >
        Skip to main content
      </a>
      <Header />
      <AuthCard />
    </>
  );
}
