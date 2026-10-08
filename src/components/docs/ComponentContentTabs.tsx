import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import { cn } from '../../lib/utils';

export type ComponentContentTab = 'preview' | 'usage' | 'code';
const tabs = [
  { id: 'preview', label: 'Preview' },
  { id: 'usage', label: 'Usage' },
  { id: 'code', label: 'Code' },
] as const;

export function ComponentContentTabs({ activeTab, onChange }: {
  activeTab: ComponentContentTab;
  onChange: (tab: ComponentContentTab) => void;
}) {
  const indicatorId = useId();
  const reducedMotion = useReducedMotion();
  return (
    <div role="tablist" aria-label="Component documentation" className="flex items-center gap-1 self-start select-none p-1 rounded-full bg-surface-raised backdrop-blur-xl border border-border dark:bg-[#0E0E0E] dark:border-[#1F1F1F] w-fit">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`component-tab-${tab.id}`}
          aria-controls={`component-panel-${tab.id}`}
          aria-selected={activeTab === tab.id}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={event => {
            let next: number;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else return;
            event.preventDefault();
            onChange(tabs[next].id);
            event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
          }}
          className={cn('relative text-xs sm:text-sm font-medium transition-colors focus-ring select-none cursor-pointer px-4 py-1.5 rounded-full', activeTab === tab.id ? 'text-text-primary dark:text-[#FAFAFA]' : 'text-text-muted hover:text-text-secondary dark:text-[#6B6B6B] dark:hover:text-[#A1A1A1]')}
        >
          {activeTab === tab.id && <motion.span layoutId={indicatorId} aria-hidden="true" className="absolute inset-0 shadow-xs rounded-full bg-surface border border-border-hover dark:bg-[#141414] dark:border-[#1F1F1F]" transition={{ duration: reducedMotion ? 0 : 0.16 }} />}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
