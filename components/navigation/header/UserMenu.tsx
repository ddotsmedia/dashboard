'use client';

import { useAuth } from '@/lib/store';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/lib/responsive';

export function UserMenu() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);

  if (!currentUser) {
    return null;
  }

  const initials = currentUser.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold hover:bg-indigo-700 transition-colors flex-shrink-0"
        title={currentUser.name}
        aria-label={`User menu: ${currentUser.name}`}
        aria-expanded={isOpen}
      >
        {initials}
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isMobile ? 'right-0' : 'right-0'
          } mt-2 ${isMobile ? 'w-56' : 'w-48'} bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 animate-in fade-in duration-150`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentUser.role}
            </p>
          </div>

          <Link
            href="/settings/profile"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-11 md:py-2 md:min-h-auto"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            <User className="w-4 h-4 flex-shrink-0" />
            <span>Profile</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-11 md:py-2 md:min-h-auto"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 transition-colors min-h-11 md:py-2 md:min-h-auto"
            role="menuitem"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
