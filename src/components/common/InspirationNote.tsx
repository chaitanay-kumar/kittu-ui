import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GITHUB_URL } from '../../lib/constants';

export const InspirationNote: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Minimal Pure-Text Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="text-xs text-text-muted hover:text-text-primary transition-colors duration-200 underline-offset-4 hover:underline py-1.5 px-2 rounded focus-ring cursor-pointer"
      >
        A note on inspiration
      </button>

      {/* Apple-Style Smooth Dialog Popover (Opens Downward, Mobile Safe) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
              mass: 0.6,
            }}
            role="dialog"
            aria-label="A note on inspiration"
            className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 w-[90vw] sm:w-[440px] max-w-lg origin-top-left sm:origin-top-right"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised/95 backdrop-blur-2xl p-5 shadow-elevated text-text-secondary space-y-3">
              {/* Subtle glass reflection highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-text-subtle to-transparent pointer-events-none" />

              {/* Dialog Header - Pure text, no icons */}
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                  A note on inspiration
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-text-subtle hover:text-text-primary rounded-md transition-colors focus-ring cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Full Inspiration & Attribution Note */}
              <p className="text-xs leading-relaxed text-text-secondary">
                The components on Kit UI are built from scratch and are inspired by designs, interactions, and ideas found across the internet. They are created for learning, experimentation, and the UI community, and are not intended to intentionally copy or claim ownership of anyone else’s work.
              </p>

              <p className="text-xs leading-relaxed text-text-secondary">
                If you believe a component, image, design, or other material on Kit UI belongs to you and has been used without proper credit, please reach out to us. We’re happy to review the concern and, where appropriate, provide proper attribution or remove the material.
              </p>

              {/* Minimal inline write us redirection */}
              <p className="text-xs leading-relaxed text-text-secondary">
                For credit or removal requests,{' '}
                <a
                  href={`${GITHUB_URL}/issues`}
                  className="text-text-primary hover:text-accent underline underline-offset-4 decoration-text-muted hover:decoration-text-primary font-medium transition-colors cursor-pointer"
                >
                  write us
                </a>
                .
              </p>

              {/* Respect Footer Note */}
              <p className="text-[11px] leading-relaxed text-text-muted pt-0.5">
                We respect the work of designers and developers and want Kit UI to be a place for sharing and building, not taking credit for someone else’s work.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
