'use client';

import Image from 'next/image';
import { OAUTH_PROVIDERS } from '@/constants';
import { initiateOAuthFlow } from '@/services/auth.service';
import { cn } from '@/lib/utils';

// ─── Divider ──────────────────────────────────────────────
function Divider() {
  return (
    <div role="separator" aria-label="Or continue with" className="relative flex items-center justify-center my-6">
      <div className="flex-grow border-t border-outline-variant dark:border-dark-outline-variant" />
      <span className="flex-shrink px-4 font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant">
        Or continue with
      </span>
      <div className="flex-grow border-t border-outline-variant dark:border-dark-outline-variant" />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────
export function OAuthSection() {
  return (
    <>
      <Divider />

      <div className="grid grid-cols-2 gap-3" role="group" aria-label="Social sign-in options">
        {OAUTH_PROVIDERS.map(({ provider, label, iconSrc, iconAlt }) => (
          <button
            key={provider}
            type="button"
            onClick={() => initiateOAuthFlow(provider)}
            aria-label={`Continue with ${label}`}
            className={cn(
              'flex items-center justify-center gap-2.5',
              'py-3 px-4 border border-outline-variant dark:border-dark-outline-variant rounded-xl',
              'font-inter text-body-sm text-on-surface dark:text-dark-on-surface',
              'bg-white dark:bg-dark-surface-container',
              'hover:bg-surface-container-low dark:hover:bg-dark-surface-container-high',
              'active:scale-[0.98] transition-all duration-200',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            )}
          >
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
