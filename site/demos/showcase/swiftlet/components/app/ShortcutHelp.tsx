"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { appShortcuts } from "../../data/mailbox";
import { Key } from "../Bits";

export function ShortcutHelp({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="sw-dialog sw-app-help"
      aria-labelledby="sw-app-help-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="sw-dialog-inner">
        <button type="button" className="sw-dialog-close" aria-label="Close" onClick={onClose}>
          <X size={16} aria-hidden="true" />
        </button>
        <h2 id="sw-app-help-title">Keyboard shortcuts</h2>
        <p>Every action is one key. Shortcuts pause while you are typing in a field.</p>
        <div className="sw-app-help-grid">
          {appShortcuts.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <span className="sw-app-help-keys">
                      {item.keys.map((key) => (
                        <Key key={key}>{key}</Key>
                      ))}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </dialog>
  );
}
