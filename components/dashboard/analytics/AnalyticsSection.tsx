'use client';

import { BudgetWidget } from './BudgetWidget';
import { ProfitabilityAnalytics } from './ProfitabilityAnalytics';
import { ExpenseAnalytics } from './ExpenseAnalytics';

/**
 * Analytics Section
 * Displays Budget, Profitability, and Expense analytics in a responsive grid
 */
export function AnalyticsSection() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Analytics & Planning
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Budget tracking, profitability analysis, and expense monitoring
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="space-y-6">
        {/* First Row: Budget and Profitability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget Widget - Takes 1 column */}
          <div className="lg:col-span-1">
            <BudgetWidget />
          </div>

          {/* Profitability Analytics - Takes 2 columns on large screens, 1 on medium */}
          <div className="md:col-span-1 lg:col-span-2">
            <ProfitabilityAnalytics />
          </div>
        </div>

        {/* Second Row: Expense Analytics - Full Width */}
        <div>
          <ExpenseAnalytics />
        </div>
      </div>
    </section>
  );
}
