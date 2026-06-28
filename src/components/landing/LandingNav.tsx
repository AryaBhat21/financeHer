'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Product', href: '#product', active: true },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Literacy', href: '#literacy' },
  { label: 'Pricing', href: '#pricing' },
];

// ─── Component ────────────────────────────────────────────
export function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'flex flex-wrap justify-between items-center',
        'px-6 sm:px-8 md:px-margin-desktop py-4',
        'w-full sticky top-0 z-50',
        'bg-surface/80 backdrop-blur-xl',
        'border-b border-outline-variant/20'
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="FinanceHer – home"
        className="font-poppins text-headline-md font-bold text-primary"
      >
        FinanceHer
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 items-center list-none" role="list">
        {NAV_ITEMS.map(({ label, href, active }) => (
          <li key={label}>
            <Link
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'font-inter text-body-md transition-colors',
                active
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/auth"
          className="hidden sm:inline text-on-surface font-inter text-label-md opacity-80 hover:opacity-100 transition-opacity px-3 py-2"
        >
          Log In
        </Link>
        <Link
          href="/auth"
          className={cn(
            'bg-primary text-white px-5 py-2.5 rounded-xl',
            'font-inter text-label-md font-semibold',
            'hover:bg-primary-container active:scale-95 transition-all duration-200 shadow-sm'
          )}
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <span aria-hidden="true" className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          className="md:hidden w-full mt-3 flex flex-col gap-2 pb-3 border-t border-outline-variant/30 pt-3 list-none"
          role="list"
        >
          {NAV_ITEMS.map(({ label, href, active }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block py-2 px-3 rounded-lg font-inter text-body-md transition-colors',
                  active
                    ? 'text-primary bg-primary-fixed/30'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/auth"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded-lg font-inter text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Log In
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
