import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

// ─── Font Optimisation ────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// ─── Root Metadata ────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'FinanceHer | Empowering Your Wealth Journey',
    template: '%s | FinanceHer',
  },
  description:
    'FinanceHer is an AI-powered financial wellness platform that helps you improve financial literacy, manage expenses, plan goals, and receive personalised guidance.',
  keywords: [
    'personal finance',
    'financial wellness',
    'budgeting',
    'wealth management',
    'financial literacy',
    'AI finance',
  ],
  authors: [{ name: 'FinanceHer' }],
  metadataBase: new URL('https://financeher.app'),
  openGraph: {
    title: 'FinanceHer | Empowering Your Wealth Journey',
    description:
      'AI-powered financial wellness. Manage your money with confidence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FinanceHer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinanceHer | Empowering Your Wealth Journey',
    description: 'AI-powered financial wellness. Manage your money with confidence.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ──────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <head>
        {/* Material Symbols icon font */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
