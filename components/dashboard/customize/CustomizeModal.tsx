'use client';

/**
 * Customize Modal Component
 * Main modal for dashboard customization with widget gallery, layout preview, and management
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useDashboardCustomization } from '@/hooks/useDashboardCustomization';
import { WidgetGallery } from './WidgetGallery';
import { LayoutPreview } from './LayoutPreview';
import { LayoutManager } from './LayoutManager';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  const {
    widgetVisibility,
    widgetOrder,
    widgetSizes,
    savedLayouts,
    toggleWidget,
    setWidgetOrder,
    setWidgetSize,
    resetLayout,
    saveLayout,
    loadLayout,
    deleteLayout,
  } = useDashboardCustomization();

  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleResetLayout = () => {
    resetLayout();
    setConfirmReset(false);
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-200',
          'backdrop-blur-sm'
        )}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-6xl my-8">
          {/* Modal Content */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Customize Dashboard
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Configure widgets, layout, and save custom layouts
                </p>
              </div>
              <button
                onClick={onClose}
                className={clsx(
                  'p-2 rounded-lg transition-colors duration-150',
                  'text-slate-500 dark:text-slate-400',
                  'hover:bg-slate-100 dark:hover:bg-slate-800',
                  'hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                <X size={24} className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row">
              {/* Left Column - Widget Gallery */}
              <div className="flex-1 border-r border-slate-200 dark:border-slate-700 p-6 overflow-hidden flex flex-col">
                <WidgetGallery
                  widgetVisibility={widgetVisibility}
                  onToggleWidget={toggleWidget}
                />
              </div>

              {/* Right Column - Layout Preview and Manager */}
              <div className="flex-1 p-6 overflow-hidden flex flex-col">
                <div className="flex-grow overflow-y-auto mb-6">
                  <LayoutPreview
                    widgetOrder={widgetOrder}
                    widgetSizes={widgetSizes}
                    widgetVisibility={widgetVisibility}
                    onReorder={setWidgetOrder}
                    onSizeChange={setWidgetSize}
                    onToggle={toggleWidget}
                  />
                </div>

                {/* Layout Manager */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <LayoutManager
                    savedLayouts={savedLayouts}
                    currentLayout={{
                      widgetVisibility,
                      widgetOrder,
                      widgetSizes,
                    }}
                    onSave={saveLayout}
                    onLoad={loadLayout}
                    onDelete={deleteLayout}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                onClick={() => setConfirmReset(true)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
                  'hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                Reset to Default
              </button>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className={clsx(
                    'px-6 py-2 rounded-lg font-medium transition-colors duration-150',
                    'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
                    'hover:bg-slate-200 dark:hover:bg-slate-700'
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={clsx(
                    'px-6 py-2 rounded-lg font-medium transition-colors duration-150',
                    'bg-indigo-600 dark:bg-indigo-700 text-white',
                    'hover:bg-indigo-700 dark:hover:bg-indigo-600'
                  )}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {confirmReset && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-sm mx-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Reset to Default Layout?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              This will restore all widgets to their default visibility, order, and sizes. This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmReset(false)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                  'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white',
                  'hover:bg-slate-300 dark:hover:bg-slate-600'
                )}
              >
                Cancel
              </button>
              <button
                onClick={handleResetLayout}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                  'bg-orange-600 dark:bg-orange-700 text-white',
                  'hover:bg-orange-700 dark:hover:bg-orange-600'
                )}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
