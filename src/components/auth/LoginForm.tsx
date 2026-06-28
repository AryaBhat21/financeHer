'use client';

import { useState, useId, type FormEvent } from 'react';
import Link from 'next/link';
import { Input, Button, FormLabel, FormField } from '@/components/ui';
import { OAuthSection } from './OAuthSection';
import { loginWithEmail } from '@/services/auth.service';
import type { AuthView, LoginFormData, AuthFormState } from '@/types/auth';

// ─── Types ────────────────────────────────────────────────
interface LoginFormProps {
  onViewChange: (view: AuthView) => void;
}

// ─── Default State ────────────────────────────────────────
const defaultFormState: AuthFormState = {
  isLoading: false,
  error: null,
  success: null,
};

// ─── Component ────────────────────────────────────────────
export function LoginForm({ onViewChange }: LoginFormProps) {
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [state, setState] = useState<AuthFormState>(defaultFormState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isLoading: true, error: null, success: null });

    try {
      const result = await loginWithEmail(formData);
      if (result.error) {
        setState({ isLoading: false, error: result.error, success: null });
      } else {
        setState({
          isLoading: false,
          error: null,
          success: result.message ?? 'Logged in successfully!',
        });
        // TODO: redirect to dashboard → router.push('/dashboard')
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
    <form
      id="login-panel"
      role="tabpanel"
      aria-labelledby="login-tab"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-stack-md animate-fade-in"
    >
      {/* Email */}
      <FormField>
        <FormLabel htmlFor={emailId} required>
          Email Address
        </FormLabel>
        <Input
          id={emailId}
          type="email"
          icon="mail"
          placeholder="hello@example.com"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
        />
      </FormField>

      {/* Password */}
      <FormField>
        <div className="flex justify-between items-center">
          <FormLabel htmlFor={passwordId} required>
            Password
          </FormLabel>
          <button
            type="button"
            onClick={() => onViewChange('forgot')}
            className="font-inter text-label-md text-primary dark:text-dark-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Forgot Password?
          </button>
        </div>
        <Input
          id={passwordId}
          type="password"
          icon="lock"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData((p) => ({ ...p, password: e.target.value }))
          }
        />
      </FormField>

      {/* Remember me */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id={rememberId}
          type="checkbox"
          checked={formData.rememberMe}
          onChange={(e) =>
            setFormData((p) => ({ ...p, rememberMe: e.target.checked }))
          }
          className="w-4 h-4 rounded text-primary border-outline-variant focus:ring-primary dark:border-dark-outline-variant accent-primary"
        />
        <label
          htmlFor={rememberId}
          className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant select-none"
        >
          Remember me for 30 days
        </label>
      </div>

      {/* Error / Success feedback */}
      {state.error && (
        <p role="alert" className="font-inter text-body-sm text-error bg-error-container rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="font-inter text-body-sm text-primary bg-primary-fixed rounded-lg px-4 py-3">
          {state.success}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        isLoading={state.isLoading}
        loadingText="Logging in…"
        className="mt-2"
      >
        Log In to Dashboard
      </Button>

      <OAuthSection />
    </form>
  );
}
