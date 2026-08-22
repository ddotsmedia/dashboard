/**
 * Memoized Formatting Hooks
 * Provides memoized formatting functions to avoid recreation on every render
 * This is especially important for components that render frequently
 */

import { useMemo, useCallback } from 'react';
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatPercent,
  formatList,
  formatLargeNumber,
} from '@/lib/localization/formatters';
import type { Locale, Currency } from '@/types/dashboard';

type LocaleType = 'en' | 'ar';
type CurrencyType = 'AED' | 'USD' | 'EUR' | 'count';

/**
 * Hook: useMemoizedCurrencyFormatter
 * Returns a memoized currency formatting function
 * Only recreates the function when locale or currency changes
 */
export function useMemoizedCurrencyFormatter(
  currency: CurrencyType = 'AED',
  locale: LocaleType = 'ar'
) {
  return useCallback(
    (value: number) => {
      if (currency === 'count') {
        return formatNumber(value, locale, 0);
      }
      return formatCurrency(value, currency as 'AED' | 'USD' | 'EUR', locale);
    },
    [currency, locale]
  );
}

/**
 * Hook: useMemoizedNumberFormatter
 * Returns a memoized number formatting function
 */
export function useMemoizedNumberFormatter(
  locale: LocaleType = 'ar',
  decimals: number = 0
) {
  return useCallback(
    (value: number) => formatNumber(value, locale, decimals),
    [locale, decimals]
  );
}

/**
 * Hook: useMemoizedDateFormatter
 * Returns a memoized date formatting function
 */
export function useMemoizedDateFormatter(
  locale: LocaleType = 'ar',
  format: 'long' | 'short' | 'numeric' = 'long'
) {
  return useCallback(
    (date: Date | string) => formatDate(date, locale, format),
    [locale, format]
  );
}

/**
 * Hook: useMemoizedPercentFormatter
 * Returns a memoized percentage formatting function
 */
export function useMemoizedPercentFormatter(
  locale: LocaleType = 'ar',
  decimals: number = 2
) {
  return useCallback(
    (value: number) => formatPercent(value, locale, decimals),
    [locale, decimals]
  );
}

/**
 * Hook: useMemoizedLargeNumberFormatter
 * Returns a memoized large number (with K, M, B) formatting function
 */
export function useMemoizedLargeNumberFormatter(
  locale: LocaleType = 'ar',
  decimals: number = 1
) {
  return useCallback(
    (value: number) => formatLargeNumber(value, locale, decimals),
    [locale, decimals]
  );
}

/**
 * Hook: useAllFormatters
 * Returns an object with all memoized formatters
 * Useful when a component needs multiple formatters
 */
export function useAllFormatters(
  locale: LocaleType = 'ar',
  currency: CurrencyType = 'AED'
) {
  return useMemo(
    () => ({
      currency: formatCurrency,
      number: formatNumber,
      date: formatDate,
      percent: formatPercent,
      list: formatList,
      largeNumber: formatLargeNumber,
    }),
    []
  );
}

/**
 * Hook: useMemoizedKPIFormatter
 * Specialized formatter for KPI cards
 * Handles currency formatting with proper locale
 */
export function useMemoizedKPIFormatter(locale: LocaleType = 'ar') {
  return useMemo(
    () => ({
      formatCurrency: (value: number, currency: CurrencyType = 'AED') => {
        if (currency === 'count') {
          return formatNumber(value, locale, 0);
        }
        return formatCurrency(value, currency as 'AED' | 'USD' | 'EUR', locale);
      },
      formatPercent: (value: number) => formatPercent(value, locale, 1),
      formatNumber: (value: number) => formatNumber(value, locale, 0),
    }),
    [locale]
  );
}
