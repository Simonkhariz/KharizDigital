"use client";

import { useState } from "react";
import clsx from "clsx";
import { DialogButton } from "./Dialogs";
import { DemoForm } from "./DemoForm";
import { page as styles, ui } from "@/demos/showcase/rapporta/styles";

export function Cta() {
  const [subscribing, setSubscribing] = useState(false);

  return (
    <section id="contact" className={styles.band} aria-labelledby="cta-title">
      <div className={clsx(styles.inner, styles.cta)}>
        <h2 className={styles.h2} id="cta-title">
          Here&rsquo;s what success <span>looks like</span>
        </h2>
        <p className={styles.lede}>
          See how Rapporta helps you turn reactive customer support into proactive, long-term relationships.
        </p>
        <div className={styles.ctaActions}>
          <DialogButton request={{ kind: "demo", topic: "Contact sales" }} className={clsx(ui.btn, ui.dark)}>
            Contact Sales
          </DialogButton>
          {subscribing ? (
            <div className={styles.newsletter}>
              <DemoForm
                inline
                fields={[
                  {
                    name: "email",
                    label: "Email address",
                    type: "email",
                    autoComplete: "email",
                    placeholder: "name@company.com",
                    hideLabel: true,
                  },
                ]}
                submitLabel="Subscribe"
                successTitle="Thanks. You would now be on the list."
                resetLabel="Use another address"
              />
            </div>
          ) : (
            <button type="button" className={clsx(ui.btn, ui.light)} onClick={() => setSubscribing(true)}>
              Subscribe to newsletter
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
