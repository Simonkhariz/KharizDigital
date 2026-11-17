/** A lime tile with three dots in a "V", used as the app icon. */
export function LogoTile({ size = 30 }: { size?: number }) {
  return (
    <svg className="vd-logo" width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect width="30" height="30" rx="8" fill="#c8e63c" />
      <circle cx="9.5" cy="11" r="2.6" fill="#1f2c10" />
      <circle cx="20.5" cy="11" r="2.6" fill="#1f2c10" />
      <circle cx="15" cy="19.5" r="2.6" fill="#1f2c10" />
    </svg>
  );
}

/** A small glossy ball with a face, set inline in the headline. */
export function Face({ mood }: { mood: "happy" | "worried" }) {
  return (
    <svg className={`vd-face vd-face-${mood}`} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <radialGradient id={`vd-face-${mood}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={mood === "happy" ? "#e4f77a" : "#ffc0b4"} />
          <stop offset="1" stopColor={mood === "happy" ? "#7fb800" : "#e8604f"} />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill={`url(#vd-face-${mood})`} />
      <g fill="none" stroke="#1f2c10" strokeWidth="2.2" strokeLinecap="round">
        <path d="M14 15.5v.1M26 15.5v.1" strokeWidth="3" />
        <path d={mood === "happy" ? "M14.5 21c1.5 3.5 9.5 3.5 11 0" : "M15 24.5c2-2 8-2 10 0"} />
      </g>
    </svg>
  );
}
