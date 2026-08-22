/**
 * ECharts Sparkline Configuration
 * Minimal line chart for dashboard KPI cards
 */

export interface SparklineConfig {
  series: Array<{
    data: number[];
    type: 'line';
    smooth: boolean;
    lineStyle: {
      width: number;
      color: string;
    };
    itemStyle: {
      borderWidth: number;
    };
    areaStyle: {
      color: string;
    };
    showSymbol: boolean;
  }>;
  grid: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  xAxis: {
    type: 'category';
    boundaryGap: boolean;
    axisLine: {
      show: boolean;
    };
    axisTick: {
      show: boolean;
    };
    axisLabel: {
      show: boolean;
    };
  };
  yAxis: {
    type: 'value';
    axisLine: {
      show: boolean;
    };
    axisTick: {
      show: boolean;
    };
    axisLabel: {
      show: boolean;
    };
    splitLine: {
      show: boolean;
    };
  };
  tooltip: {
    show: boolean;
  };
}

export function getSparklineConfig(
  data: number[],
  color: string
): SparklineConfig {
  // Create gradient color with transparency
  const lightColor = adjustColorAlpha(color, 0.2);

  return {
    series: [
      {
        data,
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 2,
          color,
        },
        itemStyle: {
          borderWidth: 0,
        },
        areaStyle: {
          color: lightColor,
        },
        showSymbol: false,
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 2,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    tooltip: { show: false },
  };
}

/**
 * Adjust color alpha/opacity
 * Converts hex color to rgba with specified alpha
 */
function adjustColorAlpha(hex: string, alpha: number): string {
  // Remove # if present
  const color = hex.replace('#', '');

  // Parse hex to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
