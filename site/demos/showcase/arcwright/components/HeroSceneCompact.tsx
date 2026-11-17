import { sources } from "../data/content";
import { Slab, Wire, point, rightFaceMatrix } from "./iso";
import { AgentHotspot, INK, SceneGrid, Sparkle, agentIcons, sourceIcons, type SceneProps } from "./sceneParts";

/**
 * The hero drawing recomposed for a phone. The canvas is about as many units wide as a phone is in
 * pixels, so a 13 unit label renders at roughly 12 px. The enterprise building is left out and every
 * label sits on a long bar: the screen stands top left, the core top right, the sources feed the core
 * from the lower left and the agents leave it to the lower right.
 */
const VIEW = { x: -254, y: -172, width: 371, height: 500 };

const CORE = 130;
const SOURCE = { width: 34, length: 124, x: 2, y: 146, stepX: 42, stepY: 44 };
const AGENT = { width: 40, length: 172, x: 166, y: 75, step: 48 };
const SCREEN = { x: -38, y: 245, width: 154, height: 184, top: 194 };

/** Each agent wire leaves the core, runs down a lane beside it and enters the bar's long side. */
function agentWire(index: number): [number, number][] {
  const start = 80 + index * 16;
  const side = AGENT.x + index * AGENT.step;
  if (index === 0) return [[CORE, start], [side, start]];
  const lane = AGENT.x - index * 12;
  const entry = AGENT.y + (index - 1) * AGENT.step + AGENT.length + 14;
  return [[CORE, start], [lane, start], [lane, entry], [side, entry]];
}

