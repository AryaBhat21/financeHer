'use client';

import { useState } from 'react';
import { AuthTabs } from './AuthTabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthHeroPanel } from './AuthHeroPanel';
import type { AuthView } from '@/types/auth';
import { cn } from '@/lib/utils';

// ─── Component ────────────────────────────────────────────
export function AuthCard() {
  const [view, setView] = useState<AuthView>('login');

  const handleTabChange = (tab: Extract<AuthView, 'login' | 'signup'>) => {
    setView(tab);
  };

  const handleViewChange = (nextView: AuthView) => {
    setView(nextView);
  };

  return (
    <main
      id="main-content"
      className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4 sm:p-gutter"
    >
      <div
        className={cn(
          'max-w-[1100px] w-full',
          'grid md:grid-cols-2',
          'bg-surface-container-lowest dark:bg-dark-surface-container',
          'rounded-3xl overflow-hidden',
          'shadow-auth-card dark:shadow-auth-card-dark',
          'animate-fade-in'
        )}
      >
        {/* Left – visual hero panel */}
        <AuthHeroPanel />

        {/* Right – auth forms */}
        <section
          aria-label="Authentication form"
          className="p-6 sm:p-10 md:p-16 flex flex-col justify-center"
        >
          {/* Tab navigation (hidden on forgot-password view) */}
          <AuthTabs activeTab={view} onTabChange={handleTabChange} />

          {/* Form panels */}
          {view === 'login' && (
            <LoginForm onViewChange={handleViewChange} />
          )}
          {view === 'signup' && (
            <SignupForm />
          )}
          {view === 'forgot' && (
            <ForgotPasswordForm onViewChange={handleViewChange} />
          )}
        </section>
      </div>
    </main>
  );
}
