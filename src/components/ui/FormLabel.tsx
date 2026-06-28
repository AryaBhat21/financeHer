import { type LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────
export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

// ─── Component ────────────────────────────────────────────
export function FormLabel({
  className,
  required,
  children,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-label-md text-on-surface-variant dark:text-dark-on-surface-variant uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-error">
          *
        </span>
      )}
    </label>
  );
}

// ─── FormField wrapper ────────────────────────────────────
export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>{children}</div>
  );
}
