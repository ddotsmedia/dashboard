'use client';

/**
 * Layout Manager Component
 * Handles saving, loading, and deleting layout configurations
 */

import React, { useState } from 'react';
import { Save, Download, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { Layout } from '@/lib/store';

interface LayoutManagerProps {
  savedLayouts: Record<string, Layout>;
  currentLayout: {
    widgetVisibility: Record<string, boolean>;
    widgetOrder: string[];
    widgetSizes: Record<string, 1 | 2 | 3 | 4>;
  };
  onSave: (name: string, layout: Layout) => void;
  onLoad: (name: string) => void;
  onDelete: (name: string) => void;
}

export function LayoutManager({
  savedLayouts,
  currentLayout,
  onSave,
  onLoad,
  onDelete,
}: LayoutManagerProps) {
  const [saveInputValue, setSaveInputValue] = useState('');
  const [saveInputError, setSaveInputError] = useState('');
  const [loadDropdownOpen, setLoadDropdownOpen] = useState(false);
  const [confirmDeleteLayout, setConfirmDeleteLayout] = useState<string | null>(null);

  const handleSaveLayout = () => {
    const trimmedName = saveInputValue.trim();

    // Validation
    if (!trimmedName) {
      setSaveInputError('Layout name is required');
      return;
    }

    if (trimmedName.length > 50) {
      setSaveInputError('Layout name must be 50 characters or less');
      return;
    }

    // Save the layout
    onSave(trimmedName, currentLayout);

    // Reset form
    setSaveInputValue('');
    setSaveInputError('');
  };

  const handleLoadLayout = (layoutName: string) => {
    onLoad(layoutName);
    setLoadDropdownOpen(false);
  };

  const handleDeleteLayout = (layoutName: string) => {
    onDelete(layoutName);
    setConfirmDeleteLayout(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveLayout();
    }
  };

  return (
    <div className="space-y-4">
      {/* Save Layout Section */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
          Save Current Layout
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={saveInputValue}
            onChange={(e) => {
              setSaveInputValue(e.target.value);
              setSaveInputError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter layout name..."
            className={clsx(
              'flex-grow px-3 py-2 rounded-lg border transition-colors duration-150',
              'bg-white dark:bg-slate-800',
              'text-slate-900 dark:text-white',
              'placeholder-slate-400 dark:placeholder-slate-500',
              saveInputError
                ? 'border-red-300 dark:border-red-700'
                : 'border-slate-300 dark:border-slate-600',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400'
            )}
          />
          <button
            onClick={handleSaveLayout}
            className={clsx(
              'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
              'flex items-center gap-2',
              'bg-indigo-600 dark:bg-indigo-700 text-white',
              'hover:bg-indigo-700 dark:hover:bg-indigo-600'
            )}
          >
            <Save size={18} className="w-4 h-4" />
            Save
          </button>
        </div>
        {saveInputError && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {saveInputError}
          </p>
        )}
      </div>

      {/* Load Layout Section */}
      {Object.keys(savedLayouts).length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Load Saved Layouts ({Object.keys(savedLayouts).length})
          </label>
          <div className="relative">
            <button
              onClick={() => setLoadDropdownOpen(!loadDropdownOpen)}
              className={clsx(
                'w-full px-3 py-2 rounded-lg border transition-colors duration-150',
                'bg-white dark:bg-slate-800',
                'text-slate-900 dark:text-white text-left',
                'border-slate-300 dark:border-slate-600',
                'flex items-center justify-between gap-2',
                'hover:border-slate-400 dark:hover:border-slate-500',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400'
              )}
            >
              <span className="flex items-center gap-2">
                <Download size={18} className="w-4 h-4" />
                Select layout...
              </span>
              <svg
                className={clsx(
                  'w-4 h-4 transition-transform duration-150',
                  loadDropdownOpen ? 'rotate-180' : ''
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {loadDropdownOpen && (
              <div
                className={clsx(
                  'absolute top-full left-0 right-0 mt-1 z-10',
                  'bg-white dark:bg-slate-800',
                  'border border-slate-300 dark:border-slate-600',
                  'rounded-lg shadow-lg',
                  'max-h-48 overflow-y-auto'
                )}
              >
                {Object.entries(savedLayouts).map(([layoutName]) => (
                  <button
                    key={layoutName}
                    onClick={() => handleLoadLayout(layoutName)}
                    className={clsx(
                      'w-full px-4 py-2 text-left transition-colors duration-150',
                      'border-b border-slate-200 dark:border-slate-700 last:border-b-0',
                      'text-slate-900 dark:text-white',
                      'hover:bg-indigo-50 dark:hover:bg-slate-700'
                    )}
                  >
                    {layoutName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Layout Section */}
      {Object.keys(savedLayouts).length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
            Saved Layouts
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {Object.keys(savedLayouts).map((layoutName) => (
              <div
                key={layoutName}
                className={clsx(
                  'flex items-center justify-between gap-2 p-2 rounded',
                  'bg-slate-50 dark:bg-slate-800/50',
                  'text-slate-900 dark:text-white'
                )}
              >
                <span className="text-sm truncate">{layoutName}</span>
                <button
                  onClick={() => setConfirmDeleteLayout(layoutName)}
                  className={clsx(
                    'p-1.5 rounded transition-colors duration-150',
                    'text-slate-500 dark:text-slate-400',
                    'hover:bg-red-50 dark:hover:bg-red-900/20',
                    'hover:text-red-600 dark:hover:text-red-400'
                  )}
                  title="Delete layout"
                >
                  <Trash2 size={16} className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDeleteLayout && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-sm mx-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Delete Layout?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              Are you sure you want to delete the layout &quot;{confirmDeleteLayout}&quot;? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDeleteLayout(null)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                  'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white',
                  'hover:bg-slate-300 dark:hover:bg-slate-600'
                )}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLayout(confirmDeleteLayout)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                  'bg-red-600 dark:bg-red-700 text-white',
                  'hover:bg-red-700 dark:hover:bg-red-600'
                )}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
