/**
 * Dashboard Customization Hook
 * Provides convenient access to dashboard layout customization functions
 */

import { useDashboardLayout } from '@/lib/store';

export function useDashboardCustomization() {
  const layout = useDashboardLayout();

  return {
    // Current layout state
    widgetVisibility: layout.widgetVisibility,
    widgetOrder: layout.widgetOrder,
    widgetSizes: layout.widgetSizes,
    savedLayouts: layout.savedLayouts,

    // Widget visibility management
    toggleWidget: layout.toggleWidget,
    isWidgetVisible: (widgetId: string) => layout.widgetVisibility[widgetId] ?? true,

    // Widget ordering
    setWidgetOrder: layout.setWidgetOrder,
    moveWidget: (fromIndex: number, toIndex: number) => {
      const newOrder = [...layout.widgetOrder];
      const [removed] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, removed);
      layout.setWidgetOrder(newOrder);
    },

    // Widget sizing
    setWidgetSize: layout.setWidgetSize,
    getWidgetSize: (widgetId: string) => layout.widgetSizes[widgetId] ?? 1,

    // Layout management
    resetLayout: layout.resetLayout,
    saveLayout: layout.saveLayout,
    loadLayout: layout.loadLayout,
    deleteLayout: layout.deleteLayout,
  };
}

export type DashboardCustomizationReturn = ReturnType<typeof useDashboardCustomization>;
