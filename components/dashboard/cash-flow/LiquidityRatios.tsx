/**
 * Liquidity Ratios Component
 * Displays current, quick, and cash ratios with status indicators
 */

'use client';

import { memo, type ReactElement, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { formatNumber } from '@/lib/formatting/currency';
import { HelpCircle } from 'lucide-react';

interface LiquidityRatiosProps {
  currentRatio?: number;
  quickRatio?: number;
  cashRatio?: number;
  isLoading?: boolean;
}

/**
 * Ratio status and color determination
 */
interface RatioStatus {
  label: string;
  status: 'good' | 'ok' | 'poor';
  color: string;
  textColor: string;
  bgColor: string;
  description: string;
}

/**
 * Get status for current ratio (ideal > 1.5)
 */
function getCurrentRatioStatus(value: number): RatioStatus {
  if (value >= 1.5) {
    return {
      label: 'Good',
      status: 'good',
      color: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      description:
        'Current ratio measures short-term liquidity. A ratio above 1.5 indicates the company has 1.5 times more current assets than liabilities, suggesting good financial health.',
    };
  }
  if (value >= 1.0) {
    return {
      label: 'Acceptable',
      status: 'ok',
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
      description:
        'Current ratio is between 1.0 and 1.5. While acceptable, it indicates the company has limited buffer for unexpected challenges.',
    };
  }
  return {
    label: 'Poor',
    status: 'poor',
    color: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    description:
      'Current ratio below 1.0 suggests the company may struggle to meet short-term obligations with current assets alone.',
  };
}

/**
 * Get status for quick ratio (ideal > 1.0)
 */
function getQuickRatioStatus(value: number): RatioStatus {
  if (value >= 1.0) {
    return {
      label: 'Good',
      status: 'good',
      color: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      description:
        'Quick ratio (acid test) measures immediate liquidity. A ratio above 1.0 indicates the company can cover short-term liabilities with its most liquid assets.',
    };
  }
  if (value >= 0.7) {
    return {
      label: 'Acceptable',
      status: 'ok',
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
      description:
        'Quick ratio between 0.7 and 1.0 is generally acceptable. The company has reasonable ability to meet obligations.',
    };
  }
  return {
    label: 'Poor',
    status: 'poor',
    color: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    description:
      'Quick ratio below 0.7 indicates potential liquidity challenges if immediate obligations arise.',
  };
}

/**
 * Get status for cash ratio (ideal > 0.5)
 */
function getCashRatioStatus(value: number): RatioStatus {
  if (value >= 0.5) {
    return {
      label: 'Good',
      status: 'good',
      color: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      description:
        'Cash ratio measures the most conservative liquidity. A ratio above 0.5 means the company can cover 50% of liabilities with cash alone.',
    };
  }
  if (value >= 0.2) {
    return {
      label: 'Acceptable',
      status: 'ok',
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
      description:
        'Cash ratio between 0.2 and 0.5 is typical for most businesses. Shows reasonable cash position.',
    };
  }
  return {
    label: 'Low',
    status: 'poor',
    color: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    description:
      'Cash ratio below 0.2 indicates the company relies heavily on converting receivables and inventory to meet obligations.',
  };
}

/**
 * Ratio Card Component
 */
interface RatioCardProps {
  label: string;
  value: number;
  status: RatioStatus;
  isLoading?: boolean;
}

function RatioCard({ label, value, status, isLoading }: RatioCardProps): ReactElement {
  const [showTooltip, setShowTooltip] = useState(false);

  if (isLoading) {
    return (
      <div className={`p-4 rounded-lg ${status.bgColor} space-y-3`}>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg ${status.bgColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {label}
          </p>
        </div>
        <div className="relative">
          <button
            className={`p-1 rounded-full ${status.textColor} hover:opacity-75 transition-opacity`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={`Information about ${label}`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg p-3 shadow-lg z-10 pointer-events-none">
              {status.description}
            </div>
          )}
        </div>
      </div>

      {/* Value */}
      <p className={`text-3xl font-bold ${status.textColor} mb-2`}>
        {formatNumber(value, 2)}
      </p>

      {/* Status Badge */}
      <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${status.color} ${status.textColor}`}>
        {status.label}
      </div>

      {/* Visual Indicator */}
      <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            status.status === 'good'
              ? 'bg-green-500 dark:bg-green-400'
              : status.status === 'ok'
                ? 'bg-yellow-500 dark:bg-yellow-400'
                : 'bg-red-500 dark:bg-red-400'
          }`}
          style={{
            width: `${Math.min(Math.max(value * 20, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Liquidity Ratios Component
 * Displays three key liquidity ratios with status and explanations
 */
function LiquidityRatiosComponent({
  currentRatio = 0,
  quickRatio = 0,
  cashRatio = 0,
  isLoading = false,
}: LiquidityRatiosProps): ReactElement {
  const currentStatus = getCurrentRatioStatus(currentRatio);
  const quickStatus = getQuickRatioStatus(quickRatio);
  const cashStatus = getCashRatioStatus(cashRatio);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Liquidity Ratios
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Measures of financial health and ability to meet short-term obligations
          </p>
        </div>

        {/* Ratio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RatioCard
            label="Current Ratio"
            value={currentRatio}
            status={currentStatus}
            isLoading={isLoading}
          />
          <RatioCard
            label="Quick Ratio"
            value={quickRatio}
            status={quickStatus}
            isLoading={isLoading}
          />
          <RatioCard
            label="Cash Ratio"
            value={cashRatio}
            status={cashStatus}
            isLoading={isLoading}
          />
        </div>

        {/* Info Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Tip:</span> Hover over the info icons to learn more about each ratio. These metrics help assess your company&apos;s ability to meet short-term financial obligations.
          </p>
        </div>
      </div>
    </Card>
  );
}

export const LiquidityRatios = memo(LiquidityRatiosComponent);

LiquidityRatios.displayName = 'LiquidityRatios';
