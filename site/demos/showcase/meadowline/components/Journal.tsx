"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { articles } from "../data/content";
import { Tag } from "./Brand";
import "./Journal.css";

/** Cover pictures are rendered on the server and passed in, one per article, in order. */
export function Journal({ covers }: { covers: ReactNode[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  const article = articles[openIndex];

  const open = (index: number) => {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  };

  return (
    <section id="journal" className="ml-journal-section">
      <header className="ml-journal-header">
        <Tag>Blogs</Tag>
        <h2>
          Notes on working <em>calmly.</em>
        </h2>
      </header>
      <ul className="ml-journal-grid">
        {articles.map((entry, index) => (
          <li key={entry.id} className="ml-journal-card">
            <div className="ml-journal-cover">{covers[index]}</div>
            <div className="ml-journal-body">
              <p className="ml-journal-meta">
                <span>{entry.category}</span>
                {entry.readTime}
              </p>
              <h3>{entry.title}</h3>
              <p>{entry.excerpt}</p>
              <button type="button" className="ml-journal-read" onClick={() => open(index)}>
                Read article
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        className="ml-journal-dialog"
        aria-labelledby="ml-article-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <article>
          <button type="button" className="ml-journal-close" aria-label="Close article" onClick={() => dialogRef.current?.close()}>
            <X size={18} aria-hidden="true" />
          </button>
          <p className="ml-journal-meta">
            <span>{article.category}</span>
            {article.readTime}
          </p>
          <h3 id="ml-article-title">{article.title}</h3>
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </dialog>
    </section>
  );
}
