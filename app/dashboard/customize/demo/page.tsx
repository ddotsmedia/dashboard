/**
 * Drag-Drop Demo Page
 * Demonstrates the drag-and-drop widget reordering functionality
 */

'use client';

import { MainLayout } from '@/components/navigation/MainLayout';
import { DragDropDemo } from '@/components/dashboard/customize/DragDropDemo';

export default function DragDropDemoPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Widget Reordering Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Test the drag-and-drop functionality with demo widgets
          </p>
        </div>

        {/* Demo Component */}
        <DragDropDemo />

        {/* Instructions */}
        <div className="mt-12 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Testing Guide
            </h2>

            <div className="space-y-4">
              {/* Desktop Testing */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Desktop Testing
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">1.</span>
                    <span>Hover over a widget and locate the drag handle (grip icon) in the top-right corner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">2.</span>
                    <span>Click and hold the drag handle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">3.</span>
                    <span>Move your mouse up or down to reorder the widget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">4.</span>
                    <span>Release to drop the widget in its new position</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">5.</span>
                    <span>Observe the animation and toast notification</span>
                  </li>
                </ul>
              </div>

              {/* Mobile Testing */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Mobile Testing
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">1.</span>
                    <span>Open this page on a mobile device or tablet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">2.</span>
                    <span>Long-press (tap and hold) the drag handle in the top-right corner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">3.</span>
                    <span>Drag your finger up or down to reorder</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">4.</span>
                    <span>Lift your finger to drop in the new position</span>
                  </li>
                </ul>
              </div>

              {/* Visual Feedback */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Visual Feedback
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex-shrink-0">1</span>
                    <span><strong>Dragging:</strong> Widget becomes semi-transparent (opacity 0.5) and scales up slightly (1.05)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex-shrink-0">2</span>
                    <span><strong>Drop Zone:</strong> The target position has a blue border highlight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex-shrink-0">3</span>
                    <span><strong>Drag Handle:</strong> Hover to see background change and icon becomes highlighted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex-shrink-0">4</span>
                    <span><strong>Toast Notification:</strong> Success message appears when order is updated</span>
                  </li>
                </ul>
              </div>

              {/* Persistence */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Persistence
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span>Reorder widgets in any way you like</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span>Close the browser tab or navigate away</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span>Return to the customize page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span>Your widget order should be preserved!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
            Features Implemented
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-900 dark:text-blue-100 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>dnd-kit integration (Pointer, Touch, Keyboard sensors)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>SortableContext with vertical list strategy</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Visual feedback (opacity, scale, border highlight)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Smooth 200ms ease-in-out animations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Touch support for mobile devices</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Keyboard navigation (arrow keys)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Automatic localStorage persistence via Zustand</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Toast notifications on reorder</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Dark mode support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>React 19 useTransition for smooth updates</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
