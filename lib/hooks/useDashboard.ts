/**
 * Dashboard Hook
 * Provides access to dashboard state with proper selectors
 */

import { useStore } from '@/lib/store';

export const useDashboard = () =>
  useStore((state) => ({
    widgetVisibility: state.widgetVisibility,
    widgetOrder: state.widgetOrder,
    widgetSizes: state.widgetSizes,
    toggleWidget: state.toggleWidget,
    setWidgetOrder: state.setWidgetOrder,
    setWidgetSize: state.setWidgetSize,
    resetLayout: state.resetLayout,
    saveLayout: state.saveLayout,
    loadLayout: state.loadLayout,
    deleteLayout: state.deleteLayout,
    savedLayouts: state.savedLayouts,
  }));
