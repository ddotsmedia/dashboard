'use client';

/**
 * Customize Modal Component
 * Main modal for dashboard customization with widget gallery, layout preview, and management
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useChartResponsive } from '@/lib/hooks/useChartResponsive';
import { useDashboardCustomization } from '@/hooks/useDashboardCustomization';
import { useFocusManagement } from '@/hooks/useFocusManagement';
import { WidgetGallery } from './WidgetGallery';
import { LayoutPreview } from './LayoutPreview';
import { LayoutManager } from './LayoutManager';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  const { isMobile } = useChartResponsive();
  const { containerRef, handleKeyDown } = useFocusManagement(isOpen, onClose);
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
        aria-hidden="true"
      />

      {/* Modal Container - Responsive sizing */}
      <div className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto',
        isMobile ? 'p-0' : 'p-4'
      )}>
        <div
          ref={containerRef}
          onKeyDown={handleKeyDown}
          className={clsx(
            'relative w-full my-0',
            isMobile ? 'max-h-[100vh]' : 'max-w-6xl my-8'
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Modal Content */}
          <div className="bg-white dark:bg-slate-900 rounded-t-lg shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
            {/* Header - Responsive padding */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 flex-shrink-0" style={{
              padding: isMobile ? '16px' : '24px'
            }}>
              <div className="flex-1">
                <h2
                  id="modal-title"
                  className={clsx(
                    'font-bold text-slate-900 dark:text-white',
                    isMobile ? 'text-lg' : 'text-2xl'
                  )}
                >
                  Customize Dashboard
                </h2>
                {!isMobile && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Configure widgets, layout, and save custom layouts
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className={clsx(
                  'rounded-lg transition-colors duration-150 flex-shrink-0',
                  'text-slate-500 dark:text-slate-400',
                  'hover:bg-slate-100 dark:hover:bg-slate-800',
                  'hover:text-slate-700 dark:hover:text-slate-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                  isMobile ? 'p-3 h-11 w-11' : 'p-2 h-8 w-8'
                )}
                aria-label="Close modal"
              >
                <X size={isMobile ? 24 : 24} className="w-6 h-6" />
              </button>
            </div>

            {/* Content - Single column on mobile, two columns on desktop */}
            <div className={clsx(
              'flex-grow overflow-hidden flex',
              isMobile ? 'flex-col' : 'flex-row',
              isMobile ? 'divide-y' : 'divide-x',
              'divide-slate-200 dark:divide-slate-700'
            )}>
              {/* Left Column - Widget Gallery - Scrollable on mobile */}
              <div className={clsx(
                'flex-1 overflow-hidden flex flex-col',
                isMobile ? 'p-4 max-h-[40%]' : 'border-r border-slate-200 dark:border-slate-700 p-6'
              )}>
                <WidgetGallery
                  widgetVisibility={widgetVisibility}
                  onToggleWidget={toggleWidget}
                />
              </div>

              {/* Right Column - Layout Preview and Manager - Scrollable */}
              <div className={clsx(
                'flex-1 overflow-hidden flex flex-col',
                isMobile ? 'p-4' : 'p-6'
              )}>
                <div className="flex-grow overflow-y-auto mb-4 sm:mb-6">
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
                <div className={clsx(
                  'border-t border-slate-200 dark:border-slate-700',
                  isMobile ? 'pt-4' : 'pt-6'
                )}>
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

            {/* Footer - Responsive buttons */}
            <div className={clsx(
              'border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 flex-shrink-0',
              isMobile ? 'p-4 flex-col-reverse' : 'p-6 justify-between'
            )}>
              {!isMobile && (
                <button
                  onClick={() => setConfirmReset(true)}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
                    'hover:bg-slate-200 dark:hover:bg-slate-700',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
                  )}
                >
                  Reset to Default
                </button>
              )}

              <div className={clsx(
                'flex gap-2 w-full',
                isMobile ? 'flex-col' : ''
              )}>
                <button
                  onClick={() => setConfirmReset(true)}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
                    'hover:bg-slate-200 dark:hover:bg-slate-700',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                    isMobile ? 'w-full' : 'hidden'
                  )}
                >
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className={clsx(
                    'px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-150',
                    'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
                    'hover:bg-slate-200 dark:hover:bg-slate-700',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                    isMobile ? 'flex-1' : ''
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={clsx(
                    'px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-150',
                    'bg-indigo-600 dark:bg-indigo-700 text-white',
                    'hover:bg-indigo-700 dark:hover:bg-indigo-600',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                    isMobile ? 'flex-1 h-11 flex items-center justify-center' : ''
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
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 rounded-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-reset-title"
        >
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-sm mx-4 border border-slate-200 dark:border-slate-700">
            <h3
              id="confirm-reset-title"
              className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
            >
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
                  'hover:bg-slate-300 dark:hover:bg-slate-600',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
                )}
              >
                Cancel
              </button>
              <button
                onClick={handleResetLayout}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-150',
                  'bg-orange-600 dark:bg-orange-700 text-white',
                  'hover:bg-orange-700 dark:hover:bg-orange-600',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
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
