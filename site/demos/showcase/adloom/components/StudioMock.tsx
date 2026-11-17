"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUp,
  AtSign,
  Bookmark,
  ChevronDown,
  CreditCard,
  Gem,
  Gift,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  MessageCircle,
  PanelLeft,
  Paperclip,
  Shapes,
  SlidersHorizontal,
  Square,
  SquarePen,
  Tags,
  Timer,
  UserPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import {
  aspectRatios,
  composerDefault,
  conversations,
  durations,
  freshTiles,
  models,
  resolutions,
  sidebarViews,
  type AdTile,
  type SidebarId,
} from "../data/studio";
import { AdArt } from "./AdArt";
import { Logo, LogoMark } from "./Logo";
import "./StudioMock.css";

type Run = { prompt: string; reply: string; tiles: [AdTile, AdTile, AdTile]; ready: number; live: boolean };

const sidebarIcons: Record<SidebarId, LucideIcon> = {
  start: Home,
  dashboard: LayoutGrid,
  library: ImageIcon,
  campaigns: Tags,
  creators: Users,
  studio: Video,
  products: Gift,
  widgets: Shapes,
  recruitment: UserPlus,
  billing: CreditCard,
};

const mainNav: { id: SidebarId; label: string }[] = [
  { id: "start", label: "Get started" },
  { id: "dashboard", label: "Dashboard" },
  { id: "library", label: "Content Library" },
  { id: "campaigns", label: "Campaigns" },
  { id: "creators", label: "My Creators" },
  { id: "studio", label: "Ad Video Studio" },
  { id: "products", label: "Product Center" },
  { id: "widgets", label: "Website Widgets" },
  { id: "recruitment", label: "Creator Recruitment" },
];

const initialRuns: Record<string, Run> = Object.fromEntries(
  conversations.map((c) => [c.id, { prompt: c.prompt, reply: c.reply, tiles: c.tiles, ready: c.ready, live: false }]),
);

const defaultBrief = composerDefault.before + composerDefault.mention + composerDefault.after;
const mentionPattern = /(@[A-Za-z]+(?: product shots| creator clips)?)/g;

function next<T>(list: readonly T[], current: T): T {
  return list[(list.indexOf(current) + 1) % list.length];
}

