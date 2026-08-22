'use client';

import { useState } from 'react';
import { useExpenses } from '@/hooks';
import { formatCurrency, formatPercent } from '@/lib/formatting/currency';

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

function CategoryCard({ category, amount, percentage }: CategoryBreakdown) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{category}</h4>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(amount)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatPercent(percentage)}</p>
        </div>
      </div>

      {/* Mini bar */}
      <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-blue-500 h-full rounded-full"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function ExpenseAnalytics() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data: expenses, isLoading, isError, error } = useExpenses();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">{error?.message || 'Failed to load expense data'}</p>
      </div>
    );
  }

  if (!expenses) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
      </div>
    );
  }

  const breakdown = expenses.breakdown || [];
  const topCategories = expenses.topCategories || [];
  const totalExpenses = expenses.totalExpenses || 0;
  const changePercent = expenses.changePercent || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expense Analytics</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track and analyze spending across all categories</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Change from Previous</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(expenses.change || 0)}
          </p>
        </div>
        <div className={`rounded-lg p-4 ${changePercent > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trend</p>
          <p className={`text-2xl font-bold ${changePercent > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* All Categories Grid */}
      {breakdown.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Expense Breakdown by Category</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {breakdown.map((item: CategoryBreakdown) => (
              <div
                key={item.category}
                onClick={() => setActiveCategory(activeCategory === item.category ? null : item.category)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <CategoryCard {...item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Performers */}
      {topCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top Expense Categories</h4>
            <div className="space-y-3">
              {topCategories.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.category}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.trend === 'up' && 'Increasing'}
                        {item.trend === 'down' && 'Decreasing'}
                        {item.trend === 'stable' && 'Stable'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{formatCurrency(item.amount)}</p>
                    <p className={`text-xs font-semibold ${item.trendPercent > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {item.trendPercent > 0 ? '+' : ''}{item.trendPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Expenses */}
          {expenses.departmentExpenses && expenses.departmentExpenses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Department Expenses</h4>
              <div className="space-y-3">
                {expenses.departmentExpenses.slice(0, 5).map((dept, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{dept.department}</p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{formatCurrency(dept.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Category Details */}
      {activeCategory && breakdown.find(b => b.category === activeCategory) && (
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Category Details: {activeCategory}
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            {(() => {
              const exp = breakdown.find(b => b.category === activeCategory)!;
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(exp.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Percentage</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatPercent(exp.percentage)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">{exp.category}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {breakdown.length === 0 && topCategories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
        </div>
      )}
    </div>
  );
}
