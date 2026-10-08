import React from 'react';
import { Container } from '../layout/Container';
import { Wind, Crosshair, Layers, ScanEye } from 'lucide-react';
import { KIT_PRINCIPLES } from '../../lib/brand-philosophy';

const icons = [Wind, Crosshair, Layers, ScanEye];

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 border-t border-b border-border bg-background">
      <Container size="xl">
        {/* Main Philosophy Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
            The Kit Fox philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mt-2">
            Nimble by nature. Precise by design.
          </h2>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            Inspired by the kit fox, we build interfaces that move with purpose,
            communicate clearly, and adapt to the people using them.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KIT_PRINCIPLES.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-border bg-surface hover:border-text-subtle transition-colors group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border flex items-center justify-center mb-4 group-hover:border-text-subtle transition-colors">
                  <Icon className="w-4 h-4 text-text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary tracking-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
