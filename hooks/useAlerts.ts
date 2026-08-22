'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/lib/api';
import type { Alert } from '@/types/dashboard';

export interface UseAlertsReturn {
  data: Alert[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook to fetch alerts data
 * Fetches the list of alerts for the current user
 */
export function useAlerts(): UseAlertsReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      try {
        return await dashboardService.getAlerts();
      } catch {
        // Fall back to empty array on error
        return [];
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
