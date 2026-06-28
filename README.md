# FinanceHer

> AI-powered financial wellness platform — Next.js 15 + TypeScript + Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v3 |
| Icons | Material Symbols Outlined |
| Fonts | Poppins (headings) · Inter (body) via `next/font` |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Tailwind directives + global base styles
│   ├── layout.tsx          # Root layout with font optimisation & metadata
│   ├── page.tsx            # Auth page (/)
│   └── not-found.tsx       # Custom 404 page
│
├── components/
│   ├── ui/                 # Reusable design-system primitives
│   │   ├── Button.tsx      # Multi-variant button with loading state
│   │   ├── Input.tsx       # Accessible input with icon & error support
│   │   └── FormLabel.tsx   # FormLabel + FormField layout wrapper
│   │
│   ├── layout/             # Page-level layout components
│   │   └── Header.tsx      # Sticky header with nav
│   │
│   └── auth/               # Auth feature components
│       ├── AuthCard.tsx        # Orchestrates view state (login/signup/forgot)
│       ├── AuthHeroPanel.tsx   # Left-side visual panel with hero image
│       ├── AuthTabs.tsx        # ARIA tab navigation
│       ├── LoginForm.tsx       # Login form with OAuth
│       ├── SignupForm.tsx      # Registration form
│       ├── ForgotPasswordForm.tsx
│       └── OAuthSection.tsx    # Google/LinkedIn social sign-in
│
├── constants/              # App-wide constants (nav links, OAuth config, etc.)
├── services/               # Service layer (auth.service.ts)
├── types/                  # TypeScript interfaces and types
└── lib/                    # Utility functions (cn helper)
```

## Dark Mode

Dark mode is supported via Tailwind's `class` strategy. Add the `dark` class to `<html>` to activate it.

## Backend Integration

The `src/services/auth.service.ts` file contains stub implementations of every auth action. To wire up a real backend, replace the function bodies with `fetch` calls to your API:

```ts
// Example
export async function loginWithEmail(data: LoginFormData) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript strict type check |
