'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import { useChartTheme } from '@/hooks/useChartTheme';
import { formatChartCurrency } from '@/lib/charts/generateChartData';
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, CHART_SERIES_COLORS } from '@/lib/charts/chartConfig';

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div>,
});

interface ExpenseTrendChartProps {
  data: Array<{
    category: string;
    data: Array<{
      month: string;
      amount: number;
    }>;
  }>;
  currency?: 'AED' | 'USD' | 'EUR';
  height?: number;
}

/**
 * Expense Trend Multi-Line Chart
 * Shows top 5 expense categories as separate lines over 12 months
 */
export const ExpenseTrendChart: React.FC<ExpenseTrendChartProps> = ({
  data,
  currency = 'AED',
  height = 360,
}) => {
  const { theme, isDark } = useChartTheme();
  const colors = isDark ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

  const chartOptions = useMemo<EChartsOption>(() => {
    if (!data || data.length === 0) {
      return {
        ...theme,
        title: {
          text: 'No data available',
          left: 'center',
          top: 'center',
        },
      };
    }

    // Get months from first category's data
    const months = data[0].data.map((item) => item.month);

    // Create series for each category
    const series = data.map((category, index) => ({
      name: category.category,
      type: 'line' as const,
      data: category.data.map((item) => item.amount),
      smooth: true,
      lineStyle: {
        color: CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length],
        width: 2,
      },
      areaStyle: {
        color: undefined, // No fill for multi-line chart
      },
      itemStyle: {
        color: CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length],
        borderColor: colors.bg,
        borderWidth: 2,
      },
      symbol: 'circle',
      symbolSize: 4,
      emphasis: {
        itemStyle: {
          borderColor: colors.bg,
          borderWidth: 2,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: `rgba(${
            CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length] === '#16B96F'
              ? '22, 185, 111'
              : '100, 100, 100'
          }, 0.3)`,
        },
      },
    }));

    return {
      ...theme,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: colors.grid,
        textStyle: {
          color: '#FFFFFF',
          fontSize: 12,
        },
        formatter: function (params: unknown) {
          const paramArray = params as Array<{
            name: string;
            value: number;
            componentSubType: string;
            color: string;
          }>;
          if (!paramArray || paramArray.length === 0) return '';

          let html = `<strong>${paramArray[0].name}</strong><br/>`;
          paramArray.forEach((param) => {
            html += `<span style="color: ${param.color}">●</span> ${param.name}: ${formatChartCurrency(param.value, currency)}<br/>`;
          });
          return html;
        },
      },
      grid: {
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
        containLabel: true,
        backgroundColor: 'transparent',
      },
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: colors.grid,
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: colors.text,
          fontSize: 11,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: colors.text,
          fontSize: 11,
          formatter: (value: number) => {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            if (value >= 1000) {
              return `${(value / 1000).toFixed(0)}K`;
            }
            return value.toFixed(0);
          },
        },
        splitLine: {
          lineStyle: {
            color: colors.grid,
            type: 'dashed',
          },
        },
      },
      legend: {
        bottom: 0,
        left: 'center',
        textStyle: {
          color: colors.text,
          fontSize: 11,
        },
        itemGap: 20,
      },
      series,
    };
  }, [data, currency, theme, isDark, colors]);

  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

ExpenseTrendChart.displayName = 'ExpenseTrendChart';
