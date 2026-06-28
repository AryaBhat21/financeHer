'use client';

import Image from 'next/image';
import { AUTH_HERO_IMAGE_SRC } from '@/constants';
import { cn } from '@/lib/utils';

// ─── Decorative SVG Background ────────────────────────────
function DecorativeBackground() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Large circle bottom-right */}
      <circle cx="350" cy="480" r="180" fill="white" />
      {/* Medium circle top-left */}
      <circle cx="40" cy="60" r="90" fill="white" />
      {/* Small accent circle */}
      <circle cx="200" cy="200" r="40" fill="white" opacity="0.5" />
      {/* Grid dots pattern */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 80 + 40}
            cy={row * 90 + 30}
            r="2"
            fill="white"
            opacity="0.3"
          />
        ))
      )}
    </svg>
  );
}

// ─── Stat Badge ───────────────────────────────────────────
interface StatBadgeProps {
  value: string;
  label: string;
}

function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div className="text-center">
      <p className="font-poppins text-2xl font-bold text-white">{value}</p>
      <p className="text-white/70 text-xs mt-0.5">{label}</p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────
export function AuthHeroPanel() {
  return (
    <aside
      aria-label="FinanceHer platform highlights"
      className={cn(
        'relative hidden md:flex flex-col justify-center items-center',
        'p-10 bg-primary dark:bg-dark-primary overflow-hidden'
      )}
    >
      <DecorativeBackground />

      <div className="relative z-10 text-center max-w-sm">
        {/* Hero image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl ring-4 ring-white/20">
          <Image
            src={AUTH_HERO_IMAGE_SRC}
            alt="A confident professional smiling in a bright modern office, representing financial empowerment"
            fill
            sizes="(max-width: 768px) 0px, 340px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="font-poppins text-display-md text-white mb-3">
          Welcome Back
        </h2>
        <p className="font-inter text-body-md text-white/85 leading-relaxed">
          Join thousands of people taking control of their financial destiny
          with premium wealth tools and supportive community insights.
        </p>

        {/* Stats row */}
        <div
          className="mt-8 grid grid-cols-3 gap-4 py-4 border-t border-white/20"
          aria-label="Platform statistics"
        >
          <StatBadge value="50K+" label="Active Users" />
          <StatBadge value="$2B+" label="Assets Tracked" />
          <StatBadge value="4.9★" label="App Rating" />
        </div>
      </div>
    </aside>
  );
}
