'use client';

import { useMemo, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, Eye, EyeOff, Download, FileJson, FileSpreadsheet, Plus, MoreVertical, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTransactions } from '@/hooks';
import { useChartResponsive } from '@/lib/hooks/useChartResponsive';
import { formatCurrency } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';
import { TransactionDetailsDrawer } from './TransactionDetailsDrawer';
import { TransactionsFilters } from './TransactionsFilters';
import { exportTransactionsToCSV } from '@/lib/export/csvExport';
import { exportTransactionsToPDF } from '@/lib/export/pdfExport';
import type { Transaction } from '@/types/dashboard';

interface FilterState {
  search: string;
  status: string[];
  type: string[];
  category: string[];
  account: string[];
  dateFrom: string;
  dateTo: string;
}

/**
 * Transactions Table Component
 * Full-featured TanStack Table v8 with:
 * - Sortable columns (click headers)
 * - Filterable columns (Date, Status, Type, Category, Account, Currency)
 * - Global search (across Date, Reference, Description)
 * - Pagination (10/25/50/100 rows selector)
 * - Column visibility toggle (eye icons)
 * - Row selection (checkboxes with select all)
 * - Virtualization ready: Install @tanstack/react-virtual for 1000+ rows
 * - CSV/PDF export with current filters applied
 * - Click row to open TransactionDetailsDrawer
 */
