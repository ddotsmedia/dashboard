'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface AIAssistantButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  unreadCount?: number;
}

/**
 * AI Assistant Button Component
 * Header button to toggle the AI assistant panel
 */
export function AIAssistantButton({ onClick, isOpen = false, unreadCount = 0 }: AIAssistantButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-lg transition-all duration-200 ${
        isOpen
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
      }`}
      title="AI Finance Assistant"
    >
      <MessageCircle className="w-6 h-6" />

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}

AIAssistantButton.displayName = 'AIAssistantButton';
