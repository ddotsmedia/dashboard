/**
 * Cash Flow Forecast Component
 * Displays 30/60/90 day forecast periods with actual vs forecast distinction
 */

'use client';

import { memo, type ReactElement } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatNumber } from '@/lib/formatting/currency';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { CashFlowPeriod } from '@/types/dashboard';

interface CashFlowForecastProps {
  data?: CashFlowPeriod[];
  isLoading?: boolean;
}

/**
 * Get period label and icon
 */
function getPeriodInfo(index: number): {
  label: string;
  days: string;
  confidence: number;
} {
  switch (index) {
    case 0:
      return { label: '30-Day Forecast', days: 'Next 30 days', confidence: 95 };
    case 1:
      return { label: '60-Day Forecast', days: 'Days 31-60', confidence: 85 };
    case 2:
      return { label: '90-Day Forecast', days: 'Days 61-90', confidence: 75 };
    default:
      return { label: `Period ${index + 1}`, days: `${index * 30}-${(index + 1) * 30} days`, confidence: 70 };
  }
}

/**
 * Determine if period is actual or forecast
 */
function isActualPeriod(index: number): boolean {
  return index === 0;
}

/**
 * Forecast Box Component
 */
function ForecastBox({
  period,
  index,
  isLoading,
}: {
  period?: CashFlowPeriod;
  index: number;
  isLoading?: boolean;
}): ReactElement {
  const info = getPeriodInfo(index);
  const isActual = isActualPeriod(index);

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
      </div>
    );
  }

  if (!period) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  const trendTrend = period.netCashFlow >= 0 ? 'up' : 'down';
  const trendColor = trendTrend === 'up'
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              {info.label}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {info.days}
            </p>
          </div>
          {!isActual && (
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              Forecast
            </span>
          )}
          {isActual && (
            <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
              Actual
            </span>
          )}
        </div>
      </div>

      {/* Net Cash Flow */}
      <div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Net Cash Flow</p>
        <p className={`text-2xl font-bold ${trendColor}`}>
          {formatCurrency(period.netCashFlow, 'AED')}
        </p>
        <div className={`flex items-center gap-1 mt-1 text-sm ${trendColor}`}>
          {trendTrend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">
            {trendTrend === 'up' ? 'Positive' : 'Negative'} forecast
          </span>
        </div>
      </div>

      {/* Inflows and Outflows */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Inflows</p>
          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(period.inflows, 'AED')}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Outflows</p>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            {formatCurrency(period.outflows, 'AED')}
          </p>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-600 dark:text-gray-400">Confidence</p>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">
            {info.confidence}%
          </p>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
            style={{ width: `${info.confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Cash Flow Forecast Component
 * Displays 3 forecast periods: 30, 60, and 90 days
 */
function CashFlowForecastComponent({
  data,
  isLoading = false,
}: CashFlowForecastProps): ReactElement {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cash Flow Forecast
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Projected cash flow for next 90 days
          </p>
        </div>

        {/* Forecast Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <ForecastBox
                period={data?.[index]}
                index={index}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Forecast Note:
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            30-day forecasts are based on recent transaction patterns. Confidence levels decrease with longer forecast horizons due to increased uncertainty.
          </p>
        </div>
      </div>
    </Card>
  );
}

export const CashFlowForecast = memo(CashFlowForecastComponent);

CashFlowForecast.displayName = 'CashFlowForecast';
