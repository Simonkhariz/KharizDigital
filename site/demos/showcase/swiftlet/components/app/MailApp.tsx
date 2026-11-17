"use client";

import { ArrowLeft, Keyboard, Menu, PenLine, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HOME_PATH } from "../../data/content";
import { account, folders } from "../../data/mailbox";
import { Avatar, Key } from "../Bits";
import { Wordmark } from "../Logo";
import { Compose } from "./Compose";
import { MessageList } from "./MessageList";
import { Reader } from "./Reader";
import { ShortcutHelp } from "./ShortcutHelp";
import { Sidebar } from "./Sidebar";
import { useMailbox } from "./useMailbox";
import "../Shared.css";
import "../Mock.css";
import "./MailApp.css";

const TOAST_MS = 6000;
const GO_PREFIX_MS = 1200;

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.matches("input, textarea, select") || target.isContentEditable);
}

export function MailApp() {
  const mail = useMailbox();
  const [help, setHelp] = useState(false);
  const [nav, setNav] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const goPrefix = useRef(0);
  // The key handler is registered once; it reads the latest state through this ref.
  const latest = useRef({ mail, help, nav });

  useEffect(() => {
    latest.current = { mail, help, nav };
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const { mail: box, help: helpOpen, nav: navOpen } = latest.current;
      if (event.key === "Escape") {
        if (helpOpen) return;
        if (box.draft) box.setDraft(null);
        else if (navOpen) setNav(false);
        else if (isTyping(event.target)) (event.target as HTMLElement).blur();
        else if (box.query) box.setQuery("");
        else box.select(null);
        return;
      }
      if (isTyping(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "?") {
        event.preventDefault();
        setHelp((value) => !value);
        return;
      }
      if (helpOpen || box.draft) return;

      const key = event.key.toLowerCase();
      if (Date.now() - goPrefix.current < GO_PREFIX_MS) {
        goPrefix.current = 0;
        const target = folders.find((entry) => entry.key === key);
        if (target) {
          event.preventDefault();
          box.openFolder(target.id);
          return;
        }
      }
      const actions: Record<string, () => void> = {
        j: () => box.move(1),
        k: () => box.move(-1),
        arrowdown: () => box.move(1),
        arrowup: () => box.move(-1),
        e: box.archive,
        s: () => box.toggleStar(),
        u: box.toggleRead,
        h: box.later,
        z: box.undo,
        c: box.compose,
        r: () => box.reply(),
        "/": () => searchRef.current?.focus(),
        g: () => {
          goPrefix.current = Date.now();
        },
      };
      const action = actions[key];
      if (!action) return;
      event.preventDefault();
      action();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toastId = mail.toast?.id;
  const clearToast = mail.setToast;
  useEffect(() => {
    if (!toastId) return;
    const timer = window.setTimeout(() => clearToast(null), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toastId, clearToast]);

  return (
    <div className="sw-app" data-reading={mail.selected !== null} data-nav={nav}>
      <div className="sw-app-window">
        <header className="sw-app-bar">
          <button
            type="button"
            className="sw-app-icon sw-app-menu"
            aria-label={nav ? "Close folders" : "Open folders"}
            aria-expanded={nav}
            aria-controls="sw-app-drawer"
            onClick={() => setNav((value) => !value)}
          >
            {nav ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
          <Link href={HOME_PATH} className="sw-app-brand" aria-label="Swiftlet home page">
            <Wordmark size={22} />
            <span>Mail</span>
          </Link>
          <label className="sw-window-search sw-app-search">
            <Search size={14} aria-hidden="true" />
            <span className="sw-sr">Search this folder</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search this folder"
              value={mail.query}
              onChange={(event) => mail.setQuery(event.target.value)}
            />
            <Key>/</Key>
          </label>
          <div className="sw-app-bar-end">
            <button type="button" className="sw-chip-button sw-app-help-button" aria-haspopup="dialog" onClick={() => setHelp(true)}>
              <Keyboard size={15} aria-hidden="true" />
              <span>Shortcuts</span>
              <Key>?</Key>
            </button>
            <Link href={HOME_PATH} className="sw-app-exit">
              <ArrowLeft size={14} aria-hidden="true" /> Product site
            </Link>
            <span title={`${account.name}, ${account.email}`}>
              <Avatar initials={account.initials} tone="ink" size={30} />
              <span className="sw-sr">Signed in as {account.name}</span>
            </span>
          </div>
        </header>

        <div className="sw-app-body">
          <div id="sw-app-drawer" className="sw-app-drawer">
            <Sidebar mail={mail} onNavigate={() => setNav(false)} />
          </div>
          <button type="button" className="sw-app-scrim" aria-label="Close folders" tabIndex={nav ? 0 : -1} onClick={() => setNav(false)} />
          <main className="sw-app-main">
            <MessageList mail={mail} />
            <Reader mail={mail} />
          </main>
        </div>
      </div>

      <button type="button" className="sw-app-fab" aria-label="Compose" onClick={mail.compose}>
        <PenLine size={20} aria-hidden="true" />
      </button>

      {mail.draft && <Compose mail={mail} draft={mail.draft} />}
      <ShortcutHelp open={help} onClose={() => setHelp(false)} />

      <div className="sw-app-toast" role="status" aria-live="polite">
        {mail.toast && (
          <p key={mail.toast.id}>
            {mail.toast.text}
            {mail.toast.undo && (
              <button type="button" onClick={mail.undo}>
                Undo <Key>Z</Key>
              </button>
            )}
            <button type="button" aria-label="Dismiss" onClick={() => mail.setToast(null)}>
              <X size={14} aria-hidden="true" />
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
