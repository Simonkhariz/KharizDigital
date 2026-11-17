import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, error, children }: Props) {
  return (
    <div className="md-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="md-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
