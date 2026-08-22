export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames = {
  en: 'English',
  ar: 'العربية'
} as const;

export const localeIcons = {
  en: '🇬🇧',
  ar: '🇸🇦'
} as const;
