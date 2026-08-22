/**
 * KPI Cards Container
 * Displays 8 key performance indicator cards
 */

'use client';

import { useRouter } from 'next/navigation';
import { useFinancialData } from '@/hooks/useFinancialData';
import { KPICard } from './KPICard';
import { Skeleton } from '@/components/ui/Skeleton';

const KPI_CONFIG = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    dataKey: 'totalRevenue' as const,
    change: 12.4,
    trend: 'up' as const,
    currency: 'AED' as const,
    semanticColor: 'revenue' as const,
    navigateTo: '/receivables',
  },
  {
    id: 'expenses',
    label: 'Total Expenses',
    dataKey: 'totalExpenses' as const,
    change: -4.8,
    trend: 'down' as const,
    currency: 'AED' as const,
    semanticColor: 'expense' as const,
  },
  {
    id: 'gross-profit',
    label: 'Gross Profit',
    dataKey: 'grossProfit' as const,
    change: 18.7,
    trend: 'up' as const,
    currency: 'AED' as const,
    semanticColor: 'profit' as const,
  },
  {
    id: 'net-profit',
    label: 'Net Profit',
    dataKey: 'netProfit' as const,
    change: 15.2,
    trend: 'up' as const,
    currency: 'AED' as const,
    semanticColor: 'profit' as const,
  },
  {
    id: 'cash-balance',
    label: 'Cash & Bank',
    dataKey: 'cashBalance' as const,
    change: -8.5,
    trend: 'down' as const,
    currency: 'AED' as const,
    semanticColor: 'profit' as const,
  },
  {
    id: 'receivable',
    label: 'Accounts Receivable',
    dataKey: 'accountsReceivable' as const,
    change: 5.2,
    trend: 'up' as const,
    currency: 'AED' as const,
    semanticColor: 'revenue' as const,
  },
  {
    id: 'payable',
    label: 'Accounts Payable',
    dataKey: 'accountsPayable' as const,
    change: 3.1,
    trend: 'up' as const,
    currency: 'AED' as const,
    semanticColor: 'expense' as const,
  },
  {
    id: 'outstanding-invoices',
    label: 'Outstanding Invoices',
    dataKey: null,
    value: 12,
    change: -2.5,
    trend: 'down' as const,
    currency: 'AED' as const,
    format: 'number' as const,
    semanticColor: 'expense' as const,
  },
];

export function KPICards() {
  const { data: summary, isLoading, error, refetch } = useFinancialData();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {KPI_CONFIG.map((config) => (
          <div key={config.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            {/* Skeleton for label */}
            <Skeleton className="h-4 w-24 mb-4" />
            {/* Skeleton for value */}
            <Skeleton className="h-8 w-32 mb-4" />
            {/* Skeleton for footer */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h3 className="text-red-900 dark:text-red-100 font-semibold mb-2">
          Unable to Load KPI Data
        </h3>
        <p className="text-red-800 dark:text-red-200 text-sm mb-4">
          {error instanceof Error ? error.message : 'An error occurred while loading the dashboard'}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {KPI_CONFIG.map((config) => {
        let value: number;
        if (config.dataKey) {
          value = summary[config.dataKey as keyof typeof summary] as number;
        } else {
          value = config.value ?? 0;
        }

        return (
          <KPICard
            key={config.id}
            label={config.label}
            value={value}
            change={Math.abs(config.change)}
            trend={config.trend}
            currency={config.currency}
            format={config.format}
            semanticColor={config.semanticColor}
            onClick={
              config.navigateTo
                ? () => router.push(config.navigateTo!)
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
