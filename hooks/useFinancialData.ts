'use client';

import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/lib/store';
import { dashboardService } from '@/lib/api';
import type { DashboardSummary } from '@/types/dashboard';

export function useFinancialData() {
  const filters = useFilters();

  // Map store comparison period to API comparison period
  const getComparisonPeriod = (period: string): 'none' | 'previousPeriod' | 'previousYear' => {
    switch (period) {
      case 'YoY':
        return 'previousYear';
      case 'QoQ':
      case 'MoM':
        return 'previousPeriod';
      default:
        return 'none';
    }
  };

  return useQuery({
    queryKey: ['dashboard', filters.dateRange, filters.company, filters.currency],
    queryFn: async () => {
      return await dashboardService.getDashboardSummary({
        dateRange: {
          from: filters.dateRange.startDate,
          to: filters.dateRange.endDate,
        },
        companyId: filters.company,
        currency: filters.currency,
        comparisonPeriod: getComparisonPeriod(filters.comparisonPeriod),
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export type { DashboardSummary };
