'use client';

import React, { useState } from 'react';
import { useAIInsights } from '@/hooks';
import { InsightCard } from './InsightCard';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AIInsight } from '@/types/dashboard';

/**
 * Loading skeleton component
 */
function InsightCardSkeleton() {
  return (
    <div
      className={cn(
        'flex-shrink-0 w-full sm:w-96',
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
        'p-4 space-y-4 animate-pulse'
      )}
    >
      {/* Header skeleton */}
      <div className="flex gap-3">
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="flex gap-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>

      {/* Metrics skeleton */}
      <div className="space-y-2">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      </div>

      {/* Actions skeleton */}
      <div className="flex gap-2 pt-2">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-16" />
      </div>
    </div>
  );
}

/**
 * Error state component
 */
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-red-200 dark:border-red-800',
        'bg-red-50 dark:bg-red-900/20 p-6',
        'flex flex-col items-center gap-4'
      )}
    >
      <div>
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 text-center">
          Unable to Load AI Insights
        </h3>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1 text-center">
          There was an error fetching your financial insights. Please try again.
        </p>
      </div>
      <button
        onClick={onRetry}
        className={cn(
          'px-4 py-2 rounded-lg text-sm font-medium',
          'bg-red-600 hover:bg-red-700 text-white',
          'transition-colors'
        )}
      >
        Try Again
      </button>
    </div>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-gray-200 dark:border-gray-700',
        'bg-gray-50 dark:bg-gray-800/50 p-12',
        'flex flex-col items-center gap-2'
      )}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          No Insights Available
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          AI insights will be generated as your financial data is analyzed.
        </p>
      </div>
    </div>
  );
}

/**
 * AIInsightsWidget Component
 * Main widget displaying AI-generated financial insights
 */
export function AIInsightsWidget(): React.ReactElement {
  const { data: insights, isLoading, error, refetch } = useAIInsights();
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDismiss = (insightId: string) => {
    setDismissedIds((prev) => new Set([...prev, insightId]));
  };

  const handleViewDetails = (insight: AIInsight) => {
    console.log('View details for insight:', insight.id);
    // In a real app, this would navigate to a detail page or open a modal
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Filter out dismissed insights
  const visibleInsights = insights.filter((insight) => !dismissedIds.has(insight.id));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Financial Insights
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            AI-powered analysis of your financial metrics
          </p>
        </div>

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium',
            'flex items-center gap-2',
            'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
            'text-white transition-colors',
            isRefreshing && 'animate-spin'
          )}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh Insights
        </button>
      </div>

      {/* Content */}
      <div>
        {isLoading ? (
          // Loading state
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0">
                <InsightCardSkeleton />
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <ErrorState onRetry={handleRefresh} />
        ) : visibleInsights.length === 0 ? (
          // Empty state
          <EmptyState />
        ) : (
          // Insights grid - horizontally scrollable on mobile, responsive grid on desktop
          <div
            className={cn(
              'overflow-x-auto pb-4',
              'sm:overflow-x-visible sm:pb-0',
              'flex sm:grid gap-4',
              'sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
            )}
          >
            {visibleInsights.map((insight) => (
              <div key={insight.id} className="flex-shrink-0 sm:flex-shrink">
                <InsightCard
                  insight={insight}
                  onDismiss={handleDismiss}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info footer */}
      {!isLoading && !error && visibleInsights.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4">
          Showing {visibleInsights.length} of {insights.length} insights
          {dismissedIds.size > 0 && ` (${dismissedIds.size} dismissed)`}
        </div>
      )}
    </div>
  );
}

export default AIInsightsWidget;
