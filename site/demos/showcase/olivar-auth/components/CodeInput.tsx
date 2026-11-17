"use client";

import { useEffect, useRef } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { CODE_LENGTH } from "../data/content";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  invalid: boolean;
  describedBy?: string;
  disabled?: boolean;
};

/** Six one-digit boxes: typing advances, Backspace steps back, arrows move, and a pasted code fills every box. */
export function CodeInput({ value, onChange, invalid, describedBy, disabled }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const focus = (index: number) => {
    const target = refs.current[Math.max(0, Math.min(CODE_LENGTH - 1, index))];
    target?.focus();
    target?.select();
  };

  const fill = (start: number, digits: string) => {
    const next = [...value];
    digits
      .slice(0, CODE_LENGTH - start)
      .split("")
      .forEach((digit, offset) => {
        next[start + offset] = digit;
      });
    onChange(next);
    focus(start + digits.length);
  };

  const onInput = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits === "") {
      const next = [...value];
      next[index] = "";
      onChange(next);
      return;
    }
    // A full code typed or auto-filled into one box is spread across all of them.
    fill(digits.length >= CODE_LENGTH ? 0 : index, digits.length >= CODE_LENGTH ? digits : digits.slice(-1));
  };

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && value[index] === "" && index > 0) {
      event.preventDefault();
      const next = [...value];
      next[index - 1] = "";
      onChange(next);
      focus(index - 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (digits === "") return;
    event.preventDefault();
    fill(0, digits.slice(0, CODE_LENGTH));
  };

  return (
    <div className="ol-code" role="group" aria-label="Six-digit confirmation code" data-invalid={invalid}>
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={CODE_LENGTH}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onInput(index, event.target.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
