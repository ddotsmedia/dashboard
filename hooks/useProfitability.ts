'use client';

import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/lib/store';
import { dashboardService } from '@/lib/api';
import type { ProfitabilityItem } from '@/types/dashboard';

/**
 * Hook to fetch Profitability data by dimension
 * Uses React Query for caching and automatic refetching
 */
export function useProfitability(dimension: 'company' | 'branch' | 'department' | 'product' | 'customer' = 'company') {
  const filters = useFilters();

  const query = useQuery({
    queryKey: ['profitability', filters.dateRange, filters.company, dimension],
    queryFn: async () => {
      return await dashboardService.getProfitability(dimension, {
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

export type { ProfitabilityItem };
