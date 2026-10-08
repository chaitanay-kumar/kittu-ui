import React from 'react';
import { Container } from '../layout/Container';
import { Code, Wind, ShieldCheck, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const principles = [
    {
      icon: <Code className="w-4 h-4 text-[#D4D4D4]" />,
      title: 'Source you own',
      description: 'Zero npm black boxes. Copy components into your project, inspect, customize, and extend freely.',
    },
    {
      icon: <Wind className="w-4 h-4 text-[#D4D4D4]" />,
      title: 'Motion with purpose',
      description: 'Physical spring dynamics that convey continuity and weight rather than distracting showmanship.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#D4D4D4]" />,
      title: 'Accessible by default',
      description: 'WAI-ARIA compliant, full keyboard control, visible focus states, and reduced motion awareness.',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#D4D4D4]" />,
      title: 'Built for React',
      description: 'Optimized for React 18+, Next.js App Router, Tailwind CSS, TypeScript, and Framer Motion.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 border-t border-b border-border bg-background">
      <Container size="xl">
        {/* Main Philosophy Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
            The Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mt-2">
            Built for developers who care about the details.
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-border bg-surface hover:border-text-subtle transition-colors group shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border flex items-center justify-center mb-4 group-hover:border-text-subtle transition-colors">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-text-primary tracking-tight mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
