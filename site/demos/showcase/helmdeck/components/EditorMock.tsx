"use client";

import {
  ChevronDown,
  ChevronRight,
  CircleCheck,
  FileText,
  Folder,
  FolderOpen,
  MoreHorizontal,
  Network,
  Puzzle,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { Fragment, useState, type FormEvent, type ReactNode } from "react";
import clsx from "clsx";
import {
  assistantAnswers,
  completions,
  files,
  folders,
  panelTabs,
  refactoredAuthLines,
  sidebarViews,
} from "../data/editor";
import "./EditorMock.css";

type SidebarView = "explorer" | keyof typeof sidebarViews;
type Suggestion = "open" | "applied" | "discarded";

const keywords = new Set(["import", "from", "async", "function", "const", "await", "try", "return", "export", "new", "if"]);

/** Minimal highlighter for the demo snippets: keywords, strings, type names and calls. */
function highlight(line: string): ReactNode[] {
  const parts = line.split(/('[^']*'|[A-Za-z_][A-Za-z0-9_]*|\s+)/).filter(Boolean);
  return parts.map((part, index) => {
    const next = parts[index + 1] ?? "";
    let tone: string | undefined;
    if (part.startsWith("'")) tone = "hd-editor-string";
    else if (keywords.has(part)) tone = "hd-editor-keyword";
    else if (/^[A-Z]/.test(part) || part === "string" || part === "boolean") tone = "hd-editor-type";
    else if (/^[a-z]/.test(part) && next.startsWith("(")) tone = "hd-editor-call";
    return tone ? (
      <span key={index} className={tone}>
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    );
  });
}

const activity: Array<{ id: SidebarView; label: string; icon: ReactNode }> = [
  { id: "explorer", label: "Explorer", icon: <FolderOpen size={17} aria-hidden="true" /> },
  { id: "search", label: "Search", icon: <Search size={17} aria-hidden="true" /> },
  { id: "source", label: "Source control", icon: <Network size={17} aria-hidden="true" /> },
  { id: "extensions", label: "Extensions", icon: <Puzzle size={17} aria-hidden="true" /> },
];

export function EditorMock() {
  const [view, setView] = useState<SidebarView>("explorer");
  const [servicesOpen, setServicesOpen] = useState(true);
  const [openIds, setOpenIds] = useState<string[]>(["auth", "data"]);
  const [activeId, setActiveId] = useState("auth");
  const [completion, setCompletion] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const [panel, setPanel] = useState<string>(panelTabs[0].id);
  const [suggestion, setSuggestion] = useState<Suggestion>("open");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const activeFile = files.find((file) => file.id === activeId) ?? files[0];
  const lines = activeFile.id === "auth" && suggestion === "applied" ? refactoredAuthLines : activeFile.lines;
  const activePanel = panelTabs.find((tab) => tab.id === panel) ?? panelTabs[0];

  const openFile = (id: string) => {
    setOpenIds((current) => (current.includes(id) ? current : [...current, id]));
    setActiveId(id);
  };

  const closeFile = (id: string) => {
    const remaining = openIds.filter((openId) => openId !== id);
    if (remaining.length === 0) return;
    setOpenIds(remaining);
    if (activeId === id) setActiveId(remaining[0]);
  };

  const onAsk = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;
    setAnswers((current) => [...current, assistantAnswers[current.length % assistantAnswers.length]].slice(-1));
    setQuestion("");
  };

  return (
    <div className="hd-editor" role="group" aria-label="Helmdeck editor preview">
      <div className="hd-editor-side">
        <div className="hd-editor-activity" role="group" aria-label="Sidebar view">
          {activity.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="hd-editor-side-head">
          <span>{activity.find((item) => item.id === view)?.label}</span>
          <MoreHorizontal size={14} aria-hidden="true" />
        </div>
        {view === "explorer" ? (
          <ul className="hd-editor-tree">
            <li className="hd-editor-root">
              <ChevronRight size={12} aria-hidden="true" />
              <Folder size={13} aria-hidden="true" />
              Helm-Platform
            </li>
            {folders.map((folder) => (
              <li key={folder} className="hd-editor-node">
                <Folder size={13} aria-hidden="true" />
                {folder}
              </li>
            ))}
            <li>
              <button
                type="button"
                className="hd-editor-node hd-editor-folder"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
              >
                <ChevronDown size={12} aria-hidden="true" />
                <FolderOpen size={13} aria-hidden="true" />
                services
              </button>
              {servicesOpen && (
                <ul>
                  {files
                    .filter((file) => file.folder === "services")
                    .map((file) => (
                      <li key={file.id}>
                        <button
                          type="button"
                          className={clsx("hd-editor-node hd-editor-file", activeId === file.id && "is-active")}
                          aria-current={activeId === file.id ? "true" : undefined}
                          onClick={() => openFile(file.id)}
                        >
                          <FileText size={13} aria-hidden="true" />
                          {file.name}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </li>
            <li className="hd-editor-node">
              <Folder size={13} aria-hidden="true" />
              styles
            </li>
            <li>
              <button
                type="button"
                className={clsx("hd-editor-node", activeId === "config" && "is-active")}
                aria-current={activeId === "config" ? "true" : undefined}
                onClick={() => openFile("config")}
              >
                <Settings size={13} aria-hidden="true" />
                config.json
              </button>
            </li>
          </ul>
        ) : (
          <ul className="hd-editor-list">
            {sidebarViews[view].map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="hd-editor-main">
        <div className="hd-editor-tabs" role="tablist" aria-label="Open files">
          {openIds.map((id) => {
            const file = files.find((entry) => entry.id === id);
            if (!file) return null;
            const selected = id === activeId;
            return (
              <span key={id} className={clsx("hd-editor-tab", selected && "is-active")}>
                <button type="button" role="tab" aria-selected={selected} onClick={() => setActiveId(id)}>
                  <FileText size={12} aria-hidden="true" />
                  {file.name}
                </button>
                {selected && openIds.length > 1 && (
                  <button type="button" aria-label={`Close ${file.name}`} onClick={() => closeFile(id)}>
                    <X size={11} aria-hidden="true" />
                  </button>
                )}
              </span>
            );
          })}
        </div>
        <div className="hd-editor-code" role="tabpanel" aria-label={activeFile.name}>
          <ol start={activeFile.firstLine}>
            {lines.map((line, index) => (
              <li key={`${activeFile.id}-${index}`} className={clsx(index === 4 && activeFile.id === "auth" && "is-current")}>
                <code>{highlight(line)}</code>
              </li>
            ))}
          </ol>
          {activeFile.id === "auth" && (
            <div className="hd-editor-complete">
              <code>
                ser = <span className="hd-editor-keyword">await</span> db.users.
                {completion ? `${completion}({ where: { id } });` : "fin"}
              </code>
              {!completion && (
                <ul role="listbox" aria-label="Completions">
                  {completions.map((name, index) => (
                    <li key={name} role="option" aria-selected={highlighted === index}>
                      <button
                        type="button"
                        onMouseEnter={() => setHighlighted(index)}
                        onFocus={() => setHighlighted(index)}
                        onClick={() => setCompletion(name)}
                      >
                        <Sparkles size={11} aria-hidden="true" />
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {completion && (
                <button type="button" className="hd-editor-undo" onClick={() => setCompletion(null)}>
                  Undo
                </button>
              )}
            </div>
          )}
        </div>
        <div className="hd-editor-panel">
          <div role="tablist" aria-label="Panel">
            {panelTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={panel === tab.id}
                onClick={() => setPanel(tab.id)}
              >
                {tab.label}
                {"badge" in tab && <i>{tab.badge}</i>}
              </button>
            ))}
          </div>
          <pre role="tabpanel" aria-label={activePanel.label}>
            {activePanel.lines.map((line) => (
              <span key={line} className={clsx(line.startsWith("✓") && "is-success")}>
                {line.startsWith("✓") && <CircleCheck size={11} aria-hidden="true" />}
                {line.replace("✓ ", "")}
                {"\n"}
              </span>
            ))}
          </pre>
        </div>
      </div>

      <div className="hd-editor-ai">
        <div className="hd-editor-ai-head">
          <span>
            <Sparkles size={15} aria-hidden="true" />
          </span>
          <div>
            <strong>Helm AI</strong>
            <small>Active assistant</small>
          </div>
        </div>
        <div className="hd-editor-ai-body" aria-live="polite">
          <p className="hd-editor-ai-note">
            <Sparkles size={12} aria-hidden="true" />
            <span>
              {suggestion === "applied"
                ? "Applied. Token checks in auth-service.ts now go through AuthManager, with one place for error logging."
                : suggestion === "discarded"
                  ? "Suggestion discarded. Nothing was changed in auth-service.ts."
                  : "I've noticed you're manually verifying tokens. We should implement the new centralized AuthManager middleware to handle error logging and session expiration consistently."}
            </span>
          </p>
          {suggestion === "open" ? (
            <div className="hd-editor-diff">
              <p>
                <b>Refactor suggestion</b> auth-service.ts : L42
              </p>
              <pre>
                <del>- const decoded = await{"\n"}jwt.verify(token);</del>
                {"\n"}
                <ins>
                  + const {"{"} user, error {"}"} = await{"\n"}AuthManager.verify(token);{"\n"}+ if (error) return{"\n"}
                  handleAuthError(error);
                </ins>
              </pre>
              <div>
                <button type="button" className="is-primary" onClick={() => { setSuggestion("applied"); openFile("auth"); }}>
                  Apply Changes
                </button>
                <button type="button" onClick={() => setSuggestion("discarded")}>
                  Discard
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className="hd-editor-restore" onClick={() => setSuggestion("open")}>
              Show suggestion again
            </button>
          )}
          {answers.map((answer) => (
            <p key={answer} className="hd-editor-ai-note">
              <Sparkles size={12} aria-hidden="true" />
              <span>{answer}</span>
            </p>
          ))}
        </div>
        <form className="hd-editor-ask" onSubmit={onAsk}>
          <label htmlFor="hd-editor-ask" className="hd-sr">
            Ask Helm AI
          </label>
          <input
            id="hd-editor-ask"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask Helm to write tests or refactor..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
