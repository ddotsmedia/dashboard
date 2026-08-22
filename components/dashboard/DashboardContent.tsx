/**
 * Dashboard Content Component
 * Main dashboard container with KPI cards, widgets, and charts
 * Renders widgets in customizable order with visibility and sizing
 */

'use client';

import { useDashboardCustomization } from '@/hooks/useDashboardCustomization';
import { DashboardWidget } from './DashboardWidget';
import { KPICards } from './kpi/KPICards';
import { ARWidget } from './receivables/ARWidget';
import { APWidget } from './payables/APWidget';
import { CashFlowWidget } from './cash-flow/CashFlowWidget';
import { AnalyticsSection } from './analytics';
import { TransactionsSection } from './transactions';
import { AlertPanel } from './alerts';

// Widget component factory for rendering individual widgets
function getWidgetComponent(widgetId: string): React.ReactNode {
  // Group KPI widgets - they all render from the same KPICards component
  // but we show them individually in the customization modal
  const kpiWidgetIds = [
    'kpi-revenue',
    'kpi-expenses',
    'kpi-profit',
    'kpi-cash-flow',
    'kpi-ar',
    'kpi-ap',
    'kpi-working-capital',
  ];

  if (kpiWidgetIds.includes(widgetId)) {
    return <KPICards />;
  }

  switch (widgetId) {
    case 'widget-ar':
      return <ARWidget />;
    case 'widget-ap':
      return <APWidget />;
    case 'widget-cf':
      return <CashFlowWidget />;
    case 'widget-budget':
    case 'widget-profitability':
    case 'widget-expenses':
      return <AnalyticsSection />;
    case 'widget-transactions':
      return <TransactionsSection />;
    case 'widget-alerts':
      return <AlertPanel />;
    case 'widget-ai-insights':
    case 'widget-financial-ratios':
      // These are disabled by default and can be added later
      return <div className="text-gray-500">Widget not yet available</div>;
    default:
      return null;
  }
}

export function DashboardContent() {
  const customization = useDashboardCustomization();

  // Filter and order widgets based on customization
  const visibleWidgets = customization.widgetOrder.filter((id) =>
    customization.isWidgetVisible(id)
  );

  // Deduplicate widgets that render the same component
  // (e.g., multiple KPI widgets or analytics widgets)
  const uniqueVisibleWidgets = Array.from(new Set(visibleWidgets));

  if (uniqueVisibleWidgets.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time overview of your key financial metrics
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No widgets visible. Use the Customize Dashboard button to enable widgets.
          </p>
        </div>
      </div>
    );
  }

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

      {/* Dynamic Grid of Widgets */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {uniqueVisibleWidgets.map((widgetId) => (
            <DashboardWidget
              key={widgetId}
              id={widgetId}
              size={customization.getWidgetSize(widgetId)}
              visible={customization.isWidgetVisible(widgetId)}
            >
              {getWidgetComponent(widgetId)}
            </DashboardWidget>
          ))}
        </div>
      </section>
    </div>
  );
}
