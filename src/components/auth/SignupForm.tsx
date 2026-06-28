'use client';

import { useState, useId, type FormEvent } from 'react';
import Link from 'next/link';
import { Input, Button, FormLabel, FormField } from '@/components/ui';
import { signupWithEmail } from '@/services/auth.service';
import type { SignupFormData, AuthFormState } from '@/types/auth';
import { PASSWORD_MIN_LENGTH } from '@/constants';

// ─── Default State ────────────────────────────────────────
const defaultFormData: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreedToTerms: false,
};

const defaultFormState: AuthFormState = {
  isLoading: false,
  error: null,
  success: null,
};

// ─── Component ────────────────────────────────────────────
export function SignupForm() {
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const termsId = useId();

  const [formData, setFormData] = useState<SignupFormData>(defaultFormData);
  const [state, setState] = useState<AuthFormState>(defaultFormState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.agreedToTerms) {
      setState({ isLoading: false, error: 'You must agree to the Terms of Service to continue.', success: null });
      return;
    }
    if (formData.password.length < PASSWORD_MIN_LENGTH) {
      setState({ isLoading: false, error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`, success: null });
      return;
    }

    setState({ isLoading: true, error: null, success: null });

    try {
      const result = await signupWithEmail(formData);
      if (result.error) {
        setState({ isLoading: false, error: result.error, success: null });
      } else {
        setState({
          isLoading: false,
          error: null,
          success: result.message ?? 'Account created! Redirecting…',
        });
        // TODO: redirect to onboarding → router.push('/onboarding')
      }
    } catch {
      setState({
        isLoading: false,
        error: 'Something went wrong. Please try again.',
        success: null,
      });
    }
  };

  const update = <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <form
      id="signup-panel"
      role="tabpanel"
      aria-labelledby="signup-tab"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-stack-md animate-fade-in"
    >
      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <FormField>
          <FormLabel htmlFor={firstNameId} required>
            First Name
          </FormLabel>
          <Input
            id={firstNameId}
            type="text"
            placeholder="Jane"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onChange={(e) => update('firstName', e.target.value)}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor={lastNameId} required>
            Last Name
          </FormLabel>
          <Input
            id={lastNameId}
            type="text"
            placeholder="Doe"
            autoComplete="family-name"
            required
            value={formData.lastName}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </FormField>
      </div>

      {/* Email */}
      <FormField>
        <FormLabel htmlFor={emailId} required>
          Email Address
        </FormLabel>
        <Input
          id={emailId}
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </FormField>

      {/* Password */}
      <FormField>
        <FormLabel htmlFor={passwordId} required>
          Create Password
        </FormLabel>
        <Input
          id={passwordId}
          type="password"
          placeholder={`Min. ${PASSWORD_MIN_LENGTH} characters`}
          autoComplete="new-password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          value={formData.password}
          onChange={(e) => update('password', e.target.value)}
        />
      </FormField>

      {/* Terms agreement */}
      <div className="flex items-start gap-2">
        <input
          id={termsId}
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={(e) => update('agreedToTerms', e.target.checked)}
          required
          className="mt-0.5 w-4 h-4 rounded border-outline-variant accent-primary"
        />
        <label
          htmlFor={termsId}
          className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant select-none"
        >
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-primary dark:text-dark-primary underline hover:opacity-80 transition-opacity">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary dark:text-dark-primary underline hover:opacity-80 transition-opacity">
            Privacy Policy
          </Link>
          .
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
        loadingText="Creating your account…"
        className="mt-2"
      >
        Start Your Free Trial
      </Button>
    </form>
  );
}
