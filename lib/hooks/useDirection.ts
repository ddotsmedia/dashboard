'use client';

import { useLocale } from 'next-intl';

/**
 * Hook to get text direction based on current locale
 * Returns 'rtl' for Arabic, 'ltr' for English
 */
export function useDirection(): 'ltr' | 'rtl' {
  const locale = useLocale();
  return locale === 'ar' ? 'rtl' : 'ltr';
}
