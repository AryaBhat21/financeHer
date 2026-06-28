import Link from 'next/link';
import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';

// ─── Logo ─────────────────────────────────────────────────
function Logo() {
  return (
    <Link
      href="/"
      aria-label="FinanceHer – go to home page"
      className="font-poppins text-headline-md font-bold text-primary dark:text-dark-primary hover:opacity-90 transition-opacity"
    >
      FinanceHer
    </Link>
  );
}

// ─── Component ────────────────────────────────────────────
export function Header() {
  return (
    <header
      role="banner"
      className={cn(
        'bg-surface/80 dark:bg-dark-surface/80',
        'backdrop-blur-xl',
        'border-b border-outline-variant/30 dark:border-dark-outline-variant/30',
        'flex justify-between items-center',
        'px-6 sm:px-8 md:px-margin-desktop py-4',
        'w-full sticky top-0 z-50',
        'transition-colors duration-300'
      )}
    >
      <Logo />

      {/* Desktop navigation */}
      <nav aria-label="Main navigation" className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              'font-inter text-body-md text-on-surface-variant dark:text-dark-on-surface-variant',
              'hover:text-primary dark:hover:text-dark-primary',
              'transition-colors duration-200'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile: hamburger placeholder — extend when needed */}
      <button
        aria-label="Open navigation menu"
        className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
