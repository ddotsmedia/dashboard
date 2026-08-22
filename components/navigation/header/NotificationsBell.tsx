'use client';

import { Bell } from 'lucide-react';

export function NotificationsBell() {
  const notificationCount = 3; // Mock count

  return (
    <button
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-10 w-10 flex items-center justify-center flex-shrink-0"
      title={`Notifications (${notificationCount})`}
      aria-label={`Notifications: ${notificationCount} unread`}
    >
      <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      {notificationCount > 0 && (
        <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[20px] h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
    </button>
  );
}
