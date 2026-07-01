'use client';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName?: string;
}

export function DashboardHeader({ onMenuClick, userName = 'Arya' }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger menu */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl bg-surface-container dark:bg-dark-surface-container-low text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-all active:scale-95 shrink-0"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div>
          <h2 className="font-poppins text-headline-lg text-primary dark:text-dark-primary font-bold">
            Good morning, {userName}
          </h2>
          <p className="font-inter text-body-md text-on-surface-variant dark:text-dark-on-surface-variant/80">
            Your financial health is looking strong today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-stack-md w-full sm:w-auto shrink-0 justify-end sm:justify-start">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container dark:bg-dark-surface-container-low hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-colors text-on-surface-variant dark:text-dark-on-surface-variant outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        
        <button 
          className="bg-primary dark:bg-dark-primary text-on-primary px-6 py-3 rounded-xl font-inter text-label-md font-semibold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          New Transaction
        </button>
      </div>
    </header>
  );
}
