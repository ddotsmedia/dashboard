/**
 * AR Metrics Card Component
 * Small reusable metric card for AR-related metrics
 */

'use client';

import { memo, type ReactElement } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface ARMetricsCardProps {
  label: string;
  value: number;
  unit?: 'currency' | 'percentage' | 'number' | 'days';
  currency?: 'AED' | 'USD' | 'EUR';
  color?: 'default' | 'green' | 'orange' | 'red' | 'blue';
  icon?: ReactNode;
  change?: number;
  changeTrend?: 'up' | 'down' | 'stable';
  comparisonPeriod?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

/**
 * Color palette for metric cards
 */
const COLOR_CLASSES: Record<string, string> = {
  default: 'border-l-4 border-l-gray-400 bg-gray-50 dark:bg-gray-900/30',
  green: 'border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20',
  orange: 'border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-900/20',
  red: 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20',
  blue: 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20',
};

/**
 * Get color for value
 */
function getValueColor(color?: string): string {
  switch (color) {
    case 'green':
      return 'text-green-600 dark:text-green-400';
    case 'orange':
      return 'text-orange-600 dark:text-orange-400';
    case 'red':
      return 'text-red-600 dark:text-red-400';
    case 'blue':
      return 'text-blue-600 dark:text-blue-400';
    default:
      return 'text-gray-900 dark:text-white';
  }
}

/**
 * Format metric value
 */
function formatMetricValue(
  value: number,
  unit: 'currency' | 'percentage' | 'number' | 'days' = 'currency',
  currency: 'AED' | 'USD' | 'EUR' = 'AED'
): string {
  switch (unit) {
    case 'currency':
      return formatCurrency(value, currency);
    case 'percentage':
      return formatPercent(value, 1);
    case 'number':
      return formatNumber(value, 0);
    case 'days':
      return `${formatNumber(value, 0)} days`;
    default:
      return formatCurrency(value, currency);
  }
}

/**
 * Get trend color and icon
 */
function getTrendIndicator(trend?: 'up' | 'down' | 'stable', change?: number) {
  if (change === 0 || trend === 'stable') {
    return { color: 'text-gray-500 dark:text-gray-400', icon: null };
  }
  if (trend === 'up' || (change && change > 0)) {
    return {
      color: 'text-green-600 dark:text-green-400',
      icon: <TrendingUp className="w-3 h-3" />,
    };
  }
  return {
    color: 'text-red-600 dark:text-red-400',
    icon: <TrendingDown className="w-3 h-3" />,
  };
}

/**
 * AR Metrics Card Component
 * Compact card for displaying individual metrics
 */
function ARMetricsCardComponent({
  label,
  value,
  unit = 'currency',
  currency = 'AED',
  color = 'default',
  icon,
  change,
  changeTrend,
  comparisonPeriod = 'vs last month',
  isLoading = false,
  onClick,
}: ARMetricsCardProps): ReactElement {
  if (isLoading) {
    return (
      <Card className={cn('p-4', COLOR_CLASSES[color])}>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-2/3" />
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/2" />
        </div>
      </Card>
    );
  }

  const formattedValue = formatMetricValue(value, unit, currency);
  const trendIndicator = getTrendIndicator(changeTrend, change);

  return (
    <Card
      className={cn(
        'p-4',
        COLOR_CLASSES[color],
        onClick && 'cursor-pointer hover:shadow-md transition-shadow'
      )}
      onClick={onClick}
    >
      <div className="space-y-2">
        {/* Header: Label and Icon */}
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex-1">
            {label}
          </p>
          {icon && <div className="text-gray-400 dark:text-gray-600 flex-shrink-0">{icon}</div>}
        </div>

        {/* Value */}
        <p className={cn('text-xl font-bold', getValueColor(color))}>
          {formattedValue}
        </p>

        {/* Change indicator */}
        {change !== undefined && (
          <div className={cn('flex items-center gap-1 text-xs', trendIndicator.color)}>
            {trendIndicator.icon}
            <span className="font-medium">{Math.abs(change).toFixed(1)}%</span>
            <span className="text-gray-600 dark:text-gray-400 font-normal">
              {comparisonPeriod}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

export const ARMetricsCard = memo(ARMetricsCardComponent);

ARMetricsCard.displayName = 'ARMetricsCard';

export type { ARMetricsCardProps };
