import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ComponentPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const ComponentPagination: React.FC<ComponentPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  // Sliding 2-page numbers window (e.g. [1, 2] -> [2, 3] -> [3, 4] ...)
  const pages = React.useMemo(() => {
    if (totalPages <= 1) return [1];
    if (totalPages === 2) return [1, 2];

    const start = Math.max(1, Math.min(currentPage, totalPages - 1));
    return [start, start + 1];
  }, [currentPage, totalPages]);

  // If there's only 1 page (or none), do not render pagination controls
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Component pagination"
      className={cn('flex items-center justify-center gap-3 sm:gap-4 py-4 select-none', className)}
    >
      {/* Previous Page Link */}
      <button
        type="button"
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className={cn(
          'w-7 h-7 flex items-center justify-center rounded-lg transition-colors focus-ring',
          isFirstPage
            ? 'opacity-20 cursor-not-allowed text-text-subtle'
            : 'text-text-muted hover:text-text-primary hover:bg-surface-hover cursor-pointer'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Sliding 2-Page Numbers Window */}
      <div className="flex items-center gap-1.5">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'w-7 h-7 flex items-center justify-center text-xs font-sans transition-colors focus-ring rounded',
                isActive
                  ? 'text-text-primary font-semibold'
                  : 'text-text-muted hover:text-text-primary cursor-pointer'
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page Link */}
      <button
        type="button"
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className={cn(
          'w-7 h-7 flex items-center justify-center rounded-lg transition-colors focus-ring',
          isLastPage
            ? 'opacity-20 cursor-not-allowed text-text-subtle'
            : 'text-text-muted hover:text-text-primary hover:bg-surface-hover cursor-pointer'
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
