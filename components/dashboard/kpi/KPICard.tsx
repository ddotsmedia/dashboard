/**
 * KPICard Component
 * Individual KPI card with value, change, and sparkline chart
 */

'use client';

import React, { memo, type ReactElement } from 'react';
import { Card } from '@/components/ui/Card';
import { Sparkline } from './Sparkline';
import { KPISkeleton } from './KPISkeleton';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: number;
  currency?: 'AED' | 'USD' | 'EUR' | 'count';
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  comparisonPeriod?: string;
  onClick?: () => void;
  sparklineData?: number[];
  isLoading?: boolean;
  format?: 'currency' | 'percentage' | 'number';
  semanticColor?: 'revenue' | 'expense' | 'profit';
  color?: string;
}

/**
 * Semantic colors for different KPI types
 */
const SEMANTIC_COLORS: Record<string, string> = {
  revenue: '#16B96F',   // Green
  expense: '#F97316',   // Orange
  profit: '#6366F1',    // Indigo
};

/**
 * Format KPI value based on format type
 */
function formatKPIValue(
  value: number,
  format: 'currency' | 'percentage' | 'number' = 'currency',
  currency: 'AED' | 'USD' | 'EUR' | 'count' = 'AED'
): string {
  if (currency === 'count') {
    return formatNumber(value, 0);
  }

  switch (format) {
    case 'currency':
      return formatCurrency(value, currency as 'AED' | 'USD' | 'EUR');
    case 'percentage':
      return formatPercent(value, 2);
    case 'number':
      return formatNumber(value, 0);
    default:
      return formatCurrency(value, currency as 'AED' | 'USD' | 'EUR');
  }
}

/**
 * Get trend indicator color
 */
function getTrendColor(
  trend?: 'up' | 'down' | 'stable',
  change?: number
): string {
  if (change === 0 || trend === 'stable') {
    return 'text-gray-500 dark:text-gray-400';
  }
  if (trend === 'up' || (change && change > 0)) {
    return 'text-green-600 dark:text-green-400';
  }
  return 'text-red-600 dark:text-red-400';
}

/**
 * Get trend indicator icon
 */
function getTrendIcon(
  trend?: 'up' | 'down' | 'stable',
  change?: number
): ReactElement {
  if (change === 0 || trend === 'stable') {
    return <Minus className="w-4 h-4" />;
  }
  if (trend === 'up' || (change && change > 0)) {
    return <TrendingUp className="w-4 h-4" />;
  }
  return <TrendingDown className="w-4 h-4" />;
}

/**
 * KPI Card Component
 * Displays:
 * - Label (left)
 * - Value (formatted, left)
 * - Change % with trend arrow (left)
 * - Sparkline chart (right)
 */
function KPICardComponent({
  label,
  value,
  currency = 'AED',
  change,
  trend,
  comparisonPeriod = 'vs last month',
  onClick,
  sparklineData,
  isLoading = false,
  format = 'currency',
  semanticColor,
}: KPICardProps): ReactElement {
  if (isLoading) {
    return <KPISkeleton />;
  }

  const sparklineColor = semanticColor ? SEMANTIC_COLORS[semanticColor] : '#6366F1';
  const formattedValue = formatKPIValue(value, format, currency);
  const trendColor = getTrendColor(trend, change);
  const trendIcon = getTrendIcon(trend, change);

  return (
    <Card
      onClick={onClick}
      className={cn(
        'p-6',
        'flex flex-col justify-between',
        'h-full',
        onClick && 'cursor-pointer hover:shadow-lg transition-shadow'
      )}
    >
      {/* Header: Label */}
      <div className="mb-4 flex-1">
        <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </p>
      </div>

      {/* Main content: Value + Sparkline */}
      <div className="flex items-end justify-between gap-4">
        {/* Left: Value and Change */}
        <div className="flex-1 min-w-0">
          {/* Formatted Value */}
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 break-words">
            {formattedValue}
          </p>

          {/* Change percentage with trend */}
          {change !== undefined && (
            <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
              {trendIcon}
              <span className="font-medium">
                {Math.abs(change).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                {comparisonPeriod}
              </span>
            </div>
          )}
        </div>

        {/* Right: Sparkline Chart */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="flex-shrink-0">
            <Sparkline
              data={sparklineData}
              color={sparklineColor}
              width={80}
              height={40}
            />
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Memoized KPI Card to prevent unnecessary re-renders
 */
export const KPICard = memo(KPICardComponent);

KPICard.displayName = 'KPICard';
