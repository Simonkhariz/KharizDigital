import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { folders, hintKeys } from "../../data/mailbox";
import { Avatar, Key, TagChip } from "../Bits";
import type { Filter, Mailbox } from "./useMailbox";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
];

export function MessageList({ mail }: { mail: Mailbox }) {
  const label = folders.find((entry) => entry.id === mail.folder)?.label ?? "Inbox";
  const unread = mail.visible.filter((message) => message.unread).length;
  const listRef = useRef<HTMLUListElement>(null);
  const selectedId = mail.selected?.id;

  useEffect(() => {
    if (!selectedId) return;
    listRef.current?.querySelector(`[data-id="${selectedId}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  return (
    <section className="sw-app-list" aria-label={`${label} messages`}>
      <header className="sw-app-list-head">
        <h1>{label}</h1>
        <span>
          {mail.query
            ? `${mail.visible.length} found`
            : unread > 0
              ? `${unread} unread`
              : `${mail.visible.length} ${mail.visible.length === 1 ? "message" : "messages"}`}
        </span>
        <div className="sw-segments" role="group" aria-label="Filter messages">
          {filters.map((entry) => (
            <button key={entry.id} type="button" aria-pressed={mail.filter === entry.id} onClick={() => mail.setFilter(entry.id)}>
              {entry.label}
            </button>
          ))}
        </div>
      </header>

      {mail.visible.length === 0 ? (
        <div className="sw-app-empty">
          <strong>{mail.query ? "No matches" : mail.filter === "unread" ? "Nothing unread" : `${label} is empty`}</strong>
          <p>
            {mail.query
              ? `Nothing in ${label} matches “${mail.query}”.`
              : mail.filter === "unread"
                ? "You have read everything in this folder."
                : "Messages you move here will show up in this list."}
          </p>
          {(mail.query || mail.filter === "unread") && (
            <button
              type="button"
              className="sw-chip-button"
              onClick={() => {
                mail.setQuery("");
                mail.setFilter("all");
              }}
            >
              Show all messages
            </button>
          )}
        </div>
      ) : (
        <ul className="sw-app-rows" ref={listRef}>
          {mail.visible.map((message) => (
            <li key={message.id} data-id={message.id} data-selected={mail.selected?.id === message.id} data-unread={message.unread}>
              <button
                type="button"
                className="sw-app-row"
                aria-current={mail.selected?.id === message.id ? "true" : undefined}
                onClick={() => mail.select(message.id)}
              >
                <i className="sw-row-dot" data-on={message.unread} aria-hidden="true" />
                <Avatar initials={message.initials} tone={message.tone} />
                <span className="sw-row-main">
                  <span className="sw-row-top">
                    <strong>
                      {mail.folder === "sent" ? `To: ${message.name}` : message.name}
                      {message.unread && <span className="sw-sr"> (unread)</span>}
                    </strong>
                    {message.tag && <TagChip tag={message.tag} />}
                    <time>{message.time}</time>
                  </span>
                  <span className="sw-row-bottom">
                    <b>{message.subject}</b>
                    <span> · {message.preview}</span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="sw-app-star"
                aria-pressed={message.starred}
                aria-label={`${message.starred ? "Remove star from" : "Star"} “${message.subject}”`}
                onClick={() => mail.toggleStar(message.id)}
              >
                <Star size={15} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="sw-app-hints" aria-label="Common shortcuts">
        {hintKeys.map((hint) => (
          <span key={hint.label}>
            {hint.keys.map((key) => (
              <Key key={key}>{key}</Key>
            ))}
            {hint.label}
          </span>
        ))}
      </footer>
    </section>
  );
}
