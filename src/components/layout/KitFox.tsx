import type { SVGProps } from 'react';

/** Original Kit Fox: polygon ears, precise facets, and a negative-space muzzle. */
export function KitFox({ size = 36, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true" className="kit-ui-fox-mark" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M12 8 40 26 48 23 56 26 84 8 78 57 48 87 18 57Z M21 25 35 34 23 43Z M75 25 61 34 73 43Z M27 47 41 51 34 56Z M69 47 55 51 62 56Z M25 61 42 61 48 68 54 61 71 61 48 80Z" />
    </svg>
  );
}
