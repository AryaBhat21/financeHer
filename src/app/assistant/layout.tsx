import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant | FinanceHer',
  description:
    'Chat with your intelligent AI financial assistant. Ask questions about your budget, savings goals, expenses, or get personalized financial recommendations.',
};

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
