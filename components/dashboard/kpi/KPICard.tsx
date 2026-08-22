/**
 * KPICard Component
 * Individual KPI card with value, change, and sparkline chart
 */

'use client';

import React, { memo, type ReactElement } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Sparkline } from './Sparkline';
import { KPISkeleton } from './KPISkeleton';
import { formatCurrency as formatCurrencyLegacy, formatNumber as formatNumberLegacy, formatPercent as formatPercentLegacy } from '@/lib/formatting/currency';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/localization/formatters';
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
  currency: 'AED' | 'USD' | 'EUR' | 'count' = 'AED',
  locale: 'en' | 'ar' = 'ar'
): string {
  if (currency === 'count') {
    return formatNumber(value, locale, 0);
  }

  switch (format) {
    case 'currency':
      return formatCurrency(value, currency as 'AED' | 'USD' | 'EUR', locale);
    case 'percentage':
      return formatPercent(value, locale, 2);
    case 'number':
      return formatNumber(value, locale, 0);
    default:
      return formatCurrency(value, currency as 'AED' | 'USD' | 'EUR', locale);
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
 * - Label (start)
 * - Value (formatted, start)
 * - Change % with trend arrow (start)
 * - Sparkline chart (end)
 * RTL-aware: Uses logical properties for direction independence
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
  const locale = useLocale() as 'en' | 'ar';

  if (isLoading) {
    return <KPISkeleton />;
  }

  const sparklineColor = semanticColor ? SEMANTIC_COLORS[semanticColor] : '#6366F1';
  const formattedValue = formatKPIValue(value, format, currency, locale);
  const trendColor = getTrendColor(trend, change);
  const trendIcon = getTrendIcon(trend, change);

  // Sparkline dimensions with responsive sizing via container
  // Width: 80px on desktop (via flex layout), adapts to mobile through container constraints
  const sparklineWidth = 80;
  const sparklineHeight = 40;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'flex flex-col justify-between h-full',
        onClick && 'cursor-pointer'
      )}
    >
      {/* Header: Label with responsive padding and font size */}
      <div className="mb-3 sm:mb-4 md:mb-4 flex-1">
        <p className="text-xs sm:text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide text-start">
          {label}
        </p>
      </div>

      {/* Main content: Value + Sparkline with responsive layout */}
      <div className="flex flex-col sm:flex-row items-end justify-between gap-3 sm:gap-4">
        {/* Start: Value and Change */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          {/* Formatted Value - Responsive: 24px mobile, 30px tablet, 32px desktop */}
          <p className="text-2xl md:text-[30px] lg:text-[32px] font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 break-words text-start leading-tight">
            {formattedValue}
          </p>

          {/* Change percentage with trend - Responsive: 12px mobile, 14px desktop */}
          {change !== undefined && (
            <div className={cn('flex items-center gap-1 text-xs sm:text-sm flex-wrap', trendColor)}>
              {trendIcon}
              <span className="font-medium">
                {Math.abs(change).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ms-1">
                {comparisonPeriod}
              </span>
            </div>
          )}
        </div>

        {/* End: Sparkline Chart - Responsive width: 60px mobile, 80px desktop */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
            <div className="min-w-max md:min-w-[80px]">
              <Sparkline
                data={sparklineData}
                color={sparklineColor}
                width={sparklineWidth}
                height={sparklineHeight}
              />
            </div>
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
