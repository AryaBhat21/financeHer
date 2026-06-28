# FinanceHer — Learning Document

> **Living Document** — Every implementation milestone adds concepts, explanations, interview questions, and lessons.  
> Last updated: 2026-06-28  
> Audience: The primary developer maintaining and extending FinanceHer.

---

## Table of Contents

1. [Milestone 1 — Project Scaffold & Auth UI](#milestone-1--project-scaffold--auth-ui)
2. [Milestone 2 — CSS Build Fix & Next.js Best Practices](#milestone-2--css-build-fix--nextjs-best-practices)
3. [Interview Question Bank](#interview-question-bank)
4. [Common Mistakes Log](#common-mistakes-log)
5. [Alternatives Considered](#alternatives-considered)
6. [Future Improvements](#future-improvements)
7. [Developer Notes](#developer-notes)

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
