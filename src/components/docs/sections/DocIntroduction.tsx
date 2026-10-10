import { KIT_PRINCIPLES } from '../../../lib/brand-philosophy';
import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocIntroductionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocIntroduction: React.FC<DocIntroductionProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-14 animate-fade-in text-text-secondary">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-10">
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
          Getting Started · 01
        </span>
        <h1 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.02em] text-text-primary leading-[1.1]">
          Introduction
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
          Kit UI brings precise, adaptable interactions to React and native Angular applications.
          Inspired by the kit fox, it favors clear feedback, purposeful motion, and full source ownership.
        </p>
      </header>

      <p className="text-sm text-text-secondary">
        Kit UI is independently maintained. Read the{' '}
        <a className="underline focus-ring" href="https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/ATTRIBUTION.md">origin and license attribution</a>.
      </p>

      {/* Quick Copy Installation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Quick Installation
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Add any component directly to your project using the shadcn CLI. The code is placed straight into your{' '}
          <code className="text-text-primary font-mono bg-surface-raised border border-border px-1.5 py-0.5 rounded text-[12px]">
            components/ui/
          </code>{' '}
          folder.
        </p>
        <DocCodeBlock
          code="npx shadcn@latest add chaitanay-kumar/kit-ui/magnetic-button"
          language="bash"
          isTerminal={true}
        />
      </section>

      {/* Core Principles (4 clean cards) */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
            Principles
          </span>
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Design Philosophy
          </h2>
          <p className="text-[14px] text-text-secondary leading-relaxed max-w-2xl">
            Inspired by the kit fox: nimble in action, precise in feedback, adaptable to the environment, and alert to intent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {KIT_PRINCIPLES.map(principle => (
            <div key={principle.title} className="p-5 rounded-lg border border-border bg-surface">
              <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">{principle.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Callout */}
      <section className="p-4 rounded-lg border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-text-primary shrink-0" />
          <div className="text-[13px]">
            <span className="font-semibold text-text-primary">Built for React and native Angular</span>
            <p className="text-text-muted mt-0.5 text-[12px]">
              Explore React source or native Angular standalone components through the framework switch.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="introduction" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
