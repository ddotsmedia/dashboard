/**
 * Profitability Analysis Widget
 * Displays profitability metrics by selected dimension with bar chart
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
import { useProfitability } from '@/hooks/useProfitability';
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
import { DimensionSelector, type DimensionType } from '../budget/DimensionSelector';
import type { ProfitabilityItem } from '@/types/dashboard';

/**
 * Profitability Widget Skeleton Loading State
 */
function ProfitabilityWidgetSkeleton(): ReactElement {
  return (
    <div className="space-y-6">
      {/* Dimension Selector Skeleton */}
      <Skeleton className="h-10 w-40" />

      {/* Table Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>

      {/* Chart Skeleton */}
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

/**
 * Progress Bar Component for Margin
 */
interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

function ProgressBar({ value, max = 100, className }: ProgressBarProps): ReactElement {
  const percentage = Math.min(Math.max(value, 0), max);

  return (
    <div className={cn('w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

/**
 * Horizontal Bar Chart Component
 */
interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  maxValue?: number;
  height?: string;
}

function HorizontalBarChart({ data, maxValue, height = 'h-64' }: BarChartProps): ReactElement {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn('w-full', height, 'flex flex-col justify-center gap-4')}>
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
              {item.name}
            </span>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {formatCurrency(item.value, 'AED')}
            </span>
          </div>
          <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Profitability Analytics Component
 */
function ProfitabilityAnalyticsComponent(): ReactElement {
  const router = useRouter();
  const [dimension, setDimension] = useState<DimensionType>('company');
  const { data, isLoading, isError, error } = useProfitability(dimension);

  const handleNavigate = () => {
    router.push('/profitability');
  };

  // Define table columns
  const columns = useMemo<ColumnDef<ProfitabilityItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="font-medium text-gray-900 dark:text-white">
            {row.getValue('name')}
          </div>
        ),
      },
      {
        accessorKey: 'revenue',
        header: 'Revenue',
        cell: ({ row }) => (
          <div className="text-gray-700 dark:text-gray-300">
            {formatCurrency(row.getValue('revenue') as number, 'AED')}
          </div>
        ),
      },
      {
        accessorKey: 'grossProfit',
        header: 'Gross Profit',
        cell: ({ row }) => (
          <div className="text-gray-700 dark:text-gray-300">
            {formatCurrency(row.getValue('grossProfit') as number, 'AED')}
          </div>
        ),
      },
      {
        accessorKey: 'netProfit',
        header: 'Net Profit',
        cell: ({ row }) => (
          <div className="text-gray-700 dark:text-gray-300">
            {formatCurrency(row.getValue('netProfit') as number, 'AED')}
          </div>
        ),
      },
      {
        accessorKey: 'margin',
        header: 'Margin %',
        cell: ({ row }) => {
          const margin = row.getValue('margin') as number;

          return (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {margin.toFixed(1)}%
                </span>
              </div>
              <ProgressBar value={margin} max={100} />
            </div>
          );
        },
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: ProfitabilityItem) => {
    // Drill-down functionality placeholder
  };

  // Prepare chart data (top 5 by net profit)
  const chartData = useMemo(() => {
    if (!data) return [];
    return data
      .slice(0, 5)
      .sort((a, b) => b.netProfit - a.netProfit)
      .map((item) => ({
        name: item.name,
        value: item.netProfit,
      }));
  }, [data]);

  if (isLoading) {
    return (
      <Card className="p-6">
        <ProfitabilityWidgetSkeleton />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading Profitability data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {error?.message || 'Failed to fetch profitability data'}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-600 dark:text-gray-400">No profitability data available</p>
      </Card>
    );
  }

  return (
    <Card onClick={handleNavigate} className="p-6 cursor-pointer group">
      <div className="space-y-6">
        {/* Header with Title and Navigation Hint */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Profitability Analysis
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        </div>

        {/* Dimension Selector */}
        <div className="max-w-xs" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            View by
          </label>
          <DimensionSelector
            value={dimension}
            onChange={setDimension}
          />
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

        {/* Bar Chart Section */}
        {chartData.length > 0 && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Top 5 by Net Profit
            </h3>
            <HorizontalBarChart data={chartData} />
          </div>
        )}

        {/* Summary Stats */}
        {data.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                Total Revenue
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(
                  data.reduce((sum, item) => sum + item.revenue, 0),
                  'AED'
                )}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                Total Gross Profit
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(
                  data.reduce((sum, item) => sum + item.grossProfit, 0),
                  'AED'
                )}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                Total Net Profit
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(
                  data.reduce((sum, item) => sum + item.netProfit, 0),
                  'AED'
                )}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                Avg Margin
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {(data.reduce((sum, item) => sum + item.margin, 0) / data.length).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export const ProfitabilityAnalytics = React.memo(ProfitabilityAnalyticsComponent);
ProfitabilityAnalytics.displayName = 'ProfitabilityAnalytics';
