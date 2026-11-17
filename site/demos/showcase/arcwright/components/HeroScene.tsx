"use client";

import { useState } from "react";
import { agents, sources, type AgentId } from "../data/content";
import { CompactScene } from "./HeroSceneCompact";
import { Box, Slab, Wire, leftFaceMatrix, point, project, rightFaceMatrix, topMatrix } from "./iso";
import { AgentHotspot, INK, SceneGrid, Sparkle, agentIcons, sourceIcons } from "./sceneParts";
import "./HeroScene.css";

function Tree({ x, y }: { x: number; y: number }) {
  const [bx, by] = project(x, y);
  return (
    <g stroke={INK} fill="#f4f4f0">
      <path d={`M${bx} ${by}v-16`} />
      <ellipse cx={bx} cy={by - 26} rx="9" ry="13" />
      <path d={`M${bx} ${by - 18}v-10M${bx} ${by - 22}l-4-4M${bx} ${by - 20}l4-4`} fill="none" />
    </g>
  );
}

function Building() {
  const windows = (count: number, width: number, height: number, rows: number) => {
    const parts: string[] = [];
    for (let column = 1; column < count; column += 1) parts.push(`M${(width / count) * column} 0v${height}`);
    for (let row = 1; row < rows; row += 1) parts.push(`M0 ${(height / rows) * row}h${width}`);
    return parts.join(" ");
  };
  return (
    <g>
      <Box x={170} y={280} w={200} d={190} h={7} right="#ebebe6" />
      <Box x={190} y={380} w={80} d={66} h={46} />
      <Box x={200} y={300} w={66} d={100} h={128} />
      <path transform={leftFaceMatrix(200, 400, 128)} d={windows(3, 66, 128, 4)} className="aw-scene-detail" />
      <path transform={rightFaceMatrix(266, 400, 128)} d={windows(4, 100, 128, 4)} className="aw-scene-detail" />
      <Box x={212} y={312} w={40} d={52} h={18} z={128} />
      <rect transform={topMatrix(222, 354, 146)} x="6" y="6" width="30" height="12" className="aw-scene-detail" />
      <Box x={266} y={310} w={78} d={110} h={84} />
      <path transform={leftFaceMatrix(266, 420, 84)} d={windows(3, 78, 50, 2)} className="aw-scene-detail" />
      <g transform={rightFaceMatrix(344, 420, 84)}>
        <g transform="translate(12 22)" fill={INK}>
          <rect x="0" y="-9" width="3.5" height="9" />
          <rect x="5" y="-14" width="3.5" height="14" />
          <rect x="10" y="-11" width="3.5" height="11" />
          <text x="20" y="0" className="aw-scene-label">
            Enterprise
          </text>
        </g>
        <rect x="14" y="40" width="82" height="44" fill="#d9d9d4" stroke={INK} />
        <path d="M34 40v44M55 40v44M76 40v44" className="aw-scene-detail" />
      </g>
      <Box x={344} y={330} w={22} d={70} h={3} />
      <Tree x={180} y={452} />
      <Tree x={212} y={462} />
      <Tree x={352} y={440} />
      <Tree x={362} y={296} />
    </g>
  );
}

