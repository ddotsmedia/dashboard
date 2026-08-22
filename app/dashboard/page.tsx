'use client';

import { MainLayout } from '@/components/navigation/MainLayout';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { AIInsightsSection } from '@/components/dashboard/AIInsightsSection';

export default function DashboardPage() {
  return (
    <MainLayout>
      <AIInsightsSection />
      <DashboardContent />
    </MainLayout>
  );
}
