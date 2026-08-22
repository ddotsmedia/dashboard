'use client';

import { useLocale as useIntlLocale } from 'next-intl';

/**
 * Hook to get the current locale
 * @returns Current locale ('en' | 'ar')
 */
export function useLocale() {
  return useIntlLocale() as 'en' | 'ar';
}
