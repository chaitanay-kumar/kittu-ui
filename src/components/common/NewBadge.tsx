import React from 'react';
import { cn } from '../../lib/utils';

export interface NewBadgeProps {
  className?: string;
  size?: 'sm' | 'xs';
}

export const NewBadge: React.FC<NewBadgeProps> = ({ className, size = 'xs' }) => {
  return (
    <span
      role="status"
      aria-label="New component"
      className={cn(
        'inline-flex items-center font-mono font-medium uppercase tracking-wider rounded border select-none transition-colors',
        size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5',
        'bg-text-primary/10 text-text-primary border-text-primary/20 hover:border-text-primary/30',
        className
      )}
    >
      NEW
    </span>
  );
};
