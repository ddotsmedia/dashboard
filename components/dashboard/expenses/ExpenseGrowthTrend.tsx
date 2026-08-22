'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import { useChartTheme } from '@/hooks/useChartTheme';
import { formatChartCurrency } from '@/lib/charts/generateChartData';
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from '@/lib/charts/chartConfig';

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div>,
});

interface ExpenseGrowthTrendProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
  currency?: 'AED' | 'USD' | 'EUR';
  height?: number;
}

/**
 * Expense Growth Trend Line Chart
 * Shows 12-month expense trend with color changing based on growth/decline
 */
export const ExpenseGrowthTrend: React.FC<ExpenseGrowthTrendProps> = ({
  data,
  currency = 'AED',
  height = 360,
}) => {
  const { theme, isDark } = useChartTheme();
  const colors = isDark ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

  const chartOptions = useMemo<EChartsOption>(() => {
    const months = data.map((item) => item.month);
    const amounts = data.map((item) => item.amount);

    // Determine if trend is growing or declining overall
    const isGrowing = amounts[amounts.length - 1] > amounts[0];

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
          }>;
          if (!paramArray || paramArray.length === 0) return '';

          const param = paramArray[0];
          return `<strong>${param.name}</strong><br/>${formatChartCurrency(param.value, currency)}`;
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
      series: [
        {
          name: 'Expenses',
          type: 'line',
          data: amounts,
          smooth: true,
          lineStyle: {
            color: isGrowing ? '#EF4444' : '#16B96F',
            width: 2,
          },
          areaStyle: {
            color: isGrowing
              ? 'rgba(239, 68, 68, 0.15)'
              : 'rgba(22, 185, 111, 0.15)',
          },
          itemStyle: {
            color: isGrowing ? '#EF4444' : '#16B96F',
            borderColor: colors.bg,
            borderWidth: 2,
          },
          symbol: 'circle',
          symbolSize: 6,
          emphasis: {
            itemStyle: {
              borderColor: colors.bg,
              borderWidth: 2,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: isGrowing
                ? 'rgba(239, 68, 68, 0.3)'
                : 'rgba(22, 185, 111, 0.3)',
            },
          },
        },
      ],
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

ExpenseGrowthTrend.displayName = 'ExpenseGrowthTrend';
