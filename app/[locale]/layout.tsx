import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n/config';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { AIAssistantPanel } from '@/components/ai/AIAssistantPanel';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Accounts Dashboard - Enterprise Financial Management',
  description:
    'Professional financial dashboard for monitoring revenue, expenses, cash flow, receivables, and payables',
  icons: {
    icon: '/favicon.ico',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      data-dir={dir}
      suppressHydrationWarning
      data-theme="light"
    >
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            {children}
            <AIAssistantPanel />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
