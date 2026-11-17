import { ArrowLeftRight, BarChart3, Box, Code2, Headphones, Scale } from "lucide-react";
import { Cube, CursorLabel } from "./Cube";

export function Hero() {
  return (
    <section className="sx-hero" aria-labelledby="sx-hero-title">
      <div className="sx-orbit" aria-hidden="true">
        <i className="sx-orbit-ring" />
        <span className="sx-orbit-cube sx-orbit-a">
          <Cube size={82} icon={Headphones} />
        </span>
        <span className="sx-orbit-cube sx-orbit-b">
          <Cube size={82} tone="green" icon={Scale} />
        </span>
        <span className="sx-orbit-cube sx-orbit-c">
          <Cube size={114} tone="blue" icon={Code2} />
          <CursorLabel label="Maya" tone="blue" />
        </span>
        <span className="sx-orbit-cube sx-orbit-d">
          <Cube size={148} tone="orange" icon={Box} />
          <CursorLabel label="Agent 03" tone="orange" />
        </span>
        <span className="sx-orbit-cube sx-orbit-e">
          <Cube size={114} tone="pink" icon={BarChart3} />
          <CursorLabel label="Theo" tone="pink" flip />
        </span>
        <span className="sx-orbit-cube sx-orbit-f">
          <Cube size={148} icon={ArrowLeftRight} />
          <CursorLabel label="Legal agent" tone="green" flip />
        </span>
      </div>
      <div className="sx-wrap sx-hero-copy">
        <h1 id="sx-hero-title">Agents, finally multiplayer.</h1>
        <p>
          Sixseat puts every agent run in a shared, live session. Anyone on your team can drop in to watch it work, steer it mid-task, or take the
          handoff.
        </p>
        <div className="sx-hero-actions">
          <button type="button" className="sx-button" data-sx-open="start">
            Start a shared session
          </button>
          <a className="sx-button sx-button-light" href="#product">
            Watch a live session
          </a>
        </div>
      </div>
    </section>
  );
}
