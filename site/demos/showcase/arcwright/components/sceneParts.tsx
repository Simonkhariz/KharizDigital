import type { KeyboardEvent, ReactNode } from "react";
import type { Agent, AgentId } from "../data/content";
import { point } from "./iso";

/** Pieces shared by the wide hero drawing and the compact one drawn for phones. */
export const INK = "#2b2b2b";

export type SceneProps = {
  agents: Agent[];
  active: Agent;
  onSelect: (id: AgentId) => void;
};

type GridProps = { from: number; to: number; min: number; max: number; step?: number; mask: string };

/** Faint ground grid along both isometric axes, faded out by the named mask. */
export function SceneGrid({ from, to, min, max, step = 60, mask }: GridProps) {
  const lines: string[] = [];
  for (let offset = from; offset <= to; offset += step) {
    lines.push(`M${point(offset, min)} L${point(offset, max)}`);
    lines.push(`M${point(min, offset)} L${point(max, offset)}`);
  }
  return <path d={lines.join(" ")} className="aw-scene-grid" mask={`url(#${mask})`} />;
}

export function Sparkle({ size = 30 }: { size?: number }) {
  const h = size / 2;
  return (
    <path
      d={`M0 ${-h} C${h * 0.14} ${-h * 0.3} ${h * 0.3} ${-h * 0.14} ${h} 0 C${h * 0.3} ${h * 0.14} ${h * 0.14} ${h * 0.3} 0 ${h} C${-h * 0.14} ${h * 0.3} ${-h * 0.3} ${h * 0.14} ${-h} 0 C${-h * 0.3} ${-h * 0.14} ${-h * 0.14} ${-h * 0.3} 0 ${-h}Z`}
    />
  );
}

/** Icons are drawn flat in the local plane of the tile they sit on. */
export const sourceIcons = [
  <g key="systems" fill="none" stroke={INK} strokeWidth="1.6">
    <ellipse cx="0" cy="-7" rx="11" ry="4.5" />
    <path d="M-11 -7v14c0 2.5 5 4.5 11 4.5s11-2 11-4.5v-14M-11 0c0 2.5 5 4.5 11 4.5s11-2 11-4.5" />
  </g>,
  <g key="documents" fill="#fbfbf8" stroke={INK} strokeWidth="1.6">
    <rect x="-6" y="-13" width="17" height="21" rx="2" />
    <rect x="-11" y="-8" width="17" height="21" rx="2" />
    <path d="M-7 -2h9M-7 3h9M-7 8h5" />
  </g>,
  <g key="apps" fill="none" stroke={INK} strokeWidth="1.6">
    <rect x="-12" y="-12" width="10" height="10" rx="2.5" />
    <rect x="2" y="-12" width="10" height="10" rx="2.5" />
    <rect x="-12" y="2" width="10" height="10" rx="2.5" />
    <rect x="2" y="2" width="10" height="10" rx="2.5" />
  </g>,
];

export const agentIcons = [
  <g key="operations" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M0 -10l12 5-12 5-12-5zM-12 1l12 5 12-5M-12 7l12 5 12-5" />
  </g>,
  <g key="sales" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round">
    <circle cx="-5" cy="-5" r="4.5" />
    <circle cx="7" cy="-4" r="3.5" />
    <path d="M-13 10c0-5 3.5-8 8-8s8 3 8 8M6 3c4 0 7 2.5 7 7" />
  </g>,
  <g key="support" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M-12 -9h24v15h-13l-6 6v-6h-5z" />
    <path d="M-5 -1.5h.1M0 -1.5h.1M5 -1.5h.1" strokeLinecap="round" strokeWidth="2.4" />
  </g>,
];

type AgentHotspotProps = { agent: Agent; pressed: boolean; onSelect: (id: AgentId) => void; children: ReactNode };

/** An agent bar inside a drawing, usable as a button by pointer, tap and keyboard. */
export function AgentHotspot({ agent, pressed, onSelect, children }: AgentHotspotProps) {
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(agent.id);
    }
  };
  return (
    <g
      className="aw-scene-agent"
      data-active={pressed}
      role="button"
      tabIndex={0}
      aria-pressed={pressed}
      aria-label={`Show the ${agent.name}`}
      onClick={() => onSelect(agent.id)}
      onKeyDown={onKeyDown}
    >
      {children}
    </g>
  );
}
