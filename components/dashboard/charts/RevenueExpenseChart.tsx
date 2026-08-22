'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import {
  transformToLineChartData,
  getLineChartXAxisLabels,
  getRevenueRange,
  getMetricColor,
  formatChartCurrency,
} from '@/lib/charts/generateChartData';
import type { HistoricalMetric } from '@/types/dashboard';

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div>,
});

interface RevenueExpenseChartProps {
  data: HistoricalMetric[];
  currency?: 'AED' | 'USD' | 'EUR';
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  height?: number;
}

/**
 * Revenue, Expense & Profit Line Chart
 * Displays 12-month trend of revenue, expenses, and profit
 */
export const RevenueExpenseChart: React.FC<RevenueExpenseChartProps> = ({
  data,
  currency = 'AED',
  dateRange,
  height = 400,
}) => {
  const chartOptions = useMemo<EChartsOption>(() => {
    const chartData = transformToLineChartData(data);
    const xAxisLabels = getLineChartXAxisLabels(data);
    const range = getRevenueRange(data);

    return {
      color: [getMetricColor('revenue'), getMetricColor('expenses'), getMetricColor('profit')],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'transparent',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        formatter: function (params: unknown) {
          if (!Array.isArray(params)) return '';

          const paramArray = params as Array<{
            name: string;
            value: number;
            seriesName: string;
            color: string;
          }>;
          let tooltip = `<strong>${paramArray[0]?.name || ''}</strong><br/>`;
          paramArray.forEach((param) => {
            tooltip += `<span style="color:${param.color}">●</span> ${param.seriesName}: ${formatChartCurrency(param.value, currency)}<br/>`;
          });
          return tooltip;
        },
      },
      legend: {
        top: 'right',
        right: 10,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: 12,
        },
        data: ['Revenue', 'Expenses', 'Profit'],
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        top: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxisLabels,
        axisLabel: {
          fontSize: 11,
          color: 'rgba(0, 0, 0, 0.45)',
        },
        axisLine: {
          lineStyle: {
            color: '#e5e7eb',
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: range.min,
        max: range.max,
        axisLabel: {
          fontSize: 11,
          color: 'rgba(0, 0, 0, 0.45)',
          formatter: (value: number) => {
            if (value >= 1_000_000) {
              return `${(value / 1_000_000).toFixed(0)}M`;
            } else if (value >= 1_000) {
              return `${(value / 1_000).toFixed(0)}K`;
            }
            return value.toFixed(0);
          },
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6',
            type: 'dashed',
          },
        },
        axisLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: chartData.map((d) => d.revenue),
          smooth: true,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            color: 'rgba(16, 185, 129, 0.08)',
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
        {
          name: 'Expenses',
          type: 'line',
          data: chartData.map((d) => d.expenses),
          smooth: true,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            color: 'rgba(249, 115, 22, 0.08)',
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
        {
          name: 'Profit',
          type: 'line',
          data: chartData.map((d) => d.profit),
          smooth: true,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            color: 'rgba(59, 130, 246, 0.08)',
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4,
            },
          },
        },
      ],
    };
  }, [data, currency]);

  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

RevenueExpenseChart.displayName = 'RevenueExpenseChart';
