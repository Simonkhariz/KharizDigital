import type { ReactNode } from "react";
import clsx from "clsx";
import type { PaletteName } from "../data/palettes";
import { ArrowLink, Tag } from "./Brand";
import { AssistantMock, GoalsMock, TaskMock, TeamMock } from "./FeatureMocks";
import { Scene } from "./Scene";
import "./Features.css";

type FeatureCardProps = {
  tone: "green" | "blue" | "lilac" | "peach";
  palette: PaletteName;
  title: ReactNode;
  text: string;
  children: ReactNode;
};

function FeatureCard({ tone, palette, title, text, children }: FeatureCardProps) {
  return (
    <article className={clsx("ml-features-card", `ml-features-${tone}`)}>
      <Scene className="ml-features-card-scene" palette={palette} />
      <div className="ml-features-copy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="ml-features-mock">{children}</div>
    </article>
  );
}

export function Features() {
  return (
    <section id="features" className="ml-features-section">
      <Scene className="ml-features-scene" palette="valley" />
      <div className="ml-features-inner">
        <header className="ml-features-header">
          <Tag>Core Features</Tag>
          <h2>
            Built for Focus.
            <br />
            Designed for <em>Results.</em>
          </h2>
          <p>Meadowline helps modern teams plan smarter, automate workflows, and achieve more, together.</p>
          <ArrowLink href="#use-cases">Explore More Features</ArrowLink>
        </header>
        <div className="ml-features-grid">
          <FeatureCard
            tone="green"
            palette="mistGreen"
            title={
              <>
                More clarity
                <br />
                and accountability
              </>
            }
            text="Connect strategic goals to the teams that help achieve them. See progress in real time."
          >
            <GoalsMock />
          </FeatureCard>
          <FeatureCard
            tone="blue"
            palette="mistBlue"
            title={
              <>
                Introducing
                <br />
                Meadowline AI
              </>
            }
            text="Get instant answers, updates, and insights right where your team works."
          >
            <AssistantMock />
          </FeatureCard>
          <FeatureCard
            tone="lilac"
            palette="mistLilac"
            title={
              <>
                The fastest way to get
                <br />
                tasks out of your head.
              </>
            }
            text="Capture, prioritize, and assign tasks in seconds. Stay focused on what matters."
          >
            <TaskMock />
          </FeatureCard>
          <FeatureCard
            tone="peach"
            palette="mistPeach"
            title={
              <>
                Better together,
                <br />
                always active.
              </>
            }
            text="Collaborate in real time, share updates, and keep everyone aligned."
          >
            <TeamMock />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
