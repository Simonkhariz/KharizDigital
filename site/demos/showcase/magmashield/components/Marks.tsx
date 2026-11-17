export function Logo() {
  return (
    <span className="ms-logo">
      <svg width="26" height="20" viewBox="0 0 13 10" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
        <path d="M3 0h7v1h2v2h1v1H7v2h6v1h-1v2h-2v1H3V9H1V7H0V6h6V4H0V3h1V1h2z" fill="currentColor" />
      </svg>
      MAGMASHIELD
    </span>
  );
}

const bitmaps = {
  eye: ["..xxxxx..", ".x.....x.", "x..xxx..x", "x..x.x..x", "x..xxx..x", ".x.....x.", "..xxxxx.."],
  bolt: ["....xxx..", "...xxx...", "..xxx....", ".xxxxxxx.", "....xxx..", "...xxx...", "..xxx...."],
  scan: ["xxx...xxx", "x.......x", "..xxxxx..", "xxxxxxxxx", "..xxxxx..", "x.......x", "xxx...xxx"],
  brain: [".xxx.xxx.", "x...x...x", "x.x.x.x.x", "x...x...x", "x.x.x.x.x", "x...x...x", ".xxx.xxx."],
  plug: ["..x...x..", "..x...x..", ".xxxxxxx.", ".xxxxxxx.", "..xxxxx..", "....x....", "....x...."],
  file: ["xxxxxx...", "x....xx..", "x.xx..xx.", "x......x.", "x.xxxx.x.", "x......x.", "xxxxxxxx."],
} as const;

export type IconName = keyof typeof bitmaps;

/** Feature icon drawn from a bitmap of square pixels, to match the pixel headline. */
export function PixelIcon({ name }: { name: IconName }) {
  const rows = bitmaps[name];
  const d = rows.flatMap((row, y) => [...row].map((cell, x) => (cell === "x" ? `M${x} ${y}h1v1h-1z` : ""))).join("");
  return (
    <svg width="36" height="28" viewBox="0 0 9 7" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <path d={d} fill="currentColor" />
    </svg>
  );
}
