/**
 * AP Aging Visualization Component
 * Horizontal stacked bar chart showing aging buckets
 * Colors: green (current) → yellow → orange → red → dark red (90+)
 */

'use client';

import { memo, type ReactElement } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, calculatePercentage } from '@/lib/formatting/currency';
import type { APAgingBucket } from '@/types/dashboard';

interface APAgingVisualizationProps {
  data?: APAgingBucket[];
  isLoading?: boolean;
}

/**
 * Color palette for aging buckets
 * Maps bucket names to colors with semantic meaning
 */
const BUCKET_COLORS: Record<string, string> = {
  'current': '#16B96F',    // Green
  '0-30': '#16B96F',       // Green
  '1-30': '#FBBF24',       // Yellow
  '31-60': '#F97316',      // Orange
  '61-90': '#EF4444',      // Red
  '90+': '#991B1B',        // Dark Red
  '91+': '#991B1B',        // Dark Red (alternative naming)
};

/**
 * Get color for a bucket
 */
function getBucketColor(bucket: string): string {
  const normalized = bucket.toLowerCase().trim();
  return BUCKET_COLORS[normalized] || '#6366F1';
}

/**
 * Get label for a bucket
 */
function getBucketLabel(bucket: string): string {
  const normalized = bucket.toLowerCase();
  if (normalized === 'current' || normalized === '0-30') {
    return 'Current (0-30 days)';
  }
  if (normalized === '1-30' || normalized === '31-60') {
    return '31-60 days';
  }
  if (normalized === '61-90') {
    return '61-90 days';
  }
  if (normalized === '90+' || normalized === '91+') {
    return '90+ days';
  }
  return bucket;
}

/**
 * Calculate order for legend (by urgency)
 */
function getBucketOrder(bucket: string): number {
  const normalized = bucket.toLowerCase();
  if (normalized === 'current' || normalized === '0-30') return 0;
  if (normalized === '1-30') return 1;
  if (normalized === '31-60') return 2;
  if (normalized === '61-90') return 3;
  if (normalized === '90+' || normalized === '91+') return 4;
  return 5;
}

/**
 * AP Aging Visualization Component
 * Displays a horizontal stacked bar chart with percentages
 */
function APAgingVisualizationComponent({
  data,
  isLoading = false,
}: APAgingVisualizationProps): ReactElement {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No aging data available
        </p>
      </Card>
    );
  }

  // Sort data by bucket order for consistent display
  const sortedData = [...data].sort((a, b) => getBucketOrder(a.bucket) - getBucketOrder(b.bucket));

  // Calculate total for percentage calculations
  const total = sortedData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Accounts Payable Aging
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total AP: {formatCurrency(total, 'AED')}
          </p>
        </div>

        {/* Stacked Bar Chart */}
        <div className="space-y-4">
          {sortedData.map((bucket) => {
            const percentage = calculatePercentage(bucket.amount, total, 1);
            const barWidth = `${percentage}%`;

            return (
              <div key={bucket.bucket} className="space-y-1">
                {/* Bucket Label and Value */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getBucketLabel(bucket.bucket)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(bucket.amount, 'AED')}
                  </span>
                </div>

                {/* Stacked Bar */}
                <div
                  className="relative h-6 rounded-sm overflow-hidden bg-gray-100 dark:bg-gray-700"
                  title={`${bucket.bucket}: ${formatCurrency(bucket.amount, 'AED')} (${percentage.toFixed(1)}%)`}
                >
                  <div
                    className="h-full flex items-center justify-center transition-all duration-300 ease-out"
                    style={{
                      width: barWidth,
                      backgroundColor: getBucketColor(bucket.bucket),
                    }}
                  >
                    {percentage > 5 && (
                      <span className="text-xs font-semibold text-white px-2 truncate">
                        {percentage.toFixed(1)}%
                      </span>
                    )}
                  </div>

                  {/* Percentage badge outside bar if space is tight */}
                  {percentage <= 5 && (
                    <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>

                {/* Additional info */}
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {bucket.count} invoice{bucket.count !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex flex-wrap gap-4">
            {sortedData.map((bucket) => (
              <div key={`legend-${bucket.bucket}`} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getBucketColor(bucket.bucket) }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {getBucketLabel(bucket.bucket)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export const APAgingVisualization = memo(APAgingVisualizationComponent);

APAgingVisualization.displayName = 'APAgingVisualization';
