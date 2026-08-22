'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import { useChartResponsive } from '@/lib/hooks/useChartResponsive';
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
  const { isMobile, isTablet, isDesktop } = useChartResponsive();

  // Responsive height
  const responsiveHeight = isMobile ? 250 : isTablet ? 350 : height;

  const chartOptions = useMemo<EChartsOption>(() => {
    const chartData = transformToPieChartData(totalExpenses);

    return {
      responsive: true,
      maintainAspectRatio: false,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'transparent',
        textStyle: {
          color: '#fff',
          fontSize: isMobile ? 11 : 12,
        },
        confine: true,
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
        bottom: isMobile ? '0%' : '10%',
        left: 'center',
        textStyle: {
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: isMobile ? 10 : 11,
        },
        itemGap: isMobile ? 10 : 20,
        orient: isMobile ? 'horizontal' : 'vertical',
      },
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: isMobile ? ['30%', '60%'] : ['40%', '70%'],
          center: ['50%', isMobile ? '40%' : '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: [4, 4],
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: !isMobile,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: isMobile ? 9 : 11,
            color: 'rgba(0, 0, 0, 0.65)',
            distanceToLabelLine: isMobile ? 5 : 8,
          },
          labelLine: {
            length: isMobile ? 10 : 20,
            length2: isMobile ? 5 : 10,
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
  }, [totalExpenses, currency, isMobile]);

  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: `${responsiveHeight}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

ExpenseBreakdownChart.displayName = 'ExpenseBreakdownChart';
