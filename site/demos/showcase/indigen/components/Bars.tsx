/** Deterministic pseudo-random generator, so the server and the browser draw the same bars. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WIDTH = 1364;
const HEIGHT = 260;

type Bar = { x: number; solid: number; dashed: number; delay: number };

function buildBars(): Bar[] {
  const random = mulberry32(3229);
  const bars: Bar[] = [];
  let x = 4;
  while (x < WIDTH - 2) {
    const position = x / WIDTH;
    // A slow swell across the width plus sharp per-bar variation, like a signal trace.
    const swell = 0.5 + 0.1 * Math.sin(position * 9.5 + 0.6) + 0.08 * Math.sin(position * 23 + 2);
    const height = Math.max(0.2, Math.min(1, swell * (0.45 + random() * 0.9) + (random() > 0.93 ? 0.3 : 0)));
    const total = height * HEIGHT;
    const dashedShare = random() > 0.45 ? 0.2 + random() * 0.45 : 0;
    bars.push({ x, solid: total * (1 - dashedShare), dashed: total * dashedShare, delay: Math.round(position * 600) });
    x += 3 + Math.floor(random() * 3) + (random() > 0.9 ? 4 : 0);
  }
  return bars;
}

const bars = buildBars();

export function Bars() {
  return (
    <svg className="ig-bars" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((bar) => (
        <g key={bar.x} style={{ animationDelay: `${bar.delay}ms` }}>
          <line x1={bar.x} x2={bar.x} y1={HEIGHT} y2={HEIGHT - bar.solid} />
          {bar.dashed > 0 && (
            <line x1={bar.x} x2={bar.x} y1={HEIGHT - bar.solid} y2={HEIGHT - bar.solid - bar.dashed} strokeDasharray="5 4" />
          )}
        </g>
      ))}
    </svg>
  );
}
