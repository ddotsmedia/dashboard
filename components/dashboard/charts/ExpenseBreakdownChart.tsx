'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import {
  transformToPieChartData,
  getExpenseColor,
  formatChartCurrency,
} from '@/lib/charts/generateChartData';

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div>,
});

interface ExpenseBreakdownChartProps {
  totalExpenses: number;
  currency?: 'AED' | 'USD' | 'EUR';
  height?: number;
}

/**
 * Expense Breakdown Donut Chart
 * Displays distribution of expenses by category as a pie/donut chart
 */
export const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({
  totalExpenses,
  currency = 'AED',
  height = 400,
}) => {
  const chartOptions = useMemo<EChartsOption>(() => {
    const chartData = transformToPieChartData(totalExpenses);

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'transparent',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        formatter: function (params: unknown) {
          const param = params as {
            name: string;
            value: number;
            percent: number;
          };
          if (!param) return '';

          const percentage = ((param.value / totalExpenses) * 100).toFixed(1);
          return `<strong>${param.name}</strong><br/>${formatChartCurrency(param.value, currency)}<br/>${percentage}%`;
        },
      },
      legend: {
        bottom: '10%',
        left: 'center',
        textStyle: {
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: 11,
        },
        itemGap: 20,
      },
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: [4, 4],
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 11,
            color: 'rgba(0, 0, 0, 0.65)',
            distanceToLabelLine: 8,
          },
          labelLine: {
            length: 20,
            length2: 10,
            smooth: false,
          },
          data: chartData.map((item, index) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: getExpenseColor(index),
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
  }, [totalExpenses, currency]);

  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

ExpenseBreakdownChart.displayName = 'ExpenseBreakdownChart';
