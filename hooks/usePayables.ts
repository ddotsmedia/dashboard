'use client';

import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/lib/store';
import { dashboardService } from '@/lib/api';
import type { PayableMetric } from '@/types/dashboard';

/**
 * Hook to fetch Accounts Payable data
 * Uses React Query for caching and automatic refetching
 */
export function usePayables() {
  const filters = useFilters();

  const query = useQuery({
    queryKey: ['payables', filters.dateRange, filters.company, filters.currency],
    queryFn: async () => {
      return await dashboardService.getPayables({
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

export type { PayableMetric };
