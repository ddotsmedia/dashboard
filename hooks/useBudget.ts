'use client';

import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/lib/store';
import { dashboardService } from '@/lib/api';
import type { BudgetItem } from '@/types/dashboard';

/**
 * Hook to fetch Budget data with period support
 * Uses React Query for caching and automatic refetching
 */
export function useBudget(period: 'monthly' | 'quarterly' | 'annual' = 'monthly') {
  const filters = useFilters();

  const query = useQuery({
    queryKey: ['budget', filters.dateRange, filters.company, period],
    queryFn: async () => {
      return await dashboardService.getBudgets({
        dateRange: {
          from: filters.dateRange.startDate,
          to: filters.dateRange.endDate,
        },
        companyId: filters.company,
        currency: filters.currency,
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export type { BudgetItem };
