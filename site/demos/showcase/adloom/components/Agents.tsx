import { agents } from "../data/content";
import "./Agents.css";

export function Agents() {
  return (
    <section id="agents" className="al-section al-agents-section" aria-labelledby="al-agents-title">
      <div className="al-container">
        <div className="al-section-head">
          <p className="al-eyebrow">Agents</p>
          <h2 id="al-agents-title" className="al-display">
            Three agents, each with one job
          </h2>
          <p>They work inside the studio, on your library, and hand everything to a person before it goes anywhere.</p>
        </div>
        <ul className="al-agents-grid">
          {agents.map((agent, index) => (
            <li key={agent.id} className="al-agents-card">
              <p className="al-agents-index">Agent 0{index + 1}</p>
              <h3 className="al-display">{agent.name}</h3>
              <p className="al-agents-role">{agent.role}</p>
              <p className="al-agents-body">{agent.body}</p>
              <div className="al-agents-sample">
                <p>Sample output</p>
                <ul>
                  {agent.sample.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
