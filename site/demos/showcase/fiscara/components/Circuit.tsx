import type { ReactNode } from "react";
import { Mark } from "./Mark";

export type Point = [number, number];

/** Polyline with rounded corners, as an SVG path. */
export function trace(points: Point[], radius = 15): string {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const [x, y] = points[index];
    const [px, py] = points[index - 1];
    const [nx, ny] = points[index + 1];
    const before = Math.hypot(x - px, y - py);
    const after = Math.hypot(nx - x, ny - y);
    const r = Math.min(radius, before / 2, after / 2);
    const ax = x - ((x - px) / before) * r;
    const ay = y - ((y - py) / before) * r;
    const bx = x + ((nx - x) / after) * r;
    const by = y + ((ny - y) / after) * r;
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${x} ${y} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  return `${d} L${last[0]} ${last[1]}`;
}

interface Chip {
  x: number;
  y: number;
  w: number;
  h: number;
  round?: boolean;
  icon: ReactNode;
}

const ICON = "#c3bfb1";

const icons = {
  diamond: <rect x="-3.6" y="-3.6" width="7.2" height="7.2" rx="1" transform="rotate(45)" fill={ICON} />,
  dashes: (
    <g fill={ICON}>
      <rect x="-1.3" y="-11" width="2.6" height="9" rx="1.3" />
      <rect x="-1.3" y="3" width="2.6" height="6" rx="1.3" />
    </g>
  ),
  bars: (
    <g fill={ICON}>
      <rect x="-9" y="-5.5" width="2" height="11" rx="1" />
      <rect x="-1" y="-5.5" width="2" height="11" rx="1" />
      <rect x="7" y="-5.5" width="2" height="11" rx="1" />
    </g>
  ),
  dots: (
    <g fill={ICON}>
      <rect x="-13" y="-2.5" width="5" height="5" rx="1" />
      <rect x="-2.5" y="-2.5" width="5" height="5" rx="1" opacity="0.6" />
      <rect x="8" y="-2.5" width="5" height="5" rx="1" />
    </g>
  ),
  grid: (
    <g fill={ICON}>
      <rect x="-6.5" y="-6.5" width="5" height="5" rx="0.8" />
      <rect x="1.5" y="-6.5" width="5" height="5" rx="0.8" opacity="0.6" />
      <rect x="-6.5" y="1.5" width="5" height="5" rx="0.8" opacity="0.6" />
      <rect x="1.5" y="1.5" width="5" height="5" rx="0.8" />
    </g>
  ),
  link: (
    <g fill={ICON}>
      <circle cx="-15" cy="0" r="2.4" />
      <rect x="-9" y="-1" width="18" height="2" rx="1" />
      <circle cx="15" cy="0" r="2.4" />
    </g>
  ),
  cross: <path d="M-4.5 -4.5 4.5 4.5M4.5 -4.5 -4.5 4.5" stroke={ICON} strokeWidth="1.6" strokeLinecap="round" fill="none" />,
  matrix: (
    <g fill={ICON}>
      {[-6, 0, 6].flatMap((cx) => [-6, 0, 6].map((cy) => <rect key={`${cx}${cy}`} x={cx - 1.4} y={cy - 1.4} width="2.8" height="2.8" rx="0.6" />))}
    </g>
  ),
};

