const K = 0.866;

/** Faces of an isometric box whose top rhombus is centred on (cx, cy), with half-width w and height h. */
function box(cx: number, cy: number, w: number, h: number) {
  const top = `M${cx} ${cy - w / 2}L${cx + K * w} ${cy}L${cx} ${cy + w / 2}L${cx - K * w} ${cy}Z`;
  const left = `M${cx - K * w} ${cy}L${cx} ${cy + w / 2}L${cx} ${cy + w / 2 + h}L${cx - K * w} ${cy + h}Z`;
  const right = `M${cx + K * w} ${cy}L${cx} ${cy + w / 2}L${cx} ${cy + w / 2 + h}L${cx + K * w} ${cy + h}Z`;
  return { top, left, right };
}

function IsoGrid({ id, stroke }: { id: string; stroke: string }) {
  return (
    <defs>
      <pattern id={id} width="41.57" height="24" patternUnits="userSpaceOnUse">
        <path d="M0 12 20.78 0 41.57 12 20.78 24Z" fill="none" stroke={stroke} strokeWidth="0.7" />
      </pattern>
    </defs>
  );
}

function Cube({ cx, cy, s, dashed }: { cx: number; cy: number; s: number; dashed?: boolean }) {
  const faces = box(cx, cy, s, s);
  const stroke = dashed ? "#6b6b66" : "#9a9a94";
  return (
    <g stroke={stroke} strokeWidth="1" strokeLinejoin="round" strokeDasharray={dashed ? "2 2" : undefined}>
      <path d={faces.top} fill="#1c1c1c" />
      <path d={faces.left} fill="#161616" />
      <path d={faces.right} fill="#202020" />
    </g>
  );
}

/** Four large cubes around a glowing core, with rows of small dashed cubes between them. */
export function CubeField() {
  const rows: Array<[number, number, number, number]> = [
    [228, 150, 1, -1],
    [318, 104, 1, 1],
    [140, 196, 1, -1],
    [408, 150, 1, 1],
    [136, 232, 1, 1],
    [408, 244, 1, -1],
    [224, 282, 1, 1],
    [316, 296, 1, -1],
  ];
  return (
    <svg className="rm-art" viewBox="0 0 560 340" role="img" aria-label="Isometric cubes connected to a glowing central node">
      <IsoGrid id="rm-iso-dark" stroke="#2b2b2b" />
      <defs>
        <radialGradient id="rm-glow">
          <stop offset="0" stopColor="#ff5200" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff5200" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="340" fill="url(#rm-iso-dark)" />
      {rows.map(([x, y, dx, dy]) => (
        <g key={`${x}-${y}`}>
          {[0, 1, 2, 3].map((i) => (
            <Cube key={i} cx={x + i * 15 * dx} cy={y + i * 8.7 * dy} s={9} dashed />
          ))}
        </g>
      ))}
      <Cube cx={96} cy={64} s={50} />
      <Cube cx={464} cy={64} s={50} />
      <Cube cx={96} cy={278} s={50} />
      <Cube cx={464} cy={278} s={50} />
      <circle cx="280" cy="190" r="74" fill="url(#rm-glow)" />
      <g stroke="#ff7a3c" strokeWidth="1" strokeLinejoin="round" className="rm-art__core">
        <path d={box(280, 170, 34, 36).top} fill="#c23e00" />
        <path d={box(280, 170, 34, 36).left} fill="#ff5200" />
        <path d={box(280, 170, 34, 36).right} fill="#e04800" />
        <ellipse cx="280" cy="170" rx="11" ry="6" fill="#3a1200" stroke="none" />
      </g>
    </svg>
  );
}

const emblem = ["..xx.xx..", ".xx...xx.", "xx..x..xx", "x..xxx..x", "..xxxxx..", "x..xxx..x", "xx..x..xx", ".xx...xx.", "..xx.xx.."];

function Slab({ cy, lamp }: { cy: number; lamp: "off" | "on" }) {
  const faces = box(250, cy, 200, 38);
  return (
    <g stroke="#3a3a36" strokeWidth="1.2" strokeLinejoin="round">
      <path d={faces.top} fill="#ffffff" />
      <path d={faces.left} fill="#e4e4de" />
      <path d={faces.right} fill="#dededa" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${98 + i * 13} ${cy + 20 + i * 7.5}v16`} fill="none" stroke="#8a8a84" />
      ))}
      <path
        d={`M276 ${cy + 100}l10 -5.8v13l-10 5.8z`}
        fill={lamp === "on" ? "#ff5200" : "none"}
        stroke={lamp === "on" ? "#ff5200" : "#e8a58a"}
      />
      <path d={`M294 ${cy + 89.6}l10 -5.8v13l-10 5.8z`} fill="none" stroke="#8a8a84" />
    </g>
  );
}

/** Three stacked server slabs with the brand emblem on the top face. */
export function ServerStack() {
  return (
    <svg className="rm-art" viewBox="0 0 500 520" role="img" aria-label="Three stacked isometric server units">
      <IsoGrid id="rm-iso-light" stroke="#e2e2dc" />
      <rect width="500" height="520" fill="url(#rm-iso-light)" />
      <Slab cy={280} lamp="on" />
      <Slab cy={224} lamp="on" />
      <Slab cy={168} lamp="off" />
      <g fill="none" stroke="#3a3a36" strokeWidth="1.2">
        <ellipse cx="250" cy="82" rx="7" ry="4" />
        <ellipse cx="250" cy="254" rx="7" ry="4" />
        <ellipse cx="96" cy="168" rx="7" ry="4" />
        <ellipse cx="404" cy="168" rx="7" ry="4" />
      </g>
      <g transform="matrix(0.866 0.5 -0.866 0.5 250 132)" fill="#ff5200" shapeRendering="geometricPrecision">
        {emblem.flatMap((row, y) =>
          [...row].map((cell, x) => (cell === "x" ? <rect key={`${x}-${y}`} x={x * 8} y={y * 8} width="8.3" height="8.3" /> : null)),
        )}
      </g>
    </svg>
  );
}

/** Nested squares closing in on the brand mark. */
export function Squares() {
  const rings = [196, 168, 144, 120, 96, 72, 48];
  return (
    <svg className="rm-art" viewBox="0 0 420 420" aria-hidden="true" focusable="false">
      {rings.map((r, i) => (
        <rect
          key={r}
          x={210 - r}
          y={210 - r}
          width={r * 2}
          height={r * 2}
          fill="none"
          stroke={i < 2 || i === 3 ? "#2c2c2c" : "#383838"}
          strokeWidth="1"
          strokeDasharray={i < 2 || i === 3 ? "1 5" : undefined}
        />
      ))}
      <g stroke="#ff5200" strokeWidth="1.4" fill="none" className="rm-art__ticks">
        <path d="M80 14h180" opacity="0.6" />
        <path d="M100 66h36M258 66h96v48" />
        <path d="M90 100v-10h106" opacity="0.7" />
        <path d="M282 138v18M162 190v46M258 240v12M282 258v22h-22M228 258h12" />
        <path d="M204 330h30" />
      </g>
      <rect x="186" y="186" width="48" height="48" fill="#161616" stroke="#444" />
      <g transform="translate(196 196)" fill="#ff5200" shapeRendering="crispEdges">
        {["x..x..x", ".x.x.x.", "..xxx..", "xxx.xxx", "..xxx..", ".x.x.x.", "x..x..x"].flatMap((row, y) =>
          [...row].map((cell, x) => (cell === "x" ? <rect key={`${x}-${y}`} x={x * 4} y={y * 4} width="4" height="4" /> : null)),
        )}
      </g>
    </svg>
  );
}
