export interface OnboardingData {
  occupation: string;
  monthlyIncome: number | '';
  fixedExpenses: number | '';
  savings: number | '';
  debts: number | '';
  dependents: number; // 0, 1, 2, 3 (for 3+)
  goals: string[]; // e.g. ['Home', 'Retirement', 'Travel', 'Security']
  experience: 'new' | 'some' | 'confident';
  riskTolerance: number; // 1 to 5
}
