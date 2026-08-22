/**
 * Sparkline Component
 * Mini line chart for KPI cards using ECharts
 */

'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { getSparklineConfig } from '@/lib/charts/sparklineConfig';

interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}

/**
 * Sparkline mini chart component
 * Displays a simple line chart with gradient fill
 * No axes, legend, or tooltips
 * Responsive to dark mode
 */
export function Sparkline({
  data,
  color,
  height = 40,
  width = 80,
}: SparklineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    // Initialize chart
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(containerRef.current, null, {
        renderer: 'canvas',
      });
    }

    const chart = chartInstance.current;

    // Get sparkline configuration
    const option = getSparklineConfig(data, color) as EChartsOption;

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
  }, [data, color]);

  useEffect(() => {
    // Handle dark mode theme switching
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      if (chartInstance.current) {
        // ECharts will automatically adjust based on the theme
        chartInstance.current.resize();
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

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
        width: `${width}px`,
        height: `${height}px`,
        flexShrink: 0,
      }}
      className="inline-block"
    />
  );
}
