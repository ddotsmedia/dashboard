'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { useChartTheme } from '@/hooks/useChartTheme';
import { formatChartCurrency } from '@/lib/charts/generateChartData';
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, CHART_SERIES_COLORS } from '@/lib/charts/chartConfig';

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div>,
});

interface DepartmentExpensesChartProps {
  data: Array<{
    department: string;
    amount: number;
  }>;
  currency?: 'AED' | 'USD' | 'EUR';
  height?: number;
}

/**
 * Department Expenses Horizontal Bar Chart
 * Shows expense distribution across departments, sorted by amount (highest first)
 */
export const DepartmentExpensesChart: React.FC<DepartmentExpensesChartProps> = ({
  data,
  currency = 'AED',
  height = 360,
}) => {
  const { theme, isDark } = useChartTheme();
  const colors = isDark ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

  const chartOptions = useMemo<EChartsOption>(() => {
    // Sort departments by amount (highest first)
    const sortedData = [...data].sort((a, b) => b.amount - a.amount);
    const departments = sortedData.map((item) => item.department);
    const amounts = sortedData.map((item) => item.amount);

    return {
      ...theme,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
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
        left: 120,
        right: 40,
        top: 20,
        bottom: 40,
        containLabel: true,
      },
      xAxis: {
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
      yAxis: {
        type: 'category',
        data: departments,
        axisLine: {
          show: false,
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
      series: [
        {
          name: 'Amount',
          type: 'bar',
          data: amounts,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#16B96F' },
              { offset: 1, color: '#10B981' },
            ]),
            borderRadius: [0, 4, 4, 0],
          },
          emphasis: {
            itemStyle: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(22, 185, 111, 0.3)',
            },
          },
          label: {
            show: false,
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

DepartmentExpensesChart.displayName = 'DepartmentExpensesChart';
