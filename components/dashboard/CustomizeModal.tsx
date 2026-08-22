/**
 * Dashboard Customize Modal Component
 * Allows users to customize widget visibility, order, sizes, and save layouts
 */

'use client';

import React, { useState } from 'react';
import { useDashboardCustomization } from '@/hooks/useDashboardCustomization';
import { WIDGET_LABELS } from '@/config/defaultLayout';
import { X, GripVertical, Save, Trash2 } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  const customization = useDashboardCustomization();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [layoutToDelete, setLayoutToDelete] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleToggleWidget = (widgetId: string) => {
    customization.toggleWidget(widgetId);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, widgetId: string) => {
    setDraggedItem(widgetId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const fromIndex = customization.widgetOrder.indexOf(draggedItem);
    const toIndex = customization.widgetOrder.indexOf(targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
      customization.moveWidget(fromIndex, toIndex);
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleSetSize = (widgetId: string, size: 1 | 2 | 3 | 4) => {
    customization.setWidgetSize(widgetId, size);
  };

  const handleReset = () => {
    customization.resetLayout();
    setShowResetConfirm(false);
  };

  const handleSaveLayout = () => {
    if (!layoutName.trim()) {
      alert('Please enter a layout name');
      return;
    }
    customization.saveLayout(layoutName, {
      widgetVisibility: customization.widgetVisibility,
      widgetOrder: customization.widgetOrder,
      widgetSizes: customization.widgetSizes,
    });
    setLayoutName('');
    setShowSaveForm(false);
  };

  const handleLoadLayout = (name: string) => {
    customization.loadLayout(name);
    setSelectedLayout(name);
  };

  const handleDeleteLayout = (name: string) => {
    customization.deleteLayout(name);
    setLayoutToDelete(null);
  };

  const visibleWidgets = customization.widgetOrder.filter(
    (id) => customization.isWidgetVisible(id)
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gray-50 dark:bg-slate-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Customize Dashboard
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Widget List */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Widgets
              </h3>

              <div className="space-y-3 mb-6">
                {customization.widgetOrder.map((widgetId) => (
                  <div
                    key={widgetId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, widgetId)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, widgetId)}
                    onDragEnd={handleDragEnd}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      draggedItem === widgetId
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-slate-700'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    } ${
                      !customization.isWidgetVisible(widgetId)
                        ? 'opacity-50 bg-gray-50 dark:bg-slate-700'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Drag Handle */}
                      <div className="cursor-grab active:cursor-grabbing text-gray-400">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      {/* Widget Info */}
                      <div className="flex-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customization.isWidgetVisible(widgetId)}
                            onChange={() => handleToggleWidget(widgetId)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {WIDGET_LABELS[widgetId] || widgetId}
                          </span>
                        </label>
                      </div>

                      {/* Size Controls */}
                      {customization.isWidgetVisible(widgetId) && (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                handleSetSize(widgetId, size as 1 | 2 | 3 | 4)
                              }
                              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                                customization.getWidgetSize(widgetId) === size
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {visibleWidgets.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No widgets visible. Enable at least one widget to display the dashboard.
                </div>
              )}
            </section>

            {/* Reset Layout */}
            <section className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
              >
                Reset to Default
              </button>

              {showResetConfirm && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
                  <p className="text-sm text-red-900 dark:text-red-200 mb-3">
                    Are you sure you want to reset to default layout? This cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Save/Load Layouts */}
            <section className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Save & Load Layouts
              </h3>

              {/* Save Form */}
              {!showSaveForm ? (
                <button
                  onClick={() => setShowSaveForm(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Current Layout
                </button>
              ) : (
                <div className="p-4 bg-indigo-50 dark:bg-slate-700 rounded-md space-y-3">
                  <input
                    type="text"
                    value={layoutName}
                    onChange={(e) => setLayoutName(e.target.value)}
                    placeholder="Enter layout name..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveLayout}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setShowSaveForm(false);
                        setLayoutName('');
                      }}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Saved Layouts */}
              {Object.keys(customization.savedLayouts).length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Saved Layouts:
                  </h4>
                  <div className="space-y-2">
                    {Object.keys(customization.savedLayouts).map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                      >
                        <button
                          onClick={() => handleLoadLayout(name)}
                          className={`flex-1 text-left px-3 py-1 rounded text-sm transition-colors ${
                            selectedLayout === name
                              ? 'bg-indigo-600 text-white'
                              : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {name}
                        </button>
                        <button
                          onClick={() => setLayoutToDelete(name)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delete Confirmation */}
                  {layoutToDelete && (
                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
                      <p className="text-sm text-red-900 dark:text-red-200 mb-2">
                        Delete layout &quot;{layoutToDelete}&quot;?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteLayout(layoutToDelete)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setLayoutToDelete(null)}
                          className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded text-xs hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 dark:bg-slate-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
