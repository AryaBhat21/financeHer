import type { Metadata } from 'next';
import { LandingNav, HeroSection, FeaturesBentoSection, CtaBanner } from '@/components/landing';
import { SiteFooter } from '@/components/layout';

// ─── Page Metadata ────────────────────────────────────────
export const metadata: Metadata = {
  title: 'FinanceHer | Empowering Your Wealth Journey',
  description:
    'AI-powered financial wellness for everyone. Track expenses, plan goals, and get personalised guidance with FinanceHer.',
};

// ─── Page ─────────────────────────────────────────────────
// Server Component — all child components that are purely presentational
// remain server-side. Only LandingNav and ScrollReveal are 'use client'.
export default function LandingPage() {
  return (
    <>
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-inter focus:text-body-sm"
      >
        Skip to main content
      </a>

      <LandingNav />

      {/* hero-gradient applied here as a CSS background via Tailwind config */}
      <main
        id="main-content"
        className="bg-hero-gradient"
      >
        <HeroSection />
        <FeaturesBentoSection />
        <CtaBanner />
      </main>

      <SiteFooter />
    </>
  );
}
