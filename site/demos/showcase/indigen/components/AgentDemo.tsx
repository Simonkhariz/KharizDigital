"use client";

import { ArrowRight, CircleCheck, FileText, RotateCcw, Sparkle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { conversation, fallbackReply, replies, suggestedCommands, workflow, type ChatMessage } from "../data/demo";
import "./AgentDemo.css";

const TOTAL = workflow.steps.length;
type LogMessage = Pick<ChatMessage, "from" | "text"> & { time?: string };

/** The two cards on the amber stage: a workflow timeline and the agent conversation that drives it. */
export function AgentDemo() {
  // Starts complete so the server-rendered page matches the finished state; the run replays in view.
  const [reached, setReached] = useState(TOTAL);
  const [extra, setExtra] = useState<LogMessage[]>([]);
  const [draft, setDraft] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          setReached(0);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reached >= TOTAL) return;
    const timer = window.setTimeout(() => setReached((value) => value + 1), 850);
    return () => window.clearTimeout(timer);
  }, [reached]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [reached, extra]);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question) return;
    const answer = replies.find((reply) => reply.match.test(question))?.text ?? fallbackReply;
    setExtra((list) => [...list, { from: "user", text: question }, { from: "agent", text: answer }]);
    setDraft("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(draft);
  };

  const replay = () => {
    setExtra([]);
    setReached(0);
  };

  const done = reached >= TOTAL;
  const scripted: LogMessage[] = conversation.filter((message) => message.afterStep <= reached);

  return (
    <div className="ig-demo" ref={rootRef}>
      <article className="ig-demo-card" aria-label="Workflow progress">
        <header className="ig-demo-head">
          <span className="ig-demo-icon">
            <FileText size={17} aria-hidden="true" />
          </span>
          <div>
            <h3>{workflow.title}</h3>
            <p>
              {workflow.order} <span className="ig-demo-dot" aria-hidden="true" /> 2 min ago
            </p>
          </div>
          <button type="button" className="ig-demo-replay" onClick={replay} aria-label="Replay the workflow">
            <RotateCcw size={14} aria-hidden="true" />
          </button>
        </header>
        <p className="ig-demo-label">Workflow progress</p>
        <ol className="ig-demo-steps">
          {workflow.steps.map((step, index) => (
            <li key={step.title} data-state={index < reached ? "done" : index === reached ? "active" : "waiting"}>
              <span className="ig-demo-bullet" style={{ background: step.color }} aria-hidden="true" />
              <div>
                <h4>{step.title}</h4>
                <p>{step.detail}</p>
              </div>
              <time>{step.time}</time>
            </li>
          ))}
        </ol>
        <div className="ig-demo-result" data-done={done} aria-live="polite">
          <CircleCheck size={20} aria-hidden="true" />
          <div>
            <strong>{done ? workflow.done.title : "Resolving…"}</strong>
            <span>{done ? workflow.done.detail : `Step ${Math.min(reached + 1, TOTAL)} of ${TOTAL}`}</span>
          </div>
          <span className="ig-demo-ago">
            <span className="ig-demo-dot" aria-hidden="true" /> {done ? "2 min ago" : "now"}
          </span>
        </div>
      </article>

      <article className="ig-demo-card ig-demo-chat" aria-label="Agent conversation">
        <header className="ig-demo-head ig-demo-head-ruled">
          <span className="ig-demo-icon">
            <Sparkles size={17} aria-hidden="true" />
          </span>
          <div>
            <h3>Agent</h3>
            <p>
              Customer support agent <span className="ig-demo-live" aria-hidden="true" />
            </p>
          </div>
        </header>
        <div className="ig-demo-log" ref={logRef} role="log" aria-label="Messages" tabIndex={0}>
          {[...scripted, ...extra].map((message, index) =>
            message.from === "user" ? (
              <div key={index} className="ig-demo-user">
                <p>
                  {message.text}
                  {message.time && <time>{message.time}</time>}
                </p>
                <span className="ig-demo-avatar" aria-hidden="true">
                  OP
                </span>
              </div>
            ) : (
              <div key={index} className="ig-demo-agent">
                <span className="ig-demo-spark" aria-hidden="true">
                  <Sparkles size={15} />
                </span>
                <p>
                  {message.text}
                  {message.time && <time>{message.time}</time>}
                </p>
              </div>
            ),
          )}
        </div>
        <ul className="ig-demo-suggest" aria-label="Suggested commands">
          {suggestedCommands.map((command) => (
            <li key={command}>
              <button type="button" onClick={() => ask(command)}>
                {command}
              </button>
            </li>
          ))}
        </ul>
        <form className="ig-demo-input" onSubmit={onSubmit}>
          <Sparkle size={17} aria-hidden="true" />
          <label className="ig-sr" htmlFor="ig-demo-command">
            Ask the demo agent
          </label>
          <input
            id="ig-demo-command"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask anything or type a command..."
            autoComplete="off"
          />
          <button type="submit" aria-label="Send">
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </form>
      </article>
    </div>
  );
}
