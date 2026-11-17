import { Hexagon, Shield } from "lucide-react";
import clsx from "clsx";
import { clientMarks, type ClientMarkStyle } from "../data/content";
import { Scene } from "./Scene";
import "./Trusted.css";

function Mark({ name, style }: { name: string; style: ClientMarkStyle }) {
  return (
    <li className={clsx("ml-trusted-mark", `ml-trusted-${style}`)}>
      {style === "ring" && <Hexagon size={22} strokeWidth={3} aria-hidden="true" />}
      {style === "shield" && <Shield size={22} strokeWidth={3} aria-hidden="true" />}
      <span>{name}</span>
    </li>
  );
}

export function Trusted() {
  return (
    <section className="ml-trusted-section" aria-labelledby="ml-trusted-title">
      <Scene className="ml-trusted-scene" palette="fog" />
      <h2 id="ml-trusted-title" className="ml-trusted-title">
        Trusted by leading teams worldwide
      </h2>
      <ul className="ml-trusted-list">
        {clientMarks.map((mark) => (
          <Mark key={mark.name} name={mark.name} style={mark.style} />
        ))}
      </ul>
    </section>
  );
}
