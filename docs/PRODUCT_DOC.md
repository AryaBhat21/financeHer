# FinanceHer — Product Document

> **Living Document** — Updated alongside every feature, flow, or product change.  
> Last updated: 2026-07-01 (Milestone 8 — AI Assistant Page)

---

## Table of Contents

1. [Vision and Mission](#1-vision-and-mission)
2. [Target Users](#2-target-users)
3. [User Personas](#3-user-personas)
4. [User Stories](#4-user-stories)
5. [Features](#5-features)
6. [Screens and Flows](#6-screens-and-flows)
7. [Roadmap](#7-roadmap)

---

## 1. Vision and Mission

### Mission

> Empower every person — regardless of gender, age, or profession — to achieve financial wellness through intelligent, accessible, and personalised tools.

### Why FinanceHer Exists

Financial literacy and planning tools have historically been built for a narrow demographic: high-income, financially literate users who already understand concepts like index funds, compound interest, and tax-loss harvesting. Most mainstream apps focus on tracking rather than teaching, and none deliver the contextual, personalised guidance that a human financial advisor would.

FinanceHer addresses this gap by combining:

- **AI-powered guidance** — proactive, conversational financial coaching.
- **Financial literacy** — learning content embedded directly in the workflow, not siloed in a "learn" tab.
- **Inclusive design** — usable by students, homemakers, gig workers, and retirees equally.
- **Calm, trustworthy UX** — removes the anxiety often associated with personal finance.

### Problems Being Solved

| Problem | How FinanceHer Solves It |
|---|---|
| Low financial literacy | Contextual education embedded in every screen |
| Budgeting feels overwhelming | Simple, visual expense tracking with AI summaries |
| Goals feel abstract | Goal planner with milestones and progress visualisation |
| Generic financial advice | AI assistant personalised to user's income, goals, and spending |
| Apps built for one demographic | Inclusive design system; personas from students to retirees |
| No safety net awareness | Financial health score with actionable improvement steps |

---

## 2. Target Users

FinanceHer is designed for **anyone** seeking to improve their financial health. Although the name has "Her" in it (reflecting its origins in empowering women financially), the product explicitly serves all genders, ages, and professions.

**Primary demographics:**

- Young professionals (22–35) managing their first salaries
- Students handling limited budgets and education loans
- Freelancers with irregular income streams
- Homemakers managing household finances
- Entrepreneurs tracking personal and business finances separately
- Retirees managing fixed income and estate planning

---

## 3. User Personas

### Persona 1 — Priya (Student, 21)

| Field | Detail |
|---|---|
| **Background** | Engineering student, part-time tutoring income |
| **Goals** | Save for a laptop, track monthly allowance |
| **Pain points** | No budgeting habit, spends impulsively on food delivery |
| **Tech comfort** | High |
| **Key feature need** | Simple expense tracker, savings goal with progress bar |

### Persona 2 — Ananya (Young Professional, 28)

| Field | Detail |
|---|---|
| **Background** | Software engineer, 3 years in industry, just moved to a new city |
| **Goals** | Emergency fund, invest in mutual funds, plan for a car |
| **Pain points** | Doesn't know how much to invest vs. spend; overwhelmed by investment options |
| **Tech comfort** | High |
| **Key feature need** | Dashboard overview, AI investment guidance, goal planner |

### Persona 3 — Reena (Freelancer, 34)

| Field | Detail |
|---|---|
| **Background** | Graphic designer with 5–8 clients; income varies ₹40K–₹1.2L/month |
| **Goals** | Tax planning, emergency fund, stable monthly budget despite irregular income |
| **Pain points** | Can't use fixed-budget apps; income volatility causes anxiety |
| **Tech comfort** | Medium |
| **Key feature need** | Variable income budgeting, tax estimate, AI assistant for "lean months" |

### Persona 4 — Meena (Homemaker, 42)

| Field | Detail |
|---|---|
| **Background** | Manages household of 4, husband earns, she controls day-to-day spending |
| **Goals** | Track household spend, save for children's education |
| **Pain points** | Feels excluded from financial decisions; apps assume personal income |
| **Tech comfort** | Low–medium |
| **Key feature need** | Household budget mode, financial literacy hub, simple UI |

### Persona 5 — Vikram (Entrepreneur, 38)

| Field | Detail |
|---|---|
| **Background** | Runs a small e-commerce business; blends personal and business finances |
| **Goals** | Separate personal vs. business expenses, plan for business growth |
| **Pain points** | Overspends on the business, neglects personal savings |
| **Tech comfort** | High |
| **Key feature need** | Category tagging, separate accounts view, goal planner |

### Persona 6 — Kamala (Retiree, 64)

| Field | Detail |
|---|---|
| **Background** | Retired teacher, fixed pension, savings in FDs |
| **Goals** | Make savings last, track medical expenses, understand inflation impact |
| **Pain points** | Doesn't trust digital apps; finds financial jargon confusing |
| **Tech comfort** | Low |
| **Key feature need** | Large text, simple UI, financial literacy hub (jargon-free), AI assistant |

---

## 4. User Stories

### Authentication

- As a new user, I want to create an account with my email so that I can access personalised financial tools.
- As a returning user, I want to log in quickly so that I can resume tracking my finances.
- As a user who forgot my password, I want to receive a reset link by email so that I can regain access to my account.
- As a privacy-conscious user, I want to sign in with Google or LinkedIn so that I don't have to create another password.
- As a user, I want to be remembered for 30 days so that I don't log in every time I open the app.

### Expense Tracking

- As a student, I want to log daily expenses by category so that I understand where my money goes.
- As a freelancer, I want to track income alongside expenses so that I can see my net cash flow each month.
- As a homemaker, I want to tag expenses as household, personal, or child-related so that I can report accurately to my partner.

### Goal Planning

- As a professional, I want to set a savings goal with a target date so that I stay motivated and on track.
- As a student, I want to see a progress bar towards my savings goal so that I feel a sense of achievement.
- As an entrepreneur, I want to create multiple goals simultaneously so that I can plan for both business and personal needs.

### AI Assistant

- As any user, I want to ask the AI "how can I save more this month?" so that I get personalised advice based on my actual data.
- As a freelancer, I want the AI to help me budget for a lean month so that I don't overspend when income is low.
- As a retiree, I want the AI to explain financial terms in plain language so that I can make informed decisions.

### Financial Literacy

- As a student, I want to learn about compound interest in under 3 minutes so that I understand why starting early matters.
- As a new professional, I want bite-sized lessons on investing so that I can start without feeling overwhelmed.

### Dashboard

- As any user, I want to see my financial health at a glance so that I know if I'm on track.
- As a professional, I want to see spending trends over time so that I can adjust my habits proactively.

---

## 5. Features

### 5.1 Authentication

**Purpose:** Securely identify users and personalise their experience.

**User problem solved:** Users need a safe, frictionless way to access their private financial data.

**User flow:**
1. User lands on `/` (auth page).
2. Selects Log In or Sign Up tab.
3. Completes the form (email + password, or OAuth).
4. On success → redirected to `/dashboard`.
5. If password forgotten → clicks "Forgot Password?" → receives reset email.

**Current state:** ✅ UI complete. Backend integration pending.

**Acceptance criteria:**
- [ ] Email + password login works end-to-end.
- [ ] Email + password sign-up with validation works.
- [ ] "Forgot Password" sends a reset email.
- [ ] Google OAuth sign-in works.
- [ ] LinkedIn OAuth sign-in works.
- [ ] "Remember me" persists session for 30 days.
- [ ] Error messages are shown inline, accessible to screen readers.
- [ ] All forms pass WCAG 2.1 AA.

**Future improvements:**
- Biometric / passkey authentication.
- Two-factor authentication (TOTP).
- Magic link sign-in (passwordless).
- SSO for enterprise users.

---

### 5.2 Dashboard

**Purpose:** Provide a financial health overview at a glance.

**User problem solved:** Users don't know if their finances are healthy without checking multiple places.

**Current state:** ✅ UI complete. Backend integration pending.

**Acceptance criteria:**
- [x] Shows monthly income, monthly expenses, health score.
- [x] Shows active goals with progress.
- [x] Shows AI assistant widget (placeholder).
- [x] Responsive across mobile and desktop.
- [ ] Real-time data from backend API.

---

### 5.3 Expense Tracker

**Purpose:** Log, categorise, visualise, and derive insights from spending.

**User problem solved:** Without visibility into spending patterns, users cannot change their habits. Static bank statements don't surface trends, category distributions, or anomalies — FinanceHer does.

**User flow:**
1. User lands on `/expenses` from sidebar or dashboard CTA.
2. Overview cards show: Monthly Spend, Savings This Month, Top Category, Budget Health.
3. 6-month trend chart shows income vs. expense history.
4. Category donut chart shows spending distribution.
5. Transaction table: search, filter by category/status, sort by date/amount.
6. Insights panel: 4 rule-based insights (will become AI-generated).
7. "Add Transaction" button opens the modal form.

**Current state:** ✅ UI complete with mock data. Backend integration pending.

**Acceptance criteria:**
- [x] Expense overview cards (monthly spend, savings, top category, budget health).
- [x] 6-month trend chart (income vs. expenses bar chart).
- [x] Category-wise spending donut chart with legend.
- [x] Transaction table with search, category filter chips, status filter.
- [x] Sortable columns (date, amount).
- [x] Pagination (8 items per page).
- [x] Smart Insights panel with AI-ready data structure.
- [x] Add Expense modal (name, amount, date, category, payment method, note, recurring toggle).
- [x] Responsive across mobile, tablet, and desktop.
- [x] Accessible (ARIA roles, keyboard navigation, focus management).
- [ ] Backend: POST /api/expenses (create transaction).
- [ ] Backend: GET /api/expenses/transactions (paginated list).
- [ ] Backend: GET /api/expenses/summary (monthly aggregation).
- [ ] AI: GET /api/insights (Gemini-generated insights from user data).
- [ ] Bank account linking (Plaid / Razorpay) for auto-import.
- [ ] ML-based automatic categorisation.

**Data model for AI (structured as `MonthlySummary`):**
- `totalExpenses`, `totalIncome`, `netCashFlow` → cash flow analysis.
- `savingsRate` (0–1) → savings rate tracking.
- `expenseDeltaPercent` → month-over-month trend.
- `categoryBreakdowns[]` → category distribution for budget rebalancing.
- `transactions[]` with `isoDate`, `category`, `isRecurring` → pattern detection.
- `ExpenseInsight[]` → AI output shape (rule-based stubs until Gemini is connected).

**Future improvements:**
- Recurring expense auto-detection (ML).
- Budget alerts (push notification when ≥ 90% of budget used).
- Export to CSV / PDF.
- Split expenses (shared household mode).
- Merchant logo enrichment (Clearbit / Brandfetch API).

---

### 5.4 Goal Planner *(planned)*

**Purpose:** Define financial goals with targets and timelines.

**User problem solved:** Goals without structure remain wishes.

---

### 5.5 AI Assistant *(planned)*

**Purpose:** Answer financial questions using the user's own data as context.

**User problem solved:** Generic financial advice is useless without personal context.

---

### 5.6 Financial Literacy Hub *(planned)*

**Purpose:** Teach financial concepts in context, not in isolation.

**User problem solved:** Users don't know what they don't know.

---

### 5.7 Financial Health Score *(planned)*

**Purpose:** Summarise financial health as a score (0–100) with improvement steps.

**User problem solved:** Users need a simple indicator of their overall financial fitness.

---

## 6. Screens and Flows

### 6.1 Landing Page (`/`)

**Status:** ✅ Built

**Layout:** Sticky nav, hero section, features bento grid, CTA banner, footer.

**Sections:**
- **Nav** — Logo, 4 links, "Log In" text button, "Get Started" primary CTA. Mobile hamburger with dropdown.
- **Hero** — Badge pill, headline, two CTAs ("Start for Free" → `/auth`, "How it Works"), 4-image tilted grid.
- **Features Bento** — 12-column grid with: Intuitive Budgeting (bar chart), Goal Tracking (progress bar), AI Insights (dark card), Financial Literacy Hub (image).
- **CTA Banner** — Full-width card with headline, "Create Your Account" → `/auth`, "Contact Sales".
- **Footer** — Brand, nav links, Privacy Policy, Terms, dynamic copyright year.

---

### 6.2 Authentication Page (`/auth`)

**Layout:** Two-column card (hero panel left, forms right). Single-column on mobile.

**Views:**
- **Log In** — email, password, remember me, forgot password link, OAuth.
- **Sign Up** — first name, last name, email, password, terms agreement.
- **Forgot Password** — email input, send reset link, back to login.

**Transitions:** Tab switching is animated (`fade-in`). View changes preserve scroll position.

### 6.3 Onboarding Flow (`/onboarding`)

**Status:** ✅ Built

**Layout:** Multi-step wizard layout with sticky header (progress indicator & save/exit), centered form body, and site footer.

**Sections:**
- **Header** — FinanceHer brand logo, progress bar showing percentage completion, and "Save & Exit" button that returns to the homepage.
- **Steps 1-4 (Career & Balance Sheet)** — Occupation text input, net monthly income, total fixed expenses, liquid savings, and liabilities.
- **Step 5 (Household)** — Button group indicating total dependents.
- **Step 6 (Goals)** — Selection list for financial priorities (Home, Retirement, Travel, Security).
- **Step 7 (Investing)** — Choice cards outlining stock market experience (New, Some, Confident).
- **Step 8 (Risk Tolerance)** — Dynamic range slider (1 to 5) with live category feedback.
- **Step 9 (Tailored Recommendations)** — Interactive success view showing computed savings or debt relief strategies.
- **Footer** — Standard copyright, privacy policy, terms of service, and contacts.

---

### 6.4 Dashboard (`/dashboard`)

**Status:** ✅ Built

**Layout:** Desktop sidebar navigation layout with flexible main grid canvas; mobile toggle drawer layout with quick action header.

**Sections:** Financial health card, monthly income/expense chart, active goals indicator list, AI Finance Assistant widget, spending category breakdowns, transaction logs feed, and personalized budget advice cards.

---

### 6.5 Expense Tracker (`/expenses`)

**Status:** ✅ Built (mock data — backend integration pending)

**Layout:** Desktop sidebar navigation + main canvas. Mobile: hamburger drawer + floating action button.

**Sections:**
- **Overview Cards** — Monthly Spend (with MoM delta), Savings This Month, Top Category, Budget Health (progress bar).
- **6-Month Trend Chart** — Side-by-side income vs. expense bars, avg. savings row, legend.
- **Category Breakdown Donut** — SVG donut chart with top 5 categories + legend with amount and %.
- **Transaction Table** — Full search + category chip filter + status dropdown + sortable headers + pagination.
- **Smart Insights Panel** — 4 severity-coded cards (warning, success, info, tip) with AI-ready `isAIGenerated` flag.
- **Add Transaction Modal** — Name, amount, date, category, payment method, note, recurring toggle. Integration point marked.

---

### 6.4 Goal Planner (`/goals`)

**Status:** ✅ Built (mock data — backend integration pending)

**Layout:** Desktop sidebar + main canvas. Mobile: hamburger drawer + floating action button.

**Sections:**
- **Overview Cards** — Total Saved, Active Goals (with next milestone), Monthly Commitment, Portfolio Progress (progress bar).
- **Goal Progress Race** — Horizontal bars ranking all goals by completion %, with on-track / behind indicators.
- **AI Insights Panel** — 4 severity-coded rule-based insights (success, tip, info, warning) with `isAIGenerated` flag.
- **Active Goals Grid** — 2-column bento of `GoalCard` components, filterable by category chip and priority.
- **Goal Card** — Icon, description, current vs. target amounts, animated progress bar (dynamic accent colour per goal), on-track / projected completion date, Adjust Goal CTA.
- **AI Acceleration Banner** — 3 mini-stats, allocation breakdown panel, Optimise CTA (AI integration point).
- **Add Goal Modal** — Name, description, category, target amount, current amount, monthly contribution, target date, priority (High / Medium / Low toggle), note.

**Goal Categories:** Emergency Fund, Home, Travel, Retirement, Education, Vehicle, Wedding, Health, Business, Other.

**Data model for AI (structured as `GoalViewModel`):**
- `completionPercent`, `remainingAmount` → current gap to fill.
- `monthsRemaining`, `projectedCompletionDate` → AI-computed forward projection.
- `isOnTrack` → whether projected date meets target date.
- `GoalInsight[]` → AI output shape with `isAIGenerated` flag for rule-based → AI migration.
- `GoalsOverview.savingsAllocationRate` → overall savings efficiency signal.

**Future improvements:**
- Goal contribution auto-debit reminders.
- Reallocation wizard (AI-suggested fund shifting between goals).
- Goal vs. actual contribution tracking.
- Progress celebration milestones (25%, 50%, 75%, 100%).
- Export goal plan to PDF.

### 6.5 AI Assistant (`/assistant`)

**Status:** ✅ Built (mock data — backend integration pending)

**Layout:** Desktop sidebar + main chat grid. Mobile: hamburger drawer + collapsible history slider.

**Sections:**
- **Collapsible History Panel** — Left-hand sidebar showing list of past conversation sessions with message counts, preview text, display dates, and category icons/colours.
- **Main Chat Window** — Scrollable message feed with disclaimer banner, text bubble formatting, embedded data cards (Metric and Comparison cards), and suggested action chips.
- **Sticky Footer Input Area** — Horizontal prompt suggestions, auto-expanding textarea, mic button with recording animation, and send button with loading state.
- **Proactive Insights Panel** — Right-hand sidebar featuring 4 severity-coded rule-based recommendations across various modules (expenses, goals, budget) to nudge users toward better financial health.

**Data contracts defined (`src/types/assistant.ts`):**
- `AIMessage` — Support for text bubbles, embedded structured card renderers, and custom follow-up CTA actions.
- `ConversationSession` — Representation of history list.
- `SuggestedPrompt` — Prompt chip data.
- `AIRecommendation` — Proactive advice.
- `isAIGenerated` / `isStreaming` flags for future Gemini streaming integration.

---

### 6.6 Financial Literacy Hub (`/learn`) *(planned)*

**Status:** 🔲 Not built

---

### 6.7 Settings (`/settings`) *(planned)*

**Status:** 🔲 Not built

---

## 7. Roadmap

### MVP (v0.1) — Auth Foundation

- [x] Project scaffolding (Next.js 15/16, TypeScript, Tailwind)
- [x] Design system tokens (colour palette, typography, spacing)
- [x] Dark mode support
- [x] Authentication UI (Login, Signup, Forgot Password)
- [x] Reusable UI primitives (Button, Input, FormLabel)
- [x] Onboarding Flow UI & wizard state orchestration
- [x] Service layer stubs (auth.service.ts)
- [x] Accessibility baseline (WCAG 2.1 AA)
- [ ] Backend: Auth API (JWT + refresh tokens)
- [ ] Backend: User profile storage
- [x] Dashboard skeleton & high-fidelity widgets

### Version 1.0 — Core Product

- [x] Dashboard with financial overview
- [x] Expense tracker (manual entry) — UI complete, persistent to local storage
- [x] Goal planner — UI complete, persistent to local storage
- [x] Financial health score
- [x] Local storage data persistence helper (onboarding profile, transactions, goals)
- [ ] User settings & profile

### Version 2.0 — Intelligence Layer

- [x] AI assistant (manual interface) — UI complete
- [ ] AI assistant RAG pipeline & Gemini connection
- [ ] Financial literacy hub (curated content + quizzes)
- [ ] Bank account linking (Plaid / Razorpay integration)
- [ ] Automated expense categorisation (ML)
- [ ] Personalised insights & nudges

### Long-term Vision

- [ ] Investment tracking (mutual funds, stocks)
- [ ] Tax planning assistant
- [ ] Shared finances / household mode
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Community features (anonymous peer benchmarking)
