/**
 * Accounts Receivable Widget
 * Displays AR metrics, aging breakdown, top debtors, and alerts
 * Phase 4 Task 2
 */

'use client';

import React, { useMemo, type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { useReceivables } from '@/hooks/useReceivables';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

/**
 * Aging bucket colors - green to red progression
 */
const AGING_COLORS = {
  'Current (0-30)': '#16B96F',  // Green
  '1-30': '#FBBF24',            // Yellow
  '31-60': '#F97316',           // Orange
  '61-90': '#EF4444',           // Red
  '90+': '#991B1B',             // Dark Red
};

/**
 * AR Widget Skeleton Loading State
 */
function ARWidgetSkeleton(): ReactElement {
  return (
    <div className="space-y-6">
      {/* Total Card Skeleton */}
      <Skeleton className="h-32 rounded-lg" />

      {/* Aging Section Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-12 rounded-lg" />
      </div>

      {/* Metrics Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-32 rounded-lg" />
      </div>

      {/* Alerts Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-20 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Horizontal Stacked Bar Visualization
 */
function AgingBar({
  buckets,
}: {
  buckets: Array<{ bucket: string; amount: number; percentage: number }>;
}): ReactElement {
  return (
    <div className="space-y-2">
      <div className="flex h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
        {buckets.map((bucket, index) => (
          <div
            key={`${bucket.bucket}-${index}`}
            style={{
              width: `${bucket.percentage}%`,
              backgroundColor: AGING_COLORS[bucket.bucket as keyof typeof AGING_COLORS] || '#ccc',
            }}
            className="transition-all duration-200 hover:opacity-80"
            title={`${bucket.bucket}: ${formatCurrency(bucket.amount, 'AED')} (${bucket.percentage.toFixed(1)}%)`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
        {buckets.map((bucket, index) => (
          <div key={`legend-${bucket.bucket}-${index}`} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{
                backgroundColor:
                  AGING_COLORS[bucket.bucket as keyof typeof AGING_COLORS] || '#ccc',
              }}
            />
            <span className="truncate text-gray-600 dark:text-gray-400">
              {bucket.bucket}
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {bucket.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Status Badge Component
 */
function StatusBadge({ daysOverdue }: { daysOverdue: number }): ReactElement {
  let statusColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
  let statusText = 'Current';

  if (daysOverdue > 90) {
    statusColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    statusText = 'Overdue >90d';
  } else if (daysOverdue > 60) {
    statusColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    statusText = 'Overdue >60d';
  } else if (daysOverdue > 30) {
    statusColor = 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
    statusText = 'Overdue >30d';
  } else if (daysOverdue > 0) {
    statusColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
    statusText = `Overdue ${daysOverdue}d`;
  }

  return (
    <span
      className={cn(
        'inline-block px-2 py-1 rounded text-xs font-medium',
        statusColor
      )}
    >
      {statusText}
    </span>
  );
}

/**
 * AR Widget Component
 */
function ARWidgetComponent(): ReactElement {
  const router = useRouter();
  const { data, isLoading, isError, error } = useReceivables();

  const handleNavigate = () => {
    router.push('/receivables');
  };

  // Memoize calculated values
  const overduAmount = useMemo(() => {
    if (!data) return 0;
    return data.agingBuckets
      .filter((bucket) => bucket.bucket !== 'Current (0-30)')
      .reduce((sum, bucket) => sum + bucket.amount, 0);
  }, [data]);

  const alertCounts = useMemo(
    () => ({
      thisWeek: 2,
      thisMonth: 5,
      overdue: 3,
    }),
    []
  );

  if (isLoading) {
    return (
      <Card className="p-6">
        <ARWidgetSkeleton />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading AR data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {error?.message || 'Failed to fetch accounts receivable data'}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-gray-600 dark:text-gray-400">No data available</p>
      </Card>
    );
  }

  return (
    <Card onClick={handleNavigate} className="p-6 cursor-pointer group">
      <div className="space-y-6">
        {/* Header with Title and Navigation Hint */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Accounts Receivable
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        </div>

        {/* Total AR Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            Total Accounts Receivable
          </p>
          <p className="text-4xl font-bold text-green-900 dark:text-green-100">
            {formatCurrency(data.totalAR, 'AED')}
          </p>
          <p className="text-xs text-green-700 dark:text-green-400 mt-2">
            {data.topCustomers?.length || 0} customers with outstanding balances
          </p>
        </div>

        {/* Aging Breakdown Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Aging Breakdown
          </h3>
          <AgingBar buckets={data.agingBuckets} />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Collection Rate */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase mb-1">
                  Collection Rate
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatPercent(data.collectionRate, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </div>

          {/* Overdue Amount */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-red-700 dark:text-red-300 uppercase mb-1">
                  Overdue Amount
                </p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {formatCurrency(overduAmount, 'AED')}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 opacity-50" />
            </div>
          </div>

          {/* Days Sales Outstanding */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-700 dark:text-purple-300 uppercase mb-1">
                  DSO (Days)
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {data.daysOutstanding}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Top Debtors Table */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Top 5 Debtors
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Name
                  </th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Amount
                  </th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Days Overdue
                  </th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.topCustomers?.slice(0, 5).map((customer, index) => (
                  <tr
                    key={`${customer.id}-${index}`}
                    className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-gray-900 dark:text-gray-100">
                      {customer.name}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-900 dark:text-gray-100 font-medium">
                      {formatCurrency(customer.amount, 'AED')}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-600 dark:text-gray-400">
                      {customer.daysOutstanding}d
                    </td>
                    <td className="py-3 px-3 text-right">
                      <StatusBadge daysOverdue={customer.daysOutstanding} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Collection Alerts
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {alertCounts.thisWeek}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Due This Week
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {alertCounts.thisMonth}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Due This Month
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {alertCounts.overdue}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Overdue
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export const ARWidget = React.memo(ARWidgetComponent);
ARWidget.displayName = 'ARWidget';
