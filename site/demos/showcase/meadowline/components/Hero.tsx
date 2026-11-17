import { heroStats } from "../data/content";
import { ArrowLink, Tag } from "./Brand";
import { Butterfly } from "./Butterfly";
import { Scene } from "./Scene";
import "./Hero.css";

export function Hero() {
  return (
    <section id="top" className="ml-hero-hero">
      <Scene
        className="ml-hero-scene"
        palette="golden"
        alt="Alpine valley in hazy golden light, with fir trees and small huts on the meadow"
        priority
      />
      <div className="ml-hero-veil" />
      <Butterfly size={26} top="46%" left="31%" rotate={-24} />
      <Butterfly size={54} top="50%" left="64%" rotate={28} delay={1.2} />
      <Butterfly size={24} top="57%" left="14%" rotate={-12} delay={2.1} />
      <Butterfly size={20} top="60%" left="88%" rotate={18} delay={0.6} />
      <Butterfly size={20} top="68%" left="68%" rotate={-30} delay={3} />
      <Butterfly size={96} top="74%" left="18%" rotate={34} delay={1.8} blur />

      <div className="ml-hero-content">
        <Tag>Automation That Feels Effortless</Tag>
        <h1 className="ml-hero-title">
          Turn Your Workflows
          <br />
          into Intelligent <em>Systems.</em>
        </h1>
        <p className="ml-hero-lede">
          We build intelligent systems that automate your workflows, so you can focus on what truly matters.
        </p>
        <ArrowLink href="#contact">Get Started</ArrowLink>
        <dl className="ml-hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
