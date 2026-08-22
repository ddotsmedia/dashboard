'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { AIAssistant } from './AIAssistant';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AI Assistant Panel Component
 * Side panel or modal containing the AI Assistant
 * Slides from right on desktop, fullscreen on mobile
 */
export function AIAssistantPanel({ isOpen, onClose }: AIAssistantPanelProps) {
  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex flex-col md:w-96 w-full bg-white dark:bg-gray-950 shadow-lg transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Finance Assistant
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close panel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AIAssistant />
        </div>
      </div>
    </>
  );
}

AIAssistantPanel.displayName = 'AIAssistantPanel';
