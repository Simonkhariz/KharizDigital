/** Three speed lines meeting a rounded arrowhead: knowledge moving towards a point. */
export function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M2 6h11a6 6 0 0 1 0 12H5M6 12h13M15 8.5L19 12l-4 3.5" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="cm-logo">
      <Mark size={25} />
      Campusmind
    </span>
  );
}
