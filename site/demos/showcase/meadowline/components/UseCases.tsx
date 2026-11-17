import { ArrowLink, Tag } from "./Brand";
import { Scene } from "./Scene";
import { UseCaseTabs } from "./UseCaseTabs";
import "./UseCases.css";

export function UseCases() {
  return (
    <section id="use-cases" className="ml-use-cases-section">
      <Tag>Use Case</Tag>
      <header className="ml-use-cases-header">
        <div>
          <h2>
            Crafted for teams
            <br />
            that move with <em>clarity.</em>
          </h2>
          <p>Simplify your workflows, reduce manual effort, and stay focused on what truly matters.</p>
        </div>
        <ArrowLink href="#contact">Get Started</ArrowLink>
      </header>
      <UseCaseTabs
        backdrop={
          <Scene className="ml-use-cases-scene" palette="valley" />
        }
      />
    </section>
  );
}
