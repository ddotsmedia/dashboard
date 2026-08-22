/**
 * Dashboard Customize Page
 * Allows users to reorder and manage dashboard widgets
 */

'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/navigation/MainLayout';
import { LayoutPreview } from '@/components/dashboard/LayoutPreview';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { WIDGET_IDS } from '@/config/defaultLayout';
import { ARWidget } from '@/components/dashboard/receivables/ARWidget';
import { APWidget } from '@/components/dashboard/payables/APWidget';
import { CashFlowWidget } from '@/components/dashboard/cash-flow/CashFlowWidget';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

/**
 * Placeholder components for demo purposes
 * In a real implementation, these would be your actual widget components
 */
const PlaceholderBudget = () => (
  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded">
    <p className="text-purple-900 dark:text-purple-100 font-semibold">Budget Analysis Widget</p>
    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Drag to reorder</p>
  </div>
);

const PlaceholderProfitability = () => (
  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded">
    <p className="text-green-900 dark:text-green-100 font-semibold">Profitability Widget</p>
    <p className="text-sm text-green-700 dark:text-green-300 mt-1">Drag to reorder</p>
  </div>
);

const PlaceholderTransactions = () => (
  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded">
    <p className="text-blue-900 dark:text-blue-100 font-semibold">Recent Transactions</p>
    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Drag to reorder</p>
  </div>
);

const PlaceholderAlerts = () => (
  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded">
    <p className="text-orange-900 dark:text-orange-100 font-semibold">Alerts Panel</p>
    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">Drag to reorder</p>
  </div>
);

/**
 * Widget definitions for customization
 */
const CUSTOMIZABLE_WIDGETS = [
  {
    id: WIDGET_IDS.AR_WIDGET,
    title: 'Accounts Receivable',
    component: ARWidget,
  },
  {
    id: WIDGET_IDS.AP_WIDGET,
    title: 'Accounts Payable',
    component: APWidget,
  },
  {
    id: WIDGET_IDS.CASHFLOW,
    title: 'Cash Flow',
    component: CashFlowWidget,
  },
  {
    id: WIDGET_IDS.BUDGET,
    title: 'Budget Analysis',
    component: PlaceholderBudget,
  },
  {
    id: WIDGET_IDS.PROFITABILITY,
    title: 'Profitability',
    component: PlaceholderProfitability,
  },
  {
    id: WIDGET_IDS.TRANSACTIONS,
    title: 'Recent Transactions',
    component: PlaceholderTransactions,
  },
  {
    id: WIDGET_IDS.ALERTS,
    title: 'Alerts',
    component: PlaceholderAlerts,
  },
];

export default function DashboardCustomizePage() {
  const [hasChanges, setHasChanges] = useState(false);
  const { resetLayout } = useDashboard();

  const handleOrderChange = (newOrder: string[]) => {
    setHasChanges(true);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the layout to default?')) {
      resetLayout();
      setHasChanges(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Customize Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Drag and drop widgets to reorder them on your dashboard. Your changes are saved automatically.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset to Default
          </Button>
          {hasChanges && (
            <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Changes are being saved...
            </div>
          )}
        </div>

        {/* Layout Preview with Draggable Widgets */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Widget Order
          </h2>
          <LayoutPreview
            widgets={CUSTOMIZABLE_WIDGETS}
            onOrderChange={handleOrderChange}
          />
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Tip:</strong> Grab the icon in the top-right corner of each widget to drag and reorder.
            Your preferences are automatically saved to your browser.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
