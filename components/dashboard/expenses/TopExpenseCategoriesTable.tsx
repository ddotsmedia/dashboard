'use client';

import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';

interface TopExpenseCategoriesTableProps {
  data: Array<{
    category: string;
    amount: number;
    trend: 'up' | 'down' | 'stable';
    trendPercent: number;
    percentOfTotal: number;
  }>;
  currency?: 'AED' | 'USD' | 'EUR';
  onCategoryClick?: (category: string) => void;
}

/**
 * Top Expense Categories Table
 * Displays expense categories with amount, trend, and percentage of total
 * Uses TanStack Table for sorting and data management
 */
export const TopExpenseCategoriesTable: React.FC<TopExpenseCategoriesTableProps> = ({
  data,
  currency = 'AED',
  onCategoryClick,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'amount',
      desc: true,
    },
  ]);

  // Define table columns
  const columns = useMemo<ColumnDef<(typeof data)[0]>[]>(
    () => [
      {
        accessorKey: 'category',
        header: 'Category',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white">
              {info.getValue() as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (info) => (
          <div className="text-right font-medium text-gray-900 dark:text-white">
            {formatCurrency((info.getValue() as number) || 0, currency as 'AED' | 'USD' | 'EUR')}
          </div>
        ),
      },
      {
        accessorKey: 'trend',
        header: 'Trend',
        cell: (info) => {
          const trend = info.getValue() as 'up' | 'down' | 'stable';
          const trendPercent = info.row.original.trendPercent;

          return (
            <div className="flex items-center gap-2">
              {trend === 'up' && (
                <>
                  <ArrowUp className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {Math.abs(trendPercent)}%
                  </span>
                </>
              )}
              {trend === 'down' && (
                <>
                  <ArrowDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {Math.abs(trendPercent)}%
                  </span>
                </>
              )}
              {trend === 'stable' && (
                <>
                  <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {Math.abs(trendPercent)}%
                  </span>
                </>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'percentOfTotal',
        header: '% of Total',
        cell: (info) => (
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {(info.getValue() as number).toFixed(1)}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                style={{
                  width: `${(info.getValue() as number)}%`,
                }}
              />
            </div>
          </div>
        ),
      },
    ],
    [currency]
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleCategoryClick = (category: string) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider',
                    header.id === 'percentOfTotal' && 'text-right'
                  )}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none flex items-center gap-2'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cn(
                'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                onCategoryClick && 'cursor-pointer'
              )}
              onClick={() => handleCategoryClick(row.original.category)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn(
                    'px-4 py-3 text-sm',
                    cell.column.id === 'percentOfTotal' && 'text-right'
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TopExpenseCategoriesTable.displayName = 'TopExpenseCategoriesTable';
