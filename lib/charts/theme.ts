/**
 * ECharts Theme Configuration
 * Provides complete theme objects for light and dark modes
 * Handles theme detection and dynamic switching
 */

import type { EChartsOption } from 'echarts';
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  CHART_TYPOGRAPHY,
  CHART_SERIES_COLORS,
} from './chartConfig';

/**
 * Base theme configuration factory
 */
function createTheme(colors: Record<string, string>): EChartsOption {
  // Using 'as EChartsOption' to handle strict type checking
  // while allowing flexibility in theme configuration
  return {
    color: Array.from(CHART_SERIES_COLORS),
    backgroundColor: colors.bg,
    textStyle: {
      color: colors.text,
      fontFamily: CHART_TYPOGRAPHY.fontFamily,
      fontSize: CHART_TYPOGRAPHY.fontSize.label,
      fontWeight: CHART_TYPOGRAPHY.fontWeight.normal,
    },
    title: {
      textStyle: {
        color: colors.text,
        fontFamily: CHART_TYPOGRAPHY.fontFamily,
        fontSize: CHART_TYPOGRAPHY.fontSize.title,
        fontWeight: CHART_TYPOGRAPHY.fontWeight.semibold,
      },
      subtextStyle: {
        color: colors.text,
        fontSize: CHART_TYPOGRAPHY.fontSize.label,
      },
    },
    line: {
      itemStyle: {
        borderWidth: 1,
      },
      lineStyle: {
        width: 2,
      },
      symbolSize: 4,
      smooth: true,
    },
    bar: {
      itemStyle: {
        barBorderRadius: 4,
      },
    },
    pie: {
      itemStyle: {
        borderRadius: 4,
      },
    },
    scatter: {
      itemStyle: {
        borderWidth: 1,
      },
    },
    candlestick: {
      itemStyle: {
        color: '#16B96F',
        color0: '#F97316',
        borderColor: colors.text,
        borderColor0: colors.text,
      },
    },
    graph: {
      itemStyle: {
        borderWidth: 1,
        borderColor: colors.border,
      },
      lineStyle: {
        width: 1,
        color: colors.grid,
      },
      symbolSize: 4,
      smooth: true,
      color: Array.from(CHART_SERIES_COLORS),
      label: {
        color: colors.text,
      },
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: colors.grid,
          width: 1,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: colors.grid,
        },
      },
      axisLabel: {
        show: true,
        color: colors.text,
        fontSize: CHART_TYPOGRAPHY.fontSize.axisLabel,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: [colors.grid],
        },
      },
    },
    valueAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: colors.grid,
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: colors.grid,
        },
      },
      axisLabel: {
        show: true,
        color: colors.text,
        fontSize: CHART_TYPOGRAPHY.fontSize.axisLabel,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [colors.grid],
        },
      },
    },
    logAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: colors.grid,
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: colors.grid,
        },
      },
      axisLabel: {
        show: true,
        color: colors.text,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [colors.grid],
        },
      },
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: colors.grid,
          width: 1,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: colors.grid,
        },
      },
      axisLabel: {
        show: true,
        color: colors.text,
        fontSize: CHART_TYPOGRAPHY.fontSize.axisLabel,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: [colors.grid],
        },
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: colors.text,
      },
      emphasis: {
        iconStyle: {
          borderColor: colors.text,
        },
      },
    },
    legend: {
      textStyle: {
        color: colors.text,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderColor: colors.grid,
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
        fontSize: CHART_TYPOGRAPHY.fontSize.tooltip,
      },
      axisPointer: {
        lineStyle: {
          color: colors.grid,
          width: 1,
        },
        crossStyle: {
          color: colors.grid,
          width: 1,
        },
      },
    },
    timeline: {
      lineStyle: {
        color: colors.grid,
        width: 1,
      },
      label: {
        color: colors.text,
      },
    },
    visualMap: {
      textStyle: {
        color: colors.text,
      },
    },
    dataZoom: {
      backgroundColor: 'rgba(128, 128, 128, 0.1)',
      fillerColor: 'rgba(22, 185, 111, 0.1)',
      handleColor: '#16B96F',
      textStyle: {
        color: colors.text,
      },
    },
  } as EChartsOption;
}

/**
 * ECharts Theme Object for Light Mode
 */
export const lightTheme = createTheme(LIGHT_MODE_COLORS);

/**
 * ECharts Theme Object for Dark Mode
 */
export const darkTheme = createTheme(DARK_MODE_COLORS);

/**
 * Detect if dark mode is enabled
 * Checks the data-theme attribute on document root
 * Falls back to system preference if not explicitly set
 */
export function detectDarkMode(): boolean {
  // Check if we're in browser environment
  if (typeof document === 'undefined') {
    return false;
  }

  const theme = document.documentElement.dataset.theme;

  // Explicit light mode
  if (theme === 'light') {
    return false;
  }

  // Explicit dark mode
  if (theme === 'dark') {
    return true;
  }

  // Fall back to system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return false;
}

/**
 * Get the appropriate ECharts theme object based on dark mode setting
 */
export function getChartTheme(isDark: boolean): EChartsOption {
  return isDark ? darkTheme : lightTheme;
}

/**
 * Watch for theme changes and execute callback
 * Useful for detecting system theme changes or manual theme switches
 */
export function watchThemeChange(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Create observer for data-theme attribute changes
  const observer = new MutationObserver(() => {
    callback(detectDarkMode());
  });

  // Watch for media query changes (system theme)
  const handleMediaChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };

  // Listen to media query changes
  mediaQuery.addEventListener('change', handleMediaChange);

  // Watch for attribute changes on document root
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleMediaChange);
    observer.disconnect();
  };
}
