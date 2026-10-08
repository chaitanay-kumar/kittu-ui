import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Activity, RefreshCw } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';
import { motionTransitions } from '../../../lib/motion-tokens';

export interface DocMotionSystemProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocMotionSystem: React.FC<DocMotionSystemProps> = ({ onNavigateSection }) => {
  const [activeCurve, setActiveCurve] = useState<keyof typeof motionTransitions>('springSnappy');
  const [testTrigger, setTestTrigger] = useState(0);

  const tokenDetails: Record<keyof typeof motionTransitions, { desc: string; values: string }> = {
    springSnappy: { desc: 'Tactile clicks, button active states, micro-toggles', values: 'stiffness: 380, damping: 30, mass: 0.5' },
    springResponsive: { desc: 'Magnetic return pull, notification toasts stack', values: 'stiffness: 320, damping: 24, mass: 0.7' },
    springMorph: { desc: 'Morphing dialogs, layoutId expanding backgrounds', values: 'stiffness: 220, damping: 32, mass: 1.0' },
    springSmooth: { desc: 'Spatial 3D layer perspective, search expanding pill, floating dock', values: 'stiffness: 200, damping: 28, mass: 0.85' },
    springGentle: { desc: 'Fluid tab switching, accordion unfolding, card bounds', values: 'stiffness: 170, damping: 26, mass: 0.9' },
    springSoft: { desc: 'Default smoothing for pointer-follow motion values', values: 'stiffness: 150, damping: 22, mass: 0.9' },
    easeSoft: { desc: 'Subtle backdrop blurs, opacity fades, color shifts', values: 'duration: 0.32s, ease: [0.22, 1, 0.36, 1]' },
    easeFast: { desc: 'Instant icon switch, quick tooltip reveal', values: 'duration: 0.20s, ease: [0.2, 0, 0, 1]' },
  };

  return (
    <article className="space-y-14 animate-fade-in text-text-secondary">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-10">
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
          Getting Started · 03
        </span>
        <h1 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.02em] text-text-primary leading-[1.1]">
          Motion Tokens &amp; Physics Curves
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
          Kittu UI standardizes animation through calibrated spring physics curves and bezier easing tokens. Consistent physical stiffness, damping, and mass ensure every interaction feels organic and responsive.
        </p>
      </header>

      {/* Interactive Physics Sandbox */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Interactive Physics Sandbox
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Select a token curve and click the cube below to trigger the physical spring response:
        </p>

        <div className="p-5 rounded-lg border border-border bg-surface space-y-5">
          {/* Curve Selector Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-surface-raised rounded-md border border-border">
            {(Object.keys(motionTransitions) as (keyof typeof motionTransitions)[]).map((curveKey) => (
              <button
                key={curveKey}
                onClick={() => {
                  setActiveCurve(curveKey);
                  setTestTrigger((t) => t + 1);
                }}
                className={`px-3 py-1.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                  activeCurve === curveKey
                    ? 'bg-accent text-background font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                {curveKey}
              </button>
            ))}
          </div>

          {/* Interactive Playground Box */}
          <div className="h-48 rounded-lg border border-border bg-surface-raised flex flex-col items-center justify-center relative overflow-hidden bg-dot-subtle select-none">
            <motion.div
              key={`${activeCurve}-${testTrigger}`}
              initial={{ scale: 0.75, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={motionTransitions[activeCurve]}
              onClick={() => setTestTrigger((t) => t + 1)}
              className="w-24 h-24 rounded-xl bg-accent text-background flex flex-col items-center justify-center font-mono text-xs font-bold cursor-pointer"
            >
              <span>Click Me</span>
              <span className="text-[10px] font-normal opacity-70 mt-0.5">{activeCurve}</span>
            </motion.div>

            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-text-secondary">
              Values: <span className="text-text-primary font-medium">{tokenDetails[activeCurve].values}</span>
            </div>

            <div className="absolute bottom-3 right-4 text-[11px] font-mono text-text-muted flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3" />
              <span>Click to trigger</span>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Tokens Reference Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">Token Reference</h2>
        </div>

        <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <table className="w-full text-left text-[12px] font-mono">
            <thead className="bg-surface-raised text-text-muted border-b border-border">
              <tr>
                <th className="p-3.5 font-medium text-text-primary">Token</th>
                <th className="p-3.5 font-medium text-text-secondary">Parameters</th>
                <th className="p-3.5 font-medium hidden sm:table-cell text-text-secondary">Recommended Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-text-secondary">
              {(Object.keys(motionTransitions) as (keyof typeof motionTransitions)[]).map((curveKey) => (
                <tr key={curveKey} className="hover:bg-surface-raised transition-colors">
                  <td className="p-3.5 text-text-primary font-medium">{curveKey}</td>
                  <td className="p-3.5 text-text-secondary">{tokenDetails[curveKey].values}</td>
                  <td className="p-3.5 text-text-muted hidden sm:table-cell">{tokenDetails[curveKey].desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Usage Example */}
      <section className="space-y-4">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
          Using Motion Tokens in Custom Components
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Import{' '}
          <code className="text-text-primary font-mono bg-surface-raised border border-border px-1.5 py-0.5 rounded text-[12px]">
            motionTransitions
          </code>{' '}
          from your shared tokens helper:
        </p>

        <DocCodeBlock
          code={`import { motion } from 'framer-motion';
import { motionTransitions } from '@/lib/motion-tokens';

export function InteractiveCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={motionTransitions.springSnappy}
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800"
    >
      <h3 className="text-white font-semibold">Organic Spring Motion</h3>
    </motion.div>
  );
}`}
          language="tsx"
          title="src/components/InteractiveCard.tsx"
        />
      </section>

      {/* Accessibility Callout */}
      <section className="p-4 rounded-lg border border-border bg-surface space-y-1.5">
        <h3 className="text-[13px] font-semibold text-text-primary">Reduced Motion Support</h3>
        <p className="text-[13px] text-text-secondary leading-relaxed">
          Kittu UI components automatically detect and respect{' '}
          <code className="text-text-primary font-mono bg-surface-raised border border-border px-1 rounded text-[12px]">
            prefers-reduced-motion: reduce
          </code>
          , disabling heavy translations while preserving smooth instantaneous updates.
        </p>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="motion" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
