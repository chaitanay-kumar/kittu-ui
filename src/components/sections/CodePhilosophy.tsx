import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { MagneticButton } from '../ui/MagneticButton';
import { Sparkles, Terminal, Copy, Check, Sliders } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export const CodePhilosophy: React.FC = () => {
  // Live interactive playground states
  const [strength, setStrength] = useState(0.45);
  const [label, setLabel] = useState('Deploy to Edge');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'outline'>('primary');
  const [copied, setCopied] = useState(false);

  const generatedCode = `// 1. Copy into your project (components/ui/magnetic-button.tsx)
<MagneticButton
  strength={${strength}}
  variant="${variant}"
  glow={true}
>
  <span>${label}</span>
  <ArrowUpRight className="w-4 h-4" />
</MagneticButton>`;

  const handleCopy = () => {
    copyToClipboard(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-background border-t border-border">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Narrative Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest">
                Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight leading-tight mt-1">
                Your code.
                <span className="block text-text-secondary font-normal">
                  Your components.
                </span>
              </h2>
            </div>

            <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <p>
                Kittu UI gives you the source. No locked packages, runtime bloat, or brittle wrappers.
              </p>
              <p>
                Copy the component directly into your repository. Modify the spring stiffness, adjust the surface alphas, and tailor every interaction to match your product's voice.
              </p>
            </div>

            {/* Quick interactive controls panel */}
            <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-text-primary">
                <Sliders className="w-3.5 h-3.5 text-text-subtle" />
                <span>Adjust Parameters</span>
              </div>

              {/* Strength Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>Magnetic Strength</span>
                  <span className="font-mono text-text-primary">{strength}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={strength}
                  onChange={(e) => setStrength(parseFloat(e.target.value))}
                  className="w-full accent-current bg-surface-hover h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Label Text Input */}
              <div className="space-y-1">
                <span className="text-xs text-text-secondary">Button Text</span>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-surface-raised border border-border text-text-primary focus-ring"
                />
              </div>

              {/* Variant Selector */}
              <div className="flex items-center gap-2 pt-1">
                {(['primary', 'secondary', 'outline'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-2.5 py-1 text-xs rounded-md capitalize transition-colors ${
                      variant === v
                        ? 'bg-surface-hover text-text-primary border border-border'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Code Editor & Live Preview Pair — both panels follow the
              page theme; the live preview and code block read as the product. */}
          <div className="lg:col-span-7 space-y-4">
            {/* Live Rendered Target */}
            <div className="rounded-xl border border-border bg-surface-raised text-text-primary p-8 flex flex-col items-center justify-center min-h-[200px] relative bg-dot-subtle">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-text-muted">
                PREVIEW
              </div>
              <MagneticButton
                strength={strength}
                variant={variant}
                glow={true}
                size="lg"
              >
                <span>{label || 'Interactive Button'}</span>
                <Sparkles className="w-4 h-4 text-text-subtle" />
              </MagneticButton>
              <div className="absolute bottom-3 text-[11px] text-text-muted">
                {strength}x spring dynamics
              </div>
            </div>

            {/* Restrained Code Block */}
            <div className="rounded-xl border border-border bg-surface-raised text-text-primary overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-surface-raised border-b border-border text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-text-subtle" />
                  <span className="font-mono text-[11px] text-text-secondary">App.tsx</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-primary transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-text-primary" />
                      <span className="text-text-primary">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy JSX</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-text-secondary overflow-x-auto leading-relaxed">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
