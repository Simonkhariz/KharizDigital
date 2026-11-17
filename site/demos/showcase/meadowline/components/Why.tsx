import { BarChart3, Layers, Plug, ShieldCheck, Target, Zap } from "lucide-react";
import clsx from "clsx";
import { reasons, type Reason } from "../data/content";
import { LogoMark, Tag } from "./Brand";
import { Scene } from "./Scene";
import "./Why.css";

const icons = {
  bolt: Zap,
  target: Target,
  layers: Layers,
  chart: BarChart3,
  plug: Plug,
  shield: ShieldCheck,
} as const;

function ReasonCard({ reason }: { reason: Reason }) {
  const Icon = icons[reason.icon];
  return (
    <article className="ml-why-card">
      <Scene className="ml-why-scene" palette={reason.palette} />
      <div className={clsx("ml-why-panel", reason.solid && "ml-why-solid")}>
        <span className="ml-why-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3>{reason.title}</h3>
          <p>{reason.text}</p>
        </div>
      </div>
    </article>
  );
}

export function Why() {
  return (
    <section id="solutions" className="ml-why-section">
      <header className="ml-why-header">
        <Tag>Why Meadowline</Tag>
        <h2>
          Automation that
          <br />
          works the <em>way you do.</em>
        </h2>
        <p>
          Meadowline combines thoughtful design with powerful automation to help your team move faster and accomplish
          more.
        </p>
      </header>
      <div className="ml-why-orbit">
        <div className="ml-why-rings" aria-hidden="true">
          <span />
          <span />
          <div className="ml-why-medallion">
            <LogoMark size={44} />
          </div>
        </div>
        <div className="ml-why-column">
          {reasons.left.map((reason) => (
            <ReasonCard key={reason.id} reason={reason} />
          ))}
        </div>
        <div className={clsx("ml-why-column", "ml-why-centre")}>
          {reasons.centre.map((reason) => (
            <ReasonCard key={reason.id} reason={reason} />
          ))}
        </div>
        <div className="ml-why-column">
          {reasons.right.map((reason) => (
            <ReasonCard key={reason.id} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
}
