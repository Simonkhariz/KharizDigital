"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { bootCommand, bootLines, commands, type TermLine } from "../data/content";

/** Keeps flags such as --persist whole when a command wraps on a narrow screen. */
const noBreak = (text: string) => text.replace(/-/g, "-\u2060");

function Line({ line }: { line: TermLine }) {
  if (line.kind === "cmd") {
    return (
      <p className="sb-term__line">
        <span className="sb-term__prompt">$</span> <span className="sb-term__bright">{noBreak(line.value)}</span>
      </p>
    );
  }
  if (line.kind === "url") {
    return (
      <p className="sb-term__line">
        <span className="sb-term__prompt">→</span> <span className="sb-term__bright">{line.value}</span>
        {"  "}
        <span>{line.detail}</span>
      </p>
    );
  }
  if (line.kind === "out") {
    return <p className="sb-term__line">{line.value}</p>;
  }
  return (
    <p className="sb-term__line sb-term__line--cols">
      <span className="sb-term__check">✓</span>
      <span className="sb-term__label">{line.label}</span>
      <span className="sb-term__bright">{line.value}</span>
      <span>{line.detail}</span>
    </p>
  );
}

/** Terminal window that types out a boot sequence, then accepts a few demo commands. */
export function Terminal() {
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [history, setHistory] = useState<TermLine[]>([]);
  const [run, setRun] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const booted = typed >= bootCommand.length && shown >= bootLines.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = window.setTimeout(() => {
        setTyped(bootCommand.length);
        setShown(bootLines.length);
      }, 0);
      return () => window.clearTimeout(id);
    }
    let cancelled = false;
    let timer = 0;
    const type = (n: number) => {
      if (cancelled) return;
      setTyped(n);
      if (n < bootCommand.length) timer = window.setTimeout(() => type(n + 1), 22 + (n % 5) * 6);
      else timer = window.setTimeout(() => reveal(1), 380);
    };
    const reveal = (n: number) => {
      if (cancelled) return;
      setShown(n);
      if (n < bootLines.length) timer = window.setTimeout(() => reveal(n + 1), 260);
    };
    timer = window.setTimeout(() => type(1), 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [run]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [history, shown]);

  const replay = () => {
    setTyped(0);
    setShown(0);
    setHistory([]);
    setRun((value) => value + 1);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const field = input.current;
    if (!field) return;
    const value = field.value.trim().toLowerCase();
    field.value = "";
    if (!value) return;
    if (value === "clear") {
      setHistory([]);
      return;
    }
    const reply = commands[value] ?? [{ kind: "out", value: `command not found: ${value}. Try "help".` } satisfies TermLine];
    setHistory((lines) => [...lines, { kind: "cmd", value }, ...reply]);
  };

  return (
    <div className="sb-term" role="group" aria-label="Demo terminal">
      <div className="sb-term__bar">
        <span className="sb-term__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="sb-term__title">substrata — zsh — 80×24</span>
        <button type="button" className="sb-term__replay" onClick={replay} aria-label="Replay boot sequence">
          <RotateCcw size={13} aria-hidden="true" />
        </button>
      </div>
      <div className="sb-term__body" ref={body} onClick={() => input.current?.focus()}>
        <p className="sb-term__line">
          <span className="sb-term__prompt">$</span> <span className="sb-term__bright">{noBreak(bootCommand.slice(0, typed))}</span>
          {typed < bootCommand.length ? <span className="sb-term__caret" aria-hidden="true" /> : null}
        </p>
        {bootLines.slice(0, shown).map((line) => (
          <Line key={line.value} line={line} />
        ))}
        {history.map((line, index) => (
          <Line key={index} line={line} />
        ))}
        {booted ? (
          <form className="sb-term__line sb-term__form" onSubmit={onSubmit}>
            <label htmlFor="sb-term-input" className="sb-term__prompt">
              $<span className="sb-sr"> Type a command, for example help</span>
            </label>
            <input
              id="sb-term-input"
              ref={input}
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder='type "help"'
            />
          </form>
        ) : null}
      </div>
    </div>
  );
}
