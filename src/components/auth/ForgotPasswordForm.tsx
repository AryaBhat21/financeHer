'use client';

import { useState, useId, type FormEvent } from 'react';
import { Input, Button, FormLabel, FormField } from '@/components/ui';
import { requestPasswordReset } from '@/services/auth.service';
import type { AuthView, ForgotPasswordFormData, AuthFormState } from '@/types/auth';

// ─── Types ────────────────────────────────────────────────
interface ForgotPasswordFormProps {
  onViewChange: (view: AuthView) => void;
}

// ─── Default State ────────────────────────────────────────
const defaultFormState: AuthFormState = {
  isLoading: false,
  error: null,
  success: null,
};

// ─── Component ────────────────────────────────────────────
export function ForgotPasswordForm({ onViewChange }: ForgotPasswordFormProps) {
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<AuthFormState>(defaultFormState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isLoading: true, error: null, success: null });

    const data: ForgotPasswordFormData = { email };

    try {
      const result = await requestPasswordReset(data);
      if (result.error) {
        setState({ isLoading: false, error: result.error, success: null });
      } else {
        setState({
          isLoading: false,
          error: null,
          success: result.message ?? 'Reset link sent! Check your inbox.',
        });
      }
    } catch {
      setState({
        isLoading: false,
        error: 'Something went wrong. Please try again.',
        success: null,
      });
    }
  };

  return (
    <div
      id="forgot-panel"
      role="region"
      aria-label="Reset password"
      className="space-y-stack-md animate-fade-in"
    >
      {/* Header */}
      <header className="text-center mb-2">
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-5xl text-primary dark:text-dark-primary mb-4 block"
        >
          lock_reset
        </span>
        <h1 className="font-poppins text-headline-lg text-on-surface dark:text-dark-on-surface mb-2">
          Reset Password
        </h1>
        <p className="font-inter text-body-md text-on-surface-variant dark:text-dark-on-surface-variant">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <FormField className="mb-4">
          <FormLabel htmlFor={emailId} required>
            Email Address
          </FormLabel>
          <Input
            id={emailId}
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>

        {/* Error / Success feedback */}
        {state.error && (
          <p role="alert" className="mb-4 font-inter text-body-sm text-error bg-error-container rounded-lg px-4 py-3">
            {state.error}
          </p>
        )}
        {state.success && (
          <p role="status" className="mb-4 font-inter text-body-sm text-primary bg-primary-fixed rounded-lg px-4 py-3">
            {state.success}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={state.isLoading}
          loadingText="Sending reset link…"
        >
          Send Reset Link
        </Button>
      </form>

      {/* Back to login */}
      <Button
        variant="ghost"
        fullWidth
        onClick={() => onViewChange('login')}
        leftIcon={
          <span aria-hidden="true" className="material-symbols-outlined">
            arrow_back
          </span>
        }
      >
        Back to Login
      </Button>
    </div>
  );
}
