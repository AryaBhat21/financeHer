/**
 * features.ts — Financial Feature Extraction Layer
 *
 * Consumes raw user profile data, transaction histories, and savings goals
 * to extract key financial ratios and metrics.
 * Designed to provide context for the AI Assistant (RAG context),
 * dashboard health metrics, and planning models.
 */

import { STORAGE_KEYS, loadFromStorage } from './storage';
import type { OnboardingData } from '@/types/onboarding';
import type { Transaction } from '@/types/expense';
import type { Goal } from '@/types/goal';
import type { FinancialFeatures } from '@/types/features';

// Standard fallback values if data is missing or not yet set
const DEFAULT_PROFILE: OnboardingData = {
  occupation: '',
  monthlyIncome: 0,
  fixedExpenses: 0,
  savings: 0,
  debts: 0,
  dependents: 0,
  goals: [],
  experience: 'new',
  riskTolerance: 3,
};

/**
 * Pure calculation function. Computes ratios and progress indicators
 * given explicit data structures. Useful for server routes, testing,
 * or scenarios where state is already held in memory.
 */
export function extractFinancialFeaturesFromData(
  profile: OnboardingData | null,
  expenses: Transaction[],
  goals: Goal[]
): FinancialFeatures {
  const prof = profile || DEFAULT_PROFILE;

  // 1. Parse Profile inputs safely
  const pIncome = typeof prof.monthlyIncome === 'number' ? prof.monthlyIncome : 0;
  const pFixed = typeof prof.fixedExpenses === 'number' ? prof.fixedExpenses : 0;
  const pSavings = typeof prof.savings === 'number' ? prof.savings : 0;
  const pDebts = typeof prof.debts === 'number' ? prof.debts : 0;

  // 2. Aggregate Transaction data
  let totalActualIncome = 0;
  let totalActualExpenses = 0;
  let totalDebtPayments = 0;

  expenses.forEach((t) => {
    if (t.type === 'income') {
      totalActualIncome += t.amount;
    } else if (t.type === 'expense') {
      totalActualExpenses += t.amount;

      // Identify potential debt/loan/EMI/credit-card payoff payments
      const nameLower = t.name.toLowerCase();
      const noteLower = (t.note || '').toLowerCase();
      const isDebtRelated =
        nameLower.includes('loan') ||
        nameLower.includes('emi') ||
        nameLower.includes('debt') ||
        nameLower.includes('mortgage') ||
        nameLower.includes('credit card') ||
        noteLower.includes('loan') ||
        noteLower.includes('emi') ||
        noteLower.includes('repayment');

      if (isDebtRelated) {
        totalDebtPayments += t.amount;
      }
    }
  });

  // ─── 1. SAVINGS RATE ───────────────────────────────────────────
  const profileRate = pIncome > 0 ? (pIncome - pFixed) / pIncome : 0;
  const actualRate = totalActualIncome > 0 ? (totalActualIncome - totalActualExpenses) / totalActualIncome : 0;
  const combinedRate = totalActualIncome > 0 ? actualRate : profileRate;

  // ─── 2. DEBT TO INCOME (DTI) ───────────────────────────────────
  const profileDti = pIncome > 0 ? pDebts / pIncome : 0;
  const annualDti = pIncome > 0 ? pDebts / (pIncome * 12) : 0;
  // Standard financial rule of thumb: assume 2% of total liabilities as the estimated monthly debt obligation (minimum payment)
  const monthlyDebtServiceEst = pIncome > 0 ? (pDebts * 0.02) / pIncome : 0;
  const actualDebtPaymentsRatio =
    totalActualIncome > 0
      ? totalDebtPayments / totalActualIncome
      : pIncome > 0
      ? totalDebtPayments / pIncome
      : 0;

  // ─── 3. EXPENSE RATIO ──────────────────────────────────────────
  const profileRatio = pIncome > 0 ? pFixed / pIncome : 0;
  const actualRatio = totalActualIncome > 0 ? totalActualExpenses / totalActualIncome : 0;

  // ─── 4. EMERGENCY FUND COVERAGE ────────────────────────────────
  const monthsCoveredProfile = pFixed > 0 ? pSavings / pFixed : pIncome > 0 ? pSavings / pIncome : 0;
  // If actual monthly expenses are recorded, use them, otherwise fallback to profile fixed costs
  const monthsCoveredActual = totalActualExpenses > 0 ? pSavings / totalActualExpenses : monthsCoveredProfile;

  // ─── 5. GOAL PROGRESS ──────────────────────────────────────────
  const totalGoals = goals.length;
  let activeGoals = 0;
  let completedGoals = 0;
  let totalTargetAmount = 0;
  let totalCurrentSavings = 0;

  const goalsList = goals.map((g) => {
    const isCompleted = g.status === 'Completed' || g.currentAmount >= g.targetAmount;
    if (isCompleted) {
      completedGoals++;
    } else if (g.status === 'Active') {
      activeGoals++;
    }

    totalTargetAmount += g.targetAmount;
    totalCurrentSavings += g.currentAmount;

    const remainingAmount = Math.max(0, g.targetAmount - g.currentAmount);
    const completionPercent = g.targetAmount > 0 ? (g.currentAmount / g.targetAmount) * 100 : 0;

    // Goal velocity calculation
    const monthlyCont = Math.max(g.monthlyContribution, 1); // protect from divide by zero
    const monthsRemaining = Math.ceil(remainingAmount / monthlyCont);

    // Calculate if projected date is within target date
    let isOnTrack = true;
    try {
      const targetDate = new Date(g.targetDate);
      const today = new Date();
      const projectedDate = new Date(
        today.getFullYear(),
        today.getMonth() + monthsRemaining,
        today.getDate()
      );
      isOnTrack = projectedDate <= targetDate;
    } catch {
      isOnTrack = false;
    }

    return {
      id: g.id,
      name: g.name,
      category: g.category,
      targetAmount: g.targetAmount,
      currentAmount: g.currentAmount,
      completionPercent: Number(completionPercent.toFixed(1)),
      remainingAmount,
      isOnTrack,
      monthsRemaining,
    };
  });

  const overallCompletionRate = totalTargetAmount > 0 ? totalCurrentSavings / totalTargetAmount : 0;

  return {
    savingsRate: {
      profileRate,
      actualRate,
      combinedRate,
    },
    debtToIncome: {
      profileDti,
      annualDti,
      monthlyDebtServiceEst,
      actualDebtPaymentsRatio,
    },
    expenseRatio: {
      profileRatio,
      actualRatio,
    },
    emergencyFund: {
      currentSavings: pSavings,
      fixedExpenses: pFixed,
      monthsCoveredProfile,
      monthsCoveredActual,
    },
    goalProgress: {
      totalGoals,
      activeGoals,
      completedGoals,
      totalTargetAmount,
      totalCurrentSavings,
      overallCompletionRate,
      goals: goalsList,
    },
    meta: {
      hasProfile: profile !== null,
      hasExpenses: expenses.length > 0,
      hasGoals: goals.length > 0,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Primary helper for browser environments. Pulls the active user profile,
 * transaction list, and goal portfolio from LocalStorage, computes metrics,
 * and returns the extracted FinancialFeatures package.
 */
export function extractFinancialFeatures(): FinancialFeatures {
  const profile = loadFromStorage<OnboardingData | null>(STORAGE_KEYS.USER_PROFILE, null);
  const expenses = loadFromStorage<Transaction[]>(STORAGE_KEYS.EXPENSES, []);
  const goals = loadFromStorage<Goal[]>(STORAGE_KEYS.GOALS, []);

  return extractFinancialFeaturesFromData(profile, expenses, goals);
}
