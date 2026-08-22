'use client';

import React from 'react';
import { Sparkles, User } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/hooks/useAIAssistant';

interface ChatMessageProps {
  message: ChatMessageType;
  isUser: boolean;
}

/**
 * Chat Message Component
 * Displays a single chat message with avatar and styling
 */
export function ChatMessage({ message, isUser }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-blue-500 dark:bg-blue-600'
            : 'bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs`}>
        <div
          className={`px-4 py-2 rounded-lg text-sm leading-relaxed ${
            isUser
              ? 'bg-blue-500 dark:bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
          }`}
        >
          {message.content}
        </div>

        {/* Timestamp */}
        <div className={`text-xs ${
          isUser
            ? 'text-gray-500 dark:text-gray-400 mr-1'
            : 'text-gray-500 dark:text-gray-400 ml-1'
        } mt-1`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}

ChatMessage.displayName = 'ChatMessage';
