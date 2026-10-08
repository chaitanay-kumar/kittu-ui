import React from 'react';
import { Globe, FileCode, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocSEOProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocSEO: React.FC<DocSEOProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-14 animate-fade-in text-text-secondary">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-10">
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
          Architecture &amp; Engine · 02
        </span>
        <h1 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.02em] text-text-primary leading-[1.1]">
          Automated SEO System
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
          Every component in Kit UI inherits search engine optimization automatically—including dynamic document titles, canonical URLs, XML sitemaps, Open Graph preview cards, and schema.org JSON-LD structured data.
        </p>
      </header>

      {/* Feature 1: Dynamic SEO Hook */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Dynamic Head &amp; Canonical Resolution
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          The{' '}
          <code className="text-text-primary font-mono bg-surface-raised border border-border px-1.5 py-0.5 rounded text-[12px]">
            useSEO()
          </code>{' '}
          hook synchronizes page titles, meta descriptions, canonical URLs, and social tags as users navigate routes, pagination pages, or modal deep links:
        </p>

        <DocCodeBlock
          title="src/lib/seo/useSEO.ts"
          language="typescript"
          code={`useSEO({
  activeView,             // 'showcase' | 'components' | 'docs'
  componentPage,          // Page number (1, 2, ...)
  activeDocTopic,         // 'introduction' | 'quick-start' | ...
  selectedModalComponent, // KittuComponentMeta | null
});`}
        />
      </section>

      {/* Feature 2: Structured Data */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Schema.org JSON-LD Structured Data
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Search engines receive rich structured metadata for each component:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          <div className="p-4 rounded-lg border border-border bg-surface space-y-1.5">
            <h3 className="text-[14px] text-text-primary font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              SoftwareApplication Schema
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Declares application category, open-source MIT license, zero cost ($0.00), and framework dependencies (React, Tailwind, Framer Motion).
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-surface space-y-1.5">
            <h3 className="text-[14px] text-text-primary font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              BreadcrumbList &amp; TechArticle
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Generates accurate navigation trails (
              <code className="text-text-primary font-mono text-[12px]">
                Kit UI → Components → Magnetic Button
              </code>
              ) and technical documentation timestamps.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3: Dynamic Sitemap */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Automated Sitemap Generation
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          On every build or component sync,{' '}
          <code className="text-text-primary font-mono bg-surface-raised border border-border px-1.5 py-0.5 rounded text-[12px]">
            public/sitemap.xml
          </code>{' '}
          is automatically updated with:
        </p>

        <ul className="text-[13px] text-text-secondary space-y-1.5 pl-5 list-disc marker:text-text-subtle">
          <li>
            All component showcase pages and deep links (
            <code className="text-text-primary font-mono text-[12px]">/components/magnetic-button</code>)
          </li>
          <li>
            All documentation topics (
            <code className="text-text-primary font-mono text-[12px]">/docs/introduction</code>,{' '}
            <code className="text-text-primary font-mono text-[12px]">/docs/quick-start</code>)
          </li>
          <li>Canonical home and directory pagination pages</li>
        </ul>
      </section>

      {/* Feature 4: Automated CLI SEO Audit */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            44-Point Automated SEO Health Audit
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Run the audit tool in CI or locally to verify tag compliance, structured data validity, and sitemap parity:
        </p>

        <DocCodeBlock
          title="Terminal"
          isTerminal={true}
          language="bash"
          code="npm run seo:audit"
        />

        <div className="p-4 rounded-lg border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              100
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-text-primary">
                Technical SEO Score: 100/100
              </h3>
              <p className="text-[11px] text-text-muted">
                44 automated health checks passing with 0 errors or warnings.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
            Audit Passing
          </span>
        </div>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="seo" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
