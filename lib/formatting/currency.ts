/**
 * Currency Formatting Utilities
 * Provides locale-aware currency formatting
 */

import { formatCurrency as formatCurrencyLocalized, formatNumber as formatNumberLocalized } from '@/lib/localization/formatters';

type Locale = 'en' | 'ar';

const CURRENCY_SYMBOLS: Record<string, string> = {
  AED: 'د.إ',
  USD: '$',
  EUR: '€',
};

const CURRENCY_DECIMALS: Record<string, number> = {
  AED: 2,
  USD: 2,
  EUR: 2,
};

/**
 * Format currency with locale support
 * @param value The numeric value to format
 * @param currency The currency code (AED, USD, EUR)
 * @param locale The locale ('en' or 'ar')
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: 'AED' | 'USD' | 'EUR' = 'AED',
  locale: Locale = 'ar'
): string {
  return formatCurrencyLocalized(value, currency, locale);
}

/**
 * Format number with locale support
 * @param value The numeric value to format
 * @param decimals Number of decimal places
 * @param locale The locale ('en' or 'ar')
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  decimals: number = 0,
  locale: Locale = 'ar'
): string {
  return formatNumberLocalized(value, locale, decimals);
}

/**
 * Format percentage with locale support
 * Uses the locale-aware formatter from formatters.ts
 */
export function formatPercent(
  value: number,
  decimals: number = 2,
  locale: Locale = 'ar'
): string {
  const { formatPercent: formatPercentLocalized } = require('@/lib/localization/formatters');
  return formatPercentLocalized(value, locale, decimals);
}

export function formatLargeNumber(value: number, decimals: number = 1): string {
  if (isNaN(value) || value === 0) return '0';

  const absValue = Math.abs(value);
  const isNegative = value < 0;

  let formatted: string;
  if (absValue >= 1_000_000_000) {
    formatted = `${(absValue / 1_000_000_000).toFixed(decimals)}B`;
  } else if (absValue >= 1_000_000) {
    formatted = `${(absValue / 1_000_000).toFixed(decimals)}M`;
  } else if (absValue >= 1_000) {
    formatted = `${(absValue / 1_000).toFixed(decimals)}K`;
  } else {
    formatted = absValue.toFixed(0);
  }

  return isNegative ? `-${formatted}` : formatted;
}

export function parseNumber(value: string): number {
  if (!value) return 0;

  // Remove common separators and symbols
  const cleaned = value
    .replace(/[^\d.-]/g, '')
    .replace(/[^0-9.-]/g, '');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function roundTo(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function calculatePercentage(
  value: number,
  total: number,
  decimals: number = 2
): number {
  if (total === 0) return 0;
  return roundTo((value / total) * 100, decimals);
}

export function calculateVariance(
  current: number,
  previous: number,
  decimals: number = 2
): { amount: number; percent: number } {
  const amount = current - previous;
  const percent = previous === 0 ? 0 : roundTo((amount / Math.abs(previous)) * 100, decimals);

  return { amount, percent };
}
