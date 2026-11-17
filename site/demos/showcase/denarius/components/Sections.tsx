import { ArrowUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_PATH, ASSETS, BALANCE_USD, contact, footerMenu, partners } from "../data/content";
import { money } from "../data/format";
import { AsciiField, BankCard, LogoMark, PartnerMark } from "./Artwork";
import { Faq, PaymentsStage, PlatformExplorer, SecurityCards, SignupForm, StoriesSlider } from "./Interactive";

function Label({ children }: { children: ReactNode }) {
  return <p className="dn-label">{children}</p>;
}

function SplitHead({ label, title, text }: { label: string; title: ReactNode; text: string }) {
  return (
    <div className="dn-head">
      <div>
        <Label>{label}</Label>
        <h2>{title}</h2>
      </div>
      <p className="dn-head-text">{text}</p>
    </div>
  );
}

function CentreHead({ label, title }: { label: string; title: ReactNode }) {
  return (
    <div className="dn-head dn-head-centre">
      <Label>{label}</Label>
      <h2>{title}</h2>
    </div>
  );
}

export function Hero() {
  return (
    <section className="dn-hero" id="top" aria-labelledby="dn-hero-title">
      <AsciiField className="dn-hero-ascii" />
      <div className="dn-hero-copy">
        <Link className="dn-announce" href={APP_PATH}>
          <span>New</span>
          Simple Tools for Better Finances
          <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </Link>
        <h1 id="dn-hero-title">
          Build a Smarter{" "}
          <br />
          Financial Future
        </h1>
        <p>Take control of your money with simple tools to track, plan, and grow your finances with confidence.</p>
        <div className="dn-hero-cta">
          <Link className="dn-btn dn-btn-dark" href={APP_PATH}>
            Start Planning
            <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <a className="dn-btn dn-btn-soft" href="#security">
            Explore Features
          </a>
        </div>
      </div>
      <div className="dn-hero-stage">
        <ul className="dn-partners" aria-label="Works alongside">
          {partners.map((name, index) => (
            <li key={name}>
              <PartnerMark index={index} />
            </li>
          ))}
        </ul>
        <BankCard className="dn-hero-card" amount={`$ ${money(BALANCE_USD)}`} />
        <img
          className="dn-statue dn-statue-left"
          src={`${ASSETS}/statue-socrates.webp`}
          width={1167}
          height={1300}
          alt="Seated marble statue of a bearded philosopher, chin resting on his hand"
          fetchPriority="high"
        />
        <img
          className="dn-statue dn-statue-right"
          src={`${ASSETS}/statue-plato.webp`}
          width={1275}
          height={1300}
          alt="Seated marble statue of a bearded philosopher holding a scroll, one hand raised"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

export function Payments() {
  return (
    <section className="dn-section dn-payments" id="payments" aria-label="Payments">
      <AsciiField className="dn-payments-ascii" />
      <SplitHead
        label="Fast & Secure Payments"
        title={
          <>
            Manage every payment{" "}
            <br />
            with ease and confidence
          </>
        }
        text="Manage bills, transfers, and everyday payments in one simple and secure place. Stay on top of every transaction without the hassle."
      />
      <PaymentsStage />
    </section>
  );
}

export function Security() {
  return (
    <section className="dn-section dn-security" id="security" aria-label="Security">
      <SplitHead
        label="Secure Your Finances"
        title={
          <>
            Your finances stay secure{" "}
            <br />
            with smart protection{" "}
            <br />
            against digital threats.
          </>
        }
        text="Keep your money protected with smart security, real-time monitoring, and reliable protection against digital threats."
      />
      <SecurityCards />
    </section>
  );
}

export function PlatformSection() {
  return (
    <section className="dn-section dn-platform" id="platform" aria-label="Platform">
      <CentreHead
        label="Smart Finance Platform"
        title={
          <>
            Everything You Need to{" "}
            <br />
            Manage Your Money Smarter
          </>
        }
      />
      <PlatformExplorer />
    </section>
  );
}

export function StoriesSection() {
  return (
    <section className="dn-section dn-stories" id="stories" aria-label="Member stories">
      <CentreHead
        label="What Our Users Say"
        title={
          <>
            Real Stories From Smarter{" "}
            <br />
            Money Management
          </>
        }
      />
      <StoriesSlider />
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="dn-section dn-faq" id="faq" aria-label="Questions">
      <div className="dn-faq-grid">
        <div className="dn-faq-intro">
          <Label>Good to Know</Label>
          <h2>
            Plain answers,{" "}
            <br />
            before you begin
          </h2>
          <p>The short version of what Denarius is, what it costs and how this demonstration works.</p>
          <Link className="dn-btn dn-btn-black" href={APP_PATH}>
            Open the web app
            <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
        <Faq />
      </div>
    </section>
  );
}

export function Signup() {
  return (
    <section className="dn-signup" id="signup" aria-labelledby="dn-signup-title">
      <AsciiField className="dn-signup-ascii" />
      <div className="dn-signup-copy">
        <Label>Start in Two Minutes</Label>
        <h2 id="dn-signup-title">
          Give every dollar{" "}
          <br />a place to stand
        </h2>
        <p>Create an account to keep your own budgets, or open the web app and explore it with a sample profile first.</p>
        <SignupForm />
      </div>
      <div className="dn-signup-art" aria-hidden="true">
        <BankCard className="dn-signup-card" amount={`$ ${money(BALANCE_USD)}`} />
        <img className="dn-signup-statue" src={`${ASSETS}/statue-plato.webp`} width={1275} height={1300} alt="" loading="lazy" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="dn-footer dn-on-dark">
      <img className="dn-footer-scene" src={`${ASSETS}/scene-colonnade-wide.webp`} width={1920} height={1120} alt="" loading="lazy" />
      <AsciiField className="dn-footer-ascii" />
      <div className="dn-footer-top">
        <div className="dn-footer-menu">
          <p className="dn-footer-label">Main Menu</p>
          <ul className="dn-footer-links">
            {footerMenu.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
                <span aria-hidden="true" />
              </li>
            ))}
          </ul>
          <ul className="dn-footer-minor">
            <li>
              <Link href={APP_PATH}>Web app</Link>
            </li>
            <li>
              <a href="#signup">Sign up</a>
            </li>
          </ul>
        </div>
        <div className="dn-footer-contact">
          <p className="dn-footer-label">Contact Us</p>
          <a className="dn-footer-phone" href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>
            {contact.phone}
          </a>
          <a className="dn-footer-mail" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <p className="dn-footer-address">{contact.address}</p>
        </div>
        <div className="dn-footer-follow">
          <p className="dn-footer-label">Explore</p>
          <a href="#payments">Payments</a>
          <a href="#stories">Stories</a>
          <a className="dn-footer-up" href="#top" aria-label="Back to top">
            <ArrowUp size={22} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="dn-footer-brand" aria-hidden="true">
        <LogoMark />
        <span>Denarius</span>
      </div>
      <div className="dn-footer-base">
        <p>© 2026 — Copyright Denarius</p>
        <p>Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
