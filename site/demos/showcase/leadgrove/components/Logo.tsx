/** Leadgrove mark: three rising stems, a small grove that also reads as a bar chart. */
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="13" fill="var(--lg-orange)" />
      <path d="M8 19v-6a3 3 0 0 0-3-3M13 19V7M18 19v-5a3 3 0 0 1 3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
