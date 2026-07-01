# FinanceHer — Learning Document

> **Living Document** — Every implementation milestone adds concepts, explanations, interview questions, and lessons.  
> Last updated: 2026-06-28 (Milestone 4 — Onboarding Flow)
> Audience: The primary developer maintaining and extending FinanceHer.

---

## Table of Contents

1. [Milestone 1 — Project Scaffold & Auth UI](#milestone-1--project-scaffold--auth-ui)
2. [Milestone 2 — CSS Build Fix & Next.js Best Practices](#milestone-2--css-build-fix--nextjs-best-practices)
3. [Milestone 3 — Landing Page Refactor](#milestone-3--landing-page-refactor)
4. [Milestone 4 — Onboarding Flow Refactor](#milestone-4--onboarding-flow-refactor)
5. [Interview Question Bank](#interview-question-bank)
6. [Common Mistakes Log](#common-mistakes-log)
7. [Alternatives Considered](#alternatives-considered)
8. [Future Improvements](#future-improvements)
9. [Developer Notes](#developer-notes)

---

## Milestone 1 — Project Scaffold & Auth UI

### What was built?

A production-quality Next.js 16 + TypeScript + Tailwind CSS application with:

- Full project scaffold with scalable folder structure.
- FinanceHer design system encoded as Tailwind config tokens.
- Authentication page with Login, Sign Up, and Forgot Password flows.
- Reusable UI primitives: `Button`, `Input`, `FormLabel`, `FormField`.
- Layout component: `Header`.
- Auth feature components: `AuthCard`, `AuthHeroPanel`, `AuthTabs`, `LoginForm`, `SignupForm`, `ForgotPasswordForm`, `OAuthSection`.
- Service layer stubs in `auth.service.ts` — ready for real API wiring.
- TypeScript interfaces for all domain types.
- WCAG 2.1 AA accessibility baseline.
- Full dark mode support.

---

### Why was it built this way?

#### Why Next.js App Router instead of Pages Router?

Next.js has two router paradigms:

- **Pages Router (`pages/`):** The original Next.js routing system. Every file in `pages/` is a route. All components are client-side React by default.
- **App Router (`app/`):** Introduced in Next.js 13, stable in 14+. Built on React Server Components (RSC). The default is *server*, and you opt-in to client behaviour with `'use client'`.

We chose App Router because:
1. **React Server Components** — pages with no interactivity (Header, hero panel) send zero JavaScript to the browser.
2. **Nested layouts** — the root `layout.tsx` can wrap all routes; future feature layouts can nest inside it.
3. **Colocated metadata** — `export const metadata` in each page file is typed, composable, and understood by Next.js for `<head>` generation without a custom `_document.js`.
4. **Server Actions** — future forms can post data directly to server functions without a separate API route.

#### Why `'use client'` only on forms?

React Server Components (RSC) run on the server and produce HTML. They cannot use `useState`, `useEffect`, browser APIs, or event listeners. When a component needs any of these, it must be marked `'use client'`.

The auth page has two types of components:
- **Interactive (needs `'use client'`):** Forms with state, event handlers (`LoginForm`, `SignupForm`, etc.)
- **Static (stays server):** `AuthHeroPanel` (renders an image + text), `Header` (renders nav links), `page.tsx` (renders layout + metadata)

By keeping server components server-side, the browser never downloads their JavaScript. This directly reduces Time to Interactive (TTI).

#### Why a service layer (`services/auth.service.ts`)?

Components should not know *how* data is fetched — only that they can request it. If `LoginForm` directly called `fetch('/api/auth/login', ...)`, then:
- Changing the API URL requires editing the component.
- Adding request headers (Authorization, Content-Type) means editing every form.
- Unit testing the component requires mocking `fetch` globally.

With a service layer:
- Components call `loginWithEmail(data)` — they don't care how it works.
- The service layer is the single place to add auth headers, error parsing, retry logic.
- Mocking in tests: mock `auth.service.ts`, not `fetch`.

#### Why feature-based folder structure?

Two common approaches:

**Type-based (anti-pattern for large apps):**
```
components/
  Button.tsx
  LoginForm.tsx
  Dashboard.tsx
pages/
  auth.tsx
  dashboard.tsx
```

**Feature-based (used here):**
```
components/
  ui/          ← generic primitives
  auth/        ← auth feature
  dashboard/   ← dashboard feature (future)
```

Feature-based colocation means everything related to auth lives in `components/auth/`. Adding a new developer to work on Goals doesn't require them to understand the auth folder. Deleting a feature means deleting one folder.

---

### What concepts should I learn?

#### React Server Components (RSC)

RSC is the most significant paradigm shift in React since hooks. Key ideas:
- Server Components run on the server at request time or build time.
- They can `async/await` directly (no `useEffect` needed for data fetching).
- They never re-render on the client.
- They cannot use browser APIs, state, or effects.
- They can import Server-only libraries (database clients, secrets) without leaking them to the client.

**Study resources:**
- [React docs: Server Components](https://react.dev/reference/rsc/server-components)
- [Next.js docs: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)

#### `forwardRef` in React

`Button` and `Input` use `forwardRef`. Why?

```tsx
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

Without `forwardRef`, a parent component cannot obtain a ref to the underlying DOM element. This is important when:
- A parent needs to programmatically focus an input (e.g., focus the email field when a modal opens).
- A form library (like React Hook Form) needs DOM refs for validation.

`forwardRef` wraps the component and passes the ref through to the designated DOM element.

#### `useId()` Hook

Every form input must have a unique `id` that matches its `<label>`'s `htmlFor`. If you hardcode IDs (`id="email"`), you'll get duplicate-ID bugs when a component renders twice (e.g., in a modal and on a page simultaneously).

`useId()` generates a stable, unique ID per component instance:
```tsx
const emailId = useId(); // ":r0:" or similar
<label htmlFor={emailId}>Email</label>
<input id={emailId} />
```

This is a React 18+ hook. Never use it to generate list keys (use data IDs for that).

#### Tailwind `cn()` Pattern

```ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**`clsx`** handles conditional classes:
```ts
clsx('text-sm', isError && 'text-red-500', { 'opacity-50': disabled })
// → "text-sm text-red-500 opacity-50"
```

**`tailwind-merge`** resolves Tailwind conflicts:
```ts
twMerge('py-2 py-4') // → "py-4" (last one wins)
twMerge('text-sm', 'text-lg') // → "text-lg"
```

Without `tailwind-merge`, both `py-2` and `py-4` would be in the class string, and the browser would apply whichever has higher specificity in the CSS output (non-obvious behaviour).

#### ARIA Roles and Patterns

For the tab navigation, we implemented the ARIA Tabs pattern:

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="login-panel" id="login-tab">Log In</button>
  <button role="tab" aria-selected="false" aria-controls="signup-panel" id="signup-tab">Sign Up</button>
</div>

<form role="tabpanel" id="login-panel" aria-labelledby="login-tab">...</form>
<form role="tabpanel" id="signup-panel" aria-labelledby="signup-tab">...</form>
```

This allows screen readers to announce: *"Log In, tab, selected, 1 of 2"* and navigate between panels correctly.

Key ARIA attributes used:
- `role="tablist"` — container of tabs
- `role="tab"` — individual tab button
- `aria-selected` — which tab is active
- `aria-controls` — which panel this tab controls
- `role="tabpanel"` — the content area controlled by a tab
- `aria-labelledby` — what labels this panel (points to the tab)
- `aria-invalid` — input has an error
- `aria-describedby` — links input to its error message
- `aria-busy` — button is in loading state
- `aria-hidden="true"` — decorative elements screen readers should skip

#### `next/font` vs `@import` for Fonts

**`@import url(googleapis.com/...)` in CSS:**
- Browser must first download the CSS file.
- Then discover the `@import`.
- Then make a second request to Google Fonts.
- Then download the font files.
- Multiple round-trips = render-blocking font loading = FOUT (Flash of Unstyled Text) = CLS.

**`next/font/google`:**
- Next.js downloads the font files at build time.
- Serves them from the same domain (no cross-origin request).
- Injects `<link rel="preload">` automatically.
- CSS is generated inline or as a separate optimised stylesheet.
- Result: zero layout shift, zero additional network round-trips, no privacy leakage to Google.

**Rule:** Always use `next/font` in Next.js projects. Never use `@import url(googleapis.com)` in CSS files.

---

## Milestone 2 — CSS Build Fix & Next.js Best Practices

### What was built?

Fixed four build-breaking or correctness bugs:

1. `@import url()` appearing after `@tailwind` directives in `globals.css` — PostCSS parsing error.
2. Redundant `@import url()` for fonts already handled by `next/font`.
3. Manual `--font-*` CSS variables in `:root` shadowing `next/font`'s generated variables.
4. `serverActions` inside `experimental` block — deprecated in Next.js 15+.

Also fixed: `eslint-config-next` version mismatch with installed `next`.

---

### Why was it built this way?

#### CSS `@import` Ordering Rule

The CSS specification (CSS Cascading and Inheritance Level 4) states:

> **Any `@import` rules must precede all other rules** (other than `@charset` and `@layer`) in a CSS file. An `@import` that appears after any other rule is invalid and ignored.

PostCSS enforces this strictly. When it saw:
```css
@tailwind base;         /* ← processes this first */
@tailwind components;
@tailwind utilities;
@import url('...');     /* ← ERROR: @import after other rules */
```

It threw a parsing error because by the time it reached `@import`, it had already processed other at-rules.

**The fix:** Remove the `@import` entirely, since the fonts are loaded by other means (`next/font`, `<link>`).

**If you ever needed `@import` for a legitimate reason**, it must go *before* `@tailwind` directives:
```css
@import 'some-other-stylesheet.css'; /* ← MUST be first */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Why the `--font-*` variables conflicted with `next/font`

`next/font` works like this:

1. At build time, it generates a CSS class like `.inter_variable` with:
   ```css
   .inter_variable { --font-inter: 'Inter', ...; }
   ```
2. It adds this class to `<html>` via `className={inter.variable}`.
3. `--font-inter` is now available as a CSS custom property on all descendants.

When `globals.css` declared:
```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-poppins: 'Poppins', sans-serif;
}
```

Both `:root` and `html` have the same specificity in CSS. Since `globals.css` is loaded as a stylesheet (after the `next/font` inline styles), these declarations *overwrote* the `next/font` variables with static strings.

The consequence: `.font-inter { font-family: var(--font-inter) }` would resolve to `'Inter', sans-serif` (the string literal) rather than the self-hosted `next/font` font stack. The fonts would still *appear* to work (because the name is the same), but you'd be loading fonts from Google's CDN instead of the optimised self-hosted version.

---

### What concepts should I learn?

#### PostCSS Processing Pipeline

PostCSS is a CSS transformation tool. It parses CSS into an Abstract Syntax Tree (AST), transforms it using plugins, and outputs CSS.

In this project:
1. **`tailwindcss` plugin** — scans all template files, finds all used utility classes, and generates the corresponding CSS. Replaces `@tailwind base/components/utilities` directives.
2. **`autoprefixer` plugin** — traverses the generated CSS and adds vendor prefixes based on [Can I Use](https://caniuse.com/) data.

**Order matters:** Tailwind runs first (generates CSS), then Autoprefixer adds prefixes.

**The `@import` parsing error** happens because PostCSS processes the file top-to-bottom. Once it has processed `@tailwind base` (which expands into hundreds of CSS rules), it has already "committed" to a non-import context. Seeing `@import` after that violates the CSS spec.

#### CSS Custom Properties (CSS Variables) and Specificity

CSS custom properties (variables) follow the same cascade rules as regular CSS properties:

```css
:root { --color: red; }      /* specificity: 0-0-0 */
html { --color: blue; }      /* specificity: 0-0-1 — wins over :root */
.class { --color: green; }   /* specificity: 0-1-0 — wins over html */
```

The `next/font` generated class (e.g., `.inter_variable`) has specificity `0-1-0`. The `:root` declaration in globals.css has specificity `0-0-0`. So `next/font` *should* win — but the load order also matters for equal-specificity declarations.

The safest rule: **let `next/font` own its CSS variables**. Don't redeclare them.

#### Next.js Configuration Schema Evolution

Next.js moves features from `experimental` to stable as they mature:

| Feature | Moved to stable in |
|---|---|
| `appDir` | Next.js 13.4 |
| `serverActions` | Next.js 14.0 |
| `serverComponentsExternalPackages` | Next.js 14.2 (renamed) |
| `Turbopack` (dev) | Next.js 15.0 |

When a feature leaves `experimental`, the `experimental` key for it is *ignored* (and may throw a warning). Always check the [Next.js upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading) when bumping major versions.

---

## Milestone 3 — Landing Page Refactor

### What was built?

A production-ready Next.js landing page at `/` (auth page moved to `/auth`) with:

- **`LandingNav`** — sticky nav with active links, mobile hamburger toggle, "Log In" + "Get Started" CTAs.
- **`HeroSection`** — badge pill, headline, two CTAs, 4-image tilted grid using `next/image`.
- **`FeaturesBentoSection`** — 12-column bento grid with 4 feature cards + scroll reveal animations.
- **`CtaBanner`** — full-width CTA with decorative blobs.
- **`SiteFooter`** — semantic footer with nav landmark.
- **`ScrollReveal`** — reusable `IntersectionObserver` animation wrapper.
- Auth route moved from `/` to `/auth`.
- Hero gradient moved from inline `<style>` tag to `tailwind.config.js` `backgroundImage` token.
- Custom `.bento-grid` CSS replaced with Tailwind `grid-cols-12`.

---

### Critical Bug Fixed: `data-alt` instead of `alt`

The original HTML used `data-alt` on all `<img>` tags:
```html
<img data-alt="Professional woman..." src="...">
```

`data-alt` is a **custom HTML attribute** — browsers and screen readers completely ignore it. The actual `alt` attribute was empty (missing), meaning all images were announced as decorative to screen readers, and search engines had no image context.

**Fix:** Every image now has a proper `alt` attribute with descriptive text.

**Why this is a serious bug:** In a fintech app, alt text matters for:
- **Screen reader users** — without alt text, images are invisible to them.
- **SEO** — Google uses alt text for image indexing.
- **WCAG 2.1 AA compliance** — meaningful images must have text alternatives.

---

### What concepts should I learn?

#### `IntersectionObserver` API

The browser's `IntersectionObserver` fires a callback when a DOM element enters or exits the viewport:

```ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // element is visible
      }
    });
  },
  { threshold: 0.1 } // fire when 10% of element is visible
);

observer.observe(element);
observer.disconnect(); // clean up when done
```

**Why use it instead of scroll event?** `scroll` fires on every scroll tick (60fps = 60 events/sec), which is expensive. `IntersectionObserver` is browser-native and runs off the main thread — no performance impact.

**Why disconnect after first trigger?** Once an element has animated in, it doesn't need to animate again. Disconnecting removes the observer from memory (prevents leaks).

#### React `useEffect` cleanup

The `ScrollReveal` component demonstrates the cleanup pattern:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(...);
  observer.observe(el);

  return () => observer.disconnect(); // ← cleanup function
}, []);
```

The function returned from `useEffect` is called when:
- The component unmounts.
- The effect re-runs (deps changed).

Without cleanup, the observer would keep running even after the component is removed from the DOM — a memory leak.

#### HTML Data Attributes vs Standard Attributes

`data-*` attributes are for **developer-defined custom metadata** that JavaScript reads:
```html
<div data-user-id="123" data-role="admin">...</div>
```
```ts
el.dataset.userId; // "123"
el.dataset.role; // "admin"
```

`data-alt` is NOT an alternative to `alt`. The `alt` attribute is a **standard HTML attribute** with defined semantics: it's the text equivalent of an image for screen readers, SEO bots, and broken-image fallback display.

**Rule:** Never use `data-*` for attributes that have a native HTML equivalent.

#### Tailwind Config Extensions: `backgroundImage` and `gridTemplateColumns`

Tailwind's theme `extend` key allows adding new utilities without replacing defaults.

**`backgroundImage`** — generates `bg-*` utilities:
```js
// tailwind.config.js
backgroundImage: {
  'hero-gradient': 'radial-gradient(circle at 70% 30%, ...) ',
}
// Usage: className="bg-hero-gradient"
```

**`gridTemplateColumns`** — generates `grid-cols-*` utilities:
```js
gridTemplateColumns: {
  12: 'repeat(12, minmax(0, 1fr))',
}
// Usage: className="grid-cols-12"
```

By encoding these in config rather than in a `<style>` tag or custom CSS class, they:
- Are tree-shaken (only included if used).
- Participate in Tailwind's responsive modifier system (`md:grid-cols-12`).
- Are discoverable in the design system config.

#### ARIA `role="progressbar"`

For the goal progress indicator, a plain `<div>` with a width style is visually clear but semantically invisible:

```html
<!-- ❌ Inaccessible -->
<div style="width: 75%; height: 8px; background: purple;"></div>

<!-- ✅ Accessible -->
<div
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Paris Trip savings goal: 75% complete"
></div>
```

Screen readers will announce: *"Paris Trip savings goal: 75% complete, progress bar"*.

## Milestone 4 — Onboarding Flow Refactor

### What was built?

An accessible, responsive, and dynamic multi-step wizard onboarding flow at `/onboarding` using Next.js 16 client components.

*   **Modular Wizard Architecture:** Dynamic rendering of 9 distinct onboarding step screens (`StepOccupationIncome` through `StepSuccess`) managed by a central parent layout.
*   **Progressive Form State:** Consolidates state-driven inputs (e.g. occupation text, numerical income, dependent selection groups, goal checklist, experience radio lists, and a 1-5 risk slider).
*   **Live Risk Descriptions:** Range-slider triggers dynamic descriptions updating real-time text feedback according to the selected risk rating (Conservative, Moderate, Aggressive).
*   **Dynamic Financial Optimization Engine:** The success page computes a tailored plan summary using the user's career, net income, fixed expenses, liquid savings, and liability values to pinpoint key savings opportunities or emergency fund recommendation values.

### Why was it built this way?

#### Keyboard Accessibility of Custom Forms
Standard custom-styled input groups (such as checkbox cards or radio buttons) often use `display: none` or `hidden` classes to hide native controls, which completely drops them from the document tab order. Assistive technologies and keyboard-only users cannot focus or toggle them.
*   **Solution:** We use Tailwind's `sr-only` class to hide the native input visually but leave it in the DOM focus layout. Sibling labels utilize Tailwind peer indicators (like `peer-checked:bg-*` and `peer-focus-visible:ring-*`) to show custom selection styles only when tab-focused.

#### Semantic Landmark Encapsulation
Wizard screens are wrapped in HTML `<form>` or `<fieldset>` tags with `<legend>` structures rather than plain divs. This ensures screen readers announce the category header (e.g. "Number of dependents") before reading option names.

## Milestone 5 — Dashboard Refactor

### What was built?

An accessible, responsive, and componentized financial dashboard at `/dashboard` built with Next.js 16 and Tailwind.

*   **Modular Component Layout:** Created 8 high-fidelity widgets under `src/components/dashboard/` orchestrated from the main client page.
*   **Fully Responsive Mobile Drawer:** Rebuilt the sidebar navigation to support desktop layouts (`hidden md:flex`) and custom sliding drawers on mobile/tablet views toggled via a header hamburger.
*   **State-driven Micro-animations:** Configured the `IncomeExpenseChart` with inline transition percentages triggered on mount (`useEffect`) alongside hover tooltips.
*   **Accessibility Adherence:** Annotated progress bars, SVG elements, delta metrics, and search controls with proper labels, labels for screen readers, and focus outline behaviors.

### Why was it built this way?

#### React-Native Mounting Transitions
Instead of raw jQuery or global document event listeners to animate heights of HTML chart columns, we used state variables toggled in React's `useEffect` hook. Sibling DOM components transition smoothly using Tailwind `transition-all duration-700 ease-out` classes, aligning with Next.js App Router render cycles.

#### Decoupled Layout Interfaces
The dashboard footer and headers are isolated from landing page variations. This preserves specific functional requirements (such as transaction additions, mobile slide overlays, and navigation states) without cluttering general site layout primitives.

---

## Interview Question Bank

### Beginner Questions

**React:**
1. What is the difference between `props` and `state` in React?
2. What does `useState` return, and when would you use it?
3. What is `key` in React lists, and why is it important?
4. What is the difference between controlled and uncontrolled inputs?
5. What does `useEffect` do, and what is its dependency array for?
6. What is prop drilling, and how do you avoid it?

**TypeScript:**
1. What is the difference between `interface` and `type` in TypeScript?
2. What does `Readonly<T>` do?
3. What is the difference between `any` and `unknown`?
4. What is a type guard? Write an example.

**CSS/Tailwind:**
1. What is the CSS box model?
2. What is the difference between `flex` and `grid`?
3. What does `tailwind-merge` solve that `clsx` alone does not?
4. What is CSS specificity and how is it calculated?

**Next.js:**
1. What is the difference between `getServerSideProps`, `getStaticProps`, and Server Components?
2. What does `next/image` do that a plain `<img>` tag does not?
3. What is the purpose of `layout.tsx` in the App Router?

### Intermediate Questions

**React:**
1. Explain React Server Components. How are they different from regular React components?
2. What is `forwardRef` and when do you need it?
3. What is `useId()` and why should you use it instead of a hardcoded `id`?
4. What is the difference between `useMemo`, `useCallback`, and `memo`?
5. What causes an "infinite re-render" loop in `useEffect`?
6. What is the React Suspense boundary and how does it work?

**TypeScript:**
1. What is a discriminated union? Write an example relevant to `AuthView`.
2. What is the difference between `Omit<T, K>`, `Pick<T, K>`, and `Partial<T>`?
3. What does `infer` do in conditional types?
4. What is the `satisfies` operator introduced in TypeScript 4.9?

**CSS/Tailwind:**
1. Explain the `@layer` directive in Tailwind. Why does order within layers matter?
2. What is the CSS `@import` ordering rule? Why does PostCSS enforce it?
3. What is CLS (Cumulative Layout Shift) and how does `next/font` prevent it?
4. What is the difference between `display: block`, `display: flex`, and `display: grid`?

**Next.js:**
1. Explain the difference between the Pages Router and App Router in Next.js.
2. What is a React Server Component vs. a Client Component in the App Router? When would you use each?
3. How does `next/font` work under the hood? Why is it better than a Google Fonts `@import`?
4. What is the purpose of `'use client'` at the top of a file?
5. What are Server Actions? How do they differ from API Routes?
6. How does Next.js handle metadata? What is the `metadata` export?

**Architecture:**
1. What is the "service layer" pattern? Why separate service calls from UI components?
2. What is a "barrel export" (`index.ts`)? What are its benefits and drawbacks?
3. Explain feature-based vs. type-based folder structures. When does each make sense?

### Advanced Questions

**React:**
1. Explain the React reconciliation algorithm (the diffing algorithm). How does it decide what to re-render?
2. What are the rules of React hooks, and why do they exist?
3. What is Concurrent Mode? How do `startTransition` and `useTransition` work?
4. Explain streaming server-side rendering. How does React's Suspense enable it?
5. What is the React Fiber architecture? How does it improve over the old stack reconciler?

**TypeScript:**
1. Explain variance in TypeScript generics (covariance, contravariance, invariance).
2. What is a mapped type? Write a `DeepReadonly<T>` type utility.
3. Explain template literal types with an example.

**Next.js/Web Performance:**
1. What are Core Web Vitals? How do LCP, FID/INP, and CLS relate to Next.js optimisations?
2. Explain how React Server Components affect the JavaScript bundle sent to the browser.
3. What is the difference between `dynamic` imports and static imports in Next.js? When would you use each?
4. Explain how Next.js caches Server Components. What is the `cache` option on `fetch`?
5. What is ISR (Incremental Static Regeneration) and when would you use it over SSR?

**Security:**
1. Explain CSRF. How do Next.js Server Actions mitigate it?
2. What is the difference between `httpOnly`, `secure`, and `sameSite` cookie attributes?
3. What is JWT? What are its advantages and risks compared to server-side sessions?
4. Explain XSS (Cross-Site Scripting). How does React's JSX prevent it by default?

**Accessibility:**
1. What is the ARIA tab pattern? Implement it correctly with `tablist`, `tab`, and `tabpanel`.
2. What is the difference between `aria-hidden`, `aria-label`, and `aria-labelledby`?
3. What is the purpose of a skip-navigation link?
4. How do you ensure focus management when a modal opens and closes?
5. What is the difference between `role="alert"` and `role="status"`?

---

## Common Mistakes Log

### Mistake 1 — `@import` after `@tailwind` directives

**What happened:** `globals.css` placed `@import url(...)` on lines 6–7, after the `@tailwind` directives on lines 1–3. PostCSS threw a CSS parsing error on every build.

**Why it's wrong:** The CSS spec requires `@import` to precede all other rules. PostCSS enforces this strictly.

**Fix:** Remove the `@import` lines (fonts are loaded by `next/font` and `<link>`).

**Lesson:** In a Next.js project, you almost never need `@import` in `globals.css`. Fonts → `next/font`. Third-party CSS → `npm install` + `import 'pkg/styles.css'` in the component.

---

### Mistake 2 — Redeclaring `next/font` CSS variables in `:root`

**What happened:** `:root { --font-inter: 'Inter', sans-serif; }` in `globals.css` shadowed the variables that `next/font` generates.

**Why it's wrong:** `next/font` injects its own `--font-inter` variable via a scoped CSS class. Redeclaring it in `:root` with a static string bypasses `next/font`'s self-hosted font stack.

**Fix:** Delete the manual variable declarations. Trust `next/font`.

**Lesson:** CSS variables follow the cascade. When in doubt, inspect the browser's computed styles to see which declaration wins.

---

### Mistake 3 — `serverActions` under `experimental` in Next.js 15+

**What happened:** `experimental.serverActions` was used in `next.config.js`. This key is ignored in Next.js 15+ (Server Actions are stable) and produced warnings.

**Fix:** Move to top-level `serverActions` key.

**Lesson:** Always check the [Next.js changelog](https://github.com/vercel/next.js/releases) when upgrading major versions. Features graduate from `experimental` and the old keys may be silently ignored.

---

### Mistake 4 — Version mismatch between `next` and `eslint-config-next`

**What happened:** `next` was `^16.2.9` but `eslint-config-next` was hardcoded to `15.3.3`. npm would either fail peer-dependency resolution or use a mismatched ESLint config, producing incorrect lint results.

**Fix:** Align `eslint-config-next` to `^16.2.9`.

**Lesson:** `eslint-config-next` must always match the installed `next` version. They share the same version number intentionally.

---

### Anti-Pattern: `<img>` instead of `next/image`

Never use `<img>` for meaningful images in a Next.js app. `next/image`:
- Automatically serves modern formats (WebP, AVIF).
- Lazy-loads below-the-fold images.
- Prevents CLS with reserved space.
- Optimises file size on the fly.

The ESLint rule `@next/next/no-img-element` will catch this.

---

### Anti-Pattern: Direct `fetch` in components

Components should never call `fetch()` directly. Always go through a service function. This keeps components testable, makes API changes isolated, and enables consistent error handling.

```tsx
// ❌ Anti-pattern
function LoginForm() {
  const handleSubmit = async () => {
    const res = await fetch('/api/auth/login', { ... });
  };
}

// ✅ Correct pattern
function LoginForm() {
  const handleSubmit = async () => {
    const result = await loginWithEmail(formData); // from auth.service.ts
  };
}
```

---

### Mistake 5 — `data-alt` instead of real `alt` attribute on images

**What happened:** The original landing page HTML used `data-alt="..."` on every image. `data-alt` is a custom data attribute — browsers and screen readers completely ignore it. The `alt` attribute was effectively empty on all images.

**Why it's wrong:** 
- Screen readers skip images with no `alt` (or treat them as decorative).
- Search engines have no image context for SEO.
- WCAG 2.1 Success Criterion 1.1.1 requires a text alternative for all non-decorative images.

**Fix:** Replace `data-alt` with proper `alt` text on every image.

**Lesson:** `data-*` attributes are for custom JavaScript metadata only. They have zero semantic meaning to browsers, assistive technologies, or search engines. Never use them as a substitute for native HTML attributes.

---

## Alternatives Considered

### Alternative 1 — Remix instead of Next.js

**Remix strengths:** Progressive enhancement, native form handling, cleaner data loading pattern (`loader`/`action`).

**Why Next.js was chosen:** Larger ecosystem, Vercel deployment is seamless, `next/image` and `next/font` are best-in-class, stronger community and job market relevance. Remix's form model is elegant but less familiar to most developers.

---

### Alternative 2 — CSS Modules instead of Tailwind

**CSS Modules strengths:** Scoped by default, standard CSS syntax, no utility class memorisation.

**Why Tailwind was chosen:** Faster iteration, design tokens as config (single source of truth), no context-switching to CSS files, better colocation of style and markup. The Tailwind config *is* the design system spec.

---

### Alternative 3 — Zustand for state management

**Zustand strengths:** Lightweight global state, simple API, good TypeScript support.

**Why not adopted yet:** All current state is local to components. Introducing global state before it's needed is premature. Will be adopted for session/user state when the Dashboard is built.

---

### Alternative 4 — React Hook Form for forms

**React Hook Form strengths:** Minimal re-renders, schema validation with `zod`, ref-based approach avoids controlled input overhead.

**Why not adopted yet:** Forms are simple at this stage; `useState` is sufficient. When forms grow in complexity (nested fields, wizard forms, server validation), React Hook Form + Zod will be the right migration.

---

### Alternative 5 — Styled Components / Emotion

**Strengths:** CSS-in-JS with dynamic styling, no class name collisions.

**Why not chosen:** Runtime overhead (styles generated in JS at render time), incompatible with React Server Components (they require client-side JS to inject styles), larger bundle size.

---

## Future Improvements

### Scalability Concerns

1. **Global state** — As features grow, prop-drilling will become painful. Plan to introduce React Context for auth session and Zustand or TanStack Query for server state.

2. **Form library** — As forms grow (multi-step onboarding, profile settings, expense entry), adopt React Hook Form + Zod for consistent validation and minimal re-renders.

3. **Monorepo** — When a mobile app (React Native) is added, extract `design-system` and `types` packages into a shared workspace.

4. **Testing** — No tests exist yet. Add:
   - Unit tests for `cn()`, validators, service functions (Jest / Vitest).
   - Component tests for UI primitives (React Testing Library).
   - E2E tests for critical flows (Playwright).

5. **Internationalisation** — If FinanceHer expands globally, `next-intl` should be added. The design system already uses a clean text model that would work with i18n keys.

### Refactoring Opportunities

1. **`AuthCard` view state** — Replace `AuthView` string union with a proper state machine (XState or a custom reducer) as the auth flow gains complexity (email verification step, MFA, etc.).

2. **Error handling** — Centralise error parsing in a utility function rather than having try/catch in every form handler.

3. **Form state** — Extract a `useFormState` custom hook to avoid duplicating `{ isLoading, error, success }` logic across all three forms.

---

## Developer Notes

### The `cn()` function is your best friend

Every time you write a component that accepts a `className` prop (which should be almost all of them), use `cn()` to merge it:

```tsx
<div className={cn('base-styles here', className, conditionalClass && 'applied-when-true')} />
```

This lets parent components customise styling without needing separate props for every style concern.

---

### Server Components vs Client Components — the mental model

Ask yourself: **"Does this component need to respond to user interaction or browser state?"**

- **No** → Keep it a Server Component. No `'use client'` directive needed.
- **Yes** → Add `'use client'` at the top.

Interactions include: click handlers, `onChange`, `useState`, `useEffect`, `useContext`, browser APIs (window, localStorage, navigator).

The goal is to push `'use client'` as deep into the tree as possible, so the outer shell of every page remains a server component.

---

### Adding a new auth OAuth provider

1. Add a new entry to `OAUTH_PROVIDERS` in `src/constants/index.ts`:
```ts
{ provider: 'github', label: 'GitHub', iconSrc: '...', iconAlt: 'GitHub logo' }
```
2. Add `'github'` to the `OAuthProvider` union type in `src/types/auth.ts`.
3. Add the redirect URL to `initiateOAuthFlow()` in `auth.service.ts`.
4. No changes to `OAuthSection.tsx` — it's data-driven.

---

### Adding a new page/feature

1. Create `src/app/[feature-name]/page.tsx` for the route.
2. Create `src/components/[feature-name]/` for the feature's components.
3. Add a service file `src/services/[feature].service.ts`.
4. Add types in `src/types/[feature].ts` and export from `src/types/index.ts`.
5. Add constants in `src/constants/index.ts` or a new `src/constants/[feature].ts` file.
6. Update `PRODUCT_DOC.md`, `TECH_DOC.md`, and `LEARNING_DOC.md`.

---

### When to update these documents

| Event | Documents to update |
|---|---|
| New feature built | PRODUCT_DOC (feature section), TECH_DOC (components, APIs), LEARNING_DOC (concepts, questions) |
| New dependency added | TECH_DOC (dependencies section) |
| Bug fixed | LEARNING_DOC (common mistakes), TECH_DOC if architectural |
| Design system changed | TECH_DOC (config section), PRODUCT_DOC if product-visible |
| Performance improvement | TECH_DOC (performance section), LEARNING_DOC (concepts) |
| Security hardening | TECH_DOC (security section), LEARNING_DOC (security questions) |

---

## Milestone 6 — Expenses Page

### What was built?

A full Expenses Tracker feature at `/expenses` including:

- **Route:** `src/app/expenses/page.tsx` + `layout.tsx` (with SEO metadata).
- **6 new components** in `src/components/expenses/`:
  - `ExpenseOverviewCards` — 4 KPI cards (Monthly Spend, Savings, Top Category, Budget Health).
  - `CategoryBreakdownChart` — SVG donut chart with 5-category breakdown + legend.
  - `SpendingTrendChart` — 6-month income vs. expense bar chart with avg. savings row.
  - `TransactionTable` — Search + category chip filter + status dropdown + sortable + paginated.
  - `InsightsPanel` — Severity-coded AI-ready insights feed.
  - `AddExpenseModal` — Fully accessible form modal with recurring toggle.
- **New type file:** `src/types/expense.ts` — complete type contracts for the AI input layer.
- **Mock data:** `src/constants/expense.mock.ts` — 20 realistic transactions + category breakdowns + monthly summary + insights.
- **SidebarNav updated:** `Expenses` route now points to `/expenses`; active-state detection generalised.
- **Types barrel updated:** `src/types/index.ts` now exports expense types.

---

### Why was it built this way?

#### Why design the data model first?

This page will eventually feed a Gemini AI RAG pipeline. Before writing any JSX, we designed the TypeScript types in `expense.ts` to ensure the AI can derive:

| AI signal | Source field |
|---|---|
| Spending patterns | `Transaction.category`, `Transaction.isoDate` |
| Category distribution | `CategoryBreakdown.percentage` |
| Savings rate | `MonthlySummary.savingsRate` |
| Expense trends | `MonthlySummary.expenseDeltaPercent` |
| Monthly cash flow | `MonthlySummary.netCashFlow` |
| Behavioral indicators | `Transaction.isRecurring`, `Transaction.note` |

The types are the stable API contract. When the backend is added, only the data source changes — not the types or components.

#### Why put mock data in `constants/` and not inline in the component?

Following the service-layer pattern already established for auth:
- **Components should not care where data comes from.** Today it's mock constants; tomorrow it's an API call.
- **Single replacement point.** When the API is ready, only `MOCK_MONTHLY_SUMMARY`, `MOCK_TRANSACTIONS`, and `MOCK_INSIGHTS` need to be replaced with service calls — the rest of the page code stays identical.
- **Types enforce the contract.** If the API returns a different shape, TypeScript will catch it at the type-checking stage, not at runtime.

#### Why use `useMemo` for filtering instead of a library?

The transaction list has 20 items (eventually hundreds from an API). The filter + sort logic is:
1. Pure function (no side effects).
2. Depends only on `transactions` and `filters`.
3. Expensive to run on every render (linear scan + sort).

`useMemo` memoises the result: it only re-computes when `transactions` or `filters` change, not on every parent re-render. This is exactly the use case `useMemo` is designed for.

**When would we switch to a library?** When the dataset grows to thousands of rows or when virtualisation (windowing) is needed. At that point, `@tanstack/react-table` (Headless UI table library) would handle filtering, sorting, pagination, and virtual rows efficiently.

#### Why build the SVG donut chart from scratch instead of Chart.js / Recharts?

- **Bundle size:** Chart.js adds ~220KB gzipped. Recharts adds ~130KB. Our SVG donut is zero additional bytes.
- **Design control:** Every pixel matches the FinanceHer design system (colors, spacing, dark mode).
- **Simplicity:** A donut chart is just 4–5 overlapping `<circle>` elements with `strokeDasharray`.
- **No hydration mismatch:** Library charts often use `window` or `document`, requiring `'use client'` and causing SSR issues. Our SVG is pure markup.

**When would we switch to a library?** Interactive charts with tooltips, animations, and real-time streaming data — Recharts or Victory would be more appropriate then.

#### Why a separate `ExpenseFilters` type for filter state?

Instead of managing 5+ separate `useState` calls (`search`, `category`, `status`, `sortField`, `sortDirection`), we use one `useState<ExpenseFilters>`. Benefits:

1. **Atomicity:** Filters reset together (one `setFilters(DEFAULT_FILTERS)` call).
2. **Readability:** `filters.sortField` is more descriptive than `sortField`.
3. **Extensibility:** Adding a new filter (`dateFrom`, `dateTo`) means adding one field to the type — not a new `useState`.
4. **AI-ready:** The entire `filters` state can be serialised and logged as a user behavioural signal (e.g., "user frequently filters by Dining category").

#### The SVG Donut Chart — How it works

```
Circle circumference with r = 15.915:
  C = 2π × 15.915 ≈ 100

This means strokeDasharray values map directly to percentages.

Segment 1: Housing (38%)
  strokeDasharray="38 62"   ← 38 filled, 62 gap
  strokeDashoffset="0"      ← starts at top (-90° due to rotate-90 on SVG)

Segment 2: Dining (11%)
  strokeDasharray="11 89"   ← 11 filled, 89 gap
  strokeDashoffset="-38"    ← starts after Housing (negative = clockwise)

Segment 3: Investments (17%)
  strokeDasharray="17 83"
  strokeDashoffset="-49"    ← after Housing (38) + Dining (11)
```

Each segment is a full circle with a "drawn" portion and a "gap" portion. The dash offset shifts the starting point. The `-rotate-90` on the `<svg>` element makes 0° start at the top (12 o'clock) instead of the right (3 o'clock).

---

### Key concepts introduced in this milestone

#### `useMemo` for derived state

```tsx
const filtered = useMemo(() => {
  let result = [...transactions];
  if (filters.search) result = result.filter(...);
  result.sort(...);
  return result;
}, [transactions, filters]); // Only recomputes when these change
```

**When NOT to use `useMemo`:**
- For trivial operations (string concatenation, simple additions). The memoisation overhead exceeds the compute savings.
- When dependencies change on almost every render (the cache is never hit).

**Rule of thumb:** `useMemo` is worthwhile for computations that are visually expensive or run over arrays of 50+ items.

#### Modal accessibility pattern

A correct modal implementation requires:

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Add Transaction</h2>
  ...
</div>
```

- `role="dialog"` — tells screen readers this is a modal dialogue.
- `aria-modal="true"` — tells screen readers everything outside the modal is inert.
- `aria-labelledby` — links the modal to its heading; screen reader announces: *"Add Transaction, dialog"*.
- **Focus trap** (not implemented yet) — pressing Tab should cycle only through focusable elements inside the modal.
- **Escape to close** — should call `onClose` when Escape is pressed.

> **TODO:** Add `useFocusTrap` hook and `Escape` key handler to `AddExpenseModal` in the next iteration.

#### The ARIA switch pattern

The recurring toggle uses a `div` with `role="switch"`:

```tsx
<div
  role="switch"
  aria-checked={form.isRecurring}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter') toggle();
  }}
>
```

Unlike a native `<input type="checkbox">`, the `role="switch"` communicates binary on/off state semantically. Screen readers announce: *"Recurring transaction, switch, off"* and users can toggle with Space or Enter.

#### Design pattern: `isAIGenerated` flag

The `ExpenseInsight` type has a boolean `isAIGenerated: boolean`. This is a **feature flag for the AI integration**:

```ts
// Today (rule-based)
{ isAIGenerated: false, title: 'Dining spend is 3× last month', ... }

// After Gemini integration
{ isAIGenerated: true, title: 'Consider meal prepping Tuesdays', ... }
```

When the AI is connected, the UI can show a "✦ AI" badge next to insights where `isAIGenerated === true`, building user trust gradually. The type contract is already defined — the component just needs to conditionally render the badge.

---

### Common mistakes to avoid

#### Mistake: Resetting `page` after filter changes

If you update `filters` without resetting `page`, the user might be on page 3 of a filtered result set that now has only 1 page — resulting in an empty table.

**Fix:** Always call `setPage(1)` alongside `setFilters(...)`:

```tsx
const handleCategory = (cat: string) => {
  setFilters(f => ({ ...f, category: cat }));
  setPage(1); // ← always reset to first page
};
```

#### Mistake: Non-SVG charts causing SSR hydration mismatch

Chart libraries that use `document.createElement` or `canvas` APIs fail during Server-Side Rendering. If you add a chart library, wrap the component:

```tsx
const Chart = dynamic(() => import('recharts').then(m => m.LineChart), { ssr: false });
```

Or ensure the component is explicitly `'use client'` and only mounted after hydration.

#### Mistake: Inline filter logic (no `useMemo`)

```tsx
// ❌ Runs on every render, even unrelated re-renders
const filtered = transactions.filter(...).sort(...);

// ✅ Only runs when dependencies change
const filtered = useMemo(() => transactions.filter(...).sort(...), [transactions, filters]);
```

---

### Future AI integration — how it plugs in

When the Gemini RAG pipeline is ready:

1. Create `src/services/expense.service.ts`:
   ```ts
   export async function getMonthySummary(): Promise<MonthlySummary> {
     const res = await fetch('/api/expenses/summary');
     return res.json();
   }
   export async function getInsights(): Promise<ExpenseInsight[]> {
     const res = await fetch('/api/insights');
     return res.json();
   }
   ```

2. In `ExpensesPage`, replace:
   ```tsx
   // Before
   import { MOCK_MONTHLY_SUMMARY, MOCK_INSIGHTS } from '@/constants/expense.mock';
   
   // After
   const summary = await getMonthySummary(); // Server Component data fetch
   const insights = await getInsights();
   ```

3. The `InsightsPanel` component, `CategoryBreakdownChart`, and `TransactionTable` receive the same props — **zero component changes needed.**

4. Flip `isAIGenerated: true` on AI-produced insights and add the badge UI.

This is the payoff of designing the data model before the UI. The UI is already the correct shape to receive AI output.

---

## Milestone 7 — Goals Page

### What was built?

A full Goal Planner feature at `/goals` including:

- **Route:** `src/app/goals/page.tsx` + `layout.tsx`.
- **6 new components** in `src/components/goals/`:
  - `GoalsOverviewCards` — 4 KPI cards (Total Saved, Active Goals, Monthly Commitment, Portfolio Progress).
  - `GoalCard` — Individual goal card with dynamic accent colour, animated progress bar, and on-track indicator.
  - `GoalProgressRace` — Horizontal bar chart ranking all goals by completion %.
  - `GoalInsightsPanel` — Same pattern as Expenses `InsightsPanel` — goal-specific AI-ready insights.
  - `GoalAIBanner` — Full-width CTA with 3 mini-stats and allocation breakdown.
  - `AddGoalModal` — 8-field form with priority toggle.
- **New type file:** `src/types/goal.ts` — full type contract (`Goal`, `GoalViewModel`, `GoalsOverview`, `GoalInsight`, `AddGoalFormData`).
- **Mock data:** `src/constants/goal.mock.ts` — 6 real-world goals, `toViewModel()` helper, overview summary, 4 AI insights.
- **SidebarNav updated:** Goals link changed from `#` to `/goals`.
- **Types barrel updated:** `src/types/index.ts` now exports goal types.

---

### Why was it built this way?

#### Why `GoalViewModel` extends `Goal` instead of being a separate type?

The `toViewModel()` helper runs once in `goal.mock.ts` at module load time and produces `GoalViewModel[]` from the raw `Goal[]`. This means:
- **No runtime computation in components.** All derived fields (`completionPercent`, `monthsRemaining`, `projectedCompletionDate`, `isOnTrack`) are pre-calculated.
- **Single source of truth.** `MOCK_GOALS` is `GoalViewModel[]`, so every component gets the full computed object without running the same maths multiple times.
- **Easy API migration.** When the backend returns a `Goal[]`, the page fetches it and calls `goals.map(toViewModel)` — one line change.

```ts
// today
export const MOCK_GOALS: GoalViewModel[] = RAW_GOALS.map(toViewModel);

// after API:
const rawGoals = await goalService.getGoals(); // returns Goal[]
const goals = rawGoals.map(toViewModel);       // still works exactly the same
```

#### Why dynamic `accentHex` per goal instead of shared primary colour?

Each goal category has a distinct visual identity (purple for Emergency Fund, red for Home, blue for Travel). This makes the page scannable without reading labels. Using inline `style={{ backgroundColor: accentHex }}` on the progress bar allows full flexibility without adding Tailwind arbitrary-value classes to every card variant.

**Rule:** Tailwind arbitrary values (`bg-[#E57373]`) are fine for **one-off** use (the card icon background), but for anything that also needs to render in SVG (the progress bar fill, box-shadow glow), use plain `style` — Tailwind can't generate SVG attributes.

#### Why filter goals client-side with `useMemo`?

Same reasoning as `TransactionTable`:
- 6 goals is a tiny dataset — no server round-trip needed.
- Both `activeCategory` and `activePriority` change frequently (user clicks chips).
- `useMemo([MOCK_GOALS, activeCategory, activePriority])` means the filter only re-runs when those two change, not on every unrelated parent re-render.

The filter logic is 4 lines and pure. There's no reason to add a filter library.

#### Why a `GoalProgressRace` chart instead of another donut?

The Expenses page already has a donut chart. Adding a second one on Goals would be visually redundant. A horizontal bar chart ("progress race") better communicates:
- **Relative standing** of goals: which one is furthest along?
- **Urgency**: which goal is closest to done and could be completed first?
- **Actionability**: the "sort by completion %" framing matches how the AI would rank goals for reallocation recommendations.

---

### Key concepts introduced in this milestone

#### The `GoalViewModel` pattern — enriched view objects

A pattern used widely in enterprise apps: separate the **raw data model** (what the DB stores) from the **view model** (what the UI needs).

```ts
// Goal: stored in DB / returned by API
interface Goal {
  currentAmount: number;
  targetAmount: number;
  monthlyContribution: number;
  targetDate: string;
}

// GoalViewModel: enriched for UI (computed from Goal)
interface GoalViewModel extends Goal {
  completionPercent: number;     // (current / target) * 100
  remainingAmount: number;       // target - current
  monthsRemaining: number;       // ceil(remaining / monthly)
  projectedCompletionDate: string;
  isOnTrack: boolean;
}
```

**Benefits:**
1. Components receive `goal.completionPercent` — no arithmetic in JSX.
2. AI pipeline receives structured signals directly — `monthsRemaining` is the key input.
3. Sorting and filtering by `completionPercent` is trivial (it's pre-computed).

#### ARIA progressbar pattern

```tsx
<div
  role="progressbar"
  aria-valuenow={75}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Emergency Fund: 75%"
>
  <div style={{ width: '75%' }} />
</div>
```

Screen readers announce: *"Emergency Fund: 75%, progress bar"*.

**Without `role="progressbar"`** the screen reader sees a generic div and skips it. The visual progress bar is invisible to assistive tech.

**`aria-label` is required** because the progress bar has no visible text label of its own inside the `role="progressbar"` element.

#### The Priority toggle (radiogroup pattern)

The Add Goal Modal uses a `div[role="radiogroup"]` with individual `button[role="radio"]` elements instead of `<input type="radio">`. This is preferred when you want custom styling:

```tsx
<div role="radiogroup" aria-label="Goal priority">
  {(['High', 'Medium', 'Low'] as GoalPriority[]).map((p) => (
    <button
      key={p}
      role="radio"
      aria-checked={form.priority === p}
      onClick={() => updateField('priority', p)}
      // ...
    />
  ))}
</div>
```

**Why not `<input type="radio">`?**
Native radio inputs are difficult to style consistently across browsers. The `role="radio"` + `aria-checked` pattern gives you full CSS control while maintaining equivalent accessibility semantics. Screen readers announce: *"High, radio button, checked"*.

**What you must handle manually** (that native `<input>` handles automatically):
- `aria-checked` state update on click.
- Keyboard navigation between radio options (arrow keys). *(TODO for next iteration)*

---

### Common mistakes to avoid

#### Mistake: Forgetting to reset filters when the data source changes

If `MOCK_GOALS` is replaced by a server-side fetch that returns a subset of goals (e.g., filtered by user ID), and `activeCategory` still has a value from a previous session, the user will see an empty list. Always reset filter state when the data source changes:

```tsx
// When data refetches:
useEffect(() => {
  setActiveCategory('All');
  setActivePriority('All');
}, [goals]); // Reset filters when goals array reference changes
```

#### Mistake: Infinite loop with `monthsRemaining = Infinity`

If `monthlyContribution = 0` (which is valid for a goal not yet started), `Math.ceil(remaining / 0)` = `Infinity`. The `toViewModel` helper guards this with `Math.max(goal.monthlyContribution, 1)`. Without this guard, the `GoalProgressRace` would show `Infinity` months remaining.

```ts
// ❌ Without guard
const monthsRemaining = Math.ceil(remaining / contribution); // Infinity if contribution = 0

// ✅ With guard
const monthsRemaining = Math.ceil(remaining / Math.max(contribution, 1));
```

#### Mistake: Computing view model fields in the component

```tsx
// ❌ Recomputed on every render
function GoalCard({ goal }: { goal: Goal }) {
  const completionPercent = (goal.currentAmount / goal.targetAmount) * 100;
  // ...
}

// ✅ Pre-computed in the view model
function GoalCard({ goal }: { goal: GoalViewModel }) {
  // goal.completionPercent is already there
}
```

The component shouldn't need to know how `completionPercent` is derived. That's the view model's job.

---

### Future AI integration — how it plugs in

When the Gemini RAG pipeline is ready for Goals:

1. Create `src/services/goal.service.ts`:
   ```ts
   export async function getGoals(): Promise<GoalViewModel[]> {
     const raw: Goal[] = await fetch('/api/goals').then(r => r.json());
     return raw.map(toViewModel); // same helper as mock
   }
   export async function getGoalInsights(): Promise<GoalInsight[]> {
     return fetch('/api/insights?module=goals').then(r => r.json());
   }
   export async function createGoal(data: AddGoalFormData): Promise<Goal> {
     return fetch('/api/goals', { method: 'POST', body: JSON.stringify(data) }).then(r => r.json());
   }
   ```

2. In `GoalsPage`, replace mock imports:
   ```tsx
   // Before
   import { MOCK_GOALS, MOCK_GOALS_OVERVIEW, MOCK_GOAL_INSIGHTS } from '@/constants/goal.mock';

   // After (Server Component data fetching)
   const goals = await getGoals();
   const overview = await getGoalSummary();
   const insights = await getGoalInsights();
   ```

3. The AI will produce `GoalInsight[]` with `isAIGenerated: true`. The `GoalInsightsPanel` renders an "✦ AI" badge automatically. **Zero component changes needed.**

4. `GoalAIBanner` body copy and mini-stats come from a dedicated AI endpoint:
   ```ts
   GET /api/goals/ai-recommendation
   → { headline: string, stats: Stat[], allocationSplit: Split[] }
   ```

The type contracts in `goal.ts` are already stable. The UI is already the correct shape.

---

### AI Assistant Module

We implemented the AI Assistant module (`/assistant`) with rich chat cards, message flows, horisontal quick prompts, collapsible history sessions, and recommendations panels.

#### HTML CSS field-sizing: content

To make the chat textarea auto-grow vertically based on the content typed by the user, we used the modern CSS property `field-sizing: content`.
This replaces complex JavaScript event listeners or height-calculation ref hacks:

```css
/* In CSS */
textarea {
  field-sizing: content;
}
```

```tsx
/* In JSX */
<textarea
  style={{ fieldSizing: 'content' } as React.CSSProperties}
/>
```

It dynamically sizing the input container up to its `max-height` (controlled via `max-h-36 overflow-y-auto`).

#### Dynamic Cards inside Chat Bubbles

The assistant message schema supports custom card layouts:
```ts
export interface AssistantCard {
  type: 'metric' | 'comparison' | 'list' | 'chart-ref';
  title: string;
  data: Record<string, string | number | boolean>;
}
```
This enables the response output to dynamically present complex data like KPI metrics or comparison graphs inline with text bubbles.

#### Future AI & Streaming Integration

When the Gemini RAG pipeline is ready:

1. **Streaming Support:**
   In `src/types/assistant.ts`, add:
   ```ts
   export interface AIMessage {
     // ...
     isStreaming?: boolean;
   }
   ```
   Modify `ChatMessage` to render an animated blinking cursor or incremental text updates when `isStreaming` is active.

2. **Connecting to live endpoints:**
   Create `src/services/assistant.service.ts`:
   ```ts
   export async function sendMessage(text: string): Promise<AIMessage> {
     return fetch('/api/assistant/message', {
       method: 'POST',
       body: JSON.stringify({ text }),
     }).then(r => r.json());
   }

   export async function getConversationHistory(): Promise<ConversationSession[]> {
     return fetch('/api/assistant/history').then(r => r.json());
   }
   ```

3. **Context-Aware RAG:**
   The backend RAG agent queries the user's dashboard expenses, goals, and fixed commitments to build context before sending the prompt to Gemini. The returned payload returns specific action triggers (like `Trim my budget` or `Adjust Goals`) that deep-link directly back to other pages.