export function TransactionsTable() {
  const { data: transactions, isLoading, isError, error } = useTransactions();
  const { isMobile, isTablet, isDesktop } = useChartResponsive();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: isMobile ? false : true,
    description: !isTablet, // Hide description on tablet and mobile
  });
  const [rowSelection, setRowSelection] = useState({});
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    type: [],
    category: [],
    account: [],
    dateFrom: '',
    dateTo: '',
  });

  // Filter transactions
  const filteredData = useMemo(() => {
    if (!transactions) return [];

    return transactions.filter((tx) => {
      // Search filter (date, reference, description)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchSearch =
          (tx.date instanceof Date ? tx.date.toISOString().split('T')[0] : tx.date).includes(searchLower) ||
          tx.reference?.toLowerCase().includes(searchLower) ||
          tx.description.toLowerCase().includes(searchLower);
        if (!matchSearch) return false;
      }

      // Status filter
      if (filters.status.length > 0) {
        if (!filters.status.includes(tx.status?.charAt(0).toUpperCase() + tx.status?.slice(1))) {
          return false;
        }
      }

      // Type filter
      if (filters.type.length > 0) {
        const txType = tx.type.charAt(0).toUpperCase() + tx.type.slice(1);
        if (!filters.type.includes(txType)) {
          return false;
        }
      }

      // Category filter
      if (filters.category.length > 0) {
        if (!filters.category.includes(tx.category)) {
          return false;
        }
      }

      // Account filter
      if (filters.account.length > 0) {
        if (!filters.account || !filters.account.includes(tx.account || '')) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const txDate = tx.date instanceof Date ? tx.date : new Date(tx.date);
        if (filters.dateFrom && txDate < new Date(filters.dateFrom)) return false;
        if (filters.dateTo && txDate > new Date(filters.dateTo)) return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={(e) => table.toggleAllRowsSelected(e.target.checked)}
            className="rounded border-gray-300 dark:border-slate-600"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            className="rounded border-gray-300 dark:border-slate-600"
            aria-label="Select row"
          />
        ),
        size: 50,
      },
      {
        accessorKey: 'date',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Date
            {column.getIsSorted() === 'asc' && <ArrowUpDown size={16} className="text-blue-500" />}
            {column.getIsSorted() === 'desc' && <ArrowUpDown size={16} className="text-blue-500" />}
          </button>
        ),
        cell: ({ row }) => {
          const date = row.getValue('date') as Date | string;
          const dateObj = date instanceof Date ? date : new Date(date);
          return <span className="text-sm text-gray-900 dark:text-white">{dateObj.toISOString().split('T')[0]}</span>;
        },
        size: 100,
      },
      {
        accessorKey: 'reference',
        header: 'Reference',
        cell: ({ row }) => (
          <span className="text-sm font-mono text-gray-900 dark:text-white">{row.getValue('reference') || '-'}</span>
        ),
        size: 120,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
          const description = row.getValue('description') as string;
          return <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{description}</span>;
        },
        size: 200,
      },
      {
        accessorKey: 'account',
        header: 'Account',
        cell: ({ row }) => (
          <span className="text-sm text-gray-900 dark:text-white">{row.getValue('account') || '-'}</span>
        ),
        size: 130,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
          <span className="text-sm text-gray-900 dark:text-white">{row.getValue('category')}</span>
        ),
        size: 140,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const type = row.getValue('type') as string;
          const isCredit = ['revenue', 'credit', 'receipt'].includes(type.toLowerCase());
          return (
            <span
              className={cn(
                'inline-block px-2 py-1 rounded text-xs font-medium',
                isCredit
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          );
        },
        size: 100,
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center justify-end gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Amount
            {column.getIsSorted() === 'asc' && <ArrowUpDown size={16} className="text-blue-500" />}
            {column.getIsSorted() === 'desc' && <ArrowUpDown size={16} className="text-blue-500" />}
          </button>
        ),
        cell: ({ row }) => {
          const amount = row.getValue('amount') as number;
          const currency = (row.original.currency || 'AED') as 'AED' | 'USD' | 'EUR';
          return (
            <span className="text-sm font-semibold text-gray-900 dark:text-white text-end">
              {formatCurrency(amount, currency)}
            </span>
          );
        },
        size: 120,
      },
      {
        accessorKey: 'currency',
        header: 'Currency',
        cell: ({ row }) => (
          <span className="text-sm font-medium text-gray-900 dark:text-white">{row.getValue('currency') || 'AED'}</span>
        ),
        size: 90,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = (row.getValue('status') as string)?.toLowerCase();
          const statusDisplay = status?.charAt(0).toUpperCase() + status?.slice(1);
          const statusColors: Record<string, string> = {
            draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
            posted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            reconciled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          };
          return (
            <span className={cn('inline-block px-2 py-1 rounded text-xs font-medium', statusColors[status] || statusColors.draft)}>
              {statusDisplay}
            </span>
          );
        },
        size: 110,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <button
            onClick={() => {
              setSelectedTransaction(row.original);
              setIsDrawerOpen(true);
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
          >
            <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        ),
        size: 50,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { rows } = table.getRowModel();
  // Note: For virtualization with 100+ rows, install @tanstack/react-virtual
  // and uncomment the useVirtualizer code below
  // Pagination handles large datasets efficiently without virtualization

  const handleExportCSV = useCallback(() => {
    if (filteredData.length > 0) {
      exportTransactionsToCSV(filteredData, `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    }
  }, [filteredData]);

  const handleExportPDF = useCallback(async () => {
    if (filteredData.length > 0) {
      await exportTransactionsToPDF(filteredData, `transactions_${new Date().toISOString().split('T')[0]}.pdf`);
    }
  }, [filteredData]);

  // Loading state
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded" />
              <Skeleton className="flex-1 h-10 rounded" />
              <Skeleton className="flex-1 h-10 rounded" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="p-6 border-red-200 dark:border-red-900">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle size={24} className="text-red-500" />
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Failed to load transactions</h3>
        </div>
        <p className="text-sm text-red-700 dark:text-red-200 mb-4">{error?.message || 'An unknown error occurred'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
        >
          Retry
        </button>
      </Card>
    );
  }

  // Empty state
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Plus size={40} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No transactions found</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Start by creating a new transaction or adjusting your filters.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <TransactionsFilters onFilterChange={setFilters} isLoading={isLoading} />

      {/* Export Buttons & Controls - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
        <div className="flex items-center gap-1 sm:gap-2">
          {!isMobile && <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Export</span>}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs font-medium bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
            title="Export as CSV"
          >
            <FileSpreadsheet size={isMobile ? 14 : 16} />
            {!isMobile && 'CSV'}
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs font-medium bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
            title="Export as PDF"
          >
            <Download size={isMobile ? 14 : 16} />
            {!isMobile && 'PDF'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="line-clamp-1">
            {filteredData.length > 0
              ? `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  filteredData.length
                )} of ${filteredData.length}`
              : 'No results'}
          </span>
          {Object.keys(rowSelection).length > 0 && (
            <span className="text-blue-600 dark:text-blue-400 font-medium">({Object.keys(rowSelection).length} selected)</span>
          )}
        </div>

        {/* Column Visibility Toggle - Hide on mobile */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Columns</span>
            {table.getAllLeafColumns().map((column) => {
              if (column.id === 'select' || column.id === 'actions') return null;
              return (
                <button
                  key={column.id}
                  onClick={() => column.toggleVisibility()}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title={`${column.columnDef.header ? `Toggle ${column.columnDef.header}` : 'Toggle column'}`}
                >
                  {column.getIsVisible() ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Table / Card View */}
      <Card className="overflow-hidden">
        {isMobile ? (
          // Mobile Card View
          <div data-transactions-table className="space-y-3 p-4">
            {rows.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No transactions match your filters</p>
              </div>
            ) : (
              rows.map((row) => (
                <div
                  key={row.id}
                  onClick={() => {
                    setSelectedTransaction(row.original);
                    setIsDrawerOpen(true);
                  }}
                  className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:shadow-md dark:hover:shadow-lg transition-shadow cursor-pointer min-h-[88px]"
                >
                  {/* Row 1: Date | Reference */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100 dark:border-slate-700">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {(() => {
                          const dateValue = row.getValue('date') as Date | string;
                          const dateObj = dateValue instanceof Date ? dateValue : new Date(dateValue);
                          return dateObj.toISOString().split('T')[0];
                        })()}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Reference</p>
                      <p className="text-sm font-mono text-gray-900 dark:text-white text-right">{row.getValue('reference') || '-'}</p>
                    </div>
                  </div>

                  {/* Row 2: Amount | Status */}
                  <div className="flex justify-between items-end">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Amount</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(row.getValue('amount') as number, (row.original.currency || 'AED') as 'AED' | 'USD' | 'EUR')}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Status</p>
                      <div className="flex justify-end">
                        {(() => {
                          const status = (row.getValue('status') as string)?.toLowerCase();
                          const statusDisplay = status?.charAt(0).toUpperCase() + status?.slice(1);
                          const statusColors: Record<string, string> = {
                            draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
                            posted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                            reconciled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                          };
                          return (
                            <span className={cn('inline-block px-2 py-1 rounded text-xs font-medium', statusColors[status] || statusColors.draft)}>
                              {statusDisplay}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Desktop/Tablet Table View
          <div data-transactions-table className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="px-3 sm:px-4 py-3 text-start font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm whitespace-nowrap"
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer h-11"
                    onClick={() => {
                      setSelectedTransaction(row.original);
                      setIsDrawerOpen(true);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="px-3 sm:px-4 py-3 text-xs sm:text-sm"
                        onClick={(e) => {
                          if (cell.column.id === 'select' || cell.column.id === 'actions') {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {rows.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No transactions match your filters</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Pagination Controls - Responsive */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
          {!isMobile && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Rows per page</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-2 py-1 text-xs sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2">
            {!isMobile && (
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First page"
              >
                First
              </button>
            )}
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              {isMobile ? '←' : 'Prev'}
            </button>

            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap px-2">
              {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              {isMobile ? '→' : 'Next'}
            </button>
            {!isMobile && (
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last page"
              >
                Last
              </button>
            )}
          </div>
        </div>
      )}

      {/* Transaction Details Drawer */}
      <TransactionDetailsDrawer transaction={selectedTransaction} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
