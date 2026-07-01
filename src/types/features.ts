import { OnboardingData } from './onboarding';
import { Transaction } from './expense';
import { GoalViewModel } from './goal';

export interface FinancialFeatures {
  // 1. Savings Rate
  savingsRate: {
    profileRate: number;      // based on onboarding data: (income - fixedExpenses) / income
    actualRate: number;       // based on transaction history: (income - expenses) / income
    combinedRate: number;     // actualRate if transactions exist, else profileRate
  };

  // 2. Debt-to-Income Ratio (DTI)
  debtToIncome: {
    profileDti: number;       // total debt / monthly income
    annualDti: number;        // total debt / annual income
    monthlyDebtServiceEst: number; // estimated monthly debt payment (e.g. 5% of total debt) / monthly income
    actualDebtPaymentsRatio: number; // sum of debt/loan transactions / actual income
  };

  // 3. Expense Ratio
  expenseRatio: {
    profileRatio: number;     // fixedExpenses / monthlyIncome
    actualRatio: number;      // totalExpenses / totalIncome
  };

  // 4. Emergency Fund Coverage
  emergencyFund: {
    currentSavings: number;   // from onboarding / profile
    fixedExpenses: number;    // from onboarding / profile
    monthsCoveredProfile: number; // savings / fixedExpenses
    monthsCoveredActual: number;  // savings / average monthly actual expenses
  };

  // 5. Goal Progress
  goalProgress: {
    totalGoals: number;
    activeGoals: number;
    completedGoals: number;
    totalTargetAmount: number;
    totalCurrentSavings: number;
    overallCompletionRate: number; // totalCurrentSavings / totalTargetAmount
    goals: Array<{
      id: string;
      name: string;
      category: string;
      targetAmount: number;
      currentAmount: number;
      completionPercent: number;
      remainingAmount: number;
      isOnTrack: boolean;
      monthsRemaining: number;
    }>;
  };

  // Metadata/Raw values for debugging and UI consumption
  meta: {
    hasProfile: boolean;
    hasExpenses: boolean;
    hasGoals: boolean;
    timestamp: string;
  };
}