export function StudioMock() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const [view, setView] = useState<SidebarId>("studio");
  const [chatId, setChatId] = useState(conversations[0].id);
  const [runs, setRuns] = useState(initialRuns);
  const [brief, setBrief] = useState(defaultBrief);
  const [hint, setHint] = useState("");
  const [attached, setAttached] = useState(false);
  const [saved, setSaved] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [compact, setCompact] = useState(false);
  const [formatOpen, setFormatOpen] = useState(true);
  const [model, setModel] = useState<string>(models[0]);
  const [ratio, setRatio] = useState<(typeof aspectRatios)[number]>(aspectRatios[0]);
  const [resolution, setResolution] = useState<(typeof resolutions)[number]>(resolutions[0]);
  const [duration, setDuration] = useState<(typeof durations)[number]>(durations[0]);

  const run = runs[chatId];

  useEffect(() => {
    if (!run.live || run.ready >= 3) return;
    const timer = window.setTimeout(() => {
      setRuns((all) => ({ ...all, [chatId]: { ...all[chatId], ready: all[chatId].ready + 1 } }));
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [run, chatId]);

  const send = () => {
    const text = brief.trim();
    if (!text) {
      setHint("Write a short brief first.");
      composerRef.current?.focus();
      return;
    }
    setHint("");
    setRuns((all) => ({
      ...all,
      [chatId]: {
        prompt: text,
        reply: `Three new concepts in ${ratio}, ${resolution}, ${duration} from ${model}`,
        tiles: freshTiles,
        ready: 0,
        live: true,
      },
    }));
    setBrief("");
  };

  const addMention = () => {
    setBrief((value) => `${value}${value && !value.endsWith(" ") ? " " : ""}${composerDefault.mention} `);
    composerRef.current?.focus();
  };

  const newBrief = () => {
    setView("studio");
    setBrief("");
    setHint("");
    composerRef.current?.focus();
  };

  const activeView = sidebarViews.find((item) => item.id === view);
  const viewLabel = view === "studio" ? "Ad Video Studio" : (activeView?.label ?? "");
  const status = run.ready >= 3 ? "Done" : "Generating....";

  const navButton = (id: SidebarId, label: string) => {
    const Icon = sidebarIcons[id];
    return (
      <li key={id}>
        <button
          type="button"
          className={view === id ? "al-studio-mock-side-active" : "al-studio-mock-side-item"}
          aria-current={view === id ? "page" : undefined}
          onClick={() => setView(id)}
          title={compact ? label : undefined}
        >
          <Icon size={13} strokeWidth={1.6} aria-hidden="true" />
          <span className="al-studio-mock-side-label">{label}</span>
        </button>
      </li>
    );
  };

  return (
    <div className="al-studio-mock-window" data-compact={compact || undefined} role="group" aria-label="Adloom studio, interactive preview">
      <aside className="al-studio-mock-sidebar">
        <div className="al-studio-mock-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="al-studio-mock-side-head">
          <span className="al-studio-mock-side-logo">
            <Logo variant="app" />
          </span>
          <span className="al-studio-mock-side-mark">
            <LogoMark size={17} />
          </span>
          <button type="button" className="al-studio-mock-icon-button" aria-label={compact ? "Expand sidebar" : "Collapse sidebar"} aria-pressed={compact} onClick={() => setCompact((v) => !v)}>
            <PanelLeft size={13} strokeWidth={1.6} />
          </button>
        </div>
        <ul className="al-studio-mock-side-list">{mainNav.map((item) => navButton(item.id, item.label))}</ul>
        <div className="al-studio-mock-side-foot">
          <p className="al-studio-mock-side-caption">Settings</p>
          <ul className="al-studio-mock-side-list">{navButton("billing", "Billing")}</ul>
        </div>
      </aside>

      <div className="al-studio-mock-body">
        <div className="al-studio-mock-topbar">
          <p className="al-studio-mock-crumbs">
            <span>Adloom</span>
            <span aria-hidden="true">/</span>
            <strong>{viewLabel}</strong>
          </p>
          <span className="al-studio-mock-avatar" aria-label="Signed in as Halden Eyewear">
            H
          </span>
        </div>

        {view === "studio" ? (
          <div className="al-studio-mock-studio">
            <div className="al-studio-mock-history" data-open={historyOpen || undefined}>
              <div className="al-studio-mock-history-tools">
                <button type="button" className="al-studio-mock-icon-button" aria-label={historyOpen ? "Hide history" : "Show history"} aria-expanded={historyOpen} onClick={() => setHistoryOpen((v) => !v)}>
                  <PanelLeft size={13} strokeWidth={1.6} />
                </button>
                <span className="al-studio-mock-history-right">
                  <button type="button" className="al-studio-mock-icon-button" aria-label="Save this conversation" aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
                    <Bookmark size={13} strokeWidth={1.6} fill={saved ? "currentColor" : "none"} />
                  </button>
                  <button type="button" className="al-studio-mock-icon-button" aria-label="New brief" onClick={newBrief}>
                    <SquarePen size={13} strokeWidth={1.6} />
                  </button>
                </span>
              </div>
              {historyOpen && (
                <>
                  <p className="al-studio-mock-history-caption">Today</p>
                  <ul className="al-studio-mock-history-list">
                    {conversations.map((c) => (
                      <li key={c.id}>
                        <button type="button" className={c.id === chatId ? "al-studio-mock-chat-active" : "al-studio-mock-chat"} aria-current={c.id === chatId ? "true" : undefined} onClick={() => setChatId(c.id)}>
                          <MessageCircle size={11} strokeWidth={1.6} aria-hidden="true" />
                          <span>{c.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="al-studio-mock-thread">
              <div className="al-studio-mock-messages" aria-live="polite">
                <div className="al-studio-mock-user-row">
                  <p className="al-studio-mock-bubble">{run.prompt}</p>
                  <span className="al-studio-mock-avatar-small" aria-hidden="true">
                    H
                  </span>
                </div>
                <div className="al-studio-mock-reply-row">
                  <span className="al-studio-mock-bot-mark" aria-hidden="true">
                    <LogoMark size={14} />
                  </span>
                  <div className="al-studio-mock-reply">
                    <p className="al-studio-mock-status">{status}</p>
                    <p className="al-studio-mock-reply-text">{run.reply}</p>
                    <ul className="al-studio-mock-tiles">
                      {run.tiles.map((tile, index) => (
                        <li key={`${chatId}-${index}-${run.prompt.length}`} className="al-studio-mock-tile">
                          {index < run.ready ? (
                            <span className="al-studio-mock-tile-art">
                              <AdArt tile={tile} idPrefix={`${uid}${index}`} />
                            </span>
                          ) : (
                            <span className="al-studio-mock-tile-pending">Creating...</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="al-studio-mock-composer-wrap">
                <div className="al-studio-mock-composer">
                  <div className="al-studio-mock-field">
                    <div className="al-studio-mock-mirror" aria-hidden="true">
                      {brief.split(mentionPattern).map((part, index) =>
                        index % 2 === 1 ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>,
                      )}
                    </div>
                    <textarea
                      ref={composerRef}
                      value={brief}
                      rows={2}
                      aria-label="Brief for the studio"
                      aria-describedby={hint ? `${uid}-hint` : undefined}
                      placeholder="Describe the ads you want. Use @ to mention a collection."
                      onChange={(event) => {
                        setBrief(event.target.value);
                        if (hint) setHint("");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          send();
                        }
                      }}
                    />
                  </div>
                  {(hint || attached) && (
                    <p id={`${uid}-hint`} className="al-studio-mock-hint" role={hint ? "alert" : undefined}>
                      {hint || "Attached: halden-brand-kit.pdf"}
                    </p>
                  )}
                  <div className="al-studio-mock-composer-bar">
                    <button type="button" className="al-studio-mock-round-button" aria-label="Attach the brand kit" aria-pressed={attached} onClick={() => setAttached((v) => !v)}>
                      <Paperclip size={12} strokeWidth={1.7} />
                    </button>
                    <button type="button" className="al-studio-mock-round-button" aria-label="Mention the Halden product shots" onClick={addMention}>
                      <AtSign size={12} strokeWidth={1.7} />
                    </button>
                    <label className="al-studio-mock-model">
                      <span className="al-sr">Model</span>
                      <select value={model} onChange={(event) => setModel(event.target.value)}>
                        {models.map((name) => (
                          <option key={name}>{name}</option>
                        ))}
                      </select>
                      <ChevronDown size={12} strokeWidth={1.8} aria-hidden="true" />
                    </label>
                    <button type="button" className="al-studio-mock-send" aria-label="Generate concepts" onClick={send}>
                      <ArrowUp size={12} strokeWidth={2} />
                    </button>
                  </div>
                </div>
                <div className="al-studio-mock-format">
                  <button type="button" className="al-studio-mock-format-button" aria-expanded={formatOpen} onClick={() => setFormatOpen((v) => !v)}>
                    <SlidersHorizontal size={11} strokeWidth={1.7} aria-hidden="true" />
                    Format
                  </button>
                  {formatOpen && (
                    <>
                      <button type="button" className="al-studio-mock-chip" aria-label={`Aspect ratio ${ratio}. Change`} onClick={() => setRatio(next(aspectRatios, ratio))}>
                        <Square size={12} strokeWidth={1.7} aria-hidden="true" />
                        {ratio}
                      </button>
                      <button type="button" className="al-studio-mock-chip" aria-label={`Resolution ${resolution}. Change`} onClick={() => setResolution(next(resolutions, resolution))}>
                        <Gem size={12} strokeWidth={1.7} aria-hidden="true" />
                        {resolution}
                      </button>
                      <button type="button" className="al-studio-mock-chip" aria-label={`Length ${duration}. Change`} onClick={() => setDuration(next(durations, duration))}>
                        <Timer size={12} strokeWidth={1.7} aria-hidden="true" />
                        {duration}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          activeView && (
            <div className="al-studio-mock-panel">
              <h3>{activeView.label}</h3>
              <p>{activeView.summary}</p>
              <table>
                <thead>
                  <tr>
                    {activeView.columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeView.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="al-studio-mock-back" onClick={() => setView("studio")}>
                Back to the studio
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
