import type { SVGProps } from "react";
/** Original Kittu Ant: three pebble forms, six legs, and curious antennae. */
export function KittuAnt({
  size = 36,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      className="kittu-ui-ant-mark"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M42 44 25 33 14 38M42 51 21 51 10 60M44 58 29 72 17 72M54 44 71 33 82 38M54 51 75 51 86 60M52 58 67 72 79 72M42 24 32 12 24 14M54 24 64 12 72 14" />
      </g>
      <ellipse cx="48" cy="72" rx="15" ry="17" fill="currentColor" />
      <ellipse cx="48" cy="49" rx="10" ry="12" fill="currentColor" />
      <rect x="31" y="19" width="34" height="27" rx="13" fill="currentColor" />
      <g fill="var(--bg, #fff)">
        <circle cx="41" cy="31" r="3" />
        <circle cx="55" cy="31" r="3" />
      </g>
    </svg>
  );
}
export default KittuAnt;
