/**
 * Currency Formatting Utilities
 */

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

export function formatCurrency(
  value: number,
  currency: 'AED' | 'USD' | 'EUR' = 'AED',
  locale: string = 'ar-AE'
): string {
  if (isNaN(value)) return '0';

  const decimals = CURRENCY_DECIMALS[currency] || 2;
  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return formatter.format(value);
  } catch {
    // Fallback formatting
    const fixedValue = Math.abs(value).toFixed(decimals);
    const formatted = `${symbol} ${fixedValue}`;
    return value < 0 ? `-${formatted}` : formatted;
  }
}

export function formatNumber(
  value: number,
  decimals: number = 0,
  locale: string = 'ar-AE'
): string {
  if (isNaN(value)) return '0';

  try {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return formatter.format(value);
  } catch {
    return value.toFixed(decimals);
  }
}

export function formatPercent(
  value: number,
  decimals: number = 2,
  locale: string = 'ar-AE'
): string {
  if (isNaN(value)) return '0%';

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return formatter.format(value / 100);
  } catch {
    return `${value.toFixed(decimals)}%`;
  }
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
