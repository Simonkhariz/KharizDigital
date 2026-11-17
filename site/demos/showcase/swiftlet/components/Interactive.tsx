"use client";

import { AtSign, Check, ChevronDown, Heading2, ListChecks, MessageSquare, Slash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { APP_PATH, plans, posts, shortcutGroups, YEARLY_DISCOUNT } from "../data/content";
import { Key } from "./Bits";

const docTabs = [
  {
    id: "slash",
    icon: Slash,
    title: "Slash commands",
    text: "Type / to add a heading, a checklist or a table without leaving the home row.",
  },
  {
    id: "mail",
    icon: AtSign,
    title: "Mail becomes a doc",
    text: "Turn any thread into a shared page. Replies keep arriving underneath it.",
  },
  {
    id: "comments",
    icon: MessageSquare,
    title: "Comments in the margin",
    text: "Discuss a sentence where it sits. Resolve with one key.",
  },
] as const;

type DocTab = (typeof docTabs)[number]["id"];

export function DocsShowcase() {
  const [tab, setTab] = useState<DocTab>("slash");
  const [block, setBlock] = useState<"none" | "heading" | "checklist">("none");
  const [resolved, setResolved] = useState(false);

  return (
    <div className="sw-docs-grid">
      <div className="sw-docs-tabs" role="tablist" aria-label="Docs features" aria-orientation="vertical">
        {docTabs.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            id={`sw-docs-tab-${entry.id}`}
            aria-selected={tab === entry.id}
            aria-controls="sw-docs-panel"
            onClick={() => setTab(entry.id)}
          >
            <entry.icon size={16} aria-hidden="true" />
            <span>
              <strong>{entry.title}</strong>
              <span>{entry.text}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="sw-docs-stage sw-art-beam" id="sw-docs-panel" role="tabpanel" aria-labelledby={`sw-docs-tab-${tab}`}>
        <div className="sw-page">
          <p className="sw-page-meta">Docs / Planning</p>
          <h3>Rollout plan: Harborline</h3>
          {tab === "slash" && (
            <>
              <p>Forty seats for the logistics group, starting on the 1st. Regional leads get a walkthrough this week.</p>
              {block === "heading" && <h4>Open questions</h4>}
              {block === "checklist" && (
                <ul className="sw-page-checks">
                  <li>
                    <Check size={12} strokeWidth={3} aria-hidden="true" /> Confirm start date
                  </li>
                  <li>
                    <i aria-hidden="true" /> Book walkthrough
                  </li>
                </ul>
              )}
              {block === "none" ? (
                <div className="sw-slash">
                  <p className="sw-slash-input">
                    /<i className="sw-caret" aria-hidden="true" />
                  </p>
                  <div className="sw-slash-menu" role="group" aria-label="Insert a block">
                    <button type="button" onClick={() => setBlock("heading")}>
                      <Heading2 size={15} aria-hidden="true" /> Heading <Key>H</Key>
                    </button>
                    <button type="button" onClick={() => setBlock("checklist")}>
                      <ListChecks size={15} aria-hidden="true" /> Checklist <Key>L</Key>
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="sw-chip-button" onClick={() => setBlock("none")}>
                  Remove block
                </button>
              )}
            </>
          )}
          {tab === "mail" && (
            <>
              <p className="sw-page-source">
                <AtSign size={13} aria-hidden="true" /> Created from the thread “Expansion proposal”
              </p>
              <p>Finance has approved the 40 extra seats. Two questions remain: the start date and a walkthrough for regional leads.</p>
              <p className="sw-page-reply">
                <strong>Kai Sutter, 9:41</strong> The team is excited to move ahead.
              </p>
            </>
          )}
          {tab === "comments" && (
            <>
              <p>
                Forty seats for the logistics group, <mark data-open={!resolved}>starting on the 1st</mark>. Regional leads get a walkthrough this week.
              </p>
              <div className="sw-page-comment">
                <strong>Pilar Sanz</strong>
                <p>{resolved ? "Resolved: the 1st is confirmed." : "Is the 1st confirmed with their finance team?"}</p>
                <button type="button" className="sw-chip-button" onClick={() => setResolved((value) => !value)}>
                  {resolved ? "Reopen" : "Resolve"} <Key>R</Key>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function matches(keys: readonly string[], pressed: string) {
  return keys.some((key) => key.toLowerCase() === pressed);
}

export function ShortcutBoard() {
  const [pressed, setPressed] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("input, textarea, select, dialog, [role='tabpanel']") || target.isContentEditable)) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return;
      setPressed(event.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!pressed) return;
    const timer = window.setTimeout(() => setPressed(null), 900);
    return () => window.clearTimeout(timer);
  }, [pressed]);

  return (
    <div className="sw-shortcuts-grid">
      {shortcutGroups.map((group) => (
        <div key={group.title} className="sw-shortcuts-group">
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item.label} data-hit={pressed !== null && matches(item.keys, pressed)}>
                <span>{item.label}</span>
                <span className="sw-shortcuts-keys">
                  {item.keys.map((key) => (
                    <Key key={key}>{key}</Key>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function price(monthly: number, yearly: boolean) {
  const value = yearly ? monthly * (1 - YEARLY_DISCOUNT) : monthly;
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="sw-billing" role="group" aria-label="Billing period">
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
          Yearly <small>Save 20%</small>
        </button>
      </div>
      <ul className="sw-plans">
        {plans.map((plan) => (
          <li key={plan.id} className="sw-plan" data-featured={plan.featured}>
            <h3>{plan.name}</h3>
            <p className="sw-plan-blurb">{plan.blurb}</p>
            <p className="sw-plan-price" aria-live="polite">
              <strong>{price(plan.monthly, yearly)}</strong>
              <span>{plan.monthly === 0 ? "free for one person" : `per seat a month, billed ${yearly ? "yearly" : "monthly"}`}</span>
            </p>
            {plan.id === "solo" ? (
              <Link href={APP_PATH} className="sw-button sw-button-light">
                {plan.cta}
              </Link>
            ) : (
              <button
                type="button"
                className={plan.featured ? "sw-button" : "sw-button sw-button-light"}
                data-sw-open={plan.id === "business" ? "sales" : "trial"}
                data-sw-plan={`${plan.name}, ${yearly ? "yearly" : "monthly"} billing`}
              >
                {plan.cta}
              </button>
            )}
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} aria-hidden="true" /> {feature}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Blog() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="sw-posts">
      {posts.map((post) => (
        <li key={post.id} className="sw-post">
          <p className="sw-post-meta">
            <span className="sw-tag sw-tag-design">{post.tag}</span> {post.date}
          </p>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          {open === post.id && (
            <p className="sw-post-body" id={`sw-post-${post.id}`}>
              {post.body}
            </p>
          )}
          <button
            type="button"
            className="sw-post-toggle"
            aria-expanded={open === post.id}
            aria-controls={`sw-post-${post.id}`}
            onClick={() => setOpen((current) => (current === post.id ? null : post.id))}
          >
            {open === post.id ? "Show less" : "Read more"} <ChevronDown size={14} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
