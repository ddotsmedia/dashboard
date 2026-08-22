'use client';

import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/lib/store';
import { dashboardService } from '@/lib/api';
import type { AIInsight } from '@/types/dashboard';

/**
 * Hook to fetch AI Insights with filtering support
 * Uses React Query for caching and automatic refetching
 */
export function useAIInsights() {
  const filters = useFilters();

  const query = useQuery({
    queryKey: ['aiInsights', filters.dateRange, filters.company],
    queryFn: async () => {
      return await dashboardService.getAIInsights({
        dateRange: {
          from: filters.dateRange.startDate,
          to: filters.dateRange.endDate,
        },
        companyId: filters.company,
        currency: filters.currency,
      });
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export type { AIInsight };
