'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// ─── Variant Styles ───────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-primary text-white shadow-md',
    'hover:bg-primary-container hover:shadow-primary-glow',
    'active:scale-[0.98]',
    'disabled:bg-primary/50 disabled:cursor-not-allowed disabled:shadow-none',
    'dark:bg-dark-primary dark:text-dark-on-primary',
    'dark:hover:bg-dark-primary/90'
  ),
  secondary: cn(
    'bg-secondary-container text-on-secondary-container',
    'hover:bg-secondary-container/80',
    'active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  ghost: cn(
    'bg-transparent text-on-surface-variant',
    'hover:text-primary hover:bg-surface-container-low',
    'dark:hover:bg-dark-surface-container dark:hover:text-dark-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  outline: cn(
    'bg-white dark:bg-dark-surface-container border border-outline-variant dark:border-dark-outline-variant',
    'text-on-surface dark:text-dark-on-surface',
    'hover:bg-surface-container-low dark:hover:bg-dark-surface-container-high',
    'active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-body-sm rounded-lg',
  md: 'py-3 px-6 text-body-md rounded-xl',
  lg: 'py-4 px-8 text-headline-md rounded-xl font-poppins font-semibold',
};

// ─── Spinner ──────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'lg',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-inter font-medium transition-all duration-200',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>{loadingText ?? 'Processing…'}</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
