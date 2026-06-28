import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Literacy', href: '#literacy' },
  { label: 'Contact Us', href: 'mailto:hello@financeher.app' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="bg-surface-container-lowest border-t border-outline-variant"
    >
      <div className="max-w-container-max mx-auto px-6 sm:px-8 md:px-margin-desktop py-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              aria-label="FinanceHer – home"
              className="font-poppins text-headline-md text-primary font-bold"
            >
              FinanceHer
            </Link>
            <p className="font-inter text-body-sm text-on-surface-variant">
              Sophisticated wealth management for the modern generation.
              Inclusive, precise, and supportive.
            </p>
          </div>

          {/* Navigation links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 list-none" role="list">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-inter text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="font-inter text-body-sm text-on-surface opacity-60 whitespace-nowrap">
            © 2026 FinanceHer. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
