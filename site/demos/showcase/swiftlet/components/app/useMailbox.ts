"use client";

import { useCallback, useMemo, useState } from "react";
import { account, folders, messages as seed, type FolderId, type Message } from "../../data/mailbox";

export type Filter = "all" | "unread";
export type Draft = { to: string; subject: string; body: string; replyTo?: string };
export type Toast = { id: number; text: string; undo?: Message[] };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function inFolder(message: Message, folder: FolderId) {
  return folder === "starred" ? message.starred && message.folder !== "archive" : message.folder === folder;
}

export function validateDraft(draft: Draft) {
  const errors: Partial<Record<"to" | "subject" | "body", string>> = {};
  const recipients = draft.to.split(/[,;]/).map((entry) => entry.trim()).filter(Boolean);
  if (recipients.length === 0) errors.to = "Add at least one recipient.";
  else if (!recipients.every((entry) => emailPattern.test(entry))) errors.to = "Check the address: use the form name@company.example.";
  if (draft.subject.trim().length === 0) errors.subject = "Add a subject.";
  if (draft.body.trim().length < 2) errors.body = "Write a message before sending.";
  return errors;
}

/** All state for the demo mail application. Everything lives in memory and resets on reload. */
export function useMailbox() {
  const [list, setList] = useState<Message[]>(seed);
  const [folder, setFolder] = useState<FolderId>("inbox");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const counts = useMemo(() => {
    const result = {} as Record<FolderId, number>;
    for (const entry of folders) {
      const items = list.filter((message) => inFolder(message, entry.id));
      result[entry.id] = entry.id === "inbox" ? items.filter((message) => message.unread).length : items.length;
    }
    return result;
  }, [list]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return list.filter((message) => {
      if (!inFolder(message, folder)) return false;
      if (filter === "unread" && !message.unread && message.id !== selectedId) return false;
      if (!needle) return true;
      return `${message.name} ${message.email} ${message.subject} ${message.preview} ${message.body.join(" ")} ${message.tag ?? ""}`
        .toLowerCase()
        .includes(needle);
    });
  }, [list, folder, filter, query, selectedId]);

  const selected = visible.find((message) => message.id === selectedId) ?? null;

  const notify = useCallback((text: string, undo?: Message[]) => {
    setToast({ id: Date.now(), text, undo });
  }, []);

  const patch = useCallback((id: string, change: Partial<Message>) => {
    setList((current) => current.map((message) => (message.id === id ? { ...message, ...change } : message)));
  }, []);

  const select = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (id) patch(id, { unread: false });
    },
    [patch],
  );

  const openFolder = useCallback((next: FolderId) => {
    setFolder(next);
    setSelectedId(null);
    setQuery("");
    setFilter("all");
  }, []);

  const move = useCallback(
    (step: 1 | -1) => {
      if (visible.length === 0) return;
      const index = visible.findIndex((message) => message.id === selectedId);
      const next = index === -1 ? (step === 1 ? 0 : visible.length - 1) : Math.min(visible.length - 1, Math.max(0, index + step));
      select(visible[next].id);
    },
    [visible, selectedId, select],
  );

  /** Moves the selected message out of the current list and selects its neighbour. */
  const relocate = useCallback(
    (target: Message["folder"], text: string) => {
      if (!selected) return;
      const index = visible.findIndex((message) => message.id === selected.id);
      const neighbour = visible[index + 1] ?? visible[index - 1] ?? null;
      const before = list;
      patch(selected.id, { folder: target });
      const staysVisible = folder === "starred" && target !== "archive";
      if (!staysVisible) select(neighbour?.id ?? null);
      notify(text, before);
    },
    [selected, visible, list, folder, patch, select, notify],
  );

  const archive = useCallback(() => {
    if (!selected) return;
    if (selected.folder === "archive") relocate("inbox", `Moved “${selected.subject}” back to Inbox.`);
    else relocate("archive", `Archived “${selected.subject}”.`);
  }, [selected, relocate]);

  const later = useCallback(() => {
    if (!selected) return;
    if (selected.folder === "later") relocate("inbox", `Moved “${selected.subject}” back to Inbox.`);
    else relocate("later", `Moved “${selected.subject}” to Later.`);
  }, [selected, relocate]);

  const toggleStar = useCallback(
    (id?: string) => {
      const target = list.find((message) => message.id === (id ?? selected?.id));
      if (!target) return;
      patch(target.id, { starred: !target.starred });
      notify(target.starred ? "Star removed." : "Starred.");
    },
    [list, selected, patch, notify],
  );

  const toggleRead = useCallback(() => {
    if (!selected) return;
    patch(selected.id, { unread: !selected.unread });
    notify(selected.unread ? "Marked as read." : "Marked as unread.");
  }, [selected, patch, notify]);

  const undo = useCallback(() => {
    if (!toast?.undo) return;
    setList(toast.undo);
    setToast({ id: Date.now(), text: "Undone." });
  }, [toast]);

  const compose = useCallback(() => setDraft({ to: "", subject: "", body: "" }), []);

  const reply = useCallback(
    (body = "") => {
      if (!selected) return;
      const subject = selected.subject.startsWith("Re: ") ? selected.subject : `Re: ${selected.subject}`;
      setDraft({ to: selected.email, subject, body, replyTo: selected.id });
    },
    [selected],
  );

  /** Adds the draft to Sent. Returns false when the draft is not valid. */
  const send = useCallback(() => {
    if (!draft || Object.keys(validateDraft(draft)).length > 0) return false;
    const first = draft.to.split(/[,;]/)[0].trim();
    const original = list.find((message) => message.id === draft.replyTo) ?? list.find((message) => message.email === first.toLowerCase());
    const name = original?.name ?? first;
    const lines = draft.body.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const sent: Message = {
      id: `sent-${list.length + 1}`,
      name,
      email: first,
      initials: original?.initials ?? first.slice(0, 2).toUpperCase(),
      tone: original?.tone ?? "violet",
      subject: draft.subject.trim(),
      preview: lines[0].slice(0, 80),
      body: [...lines, account.name.split(" ")[0]],
      time: "Just now",
      tag: original?.tag,
      folder: "sent",
      unread: false,
      starred: false,
    };
    setList((current) => [sent, ...current]);
    setDraft(null);
    notify(`Sent to ${name}. This is a demo, so nothing left your browser.`);
    return true;
  }, [draft, list, notify]);

  return {
    counts,
    visible,
    folder,
    selected,
    query,
    filter,
    draft,
    toast,
    setQuery,
    setFilter,
    setDraft,
    setToast,
    select,
    openFolder,
    move,
    archive,
    later,
    toggleStar,
    toggleRead,
    undo,
    compose,
    reply,
    send,
  };
}

export type Mailbox = ReturnType<typeof useMailbox>;
