'use client';

import { useState } from 'react';
import { useBudget } from '@/hooks';
import { formatCurrency } from '@/lib/formatting/currency';
import type { BudgetItem } from '@/types/dashboard';

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    'on-track': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'at-risk': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'over-budget': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'under-utilized': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusStyles[status as keyof typeof statusStyles]}`}>
      {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
    </span>
  );
}

function BudgetBar({ spent, budgeted }: { spent: number; budgeted: number }) {
  const percentage = (spent / budgeted) * 100;

  let barColor = 'bg-green-500';
  if (percentage > 100) {
    barColor = 'bg-red-500';
  } else if (percentage > 90) {
    barColor = 'bg-yellow-500';
  }

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${barColor} transition-all duration-300`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}

export function BudgetWidget() {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const { data: budgets, isLoading, isError, error } = useBudget();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">{error?.message || 'Failed to load budget data'}</p>
      </div>
    );
  }

  const displayBudgets = budgets || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget Overview</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor spending against budget targets</p>
        </div>

        {/* Period Toggle */}
        <div className="flex gap-2">
          {(['monthly', 'quarterly', 'annual'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Items */}
      <div className="space-y-4">
        {displayBudgets.slice(0, 5).map((budget: BudgetItem) => (
          <div key={budget.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
            {/* Item Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{budget.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{budget.department}</p>
              </div>
              <StatusBadge status={budget.status} />
            </div>

            {/* Progress Bar */}
            <BudgetBar spent={budget.spentAmount} budgeted={budget.budgetAmount} />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Budget</p>
                <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(budget.budgetAmount)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Spent</p>
                <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(budget.spentAmount)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Variance</p>
                <p className={`font-semibold ${budget.variance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {budget.variance >= 0 ? '+' : ''}{formatCurrency(budget.variance)} ({budget.variancePercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayBudgets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No budget data available</p>
        </div>
      )}

      {/* Total Summary */}
      {displayBudgets.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Budget</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(displayBudgets.reduce((sum, b) => sum + b.budgetAmount, 0))}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(displayBudgets.reduce((sum, b) => sum + b.spentAmount, 0))}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
