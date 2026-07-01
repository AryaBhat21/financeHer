'use client';

import { useState } from 'react';
import {
  SidebarNav,
  HealthScoreCard,
  IncomeExpenseChart,
  ActiveGoalsCard,
  AIAssistantCard,
  SpendingBreakdownCard,
  RecentActivityCard,
  BudgetRecommendationCard,
  DashboardHeader,
  DashboardFooter,
} from '@/components/dashboard';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="bg-background dark:bg-dark-background text-on-background dark:text-dark-on-background min-h-screen flex transition-colors duration-300">
      {/* Sidebar Navigation */}
      <SidebarNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop overflow-x-hidden flex flex-col justify-between min-h-screen">
        <div>
          {/* Header */}
          <DashboardHeader onMenuClick={toggleSidebar} userName="Arya" />

          {/* Bento Grid Dashboard Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Financial Health Score Card */}
            <div className="col-span-12 lg:col-span-4">
              <HealthScoreCard score={782} delta={12} percentile={15} debtRatioChange={4} />
            </div>

            {/* Income vs Expense Chart */}
            <div className="col-span-12 lg:col-span-8">
              <IncomeExpenseChart />
            </div>

            {/* Active Goals */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ActiveGoalsCard />
            </div>

            {/* AI Assistant Card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <AIAssistantCard />
            </div>

            {/* Spending Breakdown */}
            <div className="col-span-12 lg:col-span-4">
              <SpendingBreakdownCard />
            </div>

            {/* Recent Activity */}
            <div className="col-span-12 lg:col-span-8">
              <RecentActivityCard />
            </div>

            {/* Budget Recommendation Card */}
            <div className="col-span-12 lg:col-span-4">
              <BudgetRecommendationCard surplusAmount={450} expectedInterest={22} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <DashboardFooter />
      </main>

      {/* Mobile Floating Action Button (FAB) */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary dark:bg-dark-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-150 z-50 md:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Add new transaction"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          add
        </span>
      </button>
    </div>
  );
}
