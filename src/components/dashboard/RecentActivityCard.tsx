'use client';

interface Transaction {
  id: string;
  name: string;
  category: string;
  time: string;
  amount: number;
  type: 'income' | 'expense';
  status: string;
  statusColorClass: string;
  icon: string;
}

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Whole Foods Market',
    category: 'Groceries',
    time: 'Today, 10:45 AM',
    amount: 84.20,
    type: 'expense',
    status: 'Confirmed',
    statusColorClass: 'text-emerald-600 dark:text-emerald-400',
    icon: 'shopping_cart',
  },
  {
    id: '2',
    name: 'TechFlow Corp Salary',
    category: 'Income',
    time: 'Yesterday',
    amount: 5400.00,
    type: 'income',
    status: 'Cleared',
    statusColorClass: 'text-emerald-600 dark:text-emerald-400',
    icon: 'work',
  },
  {
    id: '3',
    name: 'Netflix Premium',
    category: 'Subscriptions',
    time: 'May 12, 2024',
    amount: 19.99,
    type: 'expense',
    status: 'Recurring',
    statusColorClass: 'text-on-surface-variant dark:text-dark-on-surface-variant/70',
    icon: 'subscriptions',
  },
];

export function RecentActivityCard() {
  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}Rs. ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white dark:bg-dark-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(67,37,125,0.04)] dark:shadow-none border border-surface-container/20 dark:border-dark-outline-variant/30 flex flex-col justify-between h-full transition-all duration-300">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-poppins text-headline-md text-on-surface dark:text-dark-on-surface font-semibold">
            Recent Activity
          </h3>
          <div className="flex gap-2">
            <button 
              className="p-2 rounded-lg bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant/70 hover:bg-surface-container-high dark:hover:bg-dark-surface-container transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Filter transactions"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                filter_list
              </span>
            </button>
            <button 
              className="p-2 rounded-lg bg-surface-container dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant/70 hover:bg-surface-container-high dark:hover:bg-dark-surface-container transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Search transactions"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                search
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {defaultTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-surface-container-high dark:hover:border-dark-surface-container-high hover:bg-surface-container-low dark:hover:bg-dark-surface-container-low/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-surface-container dark:bg-dark-surface-container-high flex items-center justify-center text-primary dark:text-dark-primary group-hover:bg-white dark:group-hover:bg-dark-surface transition-colors shrink-0">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {tx.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-inter text-body-md text-on-surface dark:text-dark-on-surface font-semibold truncate">
                    {tx.name}
                  </p>
                  <p className="font-inter text-body-sm text-on-surface-variant dark:text-dark-on-surface-variant/70 truncate">
                    {tx.time} • {tx.category}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`font-inter text-body-md font-bold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-on-surface dark:text-dark-on-surface'}`}>
                  {formatAmount(tx.amount, tx.type)}
                </p>
                <p className={`font-inter text-label-md font-semibold ${tx.statusColorClass}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-6 py-2.5 text-primary dark:text-dark-primary hover:bg-primary-container dark:hover:bg-dark-primary-container hover:text-white rounded-lg transition-all duration-150 font-inter text-label-md font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary">
        Show All Transactions
      </button>
    </div>
  );
}
