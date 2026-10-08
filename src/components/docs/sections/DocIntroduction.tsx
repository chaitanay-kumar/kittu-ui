import React from 'react';
import { Sparkles, Code2, ShieldCheck, Zap, Layers, Terminal } from 'lucide-react';
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
          Kittu UI is an open-source library of micro-animated React components distributed via the official{' '}
          <strong className="text-text-primary font-medium">shadcn GitHub Registry</strong>. It combines realistic spring physics, dark-mode aesthetics, and full source code ownership.
        </p>
      </header>

      <p className="text-sm text-text-secondary">
        Kittu UI is independently maintained. Read the{' '}
        <a className="underline focus-ring" href="https://github.com/chaitanay-kumar/kittu-ui/blob/feat/kittu-ui-library/ATTRIBUTION.md">origin and license attribution</a>.
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
          code="npx shadcn@latest add chaitanay-kumar/kittu-ui/magnetic-button"
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
            Built for developers who care about refined tactile details and clean, maintainable architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg border border-border bg-surface">
            <div className="w-8 h-8 rounded-md bg-surface-raised border border-border flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4 text-text-primary" />
            </div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Source Ownership</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              No black-box npm dependencies. You get the raw TSX component code to customize styles, animation parameters, and markup freely.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-surface">
            <div className="w-8 h-8 rounded-md bg-surface-raised border border-border flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-text-primary" />
            </div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Spring Physics</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Every element feels responsive and tactile, driven by calibrated spring physics curves in Framer Motion instead of rigid linear transitions.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-surface">
            <div className="w-8 h-8 rounded-md bg-surface-raised border border-border flex items-center justify-center mb-3">
              <Layers className="w-4 h-4 text-text-primary" />
            </div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Auto-Synced Registry</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Components, dependencies, and metadata are automatically extracted from source files through AST analysis for reliable CLI distribution.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-surface">
            <div className="w-8 h-8 rounded-md bg-surface-raised border border-border flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-text-primary" />
            </div>
            <h3 className="text-[14px] font-semibold text-text-primary mb-1.5">Accessible & Type-Safe</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Full TypeScript prop types, keyboard accessibility, ARIA standards, and automatic{' '}
              <code className="text-text-primary font-mono bg-surface-raised border border-border px-1 rounded text-[12px]">
                prefers-reduced-motion
              </code>{' '}
              support.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Callout */}
      <section className="p-4 rounded-lg border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-text-primary shrink-0" />
          <div className="text-[13px]">
            <span className="font-semibold text-text-primary">Built for modern React stacks</span>
            <p className="text-text-muted mt-0.5 text-[12px]">
              Compatible with Next.js (App Router / Pages), Vite, Remix, and Astro.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="introduction" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
