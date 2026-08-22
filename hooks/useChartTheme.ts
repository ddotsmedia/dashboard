/**
 * useChartTheme Hook
 * Provides ECharts theme and dark mode detection
 * Watches for theme changes and updates automatically
 */

'use client';

import { useEffect, useState, useRef } from 'react';
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
 * Determine if dark mode should be active based on theme setting
 */
function calculateDarkMode(uiTheme: string): boolean {
  if (uiTheme === 'light') {
    return false;
  }

  if (uiTheme === 'dark') {
    return true;
  }

  // Fall back to system detection (system preference or data-theme attribute)
  return detectDarkMode();
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
  const unwatchRef = useRef<(() => void) | null>(null);
  const prevThemeRef = useRef<string>(uiTheme);

  // Track system theme changes to trigger re-renders
  const [, setSystemThemeChanged] = useState(false);

  // Set up watchers for external theme changes
  useEffect(() => {
    // Only set up watcher if theme changed
    if (prevThemeRef.current !== uiTheme) {
      prevThemeRef.current = uiTheme;

      // Clean up previous watcher
      if (unwatchRef.current) {
        unwatchRef.current();
        unwatchRef.current = null;
      }

      // Only set up external watcher if theme is 'system'
      if (uiTheme === 'system') {
        unwatchRef.current = watchThemeChange(() => {
          // Trigger re-render when system theme changes
          setSystemThemeChanged((prev) => !prev);
        });
      }
    }

    return () => {
      if (unwatchRef.current) {
        unwatchRef.current();
        unwatchRef.current = null;
      }
    };
  }, [uiTheme]);

  // Calculate the current dark mode based on uiTheme
  // This will recompute when uiTheme changes or system theme changes
  const isDark = calculateDarkMode(uiTheme);

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
  const unwatchRef = useRef<(() => void) | null>(null);
  const prevThemeRef = useRef<string>(uiTheme);
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() =>
    detectDarkMode()
  );

  // Set up watchers for external theme changes
  useEffect(() => {
    // Only set up watcher if theme changed
    if (prevThemeRef.current !== uiTheme) {
      prevThemeRef.current = uiTheme;

      // Clean up previous watcher
      if (unwatchRef.current) {
        unwatchRef.current();
        unwatchRef.current = null;
      }

      // Only set up external watcher if theme is 'system'
      if (uiTheme === 'system') {
        unwatchRef.current = watchThemeChange((newDarkMode: boolean) => {
          setSystemIsDark(newDarkMode);
        });
      }
    }

    return () => {
      if (unwatchRef.current) {
        unwatchRef.current();
        unwatchRef.current = null;
      }
    };
  }, [uiTheme]);

  // Calculate based on UI theme, falling back to system preference only when needed
  if (uiTheme === 'light') {
    return false;
  }

  if (uiTheme === 'dark') {
    return true;
  }

  // System theme - use the watched system value
  return systemIsDark;
}
