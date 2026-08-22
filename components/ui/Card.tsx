/**
 * Card Component
 * Base card wrapper with consistent styling
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
        'bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
