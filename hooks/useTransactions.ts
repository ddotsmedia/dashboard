'use client';

import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/lib/store';
import { dashboardService } from '@/lib/api';
import type { Transaction } from '@/types/dashboard';

export interface UseTransactionsReturn {
  data: Transaction[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook to fetch and manage Transactions data
 * Combines data from the dashboard service into a comprehensive transaction list
 */
export function useTransactions(): UseTransactionsReturn {
  const filters = useFilters();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['transactions', filters.dateRange, filters.company, filters.currency],
    queryFn: async () => {
      try {
        const transactions = await dashboardService.getTransactions({
          dateRange: {
            from: filters.dateRange.startDate,
            to: filters.dateRange.endDate,
          },
          companyId: filters.company,
          currency: filters.currency,
        });

        // Ensure dates are Date objects
        return transactions.map((tx) => ({
          ...tx,
          date: tx.date instanceof Date ? tx.date : new Date(tx.date),
          // Normalize status format
          status: (tx.status?.toLowerCase() || 'draft') as 'draft' | 'posted' | 'reconciled',
        }));
      } catch {
        throw new Error('Failed to fetch transactions');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    data,
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
  };
}
