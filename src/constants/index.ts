import type { NavLink, OAuthButtonConfig } from '@/types/auth';

// ─── Navigation ───────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Literacy', href: '#literacy' },
];

// ─── OAuth Providers ──────────────────────────────────────
export const OAUTH_PROVIDERS: OAuthButtonConfig[] = [
  {
    provider: 'google',
    label: 'Google',
    iconSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABgSAVnXYGYbQYL967K5AmgjRmJ-sKXXdurobXNWP-qLIa8HwwkgCaV_pYHHi7Vmb6VNHO-Nvnrkdlr18S4Mi30LnDDzxShBp72j0OeuA-3SiFjOFXXNHer4_sUvD-RUmrXYpRZVLabLWSogzvv6GU4XTrrJyaE-ygxMNTj-bKeB6q1KpPtxQ8SxZbl2grCnduQJ8xrrNXvCdeIhlBpuBuwcQjEpi6r9rHmrMnAPwpZOxgR2jegh72z5vETkcxty6jj_yr1VGoP74A',
    iconAlt: 'Google logo',
  },
  {
    provider: 'linkedin',
    label: 'LinkedIn',
    iconSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6ZcWEDO0XLERgnoeMgqEC4G6kTb8qpCz90-WtFPG8qqmIX_fbLimdQ8rordpiSanW5FuDFe6WDCb32w49BACW6dk7mQ0Ybz-7gQqi5iTVWSiuM2Ysy-YWDSybNOGqnvROhwcXj94S11llqQV3_YFDqQzTMhKxVPvzkEsEKBSug0J2hN0vDgxQyC7uRA0X1qJrvlanXH53UA-I7R_QX3tk00ZS14iPjX2Rgw-F4W--NrX0ZLYmr-HKFaN3tjLeuXGwoNE617o37mhK',
    iconAlt: 'LinkedIn logo',
  },
];

// ─── Auth Hero Image ──────────────────────────────────────
export const AUTH_HERO_IMAGE_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBAqt3_YNZGAXZFN9naBjKATyBsqhImjqTztp0j10nJgiTlrrh2Hp46EX6O-ORoeWLJlV0VTY8dDIy-6Ce90eihF94TXjq8B5hHjUFS0g20dK_kf30OG3EL6sIrn28k3lKtkZ1jDxqCD5IrcDXJdcOUPh-288eYGAEl8NlTW_okSs1hkliKjAPtCKFr04PTDY5-4eQ6SAB-jAVmu9w1D5xIk8x7pFPdjOBbpQyK318BD62DVG9aoAVY0q06JJUE4nEkAVkh-a3ArMaR';

// ─── Form Validation ──────────────────────────────────────
export const PASSWORD_MIN_LENGTH = 8;

// ─── Timing ───────────────────────────────────────────────
/** Simulated async delay for demo form submission (ms) */
export const DEMO_SUBMISSION_DELAY_MS = 1500;
