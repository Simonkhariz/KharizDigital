"use client";

import { useState, type FormEvent } from "react";
import { contact } from "../data/content";
import "./Contact.css";

type Field = "name" | "email" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: Field) => String(data.get(key) ?? "").trim();
    const found: Errors = {};
    if (value("name").length < 2) found.name = "Please add your name.";
    if (!emailPattern.test(value("email"))) found.email = "Please enter a valid email address.";
    if (!value("topic")) found.topic = "Please choose a topic.";
    if (value("message").length < 10) found.message = "Please write at least a sentence.";
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  const attrs = (name: Field) => ({
    name,
    id: `ae-contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `ae-contact-${name}-error` : undefined,
  });

  const error = (name: Field) =>
    errors[name] && (
      <span id={`ae-contact-${name}-error`} className="ae-contact__error">
        {errors[name]}
      </span>
    );

  return (
    <section id="contact" className="ae-contact ae-on-sky" aria-labelledby="ae-contact-title">
      <div className="ae-wrap ae-contact__inner">
        <div>
          <h2 id="ae-contact-title" className="ae-h2">
            Ask Us <em>Anything</em>
          </h2>
          <p className="ae-lede">{contact.body}</p>
        </div>
        <div className="ae-contact__card">
          {sent ? (
            <div role="status" className="ae-contact__done">
              <h3>Thanks For Writing.</h3>
              <p>This is a demo, so nothing was sent. On a live site your message would now be with the team.</p>
              <button type="button" className="ae-btn ae-btn--line" onClick={() => setSent(false)}>
                Write Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="ae-contact__pair">
                <label htmlFor="ae-contact-name">
                  Name
                  <input type="text" autoComplete="name" {...attrs("name")} />
                  {error("name")}
                </label>
                <label htmlFor="ae-contact-email">
                  Email
                  <input type="email" autoComplete="email" {...attrs("email")} />
                  {error("email")}
                </label>
              </div>
              <label htmlFor="ae-contact-topic">
                Topic
                <select defaultValue="" {...attrs("topic")}>
                  <option value="" disabled>
                    Choose a topic
                  </option>
                  {contact.topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
                {error("topic")}
              </label>
              <label htmlFor="ae-contact-message">
                Message
                <textarea rows={4} {...attrs("message")} />
                {error("message")}
              </label>
              <button type="submit" className="ae-btn ae-btn--navy">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
