/**
 * Chart Configuration & Color Palettes
 * Centralized color scheme and styling for all ECharts visualizations
 * Supports light/dark mode seamless switching
 */

/**
 * Color palette for light mode
 */
export const LIGHT_MODE_COLORS = {
  revenue: '#16B96F', // Green - Revenue/Income
  expense: '#F97316', // Orange - Expenses/Costs
  profit: '#6366F1', // Indigo - Profit/Gains
  grid: '#E2E8F0', // Light gray - Grid lines
  text: '#0F172A', // Dark blue - Text
  bg: '#FFFFFF', // White - Background
  border: '#CBD5E1', // Light blue-gray - Borders
  secondary: '#3B82F6', // Blue - Secondary data
  tertiary: '#8B5CF6', // Purple - Tertiary data
  warning: '#EAB308', // Yellow - Warnings
  error: '#EF4444', // Red - Errors
  success: '#22C55E', // Green - Success
} as const;

/**
 * Color palette for dark mode
 */
export const DARK_MODE_COLORS = {
  revenue: '#16B96F', // Same semantic color
  expense: '#F97316', // Same semantic color
  profit: '#6366F1', // Same semantic color
  grid: '#1E293B', // Dark blue-gray - Grid lines
  text: '#F1F5FA', // Light blue - Text
  bg: '#0F172A', // Very dark blue - Background
  border: '#334155', // Blue-gray - Borders
  secondary: '#60A5FA', // Light blue - Secondary data
  tertiary: '#A78BFA', // Light purple - Tertiary data
  warning: '#FACC15', // Light yellow - Warnings
  error: '#F87171', // Light red - Errors
  success: '#4ADE80', // Light green - Success
} as const;

/**
 * Typography configuration
 */
export const CHART_TYPOGRAPHY = {
  fontFamily: "'system-ui', -apple-system, 'Segoe UI', 'Helvetica Neue', sans-serif",
  fontSize: {
    title: 16,
    label: 12,
    tooltip: 12,
    axisLabel: 12,
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
} as const;

/**
 * Get colors for the given theme
 */
export function getThemeColors(isDark: boolean) {
  return isDark ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;
}

/**
 * Grid configuration for charts
 */
export const CHART_GRID_CONFIG = {
  light: {
    left: 60,
    right: 20,
    top: 20,
    bottom: 60,
    containLabel: true,
    backgroundColor: LIGHT_MODE_COLORS.bg,
    borderColor: LIGHT_MODE_COLORS.grid,
  },
  dark: {
    left: 60,
    right: 20,
    top: 20,
    bottom: 60,
    containLabel: true,
    backgroundColor: DARK_MODE_COLORS.bg,
    borderColor: DARK_MODE_COLORS.grid,
  },
} as const;

/**
 * Tooltip configuration for charts
 */
export const CHART_TOOLTIP_CONFIG = {
  light: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderColor: LIGHT_MODE_COLORS.grid,
    textStyle: {
      color: LIGHT_MODE_COLORS.text,
      fontSize: CHART_TYPOGRAPHY.fontSize.tooltip,
      fontFamily: CHART_TYPOGRAPHY.fontFamily,
    },
  },
  dark: {
    backgroundColor: 'rgba(241, 245, 250, 0.1)',
    borderColor: DARK_MODE_COLORS.border,
    textStyle: {
      color: DARK_MODE_COLORS.text,
      fontSize: CHART_TYPOGRAPHY.fontSize.tooltip,
      fontFamily: CHART_TYPOGRAPHY.fontFamily,
    },
  },
} as const;

/**
 * Series colors array for multi-series charts
 */
export const CHART_SERIES_COLORS = [
  '#16B96F', // Green - Revenue
  '#F97316', // Orange - Expense
  '#6366F1', // Indigo - Profit
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#6D28D9', // Violet
] as const;

/**
 * Export type for chart theme configuration
 */
export type ChartColorsConfig = typeof LIGHT_MODE_COLORS;

/**
 * Default animation configuration
 */
export const CHART_ANIMATION_CONFIG = {
  enabled: true,
  duration: 1000,
  easing: 'cubicOut',
  delay: 0,
} as const;

/**
 * Common axis label configuration
 */
export const CHART_AXIS_LABEL_CONFIG = {
  light: {
    color: LIGHT_MODE_COLORS.text,
    fontSize: CHART_TYPOGRAPHY.fontSize.axisLabel,
    fontFamily: CHART_TYPOGRAPHY.fontFamily,
  },
  dark: {
    color: DARK_MODE_COLORS.text,
    fontSize: CHART_TYPOGRAPHY.fontSize.axisLabel,
    fontFamily: CHART_TYPOGRAPHY.fontFamily,
  },
} as const;

/**
 * Export all constants for reference
 */
export const CHART_CONFIG = {
  lightColors: LIGHT_MODE_COLORS,
  darkColors: DARK_MODE_COLORS,
  typography: CHART_TYPOGRAPHY,
  gridConfig: CHART_GRID_CONFIG,
  tooltipConfig: CHART_TOOLTIP_CONFIG,
  seriesColors: CHART_SERIES_COLORS,
  animationConfig: CHART_ANIMATION_CONFIG,
  axisLabelConfig: CHART_AXIS_LABEL_CONFIG,
} as const;
