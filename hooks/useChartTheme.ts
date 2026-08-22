/**
 * useChartTheme Hook
 * Provides ECharts theme and dark mode detection
 * Watches for theme changes and updates automatically
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import type { EChartsOption } from 'echarts';
import { getChartTheme, detectDarkMode, watchThemeChange } from '@/lib/charts/theme';
import { useUI } from '@/lib/store';

/**
 * Chart theme hook return type
 */
export interface UseChartThemeReturn {
  theme: EChartsOption;
  isDark: boolean;
}

/**
 * Hook that provides ECharts theme based on current mode
 * Automatically watches for theme changes from:
 * - Zustand UI store
 * - Document data-theme attribute
 * - System preference
 */
export function useChartTheme(): UseChartThemeReturn {
  const { theme: uiTheme } = useUI();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Determine if dark mode should be active
  const calculateDarkMode = useCallback((): boolean => {
    // Explicit theme from UI store takes precedence
    if (uiTheme === 'light') {
      return false;
    }

    if (uiTheme === 'dark') {
      return true;
    }

    // Fall back to system detection (system preference or data-theme attribute)
    return detectDarkMode();
  }, [uiTheme]);

  // Initialize dark mode on mount
  useEffect(() => {
    setIsDark(calculateDarkMode());
    setMounted(true);
  }, [calculateDarkMode]);

  // Watch for theme changes
  useEffect(() => {
    if (!mounted) {
      return;
    }

    // Update when UI theme changes
    setIsDark(calculateDarkMode());

    // Set up listener for system/data-theme attribute changes
    const unwatch = watchThemeChange((newDarkMode: boolean) => {
      // Only update if UI theme is 'system'
      if (uiTheme === 'system') {
        setIsDark(newDarkMode);
      }
    });

    return unwatch;
  }, [uiTheme, mounted, calculateDarkMode]);

  // Get the appropriate theme object
  const theme = getChartTheme(isDark);

  return {
    theme,
    isDark,
  };
}

/**
 * Hook that only returns the dark mode boolean
 * Lighter weight if you only need the boolean, not the full theme object
 */
export function useDarkMode(): boolean {
  const { theme: uiTheme } = useUI();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Determine if dark mode should be active
  const calculateDarkMode = useCallback((): boolean => {
    if (uiTheme === 'light') {
      return false;
    }

    if (uiTheme === 'dark') {
      return true;
    }

    return detectDarkMode();
  }, [uiTheme]);

  // Initialize on mount
  useEffect(() => {
    setIsDark(calculateDarkMode());
    setMounted(true);
  }, [calculateDarkMode]);

  // Watch for changes
  useEffect(() => {
    if (!mounted) {
      return;
    }

    setIsDark(calculateDarkMode());

    const unwatch = watchThemeChange((newDarkMode: boolean) => {
      if (uiTheme === 'system') {
        setIsDark(newDarkMode);
      }
    });

    return unwatch;
  }, [uiTheme, mounted, calculateDarkMode]);

  return isDark;
}
