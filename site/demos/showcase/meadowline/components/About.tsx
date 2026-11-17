import { ArrowLink, AvatarStack, LogoMark, Tag } from "./Brand";
import { Scene } from "./Scene";
import "./About.css";

export function About() {
  return (
    <section id="about" className="ml-about-section">
      <Tag>About Meadowline</Tag>
      <h2 className="ml-about-statement">
        Experience intelligent automation as Meadowline transforms your workflows, turning scattered tasks into{" "}
        <span>structured systems.</span>
      </h2>
      <div className="ml-about-grid">
        <div className="ml-about-aside">
          <ArrowLink href="#solutions">Learn More</ArrowLink>
          <div className="ml-about-proof">
            <AvatarStack more="10+" size={38} />
            <p>Designed for modern teams who value clarity, efficiency, and consistent growth.</p>
          </div>
        </div>
        <div className="ml-about-connector" aria-hidden="true">
          <svg viewBox="0 0 400 200" preserveAspectRatio="none" focusable="false">
            <path
              d="M6 20 H70 C130 20 140 60 150 110 C158 150 170 170 215 170 C270 170 270 140 276 110 C282 86 310 86 394 86"
              fill="none"
              stroke="#ff7f37"
              strokeWidth="1"
              strokeDasharray="2 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="ml-about-dot" />
          <span className="ml-about-chip">
            <LogoMark size={16} />
          </span>
        </div>
        <figure className="ml-about-figure">
          <Scene className="ml-about-scene" palette="spring" alt="Daisies above a mountain lake under a blue sky" />
          <figcaption className="ml-about-tile">
            <strong>
              35<span>%</span>+
            </strong>
            <span>Faster workflow execution across automated systems</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
