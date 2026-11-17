import { Archive, Clock, Inbox, PenLine, Send, Star, Timer } from "lucide-react";
import { folders, type FolderId } from "../../data/mailbox";
import { Key } from "../Bits";
import type { Mailbox } from "./useMailbox";

const icons: Record<FolderId, typeof Inbox> = {
  inbox: Inbox,
  starred: Star,
  waiting: Clock,
  later: Timer,
  sent: Send,
  archive: Archive,
};

export function Sidebar({ mail, onNavigate }: { mail: Mailbox; onNavigate: () => void }) {
  return (
    <nav className="sw-app-side" aria-label="Folders">
      <button
        type="button"
        className="sw-app-compose"
        onClick={() => {
          onNavigate();
          mail.compose();
        }}
      >
        <PenLine size={15} aria-hidden="true" />
        <span>Compose</span>
        <Key>C</Key>
      </button>
      <ul>
        {folders.map((entry) => {
          const Icon = icons[entry.id];
          const count = mail.counts[entry.id];
          return (
            <li key={entry.id}>
              <button
                type="button"
                className="sw-side-item"
                aria-current={mail.folder === entry.id ? "page" : undefined}
                onClick={() => {
                  mail.openFolder(entry.id);
                  onNavigate();
                }}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{entry.label}</span>
                {count > 0 && (
                  <small>
                    {count}
                    <span className="sw-sr">{entry.id === "inbox" ? " unread" : " messages"}</span>
                  </small>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sw-app-side-note">
        Press <Key>G</Key> then the first letter of a folder to jump to it.
      </p>
    </nav>
  );
}
