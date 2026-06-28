# FinanceHer — Technical Document

> **Living Document** — Updated alongside every architectural change, new dependency, or implementation decision.  
> Last updated: 2026-06-28 (Milestone 3 — Landing Page)

---

## Table of Contents

1. [Architecture](#1-architecture)
2. [Folder Structure](#2-folder-structure)
3. [Components](#3-components)
4. [State Management](#4-state-management)
5. [APIs](#5-apis)
6. [Database Schema](#6-database-schema)
7. [Dependencies](#7-dependencies)
8. [Security](#8-security)
9. [Performance](#9-performance)
10. [Configuration Files](#10-configuration-files)

---

## 1. Architecture

### 1.1 Frontend Architecture

**Framework:** Next.js 16 (App Router)  
**Language:** TypeScript 5 (strict mode)  
**Styling:** Tailwind CSS v3  
**Component model:** React Server Components (RSC) by default; `'use client'` only for interactive islands.

```
Browser
  └── Next.js App Router
        ├── Server Components  →  layout.tsx, page.tsx (landing), auth/page.tsx, not-found.tsx,
        │                          HeroSection, FeaturesBentoSection, CtaBanner, SiteFooter
        └── Client Components  →  LandingNav, ScrollReveal, AuthCard, LoginForm, SignupForm,
                                   ForgotPasswordForm, AuthTabs, OAuthSection
```

**Key architectural decisions:**

| Decision | Rationale |
|---|---|
| App Router over Pages Router | Enables React Server Components, streaming, nested layouts, and colocated metadata |
| Server Components by default | Reduces client-side JS bundle; pages with no interactivity send zero JS |
| `'use client'` only for forms/interactive elements | Forms require browser APIs (state, events); hero/layout panels do not |
| Feature-based folder structure | Scales better than type-based folders for large applications |

### 1.2 Backend Architecture *(planned)*

**Runtime:** Node.js (Express or Next.js Route Handlers)  
**Auth:** JWT (access token + refresh token pattern)  
**Database:** TBD — PostgreSQL (relational) or MongoDB (document)  
**AI layer:** LLM API + RAG pipeline (vector DB for user data retrieval)

### 1.3 AI Architecture *(planned)*

```
User Query
  → AI Assistant API
    → RAG retrieval (user's expense/goal data from vector store)
    → LLM prompt with context (user data + financial knowledge base)
    → Streamed response to frontend
```

### 1.4 Deployment Architecture *(planned)*

**Frontend:** Vercel (Next.js native deployment)  
**Backend:** Railway / Render / AWS ECS  
**Database:** Supabase (PostgreSQL) or PlanetScale  
**AI:** OpenAI API / Gemini API  

---

## 2. Folder Structure

```
financeHer/
├── docs/                        # Living documentation
│   ├── PRODUCT_DOC.md
│   ├── TECH_DOC.md
│   └── LEARNING_DOC.md
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── globals.css          # Tailwind directives + global base layer
│   │   ├── layout.tsx           # Root layout: fonts, metadata, providers
│   │   ├── page.tsx             # Landing page at route "/"
│   │   ├── not-found.tsx        # Custom 404 page
│   │   └── auth/
│   │       └── page.tsx         # Auth page at route "/auth"
│   │
│   ├── components/
│   │   ├── ui/                  # Design-system primitives (reusable across all features)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── FormLabel.tsx
│   │   │   ├── ScrollReveal.tsx # IntersectionObserver scroll animation wrapper
│   │   │   └── index.ts         # Barrel export
│   │   │
│   │   ├── layout/              # Page-level structural components
│   │   │   ├── Header.tsx       # Auth-page sticky header
│   │   │   ├── SiteFooter.tsx   # Shared site footer
│   │   │   └── index.ts
│   │   │
│   │   ├── landing/             # Landing page feature components
│   │   │   ├── LandingNav.tsx   # Landing navigation (different from auth Header)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesBentoSection.tsx
│   │   │   ├── CtaBanner.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── auth/                # Auth feature components (collocated)
│   │       ├── AuthCard.tsx     # Orchestrator: manages view state
│   │       ├── AuthHeroPanel.tsx
│   │       ├── AuthTabs.tsx
│   │       ├── LoginForm.tsx
│   │       ├── SignupForm.tsx
│   │       ├── ForgotPasswordForm.tsx
│   │       ├── OAuthSection.tsx
│   │       └── index.ts
│   │
│   ├── services/                # API call layer (one file per domain)
│   │   └── auth.service.ts
│   │
│   ├── types/                   # TypeScript interfaces and types
│   │   ├── auth.ts
│   │   └── index.ts
│   │
│   ├── constants/               # App-wide constants (no business logic)
│   │   └── index.ts
│   │
│   └── lib/                     # Pure utility functions
│       └── utils.ts             # cn() helper
│
├── .gitignore
├── .eslintrc.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### Why this structure?

- **`app/`** — All route segments live here. Co-locating `globals.css` and `layout.tsx` with the route keeps concerns together.
- **`components/ui/`** — Generic, reusable primitives with no business logic. These should be promotable to a design system package as the app grows.
- **`components/layout/`** — Structural components (Header, Footer, Sidebar) used across multiple routes.
- **`components/auth/`** — Feature-collocated components. Adding a new feature (`expenses`, `goals`) creates a new sibling folder. This prevents god-component files.
- **`services/`** — The only place that talks to the network. Components never call `fetch` directly. This makes mocking, testing, and API migration easy.
- **`types/`** — Centralised TypeScript contracts. Imported by components, services, and hooks alike.
- **`constants/`** — Configuration values and static data. Zero business logic.
- **`lib/`** — Pure utility functions with no React or Next.js dependencies.

---

## 3. Components

### 3.1 `Button` (`src/components/ui/Button.tsx`)

**Purpose:** Universal action trigger used throughout the application.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Padding and font size |
| `isLoading` | `boolean` | `false` | Shows spinner; disables click |
| `loadingText` | `string` | `'Processing…'` | Screen-reader text during load |
| `leftIcon` | `ReactNode` | — | Icon before label |
| `rightIcon` | `ReactNode` | — | Icon after label |
| `fullWidth` | `boolean` | `false` | `w-full` |

**Accessibility:** `aria-busy` during loading, `disabled` attribute on button element, `focus-visible` ring.

**Dependencies:** `cn()` utility, Tailwind classes.

**Reusability:** Used by all forms, navigation CTAs, and future dashboard actions.

---

### 3.2 `Input` (`src/components/ui/Input.tsx`)

**Purpose:** Accessible text input with icon, error state, and dark mode.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `icon` | `string` | Material Symbol icon name (rendered on left) |
| `error` | `string` | Error message; also sets `aria-invalid` |
| `wrapperClassName` | `string` | Class on the outer wrapper `<div>` |

**Accessibility:** `aria-invalid`, `aria-describedby` pointing to error paragraph with `role="alert"`.

**Dependencies:** `cn()` utility.

---

### 3.3 `FormLabel` + `FormField` (`src/components/ui/FormLabel.tsx`)

**Purpose:** Consistent label styling and vertical spacing wrapper for form groups.

**`FormLabel` props:** Extends `<label>` HTML attributes. `required` prop adds a red asterisk with `aria-hidden="true"` (screen readers already announce required state via the input's `required` attribute).

**`FormField` props:** `children`, `className`. Applies `space-y-1.5` vertical rhythm.

---

### 3.4 `Header` (`src/components/layout/Header.tsx`)

**Purpose:** Sticky top navigation bar with logo and nav links.

**Features:** Sticky with `backdrop-blur`, responsive (desktop nav hidden on mobile), keyboard-accessible nav links, mobile hamburger placeholder.

**Dependencies:** `next/link`, `NAV_LINKS` constant.

---

### 3.5 `AuthCard` (`src/components/auth/AuthCard.tsx`)

**Purpose:** View-state orchestrator for the auth page. Owns the `view` state (`login | signup | forgot`) and renders the correct form panel.

**State:** `view: AuthView` (local state, no global state needed).

**Pattern:** "Container + Presentation" — `AuthCard` handles state and conditionally renders stateless (or self-contained) child forms.

---

### 3.6 `AuthHeroPanel` (`src/components/auth/AuthHeroPanel.tsx`)

**Purpose:** Left-side visual panel on the auth page. Contains hero image, headline, tagline, and stats row.

**Optimisation:** Uses `next/image` with `fill`, `sizes`, `priority` (above-the-fold LCP element).

**Accessibility:** `<aside>` landmark with `aria-label`. All decorative SVG elements have `aria-hidden="true"`.

---

### 3.7 `AuthTabs` (`src/components/auth/AuthTabs.tsx`)

**Purpose:** Tab bar to switch between Login and Signup views.

**ARIA:** `role="tablist"` on the container, `role="tab"` on each button, `aria-selected` indicating active tab, `aria-controls` pointing to the panel ID.

**Behaviour:** Hidden when `view === 'forgot'` (forgot-password is a separate flow, not a tab).

---

### 3.8 `LoginForm` (`src/components/auth/LoginForm.tsx`)

**Purpose:** Email + password login form with "remember me" and forgot-password navigation.

**State:** `formData: LoginFormData`, `state: AuthFormState` (local).

**Integration point:** Calls `loginWithEmail()` from `auth.service.ts`.

**ARIA:** `role="tabpanel"` with `aria-labelledby="login-tab"`.

---

### 3.9 `SignupForm` (`src/components/auth/SignupForm.tsx`)

**Purpose:** Registration form with client-side validation.

**Validation:**
- Password must be ≥ `PASSWORD_MIN_LENGTH` (8) characters.
- User must agree to terms.

**Integration point:** Calls `signupWithEmail()` from `auth.service.ts`.

---

### 3.10 `ForgotPasswordForm` (`src/components/auth/ForgotPasswordForm.tsx`)

**Purpose:** Email input to trigger password reset flow.

**Integration point:** Calls `requestPasswordReset()` from `auth.service.ts`.

**ARIA:** `role="region"` with `aria-label="Reset password"`.

---

### 3.11 `OAuthSection` (`src/components/auth/OAuthSection.tsx`)

**Purpose:** Social sign-in buttons (Google, LinkedIn) with a visual divider.

**Integration point:** Calls `initiateOAuthFlow(provider)` from `auth.service.ts`.

**Configuration:** OAuth provider list is driven by `OAUTH_PROVIDERS` constant — adding a new provider requires only a new entry in `constants/index.ts`.

---

### 3.12 `ScrollReveal` (`src/components/ui/ScrollReveal.tsx`)

**Purpose:** Client-side wrapper that animates children into view when they scroll into the viewport. Replaces the inline `<script>` IntersectionObserver from the original landing page HTML.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to reveal |
| `className` | `string` | — | Applied to the wrapper div |
| `delay` | `number` | `0` | ms before animation starts (for stagger effects) |

**How it works:** Starts with `opacity-0 translate-y-8`. Once the IntersectionObserver fires (threshold: 10% visible), transitions to `opacity-100 translate-y-0` with a 700ms duration. Observer disconnects after first trigger (one-shot).

**Why extracted:** Scroll reveal is reusable across any landing section, dashboard card, or future page. Centralising the observer logic prevents duplicate observers and ensures consistent animation behaviour.

---

### 3.13 `LandingNav` (`src/components/landing/LandingNav.tsx`)

**Purpose:** Landing-page-specific navigation. Different from auth `Header` — has active link state, "Log In" + "Get Started" CTAs, and a working mobile hamburger.

**Why separate from `Header`:** The auth header is minimal (3 links, no CTA buttons). The landing nav has 4 links, 2 CTA buttons, active state logic, and mobile menu toggle state — sharing them would require complex conditional props.

**State:** `menuOpen: boolean` (local — controls mobile dropdown).

---

### 3.14 `HeroSection` (`src/components/landing/HeroSection.tsx`)

**Purpose:** Above-the-fold hero with badge pill, headline, CTAs, and a 4-image tilted grid.

**Images:** Driven by a typed `HERO_IMAGES` array — adding/changing images requires only editing the data, not the JSX.

**Key fix:** Original HTML used `data-alt` (a custom attribute that is invisible to screen readers) instead of the standard `alt` attribute. Fixed here with proper descriptive alt text.

**Accessibility:** Image grid is `aria-hidden="true"` (decorative), badge pill uses `role="img"` with `aria-label`.

---

### 3.15 `FeaturesBentoSection` (`src/components/landing/FeaturesBentoSection.tsx`)

**Purpose:** 4-card bento grid showcasing Budgeting, Goal Tracking, AI Insights, and Literacy Hub.

**Grid:** Uses Tailwind `grid-cols-12` + `col-span-*` — replaces the custom `.bento-grid { grid-template-columns: repeat(12, 1fr) }` CSS class from the original.

**Accessibility:** `role="progressbar"` on goal indicator with `aria-valuenow/min/max`. `BarChart` has `role="img"` with descriptive `aria-label`.

---

### 3.16 `CtaBanner` (`src/components/landing/CtaBanner.tsx`)

**Purpose:** Full-width call-to-action section with headline and two action buttons.

**Accessibility:** Decorative blobs have `aria-hidden="true" pointer-events-none`. "Contact Sales" links to a mailto: address.

---

### 3.17 `SiteFooter` (`src/components/layout/SiteFooter.tsx`)

**Purpose:** Shared site footer with brand, nav links, and copyright.

**Semantic HTML:** Uses `role="contentinfo"` (the `<footer>` role), nav landmark, and `<ul>` list for links.

**Dynamic copyright:** `new Date().getFullYear()` — never needs manual updating.

---

## 4. State Management

### 4.1 Current State Strategy

All state is currently **local component state** (`useState`). No global state library is needed at this stage.

| State | Location | Type |
|---|---|---|
| Active auth view (`login/signup/forgot`) | `AuthCard` | `useState<AuthView>` |
| Login form data | `LoginForm` | `useState<LoginFormData>` |
| Signup form data | `SignupForm` | `useState<SignupFormData>` |
| Forgot password email | `ForgotPasswordForm` | `useState<string>` |
| Form loading/error/success | Each form | `useState<AuthFormState>` |

### 4.2 Planned Global State (for Dashboard+)

When the Dashboard is built, user session and financial data will need global state. Planned options:

| Option | When to adopt |
|---|---|
| React Context | Session data (user profile, auth token) |
| Zustand | Client-side financial data cache |
| TanStack Query | Server state (API responses, caching, refetch) |

### 4.3 Data Flow

```
User interaction
  → Component event handler
    → Service function (services/)
      → API call (future)
        → Response
          → Component state update
            → Re-render
```

---

## 5. APIs

### 5.1 Auth Endpoints *(planned — stubs exist in auth.service.ts)*

#### `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "••••••••",
  "rememberMe": true
}
```

**Response (success):**
```json
{
  "data": {
    "userId": "usr_abc123",
    "email": "user@example.com",
    "name": "Jane Doe",
    "accessToken": "<jwt>",
    "expiresAt": 1750000000
  },
  "message": "Login successful"
}
```

**Response (error):**
```json
{
  "error": "Invalid credentials"
}
```

---

#### `POST /api/auth/signup`

**Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "password": "securePass123",
  "agreedToTerms": true
}
```

**Response (success):** Same shape as login response.

**Validation rules:**
- `email` must be valid format.
- `password` must be ≥ 8 characters.
- `agreedToTerms` must be `true`.

---

#### `POST /api/auth/forgot-password`

**Request:**
```json
{ "email": "user@example.com" }
```

**Response (success):**
```json
{ "message": "Reset link sent. Check your inbox." }
```

---

## 6. Database Schema

*(Planned — not yet implemented)*

### Users Collection / Table

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | string | Unique, indexed |
| `passwordHash` | string | bcrypt, never stored in plain text |
| `firstName` | string | |
| `lastName` | string | |
| `createdAt` | timestamp | |
| `updatedAt` | timestamp | |
| `oauthProvider` | enum | `null \| 'google' \| 'linkedin'` |
| `oauthId` | string | External provider user ID |
| `rememberMeToken` | string | Hashed refresh token for 30-day sessions |

---

## 7. Dependencies

### 7.1 `next` — `^16.2.9`

**Why:** The foundational framework. App Router provides RSC, streaming, nested layouts, and built-in image/font optimisation. Next.js 16 includes Turbopack by default (disabled in our config for now).

**Alternatives considered:** Remix, Vite + React Router. Next.js was chosen for its maturity, Vercel deployment story, and `next/image` + `next/font` performance primitives.

---

### 7.2 `react` + `react-dom` — `^19.0.0`

**Why:** React 19 introduces the Actions API (async transitions), improved hydration, and better error boundaries. Pairs with Next.js 16's RSC model.

---

### 7.3 `typescript` — `^5`

**Why:** Strict typing prevents entire categories of runtime bugs. Particularly important for a fintech app where data integrity matters.

---

### 7.4 `tailwindcss` — `^3.4.17`

**Why:** Utility-first CSS allows rapid, consistent UI development without context-switching to CSS files. The `tailwind.config.js` encodes the full FinanceHer design system as tokens, making all design decisions traceable and changeable from one place.

**Alternatives considered:** CSS Modules (too verbose for rapid prototyping), styled-components (runtime overhead, RSC incompatible), Vanilla CSS (acceptable but slower iteration).

**Trade-offs:** Class names can become long; mitigated by `cn()` helper and component abstraction.

---

### 7.5 `clsx` — `^2.1.1`

**Why:** Conditional class composition in JSX. Without it, string concatenation for conditional classes is error-prone and unreadable.

---

### 7.6 `tailwind-merge` — `^2.5.5`

**Why:** When composing Tailwind classes from props and defaults, conflicting utilities (e.g., `py-2` and `py-4`) can both appear. `tailwind-merge` resolves conflicts by keeping the last defined utility. Combined with `clsx` in the `cn()` helper.

---

### 7.7 `postcss` — `^8.5.15`

**Why:** PostCSS is the transformation pipeline that processes `@tailwind` directives into real CSS. Required by Tailwind CSS.

---

### 7.8 `autoprefixer` — `^10.5.2`

**Why:** Automatically adds vendor prefixes (`-webkit-`, `-moz-`) to CSS properties based on browser support targets. Prevents cross-browser styling bugs without manual prefix management.

---

### 7.9 `eslint` + `eslint-config-next` — `^16.2.9`

**Why:** Static code analysis catching common mistakes (`no-img-element`, `no-unescaped-entities`, unused imports). The Next.js config includes React Hooks rules and Core Web Vitals rules.

---

## 8. Security

### 8.1 Authentication *(planned)*

- **Strategy:** JWT access token (short-lived, ~15 min) + HTTP-only cookie refresh token (30 days when "remember me" is checked).
- **Password hashing:** `bcrypt` with cost factor ≥ 12.
- **OAuth:** Standard OAuth 2.0 PKCE flow. Tokens never stored on the client beyond the session.

### 8.2 Input Validation

- **Client-side:** HTML5 `required`, `type`, `minLength` attributes + custom JS validation in form handlers.
- **Server-side (planned):** `zod` schema validation on every API route — client validation is UX, server validation is security.

### 8.3 Data Protection

- Passwords never logged, never sent to analytics.
- Financial data will be encrypted at rest in the database.
- PII (email, name) treated as sensitive; never included in client-side analytics events.

### 8.4 Rate Limiting *(planned)*

- Auth endpoints will be rate-limited (e.g., 10 login attempts per IP per 15 minutes).
- Implementation: Redis-based rate limiter (`upstash/ratelimit` or `express-rate-limit`).

### 8.5 Current Security Surface

| Area | Status |
|---|---|
| XSS | Protected by React's JSX escaping |
| CSRF | Next.js Server Actions include built-in CSRF protection |
| SQL Injection | N/A (no DB yet); will use parameterised queries |
| Secrets | `.env.local` in `.gitignore`; no secrets in code |

---

## 9. Performance

### 9.1 Optimisations Applied

| Optimisation | How | File |
|---|---|---|
| Font loading | `next/font/google` self-hosts fonts — zero external requests, zero CLS | `layout.tsx` |
| Auth hero image | `next/image` with `priority`, `fill`, `sizes` — avoids layout shift, LCP optimised | `AuthHeroPanel.tsx` |
| Landing images | `next/image` with `fill`, `sizes` on all 4 hero grid images + literacy hub image | `HeroSection.tsx`, `FeaturesBentoSection.tsx` |
| Zero JS on static panels | `HeroSection`, `FeaturesBentoSection`, `CtaBanner`, `SiteFooter` are Server Components | Multiple |
| Scroll reveal | `ScrollReveal` uses `IntersectionObserver` — animates only when in viewport, no polling | `ScrollReveal.tsx` |
| Tailwind purging | Tailwind v3 scans all `src/**/*.{ts,tsx}` files and removes unused classes | `tailwind.config.js` |
| CSS specificity | `cn()` + `tailwind-merge` prevents duplicate/conflicting CSS rules in output | `lib/utils.ts` |

### 9.2 Bundle Considerations

- Forms are `'use client'` — their React runtime is included in the JS bundle.
- Layout/hero panels are Server Components — zero JS contribution.
- Material Symbols is loaded via `<link>` as a variable font — one request, all weights.

### 9.3 Planned Optimisations

- Code-split dashboard and feature routes (automatic with Next.js App Router).
- Prefetch dashboard route after successful login.
- Use TanStack Query for API response caching to avoid redundant requests.
- Lazy-load charts and heavy visualisation libraries.

---

## 10. Configuration Files

### `tailwind.config.js`

Encodes the complete FinanceHer design system:
- **Colors:** Full Material Design 3 color role mapping (`primary`, `surface`, `on-surface`, etc.) + dark mode equivalents.
- **Typography:** Poppins (headings/display), Inter (body/labels) with named size tokens (`display-lg`, `headline-md`, `body-sm`, etc.).
- **Spacing:** Named spacing tokens (`stack-lg`, `stack-md`, `gutter`, etc.).
- **Animations:** `fade-in`, `slide-up` keyframe animations.
- **Shadows:** `auth-card`, `primary-glow` semantic shadow tokens.
- **`backgroundImage`:** `hero-gradient` — replaces the `.hero-gradient` inline `<style>` class from the original HTML. Usage: `className="bg-hero-gradient"`.
- **`gridTemplateColumns`:** `12` — enables `grid-cols-12` for the bento layout. Replaces the custom `.bento-grid` CSS class.

### `next.config.js`

- `images.remotePatterns` — Allows `lh3.googleusercontent.com` for hero and OAuth images.
- `serverActions.allowedOrigins` — Restricts Server Actions to localhost in development. **Update this for production domain.**

### `tsconfig.json`

- `strict: true` — Enables all strict type checks.
- `paths: { "@/*": ["./src/*"] }` — Enables absolute imports from `src/` using `@/` prefix.

### `postcss.config.js`

- `tailwindcss` + `autoprefixer` plugins. Standard Tailwind CSS setup.
