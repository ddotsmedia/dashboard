'use client';

import { MainLayout } from '@/components/navigation/MainLayout';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Accounts Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Phase 1: Application Shell & Navigation - Complete
        </p>
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
          <p className="text-blue-900 dark:text-blue-100">
            Welcome to the Accounts Dashboard! The navigation and layout are now ready.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
