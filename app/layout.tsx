import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Accounts Dashboard - Enterprise Financial Management',
  description:
    'Professional financial dashboard for monitoring revenue, expenses, cash flow, receivables, and payables',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
