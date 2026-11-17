/** Four petals around a centre point, read as an arc-welded joint. */
export function Petals({ size = 24, centre = "currentColor" }: { size?: number; centre?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <rect x="8.5" y="2" width="7" height="7" rx="2.6" />
        <rect x="8.5" y="15" width="7" height="7" rx="2.6" />
        <rect x="2" y="8.5" width="7" height="7" rx="2.6" />
        <rect x="15" y="8.5" width="7" height="7" rx="2.6" />
      </g>
      <circle cx="12" cy="12" r="2" fill={centre} />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="aw-logo">
      <span className="aw-logo-mark">
        <Petals size={18} centre="#f04e23" />
      </span>
      Arcwright
    </span>
  );
}
