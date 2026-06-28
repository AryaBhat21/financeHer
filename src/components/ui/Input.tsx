'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Material Symbol icon name rendered on the left */
  icon?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Wrapper class applied to the outer div */
  wrapperClassName?: string;
}

// ─── Component ────────────────────────────────────────────
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, wrapperClassName, id, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className={cn('relative', wrapperClassName)}>
        {icon && (
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-dark-on-surface-variant pointer-events-none select-none"
          >
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError && id ? `${id}-error` : undefined}
          className={cn(
            // Base
            'w-full py-3 bg-white dark:bg-dark-surface-container-low',
            'border rounded-xl text-body-md text-on-surface dark:text-dark-on-surface',
            'placeholder:text-on-surface-variant/60 dark:placeholder:text-dark-on-surface-variant/60',
            'transition-all duration-200 outline-none',
            // Border colours
            'border-outline-variant dark:border-dark-outline-variant',
            // Focus ring
            'focus:ring-2 focus:ring-primary/30 focus:border-primary',
            'dark:focus:ring-dark-primary/30 dark:focus:border-dark-primary',
            // Error state
            hasError &&
              'border-error focus:ring-error/30 focus:border-error dark:border-error',
            // Icon padding
            icon ? 'pl-10 pr-4' : 'px-4',
            className
          )}
          {...props}
        />

        {hasError && id && (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-1 text-label-md text-error"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
