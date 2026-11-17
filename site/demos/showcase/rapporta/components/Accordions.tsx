"use client";

import { useState } from "react";
import { faqs, roles } from "../data/site";
import { DialogButton } from "./Dialogs";
import clsx from "clsx";
import { page as styles, ui } from "@/demos/showcase/rapporta/styles";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.faq}>
      {faqs.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className={styles.faqItem}>
            <h3>
              <button
                type="button"
                className={styles.faqButton}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.question}
                <span className={styles.faqIcon} aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={!expanded}>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Roles() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.roles} id="careers">
      <h3 className={styles.rolesTitle}>Open roles ({roles.length})</h3>
      {roles.map((role, index) => {
        const expanded = open === index;
        return (
          <div key={role.title} className={styles.faqItem}>
            <button
              type="button"
              className={styles.roleButton}
              aria-expanded={expanded}
              aria-controls={`role-panel-${index}`}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className={styles.roleTitle}>{role.title}</span>
              <span className={styles.roleMeta}>
                {role.team} · {role.location}
              </span>
              <span className={styles.faqIcon} aria-hidden="true" />
            </button>
            <div id={`role-panel-${index}`} hidden={!expanded}>
              <div className={styles.roleDetail}>
                <p>{role.detail}</p>
                <DialogButton request={{ kind: "apply", role: role.title }} className={clsx(ui.btn, ui.light, ui.sm)}>
                  Register interest
                </DialogButton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
