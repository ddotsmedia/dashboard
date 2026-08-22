/**
 * Chart Utilities and Configurations Export
 * Central export for all chart-related utilities
 */

// Chart configuration and theming
export {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  CHART_TYPOGRAPHY,
  CHART_SERIES_COLORS,
  CHART_GRID_CONFIG,
  CHART_TOOLTIP_CONFIG,
  CHART_AXIS_LABEL_CONFIG,
  CHART_CONFIG,
  getThemeColors,
} from './chartConfig';
export type { ChartColorsConfig } from './chartConfig';

// ECharts theme
export {
  lightTheme,
  darkTheme,
  detectDarkMode,
  getChartTheme,
  watchThemeChange,
} from './theme';

// Sparkline utilities
export { getSparklineConfig } from './sparklineConfig';
export type { SparklineConfig } from './sparklineConfig';

export { getARSparklineData, getAPSparklineData } from './generateSparklineData';

// Chart data transformation and generation
export {
  transformToLineChartData,
  transformToCashFlowData,
  transformToPieChartData,
  getLineChartXAxisLabels,
  formatChartCurrency,
  getRevenueRange,
  getMetricColor,
  getCashFlowColor,
  getExpenseColor,
} from './generateChartData';

export type {
  LineChartPoint,
  CashFlowChartPoint,
  PieChartPoint,
} from './generateChartData';
