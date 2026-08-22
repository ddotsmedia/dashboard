'use client';

/**
 * Chart Skeleton Loader
 * Displays a skeleton animation while chart data is loading
 */
export const ChartSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4">
      {/* Chart line 1 */}
      <div className="h-2 bg-gray-200 rounded dark:bg-gray-700 animate-pulse w-3/4"></div>

      {/* Chart line 2 */}
      <div className="h-2 bg-gray-200 rounded dark:bg-gray-700 animate-pulse w-2/3"></div>

      {/* Chart line 3 */}
      <div className="h-2 bg-gray-200 rounded dark:bg-gray-700 animate-pulse w-4/5"></div>

      {/* Main chart area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="space-y-4 w-full">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 h-32 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend skeleton */}
      <div className="flex gap-4 justify-center pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-3 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
            <div className="h-2 w-16 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

ChartSkeleton.displayName = 'ChartSkeleton';
