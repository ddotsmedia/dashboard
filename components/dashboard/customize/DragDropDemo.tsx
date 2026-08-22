/**
 * Drag-Drop Demo Component
 * Simple demo showing how to use LayoutPreview with various widgets
 */

'use client';

import React from 'react';
import { LayoutPreview } from '@/components/dashboard/LayoutPreview';
import { WIDGET_IDS } from '@/config/defaultLayout';

/**
 * Demo widgets - simple colored boxes for testing
 */
const DemoWidgetA = () => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded">
    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
      Widget A - Accounts Receivable
    </h3>
    <p className="text-blue-700 dark:text-blue-300 text-sm">
      This is a demo widget. Drag it around to reorder!
    </p>
    <div className="mt-4 text-blue-600 dark:text-blue-400 font-mono text-xs">
      id: ar-widget
    </div>
  </div>
);

const DemoWidgetB = () => (
  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded">
    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
      Widget B - Accounts Payable
    </h3>
    <p className="text-green-700 dark:text-green-300 text-sm">
      Drag this widget to a new position below the first widget.
    </p>
    <div className="mt-4 text-green-600 dark:text-green-400 font-mono text-xs">
      id: ap-widget
    </div>
  </div>
);

const DemoWidgetC = () => (
  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded">
    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
      Widget C - Cash Flow
    </h3>
    <p className="text-purple-700 dark:text-purple-300 text-sm">
      Click the grip icon to start dragging this widget.
    </p>
    <div className="mt-4 text-purple-600 dark:text-purple-400 font-mono text-xs">
      id: cashflow-widget
    </div>
  </div>
);

const DemoWidgetD = () => (
  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded">
    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
      Widget D - Budget Analysis
    </h3>
    <p className="text-orange-700 dark:text-orange-300 text-sm">
      Touch and hold on mobile, or click and drag on desktop.
    </p>
    <div className="mt-4 text-orange-600 dark:text-orange-400 font-mono text-xs">
      id: budget-widget
    </div>
  </div>
);

/**
 * Demo widgets array
 */
const DEMO_WIDGETS = [
  {
    id: WIDGET_IDS.AR_WIDGET,
    title: 'Accounts Receivable',
    component: DemoWidgetA,
  },
  {
    id: WIDGET_IDS.AP_WIDGET,
    title: 'Accounts Payable',
    component: DemoWidgetB,
  },
  {
    id: WIDGET_IDS.CASHFLOW,
    title: 'Cash Flow',
    component: DemoWidgetC,
  },
  {
    id: WIDGET_IDS.BUDGET,
    title: 'Budget Analysis',
    component: DemoWidgetD,
  },
];

/**
 * Demo component showing LayoutPreview in action
 */
export function DragDropDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Drag-and-Drop Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Try dragging the widgets below to reorder them. Your changes are saved automatically!
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>How to use:</strong> Grab the icon in the top-right corner of each widget and drag it to a new position.
        </p>
      </div>

      <LayoutPreview widgets={DEMO_WIDGETS} />
    </div>
  );
}
