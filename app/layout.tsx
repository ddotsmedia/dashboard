import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/variables.css';

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
  return children;
}
