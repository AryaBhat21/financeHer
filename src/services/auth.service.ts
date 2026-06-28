import type {
  ApiResponse,
  AuthSession,
  LoginFormData,
  SignupFormData,
  ForgotPasswordFormData,
  OAuthProvider,
} from '@/types/auth';
import { DEMO_SUBMISSION_DELAY_MS } from '@/constants';

/**
 * Authentication service layer.
 * Currently returns mock responses for UI demonstration.
 * Replace method bodies with real API calls when the backend is ready.
 */

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ─── Login ────────────────────────────────────────────────
export async function loginWithEmail(
  _data: LoginFormData
): Promise<ApiResponse<AuthSession>> {
  await delay(DEMO_SUBMISSION_DELAY_MS);
  // TODO: Replace with real API call → POST /api/auth/login
  return {
    message: 'This is a UI demo. Functionality is not connected to a backend.',
  };
}

// ─── Sign Up ──────────────────────────────────────────────
export async function signupWithEmail(
  _data: SignupFormData
): Promise<ApiResponse<AuthSession>> {
  await delay(DEMO_SUBMISSION_DELAY_MS);
  // TODO: Replace with real API call → POST /api/auth/signup
  return {
    message: 'This is a UI demo. Functionality is not connected to a backend.',
  };
}

// ─── Forgot Password ──────────────────────────────────────
export async function requestPasswordReset(
  _data: ForgotPasswordFormData
): Promise<ApiResponse> {
  await delay(DEMO_SUBMISSION_DELAY_MS);
  // TODO: Replace with real API call → POST /api/auth/forgot-password
  return {
    message: 'This is a UI demo. Functionality is not connected to a backend.',
  };
}

// ─── OAuth ────────────────────────────────────────────────
export async function initiateOAuthFlow(
  _provider: OAuthProvider
): Promise<void> {
  // TODO: Redirect to OAuth provider URL
  // window.location.href = `/api/auth/oauth/${provider}`;
  await delay(500);
  alert(`OAuth flow for ${_provider} — not yet connected.`);
}
