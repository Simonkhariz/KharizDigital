"use client";

import { Cloud, Database, FolderOpen, Link2, Sheet, Sparkles } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { Avatar } from "./Brand";
import "./Process.css";

export function ConnectMock() {
  const [linked, setLinked] = useState(true);
  return (
    <div className={clsx("ml-process-connect", linked && "ml-process-linked")}>
      <svg className="ml-process-wires" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M50 40 H110 Q130 40 130 60 V70 Q130 90 150 90 Q170 90 170 70 V60 Q170 40 190 40 H250" />
        <path d="M50 140 H110 Q130 140 130 120 V110 Q130 90 150 90 Q170 90 170 110 V120 Q170 140 190 140 H250" />
      </svg>
      <span className={clsx("ml-process-source", "ml-process-cloud")}>
        <Cloud size={26} aria-hidden="true" />
      </span>
      <span className={clsx("ml-process-source", "ml-process-drive")}>
        <FolderOpen size={26} aria-hidden="true" />
      </span>
      <span className={clsx("ml-process-source", "ml-process-data")}>
        <Database size={26} aria-hidden="true" />
      </span>
      <span className={clsx("ml-process-source", "ml-process-sheet")}>
        <Sheet size={26} aria-hidden="true" />
      </span>
      <button
        type="button"
        className="ml-process-link"
        aria-pressed={linked}
        aria-label={linked ? "Disconnect sources" : "Connect sources"}
        onClick={() => setLinked((value) => !value)}
      >
        <Link2 size={16} aria-hidden="true" />
      </button>
      <span className="ml-process-link-state" role="status">
        {linked ? "4 sources synced" : "Sources paused"}
      </span>
    </div>
  );
}

export function InboxMock() {
  const [reviewed, setReviewed] = useState(false);
  return (
    <div className="ml-process-inbox">
      <strong>Inbox</strong>
      <div className="ml-process-row">
        <span className="ml-process-spark">
          <Sparkles size={13} aria-hidden="true" />
        </span>
        <p className="ml-process-from-ai">
          <b>Meadowline AI</b>
          {reviewed ? "Order 2291 is approved and on its way" : "I've processed the order for you"}
        </p>
      </div>
      <button type="button" className="ml-process-review" aria-pressed={reviewed} onClick={() => setReviewed((v) => !v)}>
        <Sparkles size={12} aria-hidden="true" />
        {reviewed ? "Order reviewed" : "Review order"}
      </button>
      <div className="ml-process-row">
        <Avatar tone="rust" size={24} />
        <p className="ml-process-from-user">Thanks for handling that!</p>
      </div>
    </div>
  );
}
