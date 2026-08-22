/**
 * Card Component
 * Base card wrapper with consistent styling and responsive design
 * - Responsive padding: 16px (mobile), 20px (tablet), 24px (desktop)
 * - Responsive shadow: subtle on mobile, more prominent on desktop
 * - Consistent border-radius: 12px
 * - Touch-friendly minimum sizes
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

export function Card({ children, className, onClick, ...props }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        // Base styles
        'bg-white dark:bg-slate-800 rounded-[12px]',
        // Responsive shadow: subtle on mobile, more prominent on desktop
        'shadow-sm md:shadow-md',
        // Hover effects only on devices with hover capability
        'hover:shadow-md md:hover:shadow-lg transition-shadow duration-200',
        // Interactive states
        onClick && 'cursor-pointer min-h-[44px]',
        // Responsive padding: 16px mobile (p-4), 20px tablet (sm:p-5), 24px desktop (md:p-6)
        'p-4 sm:p-5 md:p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
