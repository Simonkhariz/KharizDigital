"use client";

import { Archive, Bell, Check, ChevronDown, Clock, FileText, Inbox, Play, Search, Send, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { mockAgents, mockDocs } from "../data/content";
import { account } from "../data/mailbox";
import { Avatar, TagChip } from "./Bits";
import { BrandMark } from "./Logo";
import { mockFolders, type MockFolder, type MockMail } from "./useMockMail";
import "./Mock.css";

export type MockView = "mail" | "agents" | "docs";
type AgentId = (typeof mockAgents)[number]["id"];
type DocId = (typeof mockDocs)[number]["id"];

const views: { id: MockView; label: string }[] = [
  { id: "mail", label: "Mail" },
  { id: "agents", label: "Agents" },
  { id: "docs", label: "Docs" },
];

const folderIcons: Record<MockFolder, typeof Inbox> = {
  inbox: Inbox,
  focus: Star,
  waiting: Clock,
  later: Archive,
  sent: Send,
};

const segments: MockFolder[] = ["focus", "waiting", "later"];

type Props = {
  mail: MockMail;
  view: MockView;
  onView: (view: MockView) => void;
  searchRef: RefObject<HTMLInputElement | null>;
};

export function ProductMock({ mail, view, onView, searchRef }: Props) {
  const [agentId, setAgentId] = useState<AgentId>("style");
  const [docId, setDocId] = useState<DocId>("q3");

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      if (event.key === "Escape") target.blur();
      return;
    }
    if (view !== "mail" || event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "j" || key === "k" || key === "e") {
      event.preventDefault();
      if (key === "j") mail.move(1);
      if (key === "k") mail.move(-1);
      if (key === "e") mail.archive();
    }
  };

  return (
    <div className="sw-mock">
      <div className="sw-mock-tabs" role="tablist" aria-label="Product areas">
        {views.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            id={`sw-mock-tab-${entry.id}`}
            aria-selected={view === entry.id}
            aria-controls="sw-mock-window"
            className="sw-mock-tab"
            onClick={() => onView(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div
        id="sw-mock-window"
        className="sw-window"
        role="tabpanel"
        aria-labelledby={`sw-mock-tab-${view}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="sw-window-bar">
          <span className="sw-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <label className="sw-window-search">
            <Search size={14} aria-hidden="true" />
            <span className="sw-sr">Search mail, docs and agents</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search mail, docs and agents"
              value={mail.query}
              onChange={(event) => {
                onView("mail");
                mail.setQuery(event.target.value);
              }}
            />
            <span className="sw-window-search-key" aria-hidden="true">
              ⌘K
            </span>
          </label>
          <span className="sw-window-user">
            <Bell size={15} aria-hidden="true" />
            <Avatar initials={account.initials} tone="ink" size={26} />
          </span>
        </div>

        <div className="sw-window-body">
          <aside className="sw-side" aria-label="Workspace">
            <div className="sw-side-team">
              <BrandMark size={22} />
              <strong>Swiftlet</strong>
              <ChevronDown size={14} aria-hidden="true" />
            </div>
            <ul>
              {mockFolders.map((entry) => {
                const Icon = folderIcons[entry.id];
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      className="sw-side-item"
                      aria-current={view === "mail" && mail.folder === entry.id ? "true" : undefined}
                      onClick={() => {
                        onView("mail");
                        mail.openFolder(entry.id);
                      }}
                    >
                      <Icon size={15} aria-hidden="true" />
                      <span>{entry.label}</span>
                      {mail.counts[entry.id] > 0 && entry.id !== "sent" && <small>{mail.counts[entry.id]}</small>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="sw-side-label">Agents</p>
            <ul>
              {mockAgents.map((agent) => (
                <li key={agent.id}>
                  <button
                    type="button"
                    className="sw-side-item"
                    aria-current={view === "agents" && agentId === agent.id ? "true" : undefined}
                    onClick={() => {
                      onView("agents");
                      setAgentId(agent.id);
                    }}
                  >
                    <i className="sw-side-swatch" style={{ background: agent.color }} aria-hidden="true" />
                    <span>{agent.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="sw-side-label">Docs</p>
            <ul>
              {mockDocs.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    className="sw-side-item"
                    aria-current={view === "docs" && docId === doc.id ? "true" : undefined}
                    onClick={() => {
                      onView("docs");
                      setDocId(doc.id);
                    }}
                  >
                    <FileText size={15} aria-hidden="true" />
                    <span>{doc.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {view === "mail" && <MailPane mail={mail} />}
          {view === "agents" && <AgentPane key={agentId} agentId={agentId} />}
          {view === "docs" && <DocPane key={docId} docId={docId} />}
        </div>
      </div>

      {view === "mail" && <DraftCard mail={mail} />}
    </div>
  );
}

function MailPane({ mail }: { mail: MockMail }) {
  const label = mockFolders.find((entry) => entry.id === mail.folder)?.label ?? "Inbox";
  const unread = mail.visible.filter((message) => message.unread).length;

  return (
    <section className="sw-pane" aria-label={`${label} messages`}>
      <header className="sw-pane-head">
        <h3>{label}</h3>
        <span>{mail.query ? `${mail.visible.length} found` : unread > 0 ? `${unread} unread` : `${mail.visible.length} threads`}</span>
        <div className="sw-segments" role="group" aria-label="Views">
          {segments.map((id) => (
            <button key={id} type="button" aria-pressed={mail.folder === id} onClick={() => mail.openFolder(id)}>
              {mockFolders.find((entry) => entry.id === id)?.label}
            </button>
          ))}
        </div>
      </header>
      {mail.visible.length === 0 ? (
        <div className="sw-pane-empty">
          <p>{mail.query ? `Nothing matches “${mail.query}”.` : "All clear. Nothing left here."}</p>
          <button type="button" className="sw-chip-button" onClick={mail.reset}>
            Reset the demo inbox
          </button>
        </div>
      ) : (
        <ul className="sw-rows">
          {mail.visible.slice(0, 6).map((message) => (
            <li key={message.id}>
              <button
                type="button"
                className="sw-row"
                aria-current={mail.selected?.id === message.id ? "true" : undefined}
                onClick={() => mail.setSelectedId(message.id)}
              >
                <i className="sw-row-dot" data-on={message.unread} aria-hidden="true" />
                <Avatar initials={message.initials} tone={message.tone} />
                <span className="sw-row-main">
                  <span className="sw-row-top">
                    <strong>{message.name}</strong>
                    {message.tag && <TagChip tag={message.tag} />}
                    {mail.replied.includes(message.id) && <span className="sw-row-replied">Replied</span>}
                  </span>
                  <span className="sw-row-bottom">
                    <b>{message.subject}</b>
                    <span> · {message.preview}</span>
                  </span>
                </span>
                <time>{message.time}</time>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="sw-sr" role="status">
        {mail.notice}
      </p>
    </section>
  );
}

function DraftCard({ mail }: { mail: MockMail }) {
  const message = mail.selected;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message?.draft ?? "");
  const [forId, setForId] = useState(message?.id ?? null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  if ((message?.id ?? null) !== forId) {
    setForId(message?.id ?? null);
    setText(message?.draft ?? "");
    setEditing(false);
  }

  useEffect(() => {
    if (editing) areaRef.current?.focus();
  }, [editing]);

  if (!message) return null;
  const sent = mail.replied.includes(message.id);
  const canSend = text.trim().length > 0;

  return (
    <aside className="sw-draft" aria-label={`Draft reply to ${message.name}`}>
      <header>
        <span className="sw-draft-icon" aria-hidden="true">
          <Sparkles size={14} />
        </span>
        <strong>{sent ? "Reply sent" : message.draft ? "Drafted by Swiftlet" : "No draft yet"}</strong>
        <span className="sw-draft-tone">{sent ? "Demo" : "Friendly tone"}</span>
      </header>
      {sent ? (
        <p role="status">Sent to {message.name}. This is a demo, so nothing left your browser.</p>
      ) : editing ? (
        <textarea
          ref={areaRef}
          aria-label="Reply text"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && canSend) mail.sendDraft();
          }}
        />
      ) : (
        <p>{text || "Press Edit to write a reply to this thread yourself."}</p>
      )}
      <footer>
        {sent ? (
          <button type="button" className="sw-chip-button" onClick={() => mail.move(1)}>
            Next message
          </button>
        ) : (
          <>
            <button type="button" className="sw-draft-send" disabled={!canSend} onClick={mail.sendDraft}>
              Send <Send size={13} aria-hidden="true" />
            </button>
            <button type="button" className="sw-chip-button" aria-pressed={editing} onClick={() => setEditing((value) => !value)}>
              {editing ? "Done" : "Edit"}
            </button>
            <span className="sw-draft-hint" aria-hidden="true">
              ⌘ Enter
            </span>
          </>
        )}
      </footer>
    </aside>
  );
}

function AgentPane({ agentId }: { agentId: AgentId }) {
  const agent = mockAgents.find((entry) => entry.id === agentId) ?? mockAgents[0];
  const [step, setStep] = useState<number>(agent.steps.length);
  const running = step < agent.steps.length;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 650);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  return (
    <section className="sw-pane sw-pane-pad" aria-label={`${agent.name} details`}>
      <header className="sw-pane-head">
        <h3>{agent.name}</h3>
        <span>{running ? "Running" : agent.stat}</span>
        <button type="button" className="sw-chip-button sw-pane-action" disabled={running} onClick={() => setStep(0)}>
          <Play size={12} aria-hidden="true" /> {running ? "Running…" : "Run now"}
        </button>
      </header>
      <p className="sw-agent-summary">{agent.summary}</p>
      <ol className="sw-agent-steps" aria-live="polite">
        {agent.steps.map((text, index) => (
          <li key={text} data-state={index < step ? "done" : index === step ? "active" : "todo"}>
            <i aria-hidden="true">{index < step && <Check size={11} strokeWidth={3} />}</i>
            {text}
          </li>
        ))}
      </ol>
    </section>
  );
}

function DocPane({ docId }: { docId: DocId }) {
  const doc = mockDocs.find((entry) => entry.id === docId) ?? mockDocs[0];
  const [state, setState] = useState<"open" | "accepted" | "dismissed">("open");

  return (
    <section className="sw-pane sw-pane-pad" aria-label={`Document: ${doc.title}`}>
      <header className="sw-pane-head">
        <h3>{doc.title}</h3>
        <span>{doc.meta}</span>
      </header>
      <div className="sw-doc">
        {doc.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{state === "accepted" ? doc.after : <mark data-open={state === "open"}>{doc.before}</mark>}</p>
        {state === "open" ? (
          <div className="sw-doc-suggest">
            <span className="sw-draft-icon" aria-hidden="true">
              <Sparkles size={14} />
            </span>
            <p>
              <strong>Vague sentence.</strong> Try: “{doc.after}”
            </p>
            <button type="button" className="sw-draft-send" onClick={() => setState("accepted")}>
              Accept
            </button>
            <button type="button" className="sw-chip-button" onClick={() => setState("dismissed")}>
              Dismiss
            </button>
          </div>
        ) : (
          <p className="sw-doc-note" role="status">
            {state === "accepted" ? "Suggestion applied." : "Suggestion dismissed."}{" "}
            <button type="button" onClick={() => setState("open")}>
              Undo
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
