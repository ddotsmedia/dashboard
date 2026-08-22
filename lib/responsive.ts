'use client';

import { useEffect, useState } from 'react';

// Tailwind breakpoints for responsive design
// Mobile: < 768px
// Tablet: 768px - 1023px
// Desktop: >= 1024px
// Desktop Large: >= 1920px
export const BREAKPOINTS = {
  mobile: 320,
  sm: 640,
  md: 768, // Tablet starts here
  lg: 1024, // Desktop starts here
  xl: 1280,
  '2xl': 1536,
  desktopLarge: 1920,
} as const;

/**
 * Hook to detect mobile screen (< 768px)
 * Used for drawer overlays, stacked layouts, simplified UIs
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

/**
 * Hook to detect tablet screen (768px - 1023px)
 * Used for collapsible sidebars, wrapped filters
 */
export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= BREAKPOINTS.md && width < BREAKPOINTS.lg);
    };

    checkIsTablet();
    window.addEventListener('resize', checkIsTablet);
    return () => window.removeEventListener('resize', checkIsTablet);
  }, []);

  return isTablet;
}

/**
 * Hook to detect desktop screen (>= 1024px)
 * Used for side-by-side layouts, horizontal scrolling content
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= BREAKPOINTS.lg);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return isDesktop;
}

/**
 * Hook to detect large desktop screen (>= 1920px)
 * Used for full-width single-row layouts
 */
export function useIsDesktopLarge(): boolean {
  const [isDesktopLarge, setIsDesktopLarge] = useState(false);

  useEffect(() => {
    const checkIsDesktopLarge = () => {
      setIsDesktopLarge(window.innerWidth >= BREAKPOINTS.desktopLarge);
    };

    checkIsDesktopLarge();
    window.addEventListener('resize', checkIsDesktopLarge);
    return () => window.removeEventListener('resize', checkIsDesktopLarge);
  }, []);

  return isDesktopLarge;
}

/**
 * Hook to get current window width
 * Useful for custom breakpoint logic
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Initial setup
    handleResize();

    // Use passive listener for better scroll performance
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

/**
 * Hook to get responsive breakpoint name
 * Returns: 'mobile' | 'tablet' | 'desktop' | 'desktop-large'
 */
export function useResponsiveBreakpoint(): 'mobile' | 'tablet' | 'desktop' | 'desktop-large' {
  const width = useWindowWidth();

  if (width < BREAKPOINTS.md) return 'mobile';
  if (width < BREAKPOINTS.lg) return 'tablet';
  if (width >= BREAKPOINTS.desktopLarge) return 'desktop-large';
  return 'desktop';
}
