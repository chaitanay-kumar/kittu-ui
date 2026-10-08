import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export interface DocCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  isTerminal?: boolean;
  className?: string;
}

export const DocCodeBlock: React.FC<DocCodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  isTerminal = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // For non-terminal blocks, use the title; otherwise fall back to the language label.
  const label = title ?? (isTerminal ? 'Terminal' : language);

  return (
    <div
      className={`rounded-lg border border-[#1F1F1F] bg-[#0B0B0B] dark text-text-primary overflow-hidden my-4 transition-colors ${className}`}
    >
      {/* Header bar — quiet, matches DevExperience card style */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1F1F1F]">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
          {label}
        </span>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          className="p-1 rounded text-[#6B6B6B] hover:text-[#FAFAFA] transition-colors focus-ring cursor-pointer"
          title="Copy"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Code area */}
      <pre className="px-4 py-3.5 text-[12.5px] font-mono text-[#A1A1A1] leading-relaxed overflow-x-auto scrollbar-none whitespace-pre">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};
