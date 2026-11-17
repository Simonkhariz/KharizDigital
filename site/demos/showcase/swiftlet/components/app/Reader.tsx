import { Archive, ArrowLeft, Inbox, Mail, MailOpen, Reply, Sparkles, Star, Timer } from "lucide-react";
import type { ReactNode } from "react";
import { account } from "../../data/mailbox";
import { Avatar, Key, TagChip } from "../Bits";
import type { Mailbox } from "./useMailbox";

function Tool({ label, hint, onClick, pressed, children }: { label: string; hint: string; onClick: () => void; pressed?: boolean; children: ReactNode }) {
  return (
    <button type="button" className="sw-app-tool" aria-label={`${label} (${hint})`} title={`${label} (${hint})`} aria-pressed={pressed} onClick={onClick}>
      {children}
      <span>{label}</span>
      <Key>{hint}</Key>
    </button>
  );
}

export function Reader({ mail }: { mail: Mailbox }) {
  const message = mail.selected;

  if (!message) {
    return (
      <section className="sw-app-reader sw-app-reader-empty" aria-label="Reading pane">
        <div>
          <strong>No message selected</strong>
          <p>
            Press <Key>J</Key> to open the first message, or <Key>?</Key> to see every shortcut.
          </p>
        </div>
      </section>
    );
  }

  const isSent = message.folder === "sent";

  return (
    <section className="sw-app-reader" aria-label={`Message: ${message.subject}`}>
      <div className="sw-app-tools" role="toolbar" aria-label="Message actions">
        <button type="button" className="sw-app-back" onClick={() => mail.select(null)}>
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </button>
        <Tool label={message.folder === "archive" ? "To Inbox" : "Archive"} hint="E" onClick={mail.archive}>
          {message.folder === "archive" ? <Inbox size={15} aria-hidden="true" /> : <Archive size={15} aria-hidden="true" />}
        </Tool>
        <Tool label={message.starred ? "Starred" : "Star"} hint="S" pressed={message.starred} onClick={() => mail.toggleStar()}>
          <Star size={15} aria-hidden="true" />
        </Tool>
        <Tool label={message.unread ? "Mark read" : "Mark unread"} hint="U" onClick={mail.toggleRead}>
          {message.unread ? <MailOpen size={15} aria-hidden="true" /> : <Mail size={15} aria-hidden="true" />}
        </Tool>
        <Tool label={message.folder === "later" ? "To Inbox" : "Later"} hint="H" onClick={mail.later}>
          <Timer size={15} aria-hidden="true" />
        </Tool>
        <Tool label="Reply" hint="R" onClick={() => mail.reply()}>
          <Reply size={15} aria-hidden="true" />
        </Tool>
      </div>

      <article className="sw-app-message">
        <header>
          <h2>{message.subject}</h2>
          {message.tag && <TagChip tag={message.tag} />}
        </header>
        <div className="sw-app-from">
          <Avatar initials={isSent ? account.initials : message.initials} tone={isSent ? "ink" : message.tone} size={38} />
          <p>
            <strong>{isSent ? account.name : message.name}</strong>
            <span>{isSent ? `to ${message.name} <${message.email}>` : `${message.email} to me`}</span>
          </p>
          <time>{message.time}</time>
        </div>
        <div className="sw-app-text">
          {message.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {message.draft && !isSent && (
          <aside className="sw-app-draft" aria-label="Prepared reply">
            <header>
              <span className="sw-draft-icon" aria-hidden="true">
                <Sparkles size={14} />
              </span>
              <strong>Drafted by Swiftlet</strong>
              <span className="sw-draft-tone">Friendly tone</span>
            </header>
            <p>{message.draft}</p>
            <button type="button" className="sw-draft-send" onClick={() => mail.reply(message.draft)}>
              Use this draft
            </button>
          </aside>
        )}
      </article>
    </section>
  );
}
