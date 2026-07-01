'use client';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-stack-lg border-t border-outline-variant/30 dark:border-dark-outline-variant/30 py-stack-lg flex flex-col sm:flex-row justify-between items-center max-w-container-max mx-auto px-0 opacity-80 transition-all duration-300">
      <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/80 text-center sm:text-left">
        © {currentYear} FinanceHer. All rights reserved.
      </p>
      <div className="flex gap-stack-md mt-4 sm:mt-0">
        <a 
          className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/80 hover:text-primary dark:hover:text-dark-primary transition-colors" 
          href="#"
        >
          Privacy Policy
        </a>
        <a 
          className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/80 hover:text-primary dark:hover:text-dark-primary transition-colors" 
          href="#"
        >
          Terms of Service
        </a>
        <a 
          className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/80 hover:text-primary dark:hover:text-dark-primary transition-colors" 
          href="#"
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
}
