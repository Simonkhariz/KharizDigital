import { Bot, ChevronRight, FileText, Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_PATH, faqs, footerColumns, HOME_PATH, logos } from "../data/content";
import { ChatCard, InlineSuggestCard, ReviewCard, RulesCard } from "./AgentCards";
import { Blog, DocsShowcase, Pricing, ShortcutBoard } from "./Interactive";
import { CompanyMark, Wordmark } from "./Logo";

export function Logos() {
  return (
    <section className="sw-logos" aria-labelledby="sw-logos-title">
      <div className="sw-wrap">
        <h2 id="sw-logos-title">Trusted by fast-moving teams everywhere</h2>
        <ul>
          {logos.map((logo) => (
            <li key={logo.name} data-style={logo.style}>
              <CompanyMark kind={logo.mark} />
              {logo.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionHead({
  icon,
  product,
  soft,
  strong,
  text,
  children,
  id,
}: {
  icon?: ReactNode;
  product: string;
  soft: string;
  strong: string;
  text: string;
  children?: ReactNode;
  id: string;
}) {
  return (
    <div className="sw-head">
      <div>
        <p className="sw-eyebrow">
          {icon && <span aria-hidden="true">{icon}</span>}
          <b>SWIFTLET</b> {product}
        </p>
        <h2 id={id}>
          <span>{soft}</span> {strong}
        </h2>
      </div>
      <div className="sw-head-side">
        <p>{text}</p>
        {children && <div className="sw-head-actions">{children}</div>}
      </div>
    </div>
  );
}

export function Agents() {
  return (
    <section className="sw-section" id="agents" aria-labelledby="sw-agents-title">
      <div className="sw-wrap">
        <SectionHead
          id="sw-agents-title"
          icon={<Bot size={13} />}
          product="Agents"
          soft="Put an agent inside"
          strong="every tab you use"
          text="Assistants that live in the tools you already use. Just type, and help appears."
        >
          <Link className="sw-button" href={APP_PATH}>
            Try Agents
          </Link>
          <a className="sw-text-link" href="#agent-cards">
            Meet the agents <ChevronRight size={14} aria-hidden="true" />
          </a>
        </SectionHead>
        <div className="sw-cards" id="agent-cards">
          <InlineSuggestCard />
          <ChatCard />
          <RulesCard />
          <ReviewCard />
        </div>
      </div>
    </section>
  );
}

export function Docs() {
  return (
    <section className="sw-section" id="docs" aria-labelledby="sw-docs-title">
      <div className="sw-wrap">
        <SectionHead
          id="sw-docs-title"
          icon={<FileText size={13} />}
          product="Docs"
          soft="Write where the"
          strong="conversation already is"
          text="Pages that sit next to your mail, share its shortcuts and open just as fast."
        >
          <Link className="sw-button" href={APP_PATH}>
            Open the workspace
          </Link>
        </SectionHead>
        <DocsShowcase />
      </div>
    </section>
  );
}

export function Shortcuts() {
  return (
    <section className="sw-section" id="shortcuts" aria-labelledby="sw-shortcuts-title">
      <div className="sw-wrap">
        <div className="sw-shortcuts">
          <div className="sw-shortcuts-intro">
            <p className="sw-eyebrow">
              <b>SWIFTLET</b> Keyboard
            </p>
            <h2 id="sw-shortcuts-title">
              <span>Twelve keys</span> run your whole day
            </h2>
            <p>Press any key in the list to see it light up, then try them on real messages in the demo inbox.</p>
            <Link className="sw-button sw-button-white" href={APP_PATH}>
              Open the demo inbox
            </Link>
          </div>
          <ShortcutBoard />
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="sw-section" id="pricing" aria-labelledby="sw-pricing-title">
      <div className="sw-wrap">
        <div className="sw-center-head">
          <h2 id="sw-pricing-title">
            <span>Simple pricing,</span> per seat
          </h2>
          <p>Start alone for free. Add the team when the shortcuts have stuck.</p>
        </div>
        <Pricing />
      </div>
    </section>
  );
}

export function BlogSection() {
  return (
    <section className="sw-section" id="blog" aria-labelledby="sw-blog-title">
      <div className="sw-wrap">
        <div className="sw-head">
          <div>
            <p className="sw-eyebrow">
              <b>SWIFTLET</b> Blog
            </p>
            <h2 id="sw-blog-title">
              <span>Notes from</span> the team
            </h2>
          </div>
        </div>
        <Blog />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="sw-section" id="faq" aria-labelledby="sw-faq-title">
      <div className="sw-wrap sw-faq">
        <h2 id="sw-faq-title">
          <span>Questions,</span> answered
        </h2>
        <div className="sw-faq-list">
          {faqs.map((item, index) => (
            <details key={item.q} name="sw-faq" open={index === 0}>
              <summary>
                {item.q}
                <Plus size={16} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="sw-section sw-section-last" aria-labelledby="sw-cta-title">
      <div className="sw-wrap">
        <div className="sw-cta">
          <h2 id="sw-cta-title">Clear your inbox without touching the mouse.</h2>
          <p>The demo inbox is open. No account, no install.</p>
          <div>
            <Link className="sw-button sw-button-white" href={APP_PATH}>
              Start free
            </Link>
            <button type="button" className="sw-button sw-button-glass" data-sw-open="demo">
              Book a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sw-footer">
      <div className="sw-wrap sw-footer-grid">
        <div>
          <a href={HOME_PATH} aria-label="Swiftlet home">
            <Wordmark />
          </a>
          <p>Mail, docs and agents in one keyboard-first workspace.</p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Get started">
          <h3>Get started</h3>
          <ul>
            <li>
              <Link href={APP_PATH}>Open the demo inbox</Link>
            </li>
            <li>
              <button type="button" data-sw-open="demo">
                Book a demo
              </button>
            </li>
            <li>
              <button type="button" data-sw-open="sales">
                Contact sales
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sw-wrap sw-footer-base">
        <p>© 2026 Swiftlet. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
