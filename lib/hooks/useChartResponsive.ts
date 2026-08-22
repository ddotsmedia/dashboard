'use client';

import { useWindowWidth } from '@/lib/responsive';

export function useChartResponsive() {
  const width = useWindowWidth();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const getChartWidth = (): string | number => {
    if (isMobile) return '100%';
    if (isTablet) return '100%';
    return '100%';
  };

  const getChartHeight = (): number => {
    if (isMobile) return 300;
    if (isTablet) return 350;
    return 400;
  };

  const getGridCols = (): number => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
    getChartWidth,
    getChartHeight,
    getGridCols,
  };
}