export function CompactScene({ agents, active, onSelect }: SceneProps) {
  return (
    <svg
      className="aw-scene-svg aw-scene-compact"
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
      role="group"
      aria-label="Diagram: your systems, documents and apps feed the Arcwright core, which runs operations, sales and support agents"
    >
      <defs>
        <radialGradient id="aw-compact-fade-fill" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.45" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="aw-compact-fade" maskUnits="userSpaceOnUse" x={VIEW.x} y={VIEW.y} width={VIEW.width} height={VIEW.height}>
          <rect x={VIEW.x} y={VIEW.y} width={VIEW.width} height={VIEW.height} fill="url(#aw-compact-fade-fill)" />
        </mask>
      </defs>
      <SceneGrid from={-420} to={660} min={-440} max={680} mask="aw-compact-fade" />

      <g className="aw-scene-wires">
        {sources.map((label, index) => {
          const x = SOURCE.x + index * SOURCE.stepX + SOURCE.width / 2;
          return <Wire key={label} points={[[x, SOURCE.y + index * SOURCE.stepY], [x, CORE]]} />;
        })}
        <Wire points={[[0, 108], [SCREEN.x - 10, 108]]} />
        {agents.map((entry, index) => (
          <Wire key={entry.id} className={entry.id === active.id ? "aw-wire-active" : undefined} points={agentWire(index)} />
        ))}
      </g>

      {/* The standing screen: its content follows the selected agent. */}
      <rect transform={`translate(-5 -3) ${rightFaceMatrix(SCREEN.x, SCREEN.y, SCREEN.top)}`} width={SCREEN.width} height={SCREEN.height} rx="12" fill="#e9e9e5" stroke={INK} />
      <g transform={rightFaceMatrix(SCREEN.x, SCREEN.y, SCREEN.top)}>
        <rect width={SCREEN.width} height={SCREEN.height} rx="12" fill="#fbfbf8" stroke={INK} />
        <circle cx="14" cy="14" r="2.2" fill={INK} />
        <circle cx="22" cy="14" r="2.2" fill={INK} />
        <rect x={SCREEN.width - 30} y="9" width="18" height="10" rx="3" fill="#cfcfca" />
        <g transform="translate(18 43)" fill={INK}>
          <Sparkle size={14} />
        </g>
        <text x="30" y="47.5" className="aw-scene-label">
          Agents in action
        </text>
        <g key={active.id} className="aw-scene-screen">
          {active.tasks.map((task, index) => (
            <g key={task} transform={`translate(18 ${73 + index * 27})`} style={{ animationDelay: `${index * 120}ms` }}>
              <circle r="6.5" fill="#fbfbf8" stroke={INK} />
              <path d="M-2.8 0l2 2.2 3.7-4.2" fill="none" stroke={INK} strokeWidth="1.5" />
              <text x="11" y="4.5" className="aw-scene-label aw-scene-label-task">
                {task}
              </text>
            </g>
          ))}
          <g transform={`translate(${SCREEN.width - 68} 172)`}>
            {active.trend.map((value, index) => (
              <rect key={index} x={index * 11} y={-value * 30} width="6" height={value * 30} fill={index === active.trend.length - 1 ? "#f04e23" : "#9b9b96"} />
            ))}
          </g>
        </g>
      </g>

      {/* Core: a base unit with the product plate, then two floating layers. */}
      <Slab x={0} y={0} w={CORE} d={CORE} h={16} r={14} side="#dededa">
        <path d="M12 12h26v18H12zM98 88h20v30H98zM92 12h26v9H92zM12 100h32v18H12z" className="aw-scene-detail" />
      </Slab>
      <Slab x={14} y={14} z={16} w={102} d={102} h={9} r={10}>
        <g transform="translate(15 88)" fill={INK}>
          <rect x="0" y="-8" width="3.5" height="8" />
          <rect x="5" y="-13" width="3.5" height="13" />
          <rect x="10" y="-10" width="3.5" height="10" />
          <text x="19" y="0" className="aw-scene-label">
            Arcwright
          </text>
        </g>
        <rect x="22" y="14" width="58" height="46" rx="6" className="aw-scene-detail" />
      </Slab>
      <path
        className="aw-scene-dash"
        d={`M${point(8, 122, 25)} L${point(8, 122, 124)} M${point(122, 8, 25)} L${point(122, 8, 124)} M${point(8, 8, 124)} L${point(8, 8, 176)}`}
      />
      <Slab className="aw-float-a" x={14} y={14} z={72} w={102} d={102} h={3} r={14} fill="rgba(251,251,248,0.86)" side="#e3e3df">
        <g className="aw-scene-detail">
          <path d="M22 78V50h28V26M50 50h30v26M22 26h18" />
          {[[22, 78], [22, 26], [50, 50], [50, 26], [80, 76], [80, 50]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#fbfbf8" />
          ))}
        </g>
      </Slab>
      <g className="aw-float-b">
        <Slab x={5} y={5} z={120} w={120} d={120} h={4} r={16} />
        <Slab x={35} y={35} z={124} w={60} d={60} h={11} r={14} fill="#3a3a3c" side="#8a8a8a">
          <g transform="translate(30 30)" fill="#fff">
            <Sparkle size={32} />
          </g>
        </Slab>
      </g>

      {sources.map((label, index) => (
        <Slab key={label} x={SOURCE.x + index * SOURCE.stepX} y={SOURCE.y + index * SOURCE.stepY} w={SOURCE.width} d={SOURCE.length} h={12} r={10}>
          <g transform="translate(20 17) scale(0.8)">{sourceIcons[index]}</g>
          <text x="37" y="21.5" className="aw-scene-label">
            {label}
          </text>
        </Slab>
      ))}

      {agents.map((entry, index) => (
        <AgentHotspot key={entry.id} agent={entry} pressed={entry.id === active.id} onSelect={onSelect}>
          <Slab x={AGENT.x + index * AGENT.step} y={AGENT.y + index * AGENT.step} w={AGENT.width} d={AGENT.length} h={18} r={11} stroke="currentColor">
            <g transform="translate(24 20)">{agentIcons[index]}</g>
            <text x="46" y="24.5" className="aw-scene-label">
              {entry.name}
            </text>
          </Slab>
        </AgentHotspot>
      ))}
    </svg>
  );
}
