import { CheckCircle2, ListChecks, Target, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { processMetrics, processSteps } from "../data/content";
import { Tag } from "./Brand";
import { ConnectMock, InboxMock } from "./ProcessMocks";
import { Scene } from "./Scene";
import "./Process.css";

const metricIcons = [ListChecks, Target, CheckCircle2] as const;

function PassRate() {
  return (
    <div className="ml-process-pass">
      <TrendingUp className="ml-process-trend" size={84} strokeWidth={1.2} aria-hidden="true" />
      <span>Pass Rate</span>
      <p>
        <strong>100%</strong> Completed
      </p>
      <span className="ml-process-bar" />
      <ul>
        {processMetrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <li key={metric.label}>
              <span>
                <Icon size={12} aria-hidden="true" />
                {metric.label}
              </span>
              <strong>{metric.value}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mocks: ReactNode[] = [<ConnectMock key="connect" />, <PassRate key="pass" />, <InboxMock key="inbox" />];

export function Process() {
  return (
    <section id="process" className="ml-process-section">
      <header className="ml-process-header">
        <Tag>Process</Tag>
        <h2>
          From chaos to clarity
          <br />
          in 3 simple <em>steps.</em>
        </h2>
        <p>We make automation easy, so your business can run smoother while you focus on growth.</p>
      </header>
      <ol className="ml-process-grid">
        {processSteps.map((step, index) => (
          <li key={step.number} className="ml-process-card">
            <div className="ml-process-visual">
              <Scene className="ml-process-scene" palette="pastoral" />
              {mocks[index]}
            </div>
            <div className="ml-process-caption">
              <span className="ml-process-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
