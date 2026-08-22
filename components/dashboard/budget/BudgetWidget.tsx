/**
 * Budget vs Actual Widget
 * Displays department-level budget tracking with variance analysis
 * Phase 5 Task 2
 */

'use client';

import React, { useMemo, useState, type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { useBudget } from '@/hooks/useBudget';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatPercent } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { BudgetItem } from '@/types/dashboard';

/**
 * Budget Widget Skeleton Loading State
 */
function BudgetWidgetSkeleton(): ReactElement {
  return (
    <div className="space-y-6">
      {/* Period Toggle Skeleton */}
      <Skeleton className="h-10 w-64" />

      {/* Table Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/**
 * Progress Bar Component for Utilization
 */
interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

function ProgressBar({ value, max = 100, className }: ProgressBarProps): ReactElement {
  const percentage = Math.min((value / max) * 100, 100);
  const color = percentage <= 100 ? 'bg-green-500' : percentage <= 110 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className={cn('w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full transition-all duration-300', color)}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}

/**
 * Budget Widget Component
 */
function BudgetWidgetComponent(): ReactElement {
  const router = useRouter();
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const { data, isLoading, isError, error } = useBudget(period);

  const handleNavigate = () => {
    router.push('/budget');
  };

  // Define table columns
  const columns = useMemo<ColumnDef<BudgetItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Department',
        cell: ({ row }) => (
          <div className="font-medium text-gray-900 dark:text-white">
            {row.getValue('name')}
          </div>
        ),
      },
      {
        accessorKey: 'budgetAmount',
        header: 'Budget',
        cell: ({ row }) => (
          <div className="text-gray-700 dark:text-gray-300">
            {formatCurrency(row.getValue('budgetAmount') as number, 'AED')}
          </div>
        ),
      },
      {
        accessorKey: 'spentAmount',
        header: 'Actual',
        cell: ({ row }) => (
          <div className="text-gray-700 dark:text-gray-300">
            {formatCurrency(row.getValue('spentAmount') as number, 'AED')}
          </div>
        ),
      },
      {
        accessorKey: 'variance',
        header: 'Variance',
        cell: ({ row }) => {
          const variance = row.getValue('variance') as number;
          const isPositive = variance > 0;

          return (
            <div
              className={cn(
                'font-medium flex items-center gap-1',
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? '+' : ''}{formatCurrency(variance, 'AED')}
            </div>
          );
        },
      },
      {
        accessorKey: 'spentAmount',
        id: 'utilization',
        header: 'Utilization %',
        cell: ({ row }) => {
          const budgetAmount = row.original.budgetAmount;
          const spentAmount = row.getValue('spentAmount') as number;
          const utilizationPercent = (spentAmount / budgetAmount) * 100;

          const getStatusColor = (percent: number) => {
            if (percent <= 100) return 'text-green-600 dark:text-green-400';
            if (percent <= 110) return 'text-yellow-600 dark:text-yellow-400';
            return 'text-red-600 dark:text-red-400';
          };

          return (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={cn('font-semibold', getStatusColor(utilizationPercent))}>
                  {utilizationPercent.toFixed(1)}%
                </span>
              </div>
              <ProgressBar value={utilizationPercent} />
            </div>
          );
        },
      },
    ],
    []
  );

  // Filter out total row for display, but include it separately
  const displayData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => item.name !== 'Total Budget');
  }, [data]);

  const totalRow = useMemo(() => {
    if (!data) return null;
    return data.find((item) => item.name === 'Total Budget');
  }, [data]);

  // Create table instance
  const table = useReactTable({
    data: displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: BudgetItem) => {
    // Mock drill-down: log the clicked row
    console.log('Drill-down:', row);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <BudgetWidgetSkeleton />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading Budget data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {error?.message || 'Failed to fetch budget data'}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!data || displayData.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-600 dark:text-gray-400">No budget data available</p>
      </Card>
    );
  }

  return (
    <Card onClick={handleNavigate} className="p-6 cursor-pointer group">
      <div className="space-y-6">
        {/* Header with Title and Navigation Hint */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Budget vs Actual
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        </div>

        {/* Period Toggle */}
        <div className="flex gap-2">
          {['monthly', 'quarterly', 'annual'].map((p) => (
            <button
              key={p}
              onClick={(e) => {
                e.stopPropagation();
                setPeriod(p as typeof period);
              }}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Row */}
        {totalRow && (
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                  Total
                </p>
                <p className="font-bold text-gray-900 dark:text-white">{totalRow.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                  Budget
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalRow.budgetAmount, 'AED')}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                  Actual
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalRow.spentAmount, 'AED')}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                  Variance
                </p>
                <p
                  className={cn(
                    'font-bold flex items-center gap-1',
                    totalRow.variance > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {totalRow.variance > 0 ? '+' : ''}{formatCurrency(totalRow.variance, 'AED')}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                  Utilization %
                </p>
                <p
                  className={cn(
                    'font-bold',
                    totalRow.variancePercent <= 0
                      ? 'text-green-600 dark:text-green-400'
                      : totalRow.variancePercent <= 10
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {((totalRow.spentAmount / totalRow.budgetAmount) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-6 text-xs text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>On Track (≤100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>At Risk (100-110%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Over Budget ({'>'}110%)</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export const BudgetWidget = React.memo(BudgetWidgetComponent);
BudgetWidget.displayName = 'BudgetWidget';
