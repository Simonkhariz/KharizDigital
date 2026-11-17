import type { AdTile, ArtPalette } from "../data/studio";

type Tones = { top: string; bottom: string; accent: string; frame: string; lens: string };

const tones: Record<ArtPalette, Tones> = {
  sky: { top: "#3f93cf", bottom: "#d6eaf2", accent: "#f6e7c8", frame: "#1c1612", lens: "#3a2a1c" },
  ember: { top: "#d98a4e", bottom: "#5a2413", accent: "#f3a52e", frame: "#e9c9a0", lens: "#8a3a17" },
  dune: { top: "#efe2cb", bottom: "#c9a57c", accent: "#fff6e3", frame: "#3a2a1c", lens: "#6f4a2a" },
  pool: { top: "#2f8fb5", bottom: "#a9dde3", accent: "#e9fbff", frame: "#10303d", lens: "#1d5a70" },
  olive: { top: "#8b8f55", bottom: "#ddd7ad", accent: "#f4efcf", frame: "#2a2a16", lens: "#4d4f2a" },
  plum: { top: "#5d2a4c", bottom: "#d195a7", accent: "#f6c9a8", frame: "#2a0f20", lens: "#7a3a5f" },
};

function Glasses({ tone, scale = 1 }: { tone: Tones; scale?: number }) {
  return (
    <g transform={`scale(${scale})`}>
      <path d="M-34-3-45-13M34-3 45-13" stroke={tone.frame} strokeWidth="3" strokeLinecap="round" />
      <rect x="-35" y="-11" width="29" height="22" rx="9" fill={tone.lens} stroke={tone.frame} strokeWidth="3" />
      <rect x="6" y="-11" width="29" height="22" rx="9" fill={tone.lens} stroke={tone.frame} strokeWidth="3" />
      <path d="M-6-3Q0-8 6-3" stroke={tone.frame} strokeWidth="3" fill="none" />
      <path d="M-29-5q5-4 11-3M12-5q5-4 11-3" stroke="#fff" strokeOpacity=".35" strokeWidth="1.500" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function AdArt({ tile, idPrefix }: { tile: AdTile; idPrefix: string }) {
  const tone = tones[tile.palette];
  const bg = `${idPrefix}-bg`;
  const glass = `${idPrefix}-glass`;
  return (
    <svg viewBox="0 0 120 164" role="img" aria-label={tile.alt} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0.300" y2="1">
          <stop offset="0" stopColor={tone.top} />
          <stop offset="1" stopColor={tone.bottom} />
        </linearGradient>
        <radialGradient id={glass} cx="0.350" cy="0.300" r="0.900">
          <stop offset="0" stopColor={tone.accent} stopOpacity=".9" />
          <stop offset=".55" stopColor={tone.lens} />
          <stop offset="1" stopColor={tone.frame} />
        </radialGradient>
      </defs>
      <rect width="120" height="164" fill={`url(#${bg})`} />
      {tile.scene === "product" && (
        <>
          <circle cx="92" cy="30" r="26" fill={tone.accent} opacity=".35" />
          <path d="M-6 164 30 96c4-7 14-8 19-2l5 7c3 4 2 9-1 13L22 164Z" fill="#d9a77c" />
          <path d="M34 98c5-6 14-12 22-12 5 0 6 5 2 7l-12 8Z" fill="#cf9a70" />
          <g transform="translate(66 84) rotate(-16)">
            <Glasses tone={tone} scale={1.050} />
          </g>
        </>
      )}
      {tile.scene === "closeup" && (
        <>
          <ellipse cx="20" cy="150" rx="70" ry="40" fill={tone.frame} opacity=".25" />
          <circle cx="74" cy="78" r="44" fill={`url(#${glass})`} stroke={tone.frame} strokeWidth="5" />
          <rect x="66" y="66" width="20" height="26" rx="4" fill={tone.accent} opacity=".85" transform="rotate(-8 76 79)" />
          <path d="M30 70Q14 58-8 66" stroke={tone.frame} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M44 48q16-18 40-14" stroke="#fff" strokeOpacity=".4" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}
      {tile.scene === "flatlay" && (
        <>
          <path d="M-10 60 70-10h30L-10 110Z" fill={tone.accent} opacity=".35" />
          <path d="M40 174 130 70v40L80 174Z" fill={tone.accent} opacity=".25" />
          <ellipse cx="64" cy="98" rx="42" ry="9" fill={tone.frame} opacity=".22" />
          <g transform="translate(60 84) rotate(8)">
            <Glasses tone={tone} scale={1.100} />
          </g>
        </>
      )}
    </svg>
  );
}
