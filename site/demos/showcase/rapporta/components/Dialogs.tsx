"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { legalNotes } from "../data/site";
import { DemoForm, type FormField } from "./DemoForm";
import { ui } from "@/demos/showcase/rapporta/styles";

export type DialogRequest =
  | { kind: "demo"; topic?: string }
  | { kind: "signin" }
  | { kind: "start"; plan: string }
  | { kind: "apply"; role: string }
  | { kind: "legal"; index: number };

const DialogContext = createContext<(request: DialogRequest) => void>(() => undefined);

export function useDialog() {
  return useContext(DialogContext);
}

const nameField: FormField = { name: "name", label: "Full name", type: "text", autoComplete: "name" };
const emailField: FormField = {
  name: "email",
  label: "Work email",
  type: "email",
  autoComplete: "email",
  placeholder: "name@company.com",
};
const sizeField: FormField = {
  name: "size",
  label: "Support team size",
  type: "select",
  options: ["1 to 10 people", "11 to 50 people", "51 to 200 people", "More than 200 people"],
};

function content(request: DialogRequest) {
  switch (request.kind) {
    case "demo":
      return {
        title: request.topic ?? "Book a demo",
        sub: "Thirty minutes with a solutions engineer, using your own support topics.",
        body: (
          <DemoForm
            fields={[nameField, emailField, sizeField]}
            submitLabel="Request a time"
            successTitle="Thanks. Your request is noted."
          />
        ),
      };
    case "start":
      return {
        title: `Start with ${request.plan}`,
        sub: "Create a workspace and connect your first channel. No card needed for the first 14 days.",
        body: (
          <DemoForm
            fields={[nameField, emailField]}
            submitLabel="Create workspace"
            successTitle={`Thanks. Your ${request.plan} workspace would be ready now.`}
          />
        ),
      };
    case "apply":
      return {
        title: request.role,
        sub: "Tell us where to reach you and we will send the full role description.",
        body: (
          <DemoForm
            fields={[nameField, { ...emailField, label: "Email" }]}
            submitLabel="Register interest"
            successTitle="Thanks. Your interest is noted."
          />
        ),
      };
    case "signin":
      return {
        title: "Sign in to Rapporta",
        sub: "Use your workspace email and password.",
        body: (
          <DemoForm
            fields={[
              { ...emailField, label: "Email" },
              { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
            ]}
            submitLabel="Sign in"
            successTitle="Thanks. That is where your workspace would open."
            successBody="This is a demo, so there is no account to sign in to."
            resetLabel="Back to sign in"
          />
        ),
      };
    case "legal": {
      const note = legalNotes[request.index];
      return { title: note.label, sub: note.text, body: null };
    }
  }
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [request, setRequest] = useState<DialogRequest | null>(null);

  const open = useCallback((next: DialogRequest) => setRequest(next), []);

  useEffect(() => {
    const dialog = ref.current;
    if (request && dialog && !dialog.open) dialog.showModal();
  }, [request]);

  const view = request ? content(request) : null;

  return (
    <DialogContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        className={ui.dialog}
        aria-labelledby="rapporta-dialog-title"
        onClose={() => setRequest(null)}
        onClick={(event) => {
          if (event.target === ref.current) ref.current?.close();
        }}
      >
        {view && (
          <>
            <div className={ui.dialogHead}>
              <div>
                <h2 className={ui.dialogTitle} id="rapporta-dialog-title">
                  {view.title}
                </h2>
                <p className={ui.dialogSub}>{view.sub}</p>
              </div>
              <button type="button" className={ui.close} aria-label="Close" onClick={() => ref.current?.close()}>
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            {view.body && <div className={ui.dialogBody}>{view.body}</div>}
          </>
        )}
      </dialog>
    </DialogContext.Provider>
  );
}

type DialogButtonProps = {
  request: DialogRequest;
  className?: string;
  children: ReactNode;
};

export function DialogButton({ request, className, children }: DialogButtonProps) {
  const open = useDialog();
  return (
    <button type="button" className={className} onClick={() => open(request)}>
      {children}
    </button>
  );
}
