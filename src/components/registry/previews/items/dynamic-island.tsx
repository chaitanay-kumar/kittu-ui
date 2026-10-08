import { DynamicIsland } from '../../../ui/DynamicIsland';
import type { ComponentPreviewProps } from '../types';

export default function DynamicIslandPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="h-56 flex flex-col items-center justify-center p-4">
      <DynamicIsland
        state={isHovered ? 'expanded' : 'collapsed'}
        name="Kit UI contributors"
        role="Frontend Developer"
        statusText="Online"
        description="Building thoughtful interfaces with React and Next.js."
        socials={{
          github: 'https://github.com/chaitanay-kumar',
          x: 'https://x.com',
          linkedin: 'https://linkedin.com',
          email: 'mailto:hello@example.com',
        }}
      />
      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-4 select-none">
        Hover to expand • Click to interact
      </span>
    </div>
  );
}
