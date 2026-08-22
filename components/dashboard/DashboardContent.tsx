/**
 * Dashboard Content Component
 * Main dashboard container with KPI cards, widgets, and charts
 */

'use client';

import { KPICards } from './kpi/KPICards';
import { ARWidget } from './receivables/ARWidget';
import { APWidget } from './payables/APWidget';
import { CashFlowWidget } from './cash-flow/CashFlowWidget';
import { ChartsSection } from './ChartsSection';

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Financial Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Real-time overview of your key financial metrics
        </p>
      </div>

      {/* KPI Cards Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Key Performance Indicators
          </h2>
        </div>
        <KPICards />
      </section>

      {/* AR/AP & Cash Flow Widgets Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Financial Metrics
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ARWidget />
          <APWidget />
          <CashFlowWidget />
        </div>
      </section>

      {/* Charts Section */}
      <ChartsSection />
    </div>
  );
}
