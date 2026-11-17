import type { ReactNode } from "react";

/** Isometric projection: one grid unit is S pixels along each ground axis. */
const S = 86;
const OX = 520;
const OY = 132;
const KX = 0.866;
const BLOCK = 1;
const GAP = 0.38;
const STEP = BLOCK + GAP;
const BLUE = "var(--aw-blue)";

type Pt = [number, number];

function pt(i: number, j: number, z = 0): Pt {
  return [OX + (i - j) * KX * S, OY + (i + j) * 0.5 * S - z * S];
}

function poly(points: Pt[]) {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function Box({ i, j, w, d, h, z = 0, fill = "#fff" }: { i: number; j: number; w: number; d: number; h: number; z?: number; fill?: string }) {
  return (
    <g stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round">
      <polygon points={poly([pt(i, j + d, z + h), pt(i + w, j + d, z + h), pt(i + w, j + d, z), pt(i, j + d, z)])} fill="#fff" />
      <polygon points={poly([pt(i + w, j, z + h), pt(i + w, j + d, z + h), pt(i + w, j + d, z), pt(i + w, j, z)])} fill="var(--aw-tint)" />
      <polygon points={poly([pt(i, j, z + h), pt(i + w, j, z + h), pt(i + w, j + d, z + h), pt(i, j + d, z + h)])} fill={fill} />
    </g>
  );
}

function Dots({ i, j, z, n = 3, span = 1 }: { i: number; j: number; z: number; n?: number; span?: number }) {
  const dots: ReactNode[] = [];
  for (let a = 0; a < n; a += 1) {
    for (let b = 0; b < n; b += 1) {
      const [x, y] = pt(i + ((a + 1) / (n + 1)) * span, j + ((b + 1) / (n + 1)) * span, z);
      dots.push(<circle key={`${a}-${b}`} cx={x} cy={y} r="1.9" fill={BLUE} />);
    }
  }
  return <g>{dots}</g>;
}

function Slab({ i, j }: { i: number; j: number }) {
  return (
    <g>
      <Box i={i} j={j} w={1} d={1} h={0.2} />
      <Dots i={i} j={j} z={0.2} />
    </g>
  );
}

function Stack({ i, j }: { i: number; j: number }) {
  return (
    <g>
      <Box i={i} j={j} w={1} d={1} h={0.14} />
      <Box i={i + 0.24} j={j + 0.24} w={0.56} d={0.56} h={0.26} z={0.14} />
      {[0.2, 0.26, 0.32].map((z) => (
        <polyline key={z} points={poly([pt(i + 0.24, j + 0.8, z), pt(i + 0.8, j + 0.8, z), pt(i + 0.8, j + 0.24, z)])} fill="none" stroke={BLUE} strokeWidth="0.8" />
      ))}
      <Dots i={i + 0.24} j={j + 0.24} z={0.4} n={2} span={0.56} />
    </g>
  );
}

function Tank({ i, j }: { i: number; j: number }) {
  const [cx, cy] = pt(i + 0.5, j + 0.5, 0.06);
  const rx = 0.36 * S * 1.2247;
  const ry = 0.36 * S * 0.7071;
  const h = 0.3 * S;
  return (
    <g stroke={BLUE} strokeWidth="1.3">
      <Box i={i} j={j} w={1} d={1} h={0.06} />
      <path d={`M${cx - rx} ${cy - h}v${h}a${rx} ${ry} 0 0 0 ${rx * 2} 0v${-h}`} fill="#fff" />
      {[0.33, 0.66].map((t) => (
        <path key={t} d={`M${cx - rx} ${cy - h * t}a${rx} ${ry} 0 0 0 ${rx * 2} 0`} fill="none" strokeWidth="0.9" />
      ))}
      <ellipse cx={cx} cy={cy - h} rx={rx} ry={ry} fill="#fff" />
      <ellipse cx={cx} cy={cy - h} rx={rx * 0.6} ry={ry * 0.6} fill="var(--aw-tint)" strokeWidth="0.9" />
    </g>
  );
}

function Cube({ i, j }: { i: number; j: number }) {
  const lines = [0.12, 0.22, 0.32, 0.42, 0.52];
  return (
    <g>
      <Box i={i + 0.08} j={j + 0.08} w={0.84} d={0.84} h={0.62} />
      <g stroke={BLUE} strokeWidth="0.8" fill="none">
        {lines.map((z) => (
          <polyline key={z} points={poly([pt(i + 0.92, j + 0.08, z), pt(i + 0.92, j + 0.92, z)])} />
        ))}
        <polyline points={poly([pt(i + 0.5, j + 0.08, 0.62), pt(i + 0.5, j + 0.92, 0.62)])} />
        <polyline points={poly([pt(i + 0.08, j + 0.5, 0.62), pt(i + 0.92, j + 0.5, 0.62)])} />
      </g>
    </g>
  );
}

function Tree({ i, j }: { i: number; j: number }) {
  const [x, y] = pt(i, j);
  return (
    <g stroke={BLUE} strokeWidth="1.3">
      <path d={`M${x} ${y}v-13`} />
      <circle cx={x} cy={y - 19} r="7" fill="#fff" />
      <path d={`M${x - 4} ${y - 17}a5 5 0 0 0 8 0`} fill="none" strokeWidth="0.8" />
    </g>
  );
}

function Park({ i, j }: { i: number; j: number }) {
  return (
    <g>
      <polygon points={poly([pt(i, j), pt(i + 1, j), pt(i + 1, j + 1), pt(i, j + 1)])} fill="var(--aw-tint-2)" />
      <Tree i={i + 0.3} j={j + 0.28} />
      <Tree i={i + 0.72} j={j + 0.4} />
      <Tree i={i + 0.4} j={j + 0.76} />
    </g>
  );
}

function Tower({ i, j }: { i: number; j: number }) {
  const h = 1.45;
  const hatchLeft = Array.from({ length: 13 }, (_, k) => 0.07 + k * 0.072);
  const hatchRight = Array.from({ length: 15 }, (_, k) => 0.12 + k * 0.09);
  const [dx, dy] = pt(i + 0.5, j + 0.5, h);
  return (
    <g>
      <Box i={i} j={j} w={1} d={1} h={h} fill={BLUE} />
      <g stroke={BLUE} strokeWidth="0.9">
        {hatchLeft.map((t) => (
          <polyline key={t} points={poly([pt(i + t, j + 1, h), pt(i + t, j + 1, 0)])} />
        ))}
        {hatchRight.map((z) => (
          <polyline key={z} points={poly([pt(i + 1, j, z), pt(i + 1, j + 1, z)])} />
        ))}
      </g>
      <g stroke="#fff" strokeWidth="0.9" fill="none">
        <polyline points={poly([pt(i + 0.5, j, h), pt(i + 0.5, j + 1, h)])} />
        <polyline points={poly([pt(i, j + 0.5, h), pt(i + 1, j + 0.5, h)])} />
      </g>
      <ellipse cx={dx} cy={dy - 5} rx="19" ry="11" fill="#fff" stroke={BLUE} strokeWidth="1.3" />
      <ellipse cx={dx} cy={dy - 5} rx="5" ry="3" fill={BLUE} />
      <polygon points={poly([pt(i + 0.32, j + 1, 0.42), pt(i + 0.62, j + 1, 0.42), pt(i + 0.62, j + 1, 0), pt(i + 0.32, j + 1, 0)])} fill={BLUE} />
      <polygon points={poly([pt(i + 1, j + 0.36, 0.42), pt(i + 1, j + 0.66, 0.42), pt(i + 1, j + 0.66, 0), pt(i + 1, j + 0.36, 0)])} fill={BLUE} />
      <polygon points={poly([pt(i + 0.26, j + 1, 0.68), pt(i + 0.68, j + 1, 0.68), pt(i + 0.68, j + 1, 0.48), pt(i + 0.26, j + 1, 0.48)])} fill="#fff" stroke={BLUE} strokeWidth="1" />
      <polygon points={poly([pt(i + 1, j + 0.3, 0.68), pt(i + 1, j + 0.72, 0.68), pt(i + 1, j + 0.72, 0.48), pt(i + 1, j + 0.3, 0.48)])} fill="#fff" stroke={BLUE} strokeWidth="1" />
    </g>
  );
}

function Packet({ i, j }: { i: number; j: number }) {
  return (
    <g>
      <Box i={i - 0.08} j={j - 0.08} w={0.16} d={0.16} h={0.16} />
    </g>
  );
}

type Kind = "slab" | "stack" | "tank" | "cube" | "park" | "tower";

/** City plan. Rows run from the top corner towards the left; columns towards the right. */
const plan: Kind[][] = [
  ["park", "park", "slab", "slab", "stack"],
  ["stack", "stack", "slab", "park", "park"],
  ["tank", "park", "tower", "cube", "tank"],
  ["slab", "park", "slab", "slab", "park"],
  ["tank", "park", "tank", "slab", "park"],
];

const blocks = plan
  .flatMap((row, j) => row.map((kind, i) => ({ kind, i, j })))
  .sort((a, b) => a.i + a.j - (b.i + b.j));

const size = plan.length * STEP - GAP;
const streets = [1, 2, 3, 4].map((n) => n * STEP - GAP / 2);
const packets: Pt[] = [
  [streets[0], 0.6],
  [streets[0], 1.5],
  [streets[1], 4.6],
  [streets[2], 1.3],
  [streets[3], 3.4],
  [0.7, streets[1]],
  [5.9, streets[1]],
  [3.9, streets[2]],
  [5.6, streets[2]],
  [1.5, streets[3]],
  [4.4, streets[0]],
];

/** The isometric town: a tower for the visitor's product, surrounded by services, stores and parks. */
export function City() {
  const [tx, ty] = pt(2 * STEP + 0.5, 2 * STEP + 0.5, 1.45);
  return (
    <svg
      className="aw-city"
      viewBox="0 0 1040 740"
      role="img"
      aria-label="Isometric town of services and data stores, with one tower at the centre labelled as your agent-ready product"
    >
      <polygon points={poly([pt(-0.25, -0.25), pt(size + 0.25, -0.25), pt(size + 0.25, size + 0.25), pt(-0.25, size + 0.25)])} fill="var(--aw-tint)" />
      <g className="aw-city__routes" fill="none" stroke={BLUE} strokeWidth="1" strokeDasharray="4 5">
        {streets.map((s) => (
          <g key={s}>
            <polyline points={poly([pt(s, 0.2), pt(s, size - 0.2)])} />
            <polyline points={poly([pt(0.2, s), pt(size - 0.2, s)])} />
          </g>
        ))}
      </g>
      {blocks.map(({ kind, i, j }) => {
        const props = { i: i * STEP, j: j * STEP };
        const key = `${i}-${j}`;
        if (kind === "slab") return <Slab key={key} {...props} />;
        if (kind === "stack") return <Stack key={key} {...props} />;
        if (kind === "tank") return <Tank key={key} {...props} />;
        if (kind === "cube") return <Cube key={key} {...props} />;
        if (kind === "park") return <Park key={key} {...props} />;
        return <Tower key={key} {...props} />;
      })}
      {packets.map(([i, j]) => (
        <Packet key={`${i}-${j}`} i={i} j={j} />
      ))}
      <path d={`M${tx} ${ty - 16}V52H730`} fill="none" stroke={BLUE} strokeWidth="1.2" />
      <g className="aw-city__tag">
        <rect x="730" y="38" width="262" height="29" fill={BLUE} />
        <text x="861" y="57.5" textAnchor="middle" className="aw-city__label">
          YOUR AGENT-READY PRODUCT
        </text>
      </g>
    </svg>
  );
}

/** Small sketch used beside each idea: one block from the town. */
export function Sketch({ kind }: { kind: "slab" | "tank" | "stack" | "cube" }) {
  const offset = { i: 0, j: 0 };
  return (
    <svg className="aw-sketch" viewBox="430 60 180 170" aria-hidden="true" focusable="false">
      {kind === "slab" ? <Slab {...offset} /> : kind === "tank" ? <Tank {...offset} /> : kind === "stack" ? <Stack {...offset} /> : <Cube {...offset} />}
    </svg>
  );
}
