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

interface ExpenseBreakdownChartProps {
  data: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  currency?: 'AED' | 'USD' | 'EUR';
  height?: number;
  onCategoryClick?: (category: string) => void;
}

// Colors for expense categories: dark blue, green, orange, yellow, gray
const CATEGORY_COLORS = [
  '#1E40AF', // Dark blue
  '#16B96F', // Green
  '#F97316', // Orange
  '#EAB308', // Yellow
  '#6B7280', // Gray
];

/**
 * Expense Breakdown Donut Chart
 * Displays distribution of expenses by category
 */
export const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({
  data,
  currency = 'AED',
  height = 360,
  onCategoryClick,
}) => {
  const { theme, isDark } = useChartTheme();
  const colors = isDark ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

  const chartOptions = useMemo<EChartsOption>(() => {
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

    return {
      ...theme,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: colors.grid,
        textStyle: {
          color: '#FFFFFF',
          fontSize: 12,
        },
        formatter: function (params: unknown) {
          const param = params as {
            name: string;
            value: number;
            percent: number;
          };
          if (!param) return '';

          return `<strong>${param.name}</strong><br/>${formatChartCurrency(param.value, currency)}<br/>${param.percent.toFixed(1)}%`;
        },
      },
      legend: {
        bottom: '5%',
        left: 'center',
        textStyle: {
          color: colors.text,
          fontSize: 11,
        },
        itemGap: 20,
        itemWidth: 12,
        itemHeight: 12,
      },
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: [4, 4],
            borderColor: isDark ? DARK_MODE_COLORS.bg : LIGHT_MODE_COLORS.bg,
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 10,
            color: colors.text,
            distanceToLabelLine: 8,
          },
          labelLine: {
            length: 15,
            length2: 8,
            smooth: false,
          },
          data: data.map((item, index) => ({
            value: item.amount,
            name: item.category,
            itemStyle: {
              color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
            },
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      ],
    };
  }, [data, currency, theme, isDark, colors]);

  const handleChartClick = (params: unknown) => {
    const param = params as {
      name?: string;
      data?: {
        name?: string;
      };
    };
    const categoryName = param.name || (param.data?.name as string);
    if (categoryName && onCategoryClick) {
      onCategoryClick(categoryName);
    }
  };

  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
      onEvents={{ click: handleChartClick }}
    />
  );
};

ExpenseBreakdownChart.displayName = 'ExpenseBreakdownChart';
