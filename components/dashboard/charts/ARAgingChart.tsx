/**
 * Accounts Receivable Aging Chart
 * Stacked bar chart showing AR aging by month
 */

'use client';

import { useEffect, useRef, memo, useState, type ReactElement } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { useChartResponsive } from '@/lib/hooks/useChartResponsive';
import { formatCurrency } from '@/lib/formatting/currency';

interface ARAgingChartProps {
  data?: Array<{
    month: string;
    current: number;
    d1_30: number;
    d31_60: number;
    d61_90: number;
    d90plus: number;
  }>;
}

/**
 * Color palette for AR aging buckets
 */
const AGING_COLORS = {
  current: '#16B96F',    // Green
  d1_30: '#FBBF24',      // Yellow
  d31_60: '#F97316',     // Orange
  d61_90: '#EF4444',     // Red
  d90plus: '#991B1B',    // Dark Red
};

interface TooltipParam {
  axisValue: string;
  seriesName: string;
  value: number;
  color: string;
}

/**
 * Format tooltip content
 */
function formatTooltip(params: unknown): string {
  if (!Array.isArray(params)) return '';

  const typedParams = params as TooltipParam[];
  let tooltip = `<div style="font-weight: 600; margin-bottom: 8px;">${typedParams[0]?.axisValue}</div>`;

  typedParams.forEach((item) => {
    tooltip += `
      <div style="color: ${item.color}; margin-bottom: 4px;">
        ${item.seriesName}: ${formatCurrency(item.value, 'AED')}
      </div>
    `;
  });

  return tooltip;
}

/**
 * AR Aging Chart Component
 * Displays stacked bar chart of aging receivables over 12 months
 */
function ARAgingChartComponent({
  data,
}: ARAgingChartProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { isMobile, isTablet, isDesktop } = useChartResponsive();
  const [chartHeight, setChartHeight] = useState(400);

  // Set responsive height
  useEffect(() => {
    const height = isMobile ? 250 : isTablet ? 350 : 400;
    setChartHeight(height);
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (!containerRef.current || !data || data.length === 0) return;

    // Initialize chart
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(containerRef.current, null, {
        renderer: 'canvas',
      });
    }

    const chart = chartInstance.current;

    // Prepare data for stacked bar chart
    const months = data.map((item) => item.month);
    const currentData = data.map((item) => item.current);
    const d1_30Data = data.map((item) => item.d1_30);
    const d31_60Data = data.map((item) => item.d31_60);
    const d61_90Data = data.map((item) => item.d61_90);
    const d90plusData = data.map((item) => item.d90plus);

    const option: EChartsOption = {
      color: [
        AGING_COLORS.current,
        AGING_COLORS.d1_30,
        AGING_COLORS.d31_60,
        AGING_COLORS.d61_90,
        AGING_COLORS.d90plus,
      ],
      responsive: true,
      maintainAspectRatio: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: formatTooltip,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textStyle: {
          color: '#fff',
          fontSize: isMobile ? 11 : 12,
        },
        confine: true,
      },
      legend: {
        data: ['Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
        bottom: isMobile ? '0%' : '0%',
        left: isMobile ? 'center' : 'auto',
        textStyle: {
          color: '#666',
          fontSize: isMobile ? 10 : 12,
        },
        orient: isMobile ? 'horizontal' : 'vertical',
        itemGap: isMobile ? 8 : 20,
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: isMobile ? '25%' : '15%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#666',
          fontSize: isMobile ? 10 : 11,
          interval: isMobile ? Math.ceil(months.length / 5) - 1 : 0,
          rotate: isMobile ? 45 : 45,
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
          color: '#666',
          formatter: (value: number) => {
            if (value >= 1_000_000) {
              return `${(value / 1_000_000).toFixed(1)}M`;
            }
            if (value >= 1_000) {
              return `${(value / 1_000).toFixed(0)}K`;
            }
            return value.toString();
          },
        },
        splitLine: {
          lineStyle: {
            color: '#eee',
          },
        },
      },
      series: [
        {
          name: 'Current',
          data: currentData,
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '1-30 Days',
          data: d1_30Data,
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '31-60 Days',
          data: d31_60Data,
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '61-90 Days',
          data: d61_90Data,
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '90+ Days',
          data: d90plusData,
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
        },
      ],
    };

    // Set option and render
    chart.setOption(option);

    // Handle resize
    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: `${chartHeight}px`,
      }}
    />
  );
}

export const ARAgingChart = memo(ARAgingChartComponent);

ARAgingChart.displayName = 'ARAgingChart';
