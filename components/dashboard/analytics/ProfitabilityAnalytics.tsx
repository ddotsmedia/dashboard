'use client';

import { useState } from 'react';
import { useProfitability } from '@/hooks';
import { formatCurrency, formatPercent } from '@/lib/formatting/currency';
import type { ProfitabilityItem } from '@/types/dashboard';

function TrendIndicator({ trend, changePercent }: { trend: string; changePercent?: number }) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  return (
    <div className="flex items-center gap-1">
      {isUp && (
        <>
          <span className="text-green-600 dark:text-green-400">↑</span>
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
            {changePercent ? `+${changePercent.toFixed(1)}%` : 'Up'}
          </span>
        </>
      )}
      {isDown && (
        <>
          <span className="text-red-600 dark:text-red-400">↓</span>
          <span className="text-red-600 dark:text-red-400 text-sm font-semibold">
            {changePercent ? `${changePercent.toFixed(1)}%` : 'Down'}
          </span>
        </>
      )}
      {!isUp && !isDown && (
        <>
          <span className="text-gray-600 dark:text-gray-400">—</span>
          <span className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Stable</span>
        </>
      )}
    </div>
  );
}

export function ProfitabilityAnalytics() {
  const [dimension, setDimension] = useState<'company' | 'branch' | 'department' | 'product' | 'customer'>('company');
  const { data: profitability, isLoading, isError, error } = useProfitability(dimension);

  const dimensions = [
    { value: 'company' as const, label: 'Company' },
    { value: 'branch' as const, label: 'Branch' },
    { value: 'department' as const, label: 'Department' },
    { value: 'product' as const, label: 'Product' },
    { value: 'customer' as const, label: 'Customer' },
  ];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">{error?.message || 'Failed to load profitability data'}</p>
      </div>
    );
  }

  const items = profitability || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profitability Analysis</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Analyze profitability by different dimensions</p>

        {/* Dimension Selector */}
        <div className="flex flex-wrap gap-2">
          {dimensions.map((dim) => (
            <button
              key={dim.value}
              onClick={() => setDimension(dim.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                dimension === dim.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Revenue</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Gross Profit</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Net Profit</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Margin</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Trend</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: ProfitabilityItem, idx) => (
              <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  </div>
                </td>
                <td className="text-right py-3 px-4 text-gray-900 dark:text-white">
                  {formatCurrency(item.revenue)}
                </td>
                <td className="text-right py-3 px-4 text-gray-900 dark:text-white">
                  {formatCurrency(item.grossProfit)}
                </td>
                <td className="text-right py-3 px-4">
                  <span className={item.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {formatCurrency(item.netProfit)}
                  </span>
                </td>
                <td className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  {formatPercent(item.margin)}
                </td>
                <td className="text-right py-3 px-4">
                  <TrendIndicator trend={item.trend || 'stable'} changePercent={item.changePercent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No profitability data available</p>
        </div>
      )}
    </div>
  );
}
