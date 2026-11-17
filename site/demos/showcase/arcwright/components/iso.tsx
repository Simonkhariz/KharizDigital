import type { ReactNode } from "react";

/**
 * Small isometric drawing kit. Ground coordinates are (x, y) with z up; x runs down-right on screen and
 * y runs down-left, so the faces at the largest x and the largest y are the two that face the viewer.
 */
const COS = 0.866;
const SIN = 0.5;

const round = (value: number) => Math.round(value * 10) / 10;

export function project(x: number, y: number, z = 0): [number, number] {
  return [round((x - y) * COS), round((x + y) * SIN - z)];
}

export const point = (x: number, y: number, z = 0) => project(x, y, z).join(",");

/** Local axes on a horizontal plane: a runs up-right (towards smaller y), b runs down-right (larger x). */
export function topMatrix(x: number, yMax: number, z: number) {
  const [ox, oy] = project(x, yMax, z);
  return `matrix(${COS} ${-SIN} ${COS} ${SIN} ${ox} ${oy})`;
}

/** Local axes on the face at the largest x: a runs up-right, b runs straight down. */
export function rightFaceMatrix(xMax: number, yMax: number, zTop: number) {
  const [ox, oy] = project(xMax, yMax, zTop);
  return `matrix(${COS} ${-SIN} 0 1 ${ox} ${oy})`;
}

/** Local axes on the face at the largest y: a runs down-right, b runs straight down. */
export function leftFaceMatrix(xMin: number, yMax: number, zTop: number) {
  const [ox, oy] = project(xMin, yMax, zTop);
  return `matrix(${COS} ${SIN} 0 1 ${ox} ${oy})`;
}

type Solid = { x: number; y: number; z?: number; w: number; d: number; h: number };

type SlabProps = Solid & {
  r?: number;
  fill?: string;
  side?: string;
  stroke?: string;
  className?: string;
  children?: ReactNode;
};

/** A rounded plate: a rounded rectangle extruded upwards. Children are drawn on its top face. */
export function Slab({ x, y, z = 0, w, d, h, r = 10, fill = "#fbfbf8", side = "#e9e9e5", stroke = "#2b2b2b", className, children }: SlabProps) {
  const layers = Array.from({ length: Math.max(0, Math.ceil(h / 1.5) - 1) }, (_, index) => z + (index + 1) * 1.5);
  const lean = r * 0.707;
  const leftEdge: [number, number] = [x + r - lean, y + d - r + lean];
  const rightEdge: [number, number] = [x + w - r + lean, y + r - lean];
  return (
    <g className={className}>
      <rect transform={topMatrix(x, y + d, z)} width={d} height={w} rx={r} fill={side} stroke={stroke} />
      {layers.map((level) => (
        <rect key={level} transform={topMatrix(x, y + d, level)} width={d} height={w} rx={r} fill={side} />
      ))}
      {[leftEdge, rightEdge].map(([ex, ey]) => (
        <path key={`${ex}-${ey}`} d={`M${point(ex, ey, z)} L${point(ex, ey, z + h)}`} stroke={stroke} fill="none" />
      ))}
      <g transform={topMatrix(x, y + d, z + h)}>
        <rect width={d} height={w} rx={r} fill={fill} stroke={stroke} />
        {children}
      </g>
    </g>
  );
}

type BoxProps = Solid & { top?: string; left?: string; right?: string; stroke?: string };

/** A sharp-cornered box showing its top face and the two faces towards the viewer. */
export function Box({ x, y, z = 0, w, d, h, top = "#fbfbf8", left = "#f0f0ec", right = "#e4e4df", stroke = "#2b2b2b" }: BoxProps) {
  const t = z + h;
  return (
    <g stroke={stroke} strokeLinejoin="round">
      <polygon fill={left} points={`${point(x, y + d, t)} ${point(x + w, y + d, t)} ${point(x + w, y + d, z)} ${point(x, y + d, z)}`} />
      <polygon fill={right} points={`${point(x + w, y + d, t)} ${point(x + w, y, t)} ${point(x + w, y, z)} ${point(x + w, y + d, z)}`} />
      <polygon fill={top} points={`${point(x, y, t)} ${point(x + w, y, t)} ${point(x + w, y + d, t)} ${point(x, y + d, t)}`} />
    </g>
  );
}

/** A path that follows ground points, with a dot at each end. */
export function Wire({ points, z = 0, className }: { points: [number, number][]; z?: number; className?: string }) {
  const d = points.map(([px, py], index) => `${index === 0 ? "M" : "L"}${point(px, py, z)}`).join(" ");
  const ends = [points[0], points[points.length - 1]];
  return (
    <g className={className}>
      <path d={d} fill="none" strokeLinejoin="round" />
      <path d={d} fill="none" strokeLinejoin="round" className="aw-wire-pulse" pathLength={100} />
      {ends.map(([px, py]) => {
        const [cx, cy] = project(px, py, z);
        return <circle key={`${px}-${py}`} cx={cx} cy={cy} r={3.2} />;
      })}
    </g>
  );
}
