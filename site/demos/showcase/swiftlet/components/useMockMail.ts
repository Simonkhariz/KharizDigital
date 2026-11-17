"use client";

import { useCallback, useMemo, useState } from "react";
import { messages as seed, type Message } from "../data/mailbox";

export type MockFolder = "inbox" | "focus" | "waiting" | "later" | "sent";

export const mockFolders: { id: MockFolder; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "focus", label: "Focus" },
  { id: "waiting", label: "Waiting" },
  { id: "later", label: "Later" },
  { id: "sent", label: "Sent" },
];

function inFolder(message: Message, folder: MockFolder) {
  if (folder === "focus") return message.folder === "inbox" && message.unread;
  return message.folder === folder;
}

/** State for the small mail client shown in the landing-page hero. */
export function useMockMail() {
  const [list, setList] = useState<Message[]>(seed);
  const [folder, setFolder] = useState<MockFolder>("focus");
  const [selectedId, setSelectedId] = useState<string | null>("m01");
  const [query, setQuery] = useState("");
  const [replied, setReplied] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const counts = useMemo(() => {
    const result = {} as Record<MockFolder, number>;
    for (const entry of mockFolders) result[entry.id] = list.filter((message) => inFolder(message, entry.id)).length;
    return result;
  }, [list]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return list.filter(
      (message) =>
        inFolder(message, folder) &&
        (!needle || `${message.name} ${message.subject} ${message.preview} ${message.tag ?? ""}`.toLowerCase().includes(needle)),
    );
  }, [list, folder, query]);

  const selected = visible.find((message) => message.id === selectedId) ?? null;

  const openFolder = useCallback(
    (next: MockFolder) => {
      setFolder(next);
      setQuery("");
      setSelectedId(list.find((message) => inFolder(message, next))?.id ?? null);
    },
    [list],
  );

  const move = useCallback(
    (step: 1 | -1) => {
      if (visible.length === 0) return;
      const index = visible.findIndex((message) => message.id === selectedId);
      const next = Math.min(visible.length - 1, Math.max(0, index + step));
      setSelectedId(visible[next].id);
    },
    [visible, selectedId],
  );

  const archive = useCallback(() => {
    if (!selected) return;
    const index = visible.findIndex((message) => message.id === selected.id);
    const neighbour = visible[index + 1] ?? visible[index - 1] ?? null;
    setList((current) => current.map((message) => (message.id === selected.id ? { ...message, folder: "archive" } : message)));
    setSelectedId(neighbour?.id ?? null);
    setNotice(`Archived “${selected.subject}”.`);
  }, [selected, visible]);

  const sendDraft = useCallback(() => {
    if (!selected) return;
    setReplied((current) => [...current, selected.id]);
    setNotice(`Reply to ${selected.name} sent. This is a demo, so nothing left your browser.`);
  }, [selected]);

  const reset = useCallback(() => {
    setList(seed);
    setReplied([]);
    setFolder("focus");
    setSelectedId("m01");
    setQuery("");
    setNotice(null);
  }, []);

  return {
    counts,
    visible,
    folder,
    selected,
    query,
    replied,
    notice,
    setQuery,
    setSelectedId,
    setNotice,
    openFolder,
    move,
    archive,
    sendDraft,
    reset,
  };
}

export type MockMail = ReturnType<typeof useMockMail>;
