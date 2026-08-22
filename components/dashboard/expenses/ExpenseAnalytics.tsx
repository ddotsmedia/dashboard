'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { KPICard } from '@/components/dashboard/kpi/KPICard';
import { ChartContainer } from '@/components/dashboard/charts/ChartContainer';
import { ExpenseGrowthTrend } from './ExpenseGrowthTrend';
import { ExpenseBreakdownChart } from './ExpenseBreakdownChart';
import { DepartmentExpensesChart } from './DepartmentExpensesChart';
import { ExpenseTrendChart } from './ExpenseTrendChart';
import { TopExpenseCategoriesTable } from './TopExpenseCategoriesTable';
import { useExpenses } from '@/hooks/useExpenses';
import { cn } from '@/lib/utils';
import { KPISkeleton } from '@/components/dashboard/kpi/KPISkeleton';
import { ChartSkeleton } from '@/components/dashboard/charts/ChartSkeleton';

/**
 * Expense Analytics Component
 * Displays comprehensive expense analysis with 6 sections:
 * 1. Total Expenses Card
 * 2. Expense Growth Trend (line chart)
 * 3. Expense Breakdown (donut chart)
 * 4. Department Expenses (horizontal bar chart)
 * 5. Expense Trend (multi-line chart)
 * 6. Top Expense Categories (table)
 *
 * Responsive grid:
 * - Desktop (lg): 2 columns, 3 rows
 * - Tablet (md): 2 columns transitioning to 1
 * - Mobile: 1 column
 */
export function ExpenseAnalytics() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useExpenses();

  const handleNavigateToExpenses = () => {
    router.push('/expenses');
  };

  const handleCategoryFilter = (category: string) => {
    console.log(`[Mock] Navigating to expenses filtered by: ${category}`);
    // In production, this would navigate with query params or update filters
    router.push(`/expenses?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expense Analytics</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Track and analyze your business expenses
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div
        className={cn(
          'grid',
          'grid-cols-1', // Mobile: 1 column
          'md:grid-cols-2', // Tablet: 2 columns
          'lg:grid-cols-2', // Desktop: 2 columns
          'gap-6',
          'p-6'
        )}
      >
        {/* Section 1: Total Expenses Card */}
        <div className="col-span-1" onClick={handleNavigateToExpenses}>
          {isLoading ? (
            <KPISkeleton />
          ) : (
            <KPICard
              label="Total Expenses"
              value={data?.totalExpenses ?? 1284320}
              currency="AED"
              change={data?.changePercent ?? -2.3}
              trend={data?.changePercent && data.changePercent < 0 ? 'down' : 'up'}
              semanticColor="expense"
              onClick={handleNavigateToExpenses}
            />
          )}
        </div>

        {/* Section 2: Expense Growth Trend (Line Chart) */}
        <div className="col-span-1 lg:col-span-1">
          <ChartContainer
            title="Expense Growth Trend"
            isLoading={isLoading}
            error={isError ? 'Failed to load expense trend data' : null}
            height="h-80"
          >
            {data?.monthlyTrend && (
              <ExpenseGrowthTrend
                data={data.monthlyTrend}
                currency="AED"
                height={320}
              />
            )}
          </ChartContainer>
        </div>

        {/* Section 3: Expense Breakdown (Donut Chart) */}
        <div className="col-span-1 md:col-span-1">
          <ChartContainer
            title="Expense Breakdown"
            isLoading={isLoading}
            error={isError ? 'Failed to load breakdown data' : null}
            height="h-80"
          >
            {data?.breakdown && (
              <ExpenseBreakdownChart
                data={data.breakdown}
                currency="AED"
                height={320}
                onCategoryClick={handleCategoryFilter}
              />
            )}
          </ChartContainer>
        </div>

        {/* Section 4: Department Expenses (Horizontal Bar Chart) */}
        <div className="col-span-1 md:col-span-1">
          <ChartContainer
            title="Department Expenses"
            isLoading={isLoading}
            error={isError ? 'Failed to load department data' : null}
            height="h-80"
          >
            {data?.departmentExpenses && (
              <DepartmentExpensesChart
                data={data.departmentExpenses}
                currency="AED"
                height={320}
              />
            )}
          </ChartContainer>
        </div>

        {/* Section 5: Expense Trend (Multi-Line Chart) - Full Width */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <ChartContainer
            title="Expense Trends by Category"
            isLoading={isLoading}
            error={isError ? 'Failed to load category trends' : null}
            height="h-96"
          >
            {data?.categoryTrends && (
              <ExpenseTrendChart
                data={data.categoryTrends}
                currency="AED"
                height={336}
              />
            )}
          </ChartContainer>
        </div>

        {/* Section 6: Top Expense Categories Table - Full Width */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <ChartContainer
            title="Top Expense Categories"
            isLoading={isLoading}
            error={isError ? 'Failed to load categories' : null}
            height="h-auto"
          >
            {data?.topCategories && (
              <div className="p-4">
                <TopExpenseCategoriesTable
                  data={data.topCategories}
                  currency="AED"
                  onCategoryClick={handleCategoryFilter}
                />
              </div>
            )}
          </ChartContainer>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="mx-6 mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            Error loading expense data: {error?.message || 'Unknown error'}
          </p>
        </div>
      )}
    </div>
  );
}

ExpenseAnalytics.displayName = 'ExpenseAnalytics';
