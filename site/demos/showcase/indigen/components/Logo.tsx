/** Three stacked bars forming a stylised "I" with an offset foot. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect x="4" y="1" width="20" height="7" rx="3.5" fill="currentColor" />
      <rect x="1" y="10.5" width="20" height="7" rx="3.5" fill="currentColor" />
      <rect x="4" y="20" width="10" height="7" rx="3.5" fill="currentColor" />
    </svg>
  );
}
