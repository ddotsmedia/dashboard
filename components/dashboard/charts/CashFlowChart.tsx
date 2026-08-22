'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';
import {
  transformToCashFlowData,
  getCashFlowColor,
  formatChartCurrency,
} from '@/lib/charts/generateChartData';
import type { CashFlowData } from '@/types/dashboard';

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div>,
});

interface CashFlowChartProps {
  data: CashFlowData;
  currency?: 'AED' | 'USD' | 'EUR';
  height?: number;
}

/**
 * Cash Flow Bar Chart
 * Displays opening cash, inflows, outflows, net cash flow, and closing cash
 */
export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  currency = 'AED',
  height = 400,
}) => {
  const chartOptions = useMemo<EChartsOption>(() => {
    const chartData = transformToCashFlowData(data);
    const categories = chartData.map((item) => item.category);
    const values = chartData.map((item) => item.value);

    return {
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
          if (!paramArray[0]) return '';

          const param = paramArray[0];
          return `<strong>${param.name}</strong><br/><span style="color:${param.color}">●</span> ${param.seriesName}: ${formatChartCurrency(param.value, currency)}`;
        },
      },
      legend: {
        top: 'right',
        right: 10,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: 12,
        },
        data: ['Cash Flow Amount'],
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '15%',
        top: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          fontSize: 11,
          color: 'rgba(0, 0, 0, 0.45)',
          interval: 0,
          rotate: 15,
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
          name: 'Cash Flow Amount',
          type: 'bar',
          data: values.map((value, index) => ({
            value,
            itemStyle: {
              color: getCashFlowColor(categories[index]),
            },
          })),
          emphasis: {
            itemStyle: {
              opacity: 0.8,
            },
          },
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '60%',
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

CashFlowChart.displayName = 'CashFlowChart';