function Chips({ chips, id }: { chips: Chip[]; id: string }) {
  return (
    <>
      {chips.map((chip) => {
        const rx = chip.round ? chip.h / 2 : 7;
        return (
          <g key={`${chip.x}-${chip.y}`} transform={`translate(${chip.x} ${chip.y})`}>
            <rect x="1" y="5" width={chip.w - 2} height={chip.h - 2} rx={rx} fill="#8e8672" opacity="0.32" filter={`url(#${id}-soft)`} />
            <rect width={chip.w} height={chip.h} rx={rx} fill={`url(#${id}-chip)`} />
            <rect x="0.5" y="0.5" width={chip.w - 1} height={chip.h - 1} rx={rx - 0.5} fill="none" stroke={`url(#${id}-edge)`} />
            <g transform={`translate(${chip.w / 2} ${chip.h / 2})`}>{chip.icon}</g>
          </g>
        );
      })}
    </>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-chip`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#dedacd" />
        <stop offset="1" stopColor="#d6d2c5" />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f0ede2" />
        <stop offset="0.5" stopColor="#e3e0d3" stopOpacity="0.6" />
        <stop offset="1" stopColor="#c9c5b7" stopOpacity="0.7" />
      </linearGradient>
      <filter id={`${id}-soft`} x="-40%" y="-60%" width="180%" height="260%">
        <feGaussianBlur stdDeviation="3.2" />
      </filter>
    </defs>
  );
}

/* All coordinates are page pixels at a 1440 px viewport. The left drawing is pinned to the
   left edge and the right one to the right edge; the long horizontals run behind the hand. */

const leftLines: Point[][] = [
  [[-30, 332], [158, 332], [158, 540], [297, 540]],
  [[-30, 401], [297, 401], [297, 1100]],
  [[-30, 624], [86, 624], [86, 560], [112, 560]],
  [[112, 560], [1500, 560]],
  [[-30, 691], [115, 691], [115, 635], [1500, 635]],
  [[141, 760], [141, 691], [1500, 691]],
  [[-30, 765], [100, 765]],
];

const leftChips: Chip[] = [
  { x: 78, y: 388, w: 26, h: 26, icon: icons.diamond },
  { x: 103, y: 539, w: 24, h: 43, icon: icons.dashes },
  { x: 376, y: 548, w: 54, h: 24, icon: icons.bars },
  { x: 95, y: 752, w: 52, h: 25, icon: icons.dots },
];

const rightLines: Point[][] = [
  [[-298, 1100], [-298, 401], [-240, 401], [60, 401]],
  [[60, 332], [-158, 332], [-158, 540], [-298, 540]],
  [[-1500, 560], [-84, 560]],
  [[-104, 560], [-86, 560], [-86, 624], [60, 624]],
  [[-1500, 635], [-115, 635], [-115, 698], [60, 698]],
  [[-1500, 691], [-134, 691], [-134, 760]],
  [[-108, 773], [60, 773]],
];

const rightChips: Chip[] = [
  { x: -104, y: 387, w: 28, h: 28, round: true, icon: icons.cross },
  { x: -426, y: 548, w: 46, h: 24, icon: icons.grid },
  { x: -143, y: 548, w: 56, h: 24, icon: icons.link },
  { x: -140, y: 757, w: 32, h: 32, icon: icons.matrix },
];

/* Signals that travel along a few of the traces. */
const leftSignals = [3, 5];
const rightSignals = [0, 4];

export function Circuit() {
  return (
    <div className="fs-circuit" aria-hidden="true">
      <svg className="fs-circuit-left" width="720" height="1100" viewBox="0 0 720 1100">
        <Defs id="fsc-l" />
        <g fill="none" stroke="var(--fs-line)" strokeWidth="2.2">
          {leftLines.map((line, index) => (
            <path key={index} d={trace(line)} />
          ))}
        </g>
        <g fill="none" className="fs-signals">
          {leftSignals.map((line, index) => (
            <path key={line} d={trace(leftLines[line])} pathLength={100} style={{ animationDelay: `${index * -3.7}s` }} />
          ))}
        </g>
        <Chips chips={leftChips} id="fsc-l" />
      </svg>
      <svg className="fs-circuit-right" width="720" height="1100" viewBox="-720 0 720 1100">
        <Defs id="fsc-r" />
        <g fill="none" stroke="var(--fs-line)" strokeWidth="2.2">
          {rightLines.map((line, index) => (
            <path key={index} d={trace(line)} />
          ))}
        </g>
        <g fill="none" className="fs-signals">
          {rightSignals.map((line, index) => (
            <path key={line} d={trace(rightLines[line])} pathLength={100} style={{ animationDelay: `${index * -4.3 - 1.5}s` }} />
          ))}
        </g>
        <Chips chips={rightChips} id="fsc-r" />
      </svg>
      <span className="fs-tile">
        <Mark size={38} />
      </span>
    </div>
  );
}

/** Fainter traces for the dark sections. */
export function DarkTraces({ flip = false }: { flip?: boolean }) {
  const lines: Point[][] = [
    [[-20, 70], [150, 70], [150, 230], [330, 230], [330, 520]],
    [[-20, 150], [70, 150], [70, 330], [210, 330]],
    [[210, 330], [330, 330]],
    [[-20, 420], [120, 420], [120, 380], [330, 380]],
  ];
  return (
    <svg className={flip ? "fs-traces fs-traces-flip" : "fs-traces"} width="360" height="520" viewBox="0 0 360 520" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        {lines.map((line, index) => (
          <path key={index} d={trace(line)} />
        ))}
      </g>
      <g fill="currentColor">
        <rect x="56" y="57" width="26" height="26" rx="7" />
        <rect x="186" y="318" width="50" height="24" rx="7" />
        <rect x="108" y="398" width="24" height="42" rx="7" />
      </g>
    </svg>
  );
}
