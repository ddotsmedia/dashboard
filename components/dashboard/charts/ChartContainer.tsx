'use client';

import React from 'react';
import { ChartSkeleton } from './ChartSkeleton';

interface ChartContainerProps {
  title?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
  height?: string;
}

/**
 * Chart Container Component
 * Wrapper for all dashboard charts with loading and error states
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  isLoading = false,
  error = null,
  className = '',
  height = 'h-96',
}) => {
  return (
    <div
      className={`w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 ${className}`}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{title}</h3>
        </div>
      )}

      <div className={height}>
        {isLoading ? (
          <ChartSkeleton />
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">{children}</div>
        )}
      </div>
    </div>
  );
};

ChartContainer.displayName = 'ChartContainer';
