'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import { useChartResponsive } from '@/lib/hooks/useChartResponsive';
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
  const { isMobile, isTablet, isDesktop } = useChartResponsive();

  // Responsive height
  const responsiveHeight = isMobile ? 250 : isTablet ? 350 : height;

  const chartOptions = useMemo<EChartsOption>(() => {
    const chartData = transformToLineChartData(data);
    const xAxisLabels = getLineChartXAxisLabels(data);
    const range = getRevenueRange(data);

    return {
      color: [getMetricColor('revenue'), getMetricColor('expenses'), getMetricColor('profit')],
      responsive: true,
      maintainAspectRatio: false,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'transparent',
        textStyle: {
          color: '#fff',
          fontSize: isMobile ? 11 : 12,
        },
        // Touch-friendly tooltip (no hover)
        confine: true,
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
        top: isMobile ? 'bottom' : 'right',
        right: isMobile ? 'center' : 10,
        left: isMobile ? 'center' : 'auto',
        textStyle: {
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: isMobile ? 10 : 12,
        },
        data: ['Revenue', 'Expenses', 'Profit'],
        orient: isMobile ? 'horizontal' : 'vertical',
        itemGap: isMobile ? 10 : 20,
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: isMobile ? '20%' : '10%',
        top: isMobile ? '5%' : '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxisLabels,
        axisLabel: {
          fontSize: isMobile ? 10 : 11,
          color: 'rgba(0, 0, 0, 0.45)',
          rotate: isMobile ? 45 : 0,
          interval: isMobile ? Math.ceil(xAxisLabels.length / 6) - 1 : 0,
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
      style={{ height: `${responsiveHeight}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

RevenueExpenseChart.displayName = 'RevenueExpenseChart';
