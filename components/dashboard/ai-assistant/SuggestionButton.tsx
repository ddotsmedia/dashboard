'use client';

import React from 'react';

interface SuggestionButtonProps {
  suggestion: string;
  onClick: (suggestion: string) => void;
}

/**
 * Suggestion Button Component
 * Reusable button for quick suggestions
 */
export function SuggestionButton({ suggestion, onClick }: SuggestionButtonProps) {
  return (
    <button
      onClick={() => onClick(suggestion)}
      className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 whitespace-nowrap truncate"
    >
      {suggestion}
    </button>
  );
}

SuggestionButton.displayName = 'SuggestionButton';
