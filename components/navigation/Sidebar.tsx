'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUI } from '@/lib/store';
import { useIsMobile } from '@/lib/responsive';
import {
  BarChart3,
  LineChart,
  List,
  DollarSign,
  CreditCard,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  FileText,
  Sparkles,
  Settings,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/transactions', label: 'Transactions', icon: List },
  { href: '/receivables', label: 'Receivables', icon: DollarSign },
  { href: '/payables', label: 'Payables', icon: CreditCard },
  { href: '/cash-flow', label: 'Cash Flow', icon: TrendingUp },
  { href: '/budget', label: 'Budget & Forecast', icon: PieChart },
  { href: '/profitability', label: 'Profitability', icon: ArrowUpRight },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/ai-insights', label: 'AI Insights', icon: Sparkles },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUI();
  const isMobile = useIsMobile();

  // Responsive padding and font sizes
  // Mobile: 16px padding, 14px font
  // Desktop: 24px padding, 16px font
  const containerPadding = isMobile ? 'p-4' : 'p-6';
  const logoTextSize = isMobile ? 'text-base' : 'text-lg';
  const navItemPadding = isMobile ? 'px-2 py-3' : 'px-3 py-2';
  const navItemFontSize = isMobile ? 'text-sm' : 'text-sm';
  const navItemMinHeight = 'h-11'; // 44px minimum touch target

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      {/* Logo / Header */}
      <div className={`${containerPadding} border-b border-gray-200 dark:border-gray-700 flex items-center justify-between`}>
        <h1 className={`${logoTextSize} font-bold text-gray-900 dark:text-white text-start`}>
          Accounts Dashboard
        </h1>
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors ml-2 flex-shrink-0"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 md:px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                // Close sidebar on mobile after navigation
                if (isMobile) {
                  setSidebarOpen(false);
                }
              }}
              className={`flex items-center gap-3 ${navItemPadding} ${navItemMinHeight} rounded-md transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={`${navItemFontSize} font-medium text-start`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`${containerPadding} border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400`}>
        v1.0.0
      </div>
    </div>
  );
}
