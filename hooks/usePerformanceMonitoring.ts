/**
 * Performance Monitoring Hook
 * Tracks component render times and identifies performance bottlenecks
 * Only active in development environment
 */

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  mountTime?: number;
  lastRenderTime: number;
}

const PERFORMANCE_THRESHOLD = 16; // ~60fps = 16ms per frame

/**
 * Hook: useRenderTime
 * Measures component render time
 * Logs warnings if render time exceeds threshold
 */
export function useRenderTime(componentName: string) {
  const renderStartTime = useRef<number>(Date.now());
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const renderEndTime = Date.now();
      const renderTime = renderEndTime - renderStartTime.current;
      renderCountRef.current++;

      if (renderTime > PERFORMANCE_THRESHOLD) {
        console.warn(
          `[Performance] ${componentName} took ${renderTime}ms to render (render #${renderCountRef.current})`
        );
      }

      if (renderCountRef.current % 10 === 0) {
        console.log(
          `[Performance] ${componentName} has rendered ${renderCountRef.current} times`
        );
      }
    }

    renderStartTime.current = Date.now();
  });
}

/**
 * Hook: useComponentLifecycleMetrics
 * Tracks mounting and rendering metrics for a component
 */
export function useComponentLifecycleMetrics(
  componentName: string
): PerformanceMetrics {
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    lastRenderTime: 0,
  });

  const renderStartRef = useRef<number>(Date.now());

  useEffect(() => {
    const renderEndTime = Date.now();
    const renderTime = renderEndTime - renderStartRef.current;

    metricsRef.current.lastRenderTime = renderTime;

    if (metricsRef.current.mountTime === undefined) {
      metricsRef.current.mountTime = renderTime;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Mount] ${componentName} mounted in ${renderTime}ms`);
      }
    }

    renderStartRef.current = Date.now();

    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Unmount] ${componentName} unmounted`);
      }
    };
  }, [componentName]);

  return metricsRef.current;
}

/**
 * Hook: useMemoryLeakDetector
 * Warns about potential memory leaks (event listeners not cleaned up, etc.)
 */
export function useMemoryLeakDetector(componentName: string) {
  const listenerCountRef = useRef<number>(0);

  useEffect(() => {
    const originalAddEventListener = window.addEventListener;
    const originalRemoveEventListener = window.removeEventListener;

    window.addEventListener = function (
      ...args: Parameters<typeof window.addEventListener>
    ) {
      listenerCountRef.current++;
      return originalAddEventListener.apply(window, args);
    };

    window.removeEventListener = function (
      ...args: Parameters<typeof window.removeEventListener>
    ) {
      listenerCountRef.current--;
      return originalRemoveEventListener.apply(window, args);
    };

    return () => {
      window.addEventListener = originalAddEventListener;
      window.removeEventListener = originalRemoveEventListener;

      if (process.env.NODE_ENV === 'development' && listenerCountRef.current > 0) {
        console.warn(
          `[Memory] ${componentName} may have ${listenerCountRef.current} unclean event listeners`
        );
      }
    };
  }, [componentName]);
}

/**
 * Hook: useLayoutEffectMetrics
 * Measures browser paint and layout times
 */
export function useLayoutEffectMetrics(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'performance' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes(componentName)) {
            console.log(
              `[Perf] ${entry.name}: ${entry.duration.toFixed(2)}ms`
            );
          }
        }
      });

      try {
        perfObserver.observe({ entryTypes: ['measure'] });
      } catch (e) {
        // Browser may not support PerformanceObserver
      }

      return () => perfObserver.disconnect();
    }
  }, [componentName]);
}

/**
 * Utility: markPerformance
 * Marks a performance measurement point
 */
export function markPerformance(label: string) {
  if (process.env.NODE_ENV === 'development' && 'performance' in window) {
    window.performance?.mark(label);
  }
}

/**
 * Utility: measurePerformance
 * Measures time between two performance marks
 */
export function measurePerformance(
  label: string,
  startMark: string,
  endMark: string
) {
  if (process.env.NODE_ENV === 'development' && 'performance' in window) {
    try {
      window.performance?.measure(label, startMark, endMark);
      const measure = window.performance?.getEntriesByName(label)[0];
      if (measure) {
        console.log(`[Measure] ${label}: ${(measure as PerformanceMeasure).duration.toFixed(2)}ms`);
      }
    } catch (e) {
      // Marks may not exist
    }
  }
}

/**
 * Hook: useQueryPerformance
 * Monitors TanStack Query performance
 */
export function useQueryPerformance(queryKey: string[]) {
  const queryStartRef = useRef<number>(Date.now());

  useEffect(() => {
    const queryTime = Date.now() - queryStartRef.current;
    const keyString = queryKey.join('/');

    if (queryTime > PERFORMANCE_THRESHOLD) {
      console.warn(
        `[Query] ${keyString} took ${queryTime}ms (over ${PERFORMANCE_THRESHOLD}ms threshold)`
      );
    }
  }, [queryKey]);
}
