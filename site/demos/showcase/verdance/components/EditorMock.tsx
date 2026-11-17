"use client";

import { useState } from "react";
import { CircleCheck, FileCode, FileText, Sparkles } from "lucide-react";
import {
  afterTyping,
  beforeVerify,
  completions,
  consoleResolved,
  dataLayer,
  files,
  firstLineNumber,
  manualVerify,
  panelLines,
  panels,
  refactoredVerify,
  typingPrefix,
  type CodeLine,
  type FileName,
  type PanelId,
} from "../data/editor";
import { AssistantPanel, type SuggestionState } from "./AssistantPanel";

function Line({ tokens }: { tokens: CodeLine }) {
  return (
    <>
      {tokens.map(([kind, text], index) => (
        <span key={index} className={`vd-t-${kind}`}>
          {text}
        </span>
      ))}
    </>
  );
}

export function EditorMock() {
  const [file, setFile] = useState<FileName>("auth-service.ts");
  const [panel, setPanel] = useState<PanelId>("terminal");
  const [suggestion, setSuggestion] = useState<SuggestionState>("open");
  const [highlighted, setHighlighted] = useState(0);
  const [accepted, setAccepted] = useState<number | null>(null);

  const applied = suggestion === "applied";
  const verifyLines = applied ? refactoredVerify : manualVerify;
  const typingIndex = beforeVerify.length + verifyLines.length;
  const lines = file === "auth-service.ts" ? [...beforeVerify, ...verifyLines, typingPrefix, ...afterTyping] : dataLayer;
  const output = panel === "console" && applied ? consoleResolved : panelLines[panel];

  function onMenuKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = (highlighted + step + completions.length) % completions.length;
      setHighlighted(next);
      event.currentTarget.querySelectorAll<HTMLElement>("[role=option]")[next]?.focus();
    }
  }

  return (
    <div className="vd-window" role="group" aria-label="Verdance editor, interactive demo">
      <div className="vd-editor">
        <div className="vd-tabs" role="tablist" aria-label="Open files">
          {files.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={file === name}
              aria-controls="verdance-code"
              className="vd-tab"
              onClick={() => setFile(name)}
            >
              {name === "auth-service.ts" ? <FileCode size={13} aria-hidden="true" /> : <FileText size={13} aria-hidden="true" />}
              {name}
            </button>
          ))}
        </div>

        <div className="vd-code" id="verdance-code" role="tabpanel" aria-label={file} tabIndex={0}>
          <ol start={firstLineNumber} style={{ counterReset: `line ${firstLineNumber - 1}` }}>
            {lines.map((tokens, index) => {
              const typing = file === "auth-service.ts" && index === typingIndex;
              const changed = file === "auth-service.ts" && applied && index >= beforeVerify.length && index < typingIndex;
              return (
                <li key={index} className={typing ? "vd-line vd-lineActive" : changed ? "vd-line vd-lineChanged" : "vd-line"}>
                  <code>
                    <Line tokens={tokens} />
                    {typing && accepted !== null && <span className="vd-t-fn">{completions[accepted].insert}</span>}
                    {typing && accepted === null && <span className="vd-caret" aria-hidden="true" />}
                  </code>
                  {typing && accepted === null && (
                    <div className="vd-menu" role="listbox" aria-label="Completions" onKeyDown={onMenuKey}>
                      {completions.map((item, itemIndex) => (
                        <button
                          key={item.name}
                          type="button"
                          role="option"
                          aria-selected={itemIndex === highlighted}
                          tabIndex={itemIndex === highlighted ? 0 : -1}
                          onMouseEnter={() => setHighlighted(itemIndex)}
                          onFocus={() => setHighlighted(itemIndex)}
                          onClick={() => setAccepted(itemIndex)}
                        >
                          <Sparkles size={11} aria-hidden="true" />
                          <span>{item.name}</span>
                          {item.suggested && <small>AI SUGGEST</small>}
                        </button>
                      ))}
                    </div>
                  )}
                  {typing && accepted !== null && (
                    <button type="button" className="vd-undo" onClick={() => setAccepted(null)}>
                      Undo completion
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="vd-panelTabs" role="tablist" aria-label="Output panels">
          {panels.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={panel === item.id}
              aria-controls="verdance-output"
              onClick={() => setPanel(item.id)}
            >
              {item.label}
              {item.id === "console" && !applied && (
                <span className="vd-badge">
                  1<span className="vd-srOnly"> warning</span>
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="vd-output" id="verdance-output" role="tabpanel" aria-label={panel}>
          {output.map((line) => (
            <p key={line.text} className={`vd-out-${line.tone}`}>
              {line.text === "Success in 452ms" && <CircleCheck size={12} aria-hidden="true" />}
              {line.tag && <b>{line.tag}</b>} {line.tone === "prompt" ? <span className="vd-blink">$ {line.text}</span> : line.text}
            </p>
          ))}
        </div>
      </div>

      <AssistantPanel state={suggestion} onChange={setSuggestion} onShowFile={() => setFile("auth-service.ts")} />
    </div>
  );
}
