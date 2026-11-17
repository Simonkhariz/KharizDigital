"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Minus, Plus } from "lucide-react";
import { faqs, installCommand, plans, useCases } from "../data/content";
import { Pixel, Tag } from "./Marks";

const caseIcons = ["grid", "burst", "bars", "check", "stack"] as const;

/** Install command with a copy button. Shows a status message if the clipboard is unavailable. */
export function CopyCommand() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button type="button" className="rm-copy" onClick={copy} aria-label={`Copy install command: ${installCommand}`}>
      <span aria-hidden="true">$ {installCommand}</span>
      {state === "copied" ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
      <span className="rm-copy__status" role="status">
        {state === "copied" ? "Copied" : state === "failed" ? "Select and copy manually" : ""}
      </span>
    </button>
  );
}

/** Horizontal scroller of use-case cards with previous and next buttons. */
export function UseCases() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const step = card ? card.offsetWidth + 20 : 1;
    setIndex(Math.round(el.scrollLeft / step));
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const move = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="rm-cases">
      <div className="rm-cases__head">
        <div>
          <Tag>In production</Tag>
          <h2 className="rm-h2">Teams ship agents with Runemark.</h2>
        </div>
        <div className="rm-cases__nav">
          <button type="button" onClick={() => move(-1)} disabled={index === 0} aria-label="Previous use case">
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next use case">
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul className="rm-cases__track" ref={track} onScroll={sync} tabIndex={0} aria-label="Use cases">
        {useCases.map((item, i) => (
          <li key={item.title} className="rm-case" data-current={i === index}>
            <div className="rm-case__top">
              <Pixel name="quote" size={22} className="rm-case__mark" />
              <span>{item.tag}</span>
            </div>
            <p className="rm-case__text">{item.text}</p>
            <div className="rm-case__foot">
              <span className="rm-case__icon" aria-hidden="true">
                <Pixel name={caseIcons[i % caseIcons.length]} size={18} />
              </span>
              <p>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="rm-pricing">
      <div className="rm-pricing__head">
        <div>
          <Tag>Pricing</Tag>
          <h2 className="rm-h2">Pay for runs, not seats.</h2>
        </div>
        <div className="rm-switch" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual <em>2 months free</em>
          </button>
        </div>
      </div>
      <ul className="rm-plans">
        {plans.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          const paid = price !== null && price > 0;
          return (
            <li key={plan.id} className="rm-plan" data-featured={plan.featured ?? false}>
              <p className="rm-plan__name">
                {plan.name}
                {plan.featured ? <span>Most teams</span> : null}
              </p>
              <p className="rm-plan__price">
                {price === null ? "Custom" : `$${price}`}
                {price === null ? null : <small>/ month</small>}
              </p>
              <p className="rm-plan__blurb">
                {plan.blurb}
                {paid ? (annual ? ` Billed $${(price * 12).toLocaleString("en-US")} a year.` : " Billed monthly.") : null}
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={14} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={plan.featured ? "rm-btn" : "rm-btn rm-btn--line"}
                data-rm-open={plan.open}
                data-rm-plan={plan.name}
              >
                {plan.cta}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="rm-faq">
      {faqs.map((item, i) => {
        const expanded = open === i;
        return (
          <li key={item.q} data-open={expanded}>
            <h3>
              <button type="button" aria-expanded={expanded} aria-controls={`rm-faq-${i}`} onClick={() => setOpen(expanded ? null : i)}>
                <span className="rm-faq__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="rm-faq__q">{item.q}</span>
                {expanded ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
              </button>
            </h3>
            <div id={`rm-faq-${i}`} className="rm-faq__a" hidden={!expanded}>
              <p>{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** The brand name drawn at low resolution and scaled up, so the letters break into blocks. */
export function Wordmark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let cancelled = false;
    const draw = () => {
      if (cancelled) return;
      const family = getComputedStyle(canvas).fontFamily;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 ${height * 1.2}px ${family}`;
      const text = "RUNEMARK";
      const measured = ctx.measureText(text).width;
      ctx.save();
      ctx.scale(width / measured, 1);
      ctx.fillStyle = "#fff";
      ctx.fillText(text, 0, height * 0.93);
      ctx.restore();
      const image = ctx.getImageData(0, 0, width, height);
      for (let i = 0; i < image.data.length; i += 4) {
        const row = Math.floor(i / 4 / width);
        const shade = 46 - Math.round((row / height) * 18);
        const on = image.data[i + 3] > 110;
        image.data[i] = shade;
        image.data[i + 1] = shade;
        image.data[i + 2] = shade;
        image.data[i + 3] = on ? 255 : 0;
      }
      ctx.putImageData(image, 0, 0);
    };
    document.fonts.ready.then(draw);
    return () => {
      cancelled = true;
    };
  }, []);

  return <canvas ref={ref} className="rm-wordmark" width={132} height={22} aria-hidden="true" />;
}
