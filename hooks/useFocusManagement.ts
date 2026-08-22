'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for managing focus within a modal/drawer
 * - Traps focus inside the element when active
 * - Restores focus to trigger element on close
 * - Handles Escape key to close
 */
export function useFocusManagement(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus before modal opened
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      triggerRef.current = document.activeElement as HTMLElement;

      // Move focus to the modal/drawer
      if (containerRef.current) {
        // Find the first focusable element
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      // Restore focus to trigger element when modal closes
      if (triggerRef.current && triggerRef.current.focus) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen, onClose]);

  // Focus trap: keep Tab within modal when open
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab') return;

      const container = containerRef.current;
      if (!container) return;

      const focusableElements = Array.from(
        container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        // Shift+Tab
        if (activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isOpen]
  );

  return {
    containerRef,
    handleKeyDown,
  };
}

/**
 * Hook for managing sidebar focus (on desktop and mobile)
 * - Traps focus in sidebar when open on mobile
 * - Allows normal Tab behavior on desktop
 */
export function useSidebarFocusManagement(isOpen: boolean, isMobile: boolean) {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isMobile && isOpen && sidebarRef.current) {
      // Find first focusable element in sidebar
      const focusableElements = sidebarRef.current.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen, isMobile]);

  return { sidebarRef };
}