export function HeroScene() {
  const [active, setActive] = useState<AgentId>("operations");
  const agent = agents.find((entry) => entry.id === active) ?? agents[0];

  return (
    <div className="aw-scene">
      <svg className="aw-scene-svg aw-scene-wide" viewBox="-520 -250 1080 740" role="group" aria-label="Diagram: your systems, documents and apps feed the Arcwright core, which runs operations, sales and support agents">
        <defs>
          <radialGradient id="aw-scene-fade-fill" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.35" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="aw-scene-fade" maskUnits="userSpaceOnUse" x="-520" y="-250" width="1080" height="740">
            <rect x="-520" y="-250" width="1080" height="740" fill="url(#aw-scene-fade-fill)" />
          </mask>
        </defs>
        <SceneGrid from={-660} to={900} min={-700} max={900} mask="aw-scene-fade" />

        <g className="aw-scene-wires">
          <Wire points={[[-60, 190], [70, 190], [70, 150]]} />
          <Wire points={[[-60, 285], [226, 285], [226, 300]]} />
          <Wire points={[[-60, 380], [190, 380]]} />
          <Wire points={[[290, 310], [290, 120], [150, 120]]} />
          <Wire points={[[150, 30], [420, 30], [420, 140], [490, 140]]} />
          {agents.map((entry, index) => (
            <Wire
              key={entry.id}
              className={entry.id === active ? "aw-wire-active" : undefined}
              points={[[36 + index * 42, 0], [36 + index * 42, -70 + index * 18], [43 + index * 80, -70 + index * 18], [43 + index * 80, -140 + index * 22]]}
            />
          ))}
        </g>

        {sources.map((label, index) => (
          <Slab key={label} x={-140} y={150 + index * 95} w={80} d={80} h={14} r={16}>
            <g transform="translate(40 30)">{sourceIcons[index]}</g>
            <text x="40" y="66" textAnchor="middle" className="aw-scene-label aw-scene-label-small">
              {label}
            </text>
          </Slab>
        ))}

        {/* Core: a base unit with the product plate, then two floating layers. */}
        <Slab x={0} y={0} w={150} d={150} h={16} r={14} side="#dededa">
          <path d="M14 14h30v22H14zM110 100h26v36h-26zM104 14h32v10h-32zM14 112h40v24H14z" className="aw-scene-detail" />
        </Slab>
        <Slab x={24} y={24} z={16} w={102} d={102} h={9} r={10}>
          <g transform="translate(18 88)" fill={INK}>
            <rect x="0" y="-8" width="3.5" height="8" />
            <rect x="5" y="-13" width="3.5" height="13" />
            <rect x="10" y="-10" width="3.5" height="10" />
            <text x="20" y="0" className="aw-scene-label">
              Arcwright
            </text>
          </g>
          <rect x="22" y="14" width="58" height="46" rx="6" className="aw-scene-detail" />
        </Slab>
        <path
          className="aw-scene-dash"
          d={`M${point(8, 142, 25)} L${point(8, 142, 150)} M${point(142, 8, 25)} L${point(142, 8, 150)} M${point(8, 8, 150)} L${point(8, 8, 235)}`}
        />
        <Slab className="aw-float-a" x={22} y={22} z={84} w={106} d={106} h={3} r={14} fill="rgba(251,251,248,0.86)" side="#e3e3df">
          <g className="aw-scene-detail">
            <path d="M24 80V52h28V28M52 52h30v26M24 28h18" />
            {[[24, 80], [24, 28], [52, 52], [52, 28], [82, 78], [82, 52]].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#fbfbf8" />
            ))}
          </g>
        </Slab>
        <g className="aw-float-b">
          <Slab x={6} y={6} z={146} w={138} d={138} h={4} r={16} />
          <Slab x={42} y={42} z={150} w={66} d={66} h={11} r={14} fill="#3a3a3c" side="#8a8a8a">
            <g transform="translate(33 33)" fill="#fff">
              <Sparkle size={34} />
            </g>
          </Slab>
        </g>

        <Building />

        {agents.map((entry, index) => (
          <AgentHotspot key={entry.id} agent={entry} pressed={entry.id === active} onSelect={setActive}>
            <Slab x={20 + index * 80} y={-340 + index * 22} w={46} d={200} h={18} r={11} stroke="currentColor">
              <g transform="translate(26 23)">{agentIcons[index]}</g>
              <text x="50" y="28" className="aw-scene-label aw-scene-label-large">
                {entry.name}
              </text>
            </Slab>
          </AgentHotspot>
        ))}

        {/* The standing screen: its content follows the selected agent. */}
        <g>
          <rect transform={`translate(-9 -5) ${rightFaceMatrix(500, 230, 214)}`} width="180" height="204" rx="12" fill="#e9e9e5" stroke={INK} />
          <g transform={rightFaceMatrix(500, 230, 214)}>
            <rect width="180" height="204" rx="12" fill="#fbfbf8" stroke={INK} />
            <circle cx="14" cy="14" r="2.2" fill={INK} />
            <circle cx="22" cy="14" r="2.2" fill={INK} />
            <rect x="150" y="9" width="18" height="10" rx="3" fill="#cfcfca" />
            <g transform="translate(22 52)" fill={INK}>
              <Sparkle size={15} />
            </g>
            <text x="38" y="56" className="aw-scene-label">
              Agents in action
            </text>
            <g key={agent.id} className="aw-scene-screen">
              {agent.tasks.map((task, index) => (
                <g key={task} transform={`translate(22 ${86 + index * 30})`} style={{ animationDelay: `${index * 120}ms` }}>
                  <circle r="7" fill="#fbfbf8" stroke={INK} />
                  <path d="M-3 0l2.2 2.4 4-4.6" fill="none" stroke={INK} strokeWidth="1.5" />
                  <text x="14" y="3.5" className="aw-scene-label aw-scene-label-tiny">
                    {task}
                  </text>
                </g>
              ))}
              <g transform="translate(112 168)">
                {agent.trend.map((value, index) => (
                  <rect key={index} x={index * 11} y={-value * 46} width="6" height={value * 46} fill={index === agent.trend.length - 1 ? "#f04e23" : "#9b9b96"} />
                ))}
              </g>
            </g>
          </g>
        </g>
      </svg>

      {/* Below 700 px the wide drawing is swapped for one composed for a narrow portrait canvas. */}
      <CompactScene agents={agents} active={agent} onSelect={setActive} />

      <div className="aw-scene-caption">
        <div className="aw-scene-picker" role="group" aria-label="Choose an agent">
          {agents.map((entry) => (
            <button key={entry.id} type="button" aria-pressed={entry.id === active} onClick={() => setActive(entry.id)}>
              {entry.name}
            </button>
          ))}
        </div>
        <p aria-live="polite">{agent.summary}</p>
      </div>
    </div>
  );
}
