'use client';

import { useTranslations as useIntlTranslations } from 'next-intl';

/**
 * Hook to get the translation function
 * @returns Translation function (t)
 */
export function useTranslation() {
  return useIntlTranslations();
}
