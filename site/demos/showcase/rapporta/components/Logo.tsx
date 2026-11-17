export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <rect x="1.5" y="9" width="3" height="7" rx="1.5" />
        <rect x="6" y="5.5" width="3" height="13.5" rx="1.5" />
        <rect x="10.5" y="2" width="3" height="20" rx="1.5" />
        <rect x="15" y="5.5" width="3" height="13.5" rx="1.5" />
        <rect x="19.5" y="9" width="3" height="6" rx="1.5" />
      </g>
    </svg>
  );
}
