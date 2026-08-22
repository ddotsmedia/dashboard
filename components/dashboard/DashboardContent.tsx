/**
 * Dashboard Content Component
 * Main dashboard container with KPI cards and loading states
 */

'use client';

import { KPICards } from './kpi/KPICards';

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

      {/* Additional sections can be added here in future phases */}
    </div>
  );
}
