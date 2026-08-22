'use client';

/**
 * Transactions Section Component
 * Wrapper combining filters and transactions table
 * Provides search, sort, filter, and export functionality
 * Uses the improved TransactionsTable with full TanStack Table v8 features
 */

import { TransactionsTable } from './TransactionsTable';

export function TransactionsSection() {
  return (
    <div className="w-full space-y-4">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transactions</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage and view all transactions with advanced filtering, sorting, and export options
        </p>
      </div>

      {/* Transactions Table with Filters */}
      <TransactionsTable />
    </div>
  );
}

TransactionsSection.displayName = 'TransactionsSection';
