/** Closient mark: a pixel "C" that closes around a single square. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="10" height="10" />
      <rect x="10" y="0" width="10" height="10" opacity="0.55" />
      <rect x="20" y="0" width="10" height="10" />
      <rect x="0" y="10" width="10" height="10" opacity="0.55" />
      <rect x="20" y="10" width="10" height="10" />
      <rect x="0" y="20" width="10" height="10" />
      <rect x="20" y="20" width="10" height="10" opacity="0.55" />
    </svg>
  );
}
