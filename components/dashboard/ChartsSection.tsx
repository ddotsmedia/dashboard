/**
 * Charts Section Component
 * Container for all dashboard charts with responsive grid layout
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { ChartContainer } from './charts/ChartContainer';
import { RevenueExpenseChart } from './charts/RevenueExpenseChart';
import { CashFlowChart } from './charts/CashFlowChart';
import { ExpenseBreakdownChart } from './charts/ExpenseBreakdownChart';
import { ARAgingChart } from './charts/ARAgingChart';
import { APAgingChart } from './charts/APAgingChart';
import { dashboardService } from '@/lib/api';
import type { DashboardFilters } from '@/types/api';
import { cn } from '@/lib/utils';

interface ChartsSectionProps {
  filters?: DashboardFilters;
  className?: string;
}

/**
 * Charts Section Component
 * Displays all dashboard charts in a responsive grid:
 * - Mobile (default): 1 column
 * - Tablet (768px): 2 columns
 * - Desktop (1024px): Full responsive grid
 */
export function ChartsSection({
  filters = {},
  className,
}: ChartsSectionProps) {
  // Use provided filters or empty object
  const activeFilters = filters;

  // Fetch Revenue/Expense chart data
  const {
    data: revenueExpenseData,
    isLoading: isRevenueExpenseLoading,
    error: revenueExpenseError,
  } = useQuery({
    queryKey: ['revenueExpenseChart', activeFilters],
    queryFn: () => dashboardService.getRevenueExpenseChartData(activeFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch Cash Flow chart data
  const {
    data: cashFlowData,
    isLoading: isCashFlowLoading,
    error: cashFlowError,
  } = useQuery({
    queryKey: ['cashFlowChart', activeFilters],
    queryFn: () => dashboardService.getCashFlowChartData(activeFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch Expense Breakdown data
  const {
    data: expenseBreakdownData,
    isLoading: isExpenseBreakdownLoading,
    error: expenseBreakdownError,
  } = useQuery({
    queryKey: ['expenseBreakdown'],
    queryFn: () => dashboardService.getExpenseBreakdownData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch AR Aging chart data
  const {
    data: arAgingData,
    isLoading: isARAgingLoading,
    error: arAgingError,
  } = useQuery({
    queryKey: ['arAgingChart', activeFilters],
    queryFn: () => dashboardService.getARAgingChartData(activeFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch AP Aging chart data
  const {
    data: apAgingData,
    isLoading: isAPAgingLoading,
    error: apAgingError,
  } = useQuery({
    queryKey: ['apAgingChart', activeFilters],
    queryFn: () => dashboardService.getAPAgingChartData(activeFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div
      className={cn(
        'grid',
        'grid-cols-1',           // Mobile: 1 column
        'md:grid-cols-2',        // Tablet: 2 columns
        'lg:grid-cols-2',        // Desktop: 2 columns for better balance
        'gap-6',                 // 24px gap
        'p-6',                   // 24px padding
        className
      )}
    >
      {/* Revenue & Expense Chart - Full Width */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <ChartContainer
          title="Revenue vs Expenses"
          isLoading={isRevenueExpenseLoading}
          error={revenueExpenseError ? 'Failed to load revenue data' : null}
          height="h-96"
        >
          {revenueExpenseData && (
            <RevenueExpenseChart
              data={revenueExpenseData.map((item) => ({
                month: item.date,
                revenue: item.revenue,
                expenses: item.expenses,
                profit: item.profit,
                cashFlow: item.profit * 0.85,
              }))}
            />
          )}
        </ChartContainer>
      </div>

      {/* Cash Flow Chart */}
      <ChartContainer
        title="Cash Flow Analysis"
        isLoading={isCashFlowLoading}
        error={cashFlowError ? 'Failed to load cash flow data' : null}
        height="h-80"
      >
        {cashFlowData && (
          <CashFlowChart
            data={{
              inflows: cashFlowData.reduce((sum, item) => (item.category === 'Operating' ? sum + item.value : sum), 0),
              outflows: 1284320,
              netCashFlow: cashFlowData.reduce((sum, item) => sum + item.value, 0),
              operatingCashFlow: cashFlowData.find((item) => item.category === 'Operating')?.value ?? 0,
              investingCashFlow: -(cashFlowData.find((item) => item.category === 'Investing')?.value ?? 0),
              financingCashFlow: cashFlowData.find((item) => item.category === 'Financing')?.value ?? 0,
              periods: [],
            }}
          />
        )}
      </ChartContainer>

      {/* Expense Breakdown Chart */}
      <ChartContainer
        title="Expense Breakdown"
        isLoading={isExpenseBreakdownLoading}
        error={expenseBreakdownError ? 'Failed to load expense data' : null}
        height="h-80"
      >
        {expenseBreakdownData && (
          <ExpenseBreakdownChart
            totalExpenses={expenseBreakdownData.reduce((sum, item) => sum + item.value, 0)}
          />
        )}
      </ChartContainer>

      {/* AR Aging Chart - Full Width */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <ChartContainer
          title="Accounts Receivable Aging"
          isLoading={isARAgingLoading}
          error={arAgingError ? 'Failed to load AR aging data' : null}
          height="h-96"
        >
          <ARAgingChart data={arAgingData} />
        </ChartContainer>
      </div>

      {/* AP Aging Chart - Full Width */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <ChartContainer
          title="Accounts Payable Aging"
          isLoading={isAPAgingLoading}
          error={apAgingError ? 'Failed to load AP aging data' : null}
          height="h-96"
        >
          <APAgingChart data={apAgingData} />
        </ChartContainer>
      </div>
    </div>
  );
}

ChartsSection.displayName = 'ChartsSection';
