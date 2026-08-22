'use client';

import { Bell } from 'lucide-react';

export function NotificationsBell() {
  const notificationCount = 3; // Mock count

  return (
    <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
      <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </button>
  );
}
