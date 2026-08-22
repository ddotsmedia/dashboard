import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

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

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
