// ─── Authentication Types ─────────────────────────────────

export type AuthView = 'login' | 'signup' | 'forgot';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface AuthFormState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export type OAuthProvider = 'google' | 'linkedin';

export interface OAuthButtonConfig {
  provider: OAuthProvider;
  label: string;
  iconSrc: string;
  iconAlt: string;
}

// ─── API Response Types ───────────────────────────────────

export interface ApiResponse<T = void> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  accessToken: string;
  expiresAt: number;
}

// ─── Navigation Types ─────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}
