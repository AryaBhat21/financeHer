'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Expenses', href: '/expenses', icon: 'payments' },
  { name: 'Goals', href: '/goals', icon: 'ads_click' },
  { name: 'Budget', href: '#', icon: 'account_balance_wallet' },
  { name: 'Health Score', href: '#', icon: 'health_and_safety' },
  { name: 'AI Assistant', href: '/assistant', icon: 'smart_toy' },
  { name: 'Literacy Hub', href: '#', icon: 'menu_book' },
  { name: 'Settings', href: '#', icon: 'settings' },
];

export function SidebarNav({ isOpen, onClose }: SidebarNavProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container dark:bg-dark-surface-container-low p-stack-md">
      {/* Brand logo */}
      <div className="mb-stack-lg px-2 flex justify-between items-center">
        <div>
          <h1 className="font-poppins font-bold text-headline-md text-primary dark:text-dark-primary">
            FinanceHer
          </h1>
          <p className="font-inter text-label-md text-on-surface-variant dark:text-dark-on-surface-variant/70">
            Premium Wealth
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-full hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          // Active when pathname exactly matches or starts with the item href (for nested routes)
          const isActive =
            item.href !== '#' &&
            (pathname === item.href || pathname.startsWith(item.href + '/'));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 active:scale-98 outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'bg-primary-container dark:bg-dark-primary-container text-white font-bold'
                  : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high'
              )}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-inter text-body-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card and User Info */}
      <div className="mt-auto pt-stack-md space-y-4">
        <div className="bg-primary dark:bg-dark-primary-container text-white p-4 rounded-xl relative overflow-hidden group cursor-pointer active:scale-95 duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <p className="font-poppins font-semibold text-body-sm relative z-10">Upgrade to Pro</p>
          <p className="text-[10px] opacity-80 relative z-10 mt-0.5">Unlock premium literacy hubs</p>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-300" />
        </div>

        <div className="flex items-center gap-3 px-2 border-t border-outline-variant/20 dark:border-dark-outline-variant/20 pt-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container dark:bg-dark-secondary-container flex items-center justify-center overflow-hidden relative">
            <Image
              fill
              sizes="40px"
              className="object-cover"
              alt="Elena Vance portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2OOjNJkSDwQm355MlpxtkJhf2_9MZekV8n6VUY9bVOO6kKpM8ok46TjVW4_wtrR6F8XcfBDPEyvRcYPx6S_Bl4LarnAMEWXCIDb1oQb0mvW0SFZ-hqBf5ZEN-8AEHMLMG7946dfQzOHa4RtXnbhKtjBgzxBudT1TR5uODg3d5J3Dzx7ih20ws1ycC1wT-pS3xUYOZygvGhanhlVc2elUVbTylH9bwgw8KycmljjiBF9zX3aY5h2y8j_yXmHDdY-Vo-p0IGiZHot1K"
            />
          </div>
          <div className="min-w-0">
            <p className="font-inter font-semibold text-body-sm text-on-surface dark:text-dark-on-surface truncate">
              Elena Vance
            </p>
            <p className="text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant/70">
              Free Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop view */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container dark:bg-dark-surface-container-low shadow-sm z-40 border-r border-outline-variant/10 dark:border-dark-outline-variant/10">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (visible only when isOpen is true on small screens) */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      >
        <aside
          className={cn(
            'w-64 h-full bg-surface-container dark:bg-dark-surface-container-low transition-transform duration-300 ease-out transform',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
}
