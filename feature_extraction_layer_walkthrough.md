# Financial Feature Extraction Layer Walkthrough

We have implemented a type-safe **Financial Feature Extraction Layer** that aggregates raw user data and calculates key personal finance performance indicators. This layer serves as the primary data contract for the AI Assistant's RAG context and the Dashboard statistics cards.

---

## 1. Directory Structure & Key Files

The feature extraction layer is organized as follows:
- **[features.ts](file:///c:/Users/aryab/OneDrive/Desktop/financeHer/src/types/features.ts):** Type contracts for the computed financial ratios.
- **[features.ts](file:///c:/Users/aryab/OneDrive/Desktop/financeHer/src/lib/features.ts):** The core calculation logic containing pure functions and `localStorage` hydrators.
- **[test_features.ts](file:///C:/Users/aryab/.gemini/antigravity/brain/b0a081eb-64e5-4474-aa2d-0b73629581a4/scratch/test_features.ts):** A unit testing script containing assertions verifying calculations across profile parameters, transactions, and goals.

---

## 2. Ratios & Mathematical Formulations

The extractor computes five core metrics:

### 1. Savings Rate
- **Profile-based:** `(Profile Monthly Income - Profile Fixed Expenses) / Profile Monthly Income`
- **Actual-based:** `(Total Actual Income - Total Actual Expenses) / Total Actual Income`
- **Blended Combined:** Defaults to the actual transaction-based rate if transaction history contains active income, falling back to the onboarding profile estimate if the transaction ledger is empty.

### 2. Debt-to-Income Ratio (DTI)
- **Profile DTI:** `Total Liabilities / Monthly Income`
- **Annual DTI:** `Total Liabilities / (Monthly Income * 12)`
- **Monthly Debt Service Estimate:** Estimates standard minimum monthly payment obligations as 2% of the total liabilities (`Total Liabilities * 0.02 / Monthly Income`).
- **Actual Debt Ratio:** Scans transaction names and notes for EMI and loan repayment keywords (`loan`, `emi`, `debt`, `mortgage`, etc.) and sums them against actual income.

### 3. Expense Ratio
- **Profile Ratio:** `Fixed Expenses / Monthly Income`
- **Actual Ratio:** `Total Expenses / Total Income`

### 4. Emergency Fund Coverage
- **Months Covered (Profile):** `Liquid Savings / Fixed Expenses`
- **Months Covered (Actual):** `Liquid Savings / Monthly Transaction Spend` (falls back to profile fixed expenses if transaction ledger is empty).

### 5. Goal Progress
- **Overall Completion Rate:** `Sum of current savings across goals / Sum of target amounts across goals`
- **Goals Catalog:** Builds an enriched array of individual goals, computing:
  - `completionPercent`: Percentage completed to 1 decimal place.
  - `remainingAmount`: Absolute currency remaining.
  - `monthsRemaining`: Estimated time to completion (`remaining / monthlyContribution`).
  - `isOnTrack`: Boolean showing whether the projected date fits the user's desired `targetDate`.

---

## 3. Graceful Fallbacks & Hydration Safety

- Prevents division-by-zero errors when income or fixed expenses are zero or not yet configured (returns `0` instead of `NaN` or `Infinity`).
- Coerces onboarding empty inputs (`''`) into standard numerical zeros.
- Provides `meta` fields verifying which data stores were available at calculation time.
