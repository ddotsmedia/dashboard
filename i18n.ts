import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/i18n/config';

export default getRequestConfig(async () => {
  const locale = 'en'; // default

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
