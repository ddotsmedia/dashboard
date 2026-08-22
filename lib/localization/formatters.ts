/**
 * Locale-Aware Formatting Utilities
 * Provides formatting functions that respect locale settings (en, ar)
 */

type Locale = 'en' | 'ar';
type Currency = 'AED' | 'USD' | 'EUR';

/**
 * Format currency values based on locale and currency type
 * - AED + ar: Arabic numerals if configured, RTL formatting
 * - USD/EUR + en: standard USD/EUR format
 * - Supports all 3 currencies in both locales
 */
export function formatCurrency(
  value: number,
  currency: Currency = 'AED',
  locale: Locale = 'ar'
): string {
  if (isNaN(value)) return '0';

  try {
    const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

    const formatter = new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  } catch (error) {
    // Fallback formatting
    const symbol = getCurrencySymbol(currency);
    const formatted = Math.abs(value).toFixed(2);
    const result = locale === 'ar' ? `${formatted} ${symbol}` : `${symbol} ${formatted}`;
    return value < 0 ? `-${result}` : result;
  }
}

/**
 * Format regular numbers based on locale
 */
export function formatNumber(
  value: number,
  locale: Locale = 'ar',
  decimals: number = 0
): string {
  if (isNaN(value)) return '0';

  try {
    const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

    const formatter = new Intl.NumberFormat(localeCode, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(value);
  } catch (error) {
    return value.toFixed(decimals);
  }
}

/**
 * Format dates with locale-aware formatting
 * - en: "Aug 22, 2026" or "22/08/2026"
 * - ar: "22 أغسطس 2026" (Arabic month names)
 */
export function formatDate(
  date: Date | string,
  locale: Locale = 'ar',
  format: 'long' | 'short' | 'numeric' = 'long'
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return '';
    }

    const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

    let options: Intl.DateTimeFormatOptions;

    switch (format) {
      case 'short':
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        };
        break;
      case 'numeric':
        options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
        break;
      case 'long':
      default:
        options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        break;
    }

    const formatter = new Intl.DateTimeFormat(localeCode, options);
    return formatter.format(dateObj);
  } catch (error) {
    return '';
  }
}

/**
 * Format percentage values based on locale
 */
export function formatPercent(
  value: number,
  locale: Locale = 'ar',
  decimals: number = 2
): string {
  if (isNaN(value)) return '0%';

  try {
    const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

    const formatter = new Intl.NumberFormat(localeCode, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(value / 100);
  } catch (error) {
    return `${value.toFixed(decimals)}%`;
  }
}

/**
 * Format comma-separated list based on locale
 */
export function formatList(
  items: string[],
  locale: Locale = 'ar'
): string {
  if (!items || items.length === 0) return '';

  try {
    const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

    const formatter = new Intl.ListFormat(localeCode, {
      style: 'long',
      type: 'conjunction',
    });

    return formatter.format(items);
  } catch (error) {
    // Fallback: simple comma separation
    const separator = locale === 'ar' ? '، ' : ', ';
    return items.join(separator);
  }
}

/**
 * Get currency symbol for fallback formatting
 */
function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    AED: 'د.إ',
    USD: '$',
    EUR: '€',
  };
  return symbols[currency] || currency;
}

/**
 * Get direction based on locale
 */
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatLargeNumber(
  value: number,
  locale: Locale = 'ar',
  decimals: number = 1
): string {
  if (isNaN(value) || value === 0) return '0';

  const absValue = Math.abs(value);
  const isNegative = value < 0;

  let formattedNumber: string;
  let suffix: string;

  if (absValue >= 1_000_000_000) {
    formattedNumber = (absValue / 1_000_000_000).toFixed(decimals);
    suffix = locale === 'ar' ? 'مليار' : 'B';
  } else if (absValue >= 1_000_000) {
    formattedNumber = (absValue / 1_000_000).toFixed(decimals);
    suffix = locale === 'ar' ? 'مليون' : 'M';
  } else if (absValue >= 1_000) {
    formattedNumber = (absValue / 1_000).toFixed(decimals);
    suffix = locale === 'ar' ? 'ألف' : 'K';
  } else {
    formattedNumber = absValue.toFixed(0);
    suffix = '';
  }

  const formatted = `${formattedNumber}${suffix}`;
  return isNegative ? `-${formatted}` : formatted;
}
