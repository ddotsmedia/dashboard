/**
 * TanStack Query Configuration
 */

import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      },
      mutations: {
        retry: 1,
      },
    },
  });
};

// Create a singleton instance for the app
export const queryClient = createQueryClient();
