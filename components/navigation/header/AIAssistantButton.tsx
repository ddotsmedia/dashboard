'use client';

import { useUI } from '@/lib/store';
import { MessageCircle } from 'lucide-react';

export function AIAssistantButton() {
  const { toggleAIAssistant } = useUI();

  return (
    <button
      onClick={toggleAIAssistant}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-10 w-10 flex items-center justify-center flex-shrink-0"
      title="Open AI Assistant (Cmd+Shift+A)"
      aria-label="Open AI Assistant"
    >
      <MessageCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>
  );
}
