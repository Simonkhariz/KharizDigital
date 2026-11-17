"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { posts, type Post } from "../data/site";

export function Blog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [post, setPost] = useState<Post>(posts[0]);

  return (
    <section id="blog" className="md-section" aria-labelledby="meridiem-blog">
      <header className="md-sectionHead">
        <p className="md-eyebrow">Blog</p>
        <h2 id="meridiem-blog" className="md-h2">
          <span>Notes from</span> <span>the people building it.</span>
        </h2>
      </header>
      <ul className="md-posts">
        {posts.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="md-post"
              onClick={() => {
                setPost(item);
                dialog.current?.showModal();
              }}
            >
              <span className={`md-postArt md-art-${item.tone}`} aria-hidden="true" />
              <span className="md-postMeta">
                {item.tag} · {item.date}
              </span>
              <span className="md-postTitle">{item.title}</span>
              <span className="md-postExcerpt">{item.excerpt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="md-dialog md-dialogWide" aria-labelledby="meridiem-post-title" onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}>
        <article className="md-dialogInner">
          <button type="button" className="md-dialogClose" aria-label="Close" onClick={() => dialog.current?.close()}>
            <X size={18} aria-hidden="true" />
          </button>
          <p className="md-postMeta">
            {post.tag} · {post.date}
          </p>
          <h2 id="meridiem-post-title">{post.title}</h2>
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </dialog>
    </section>
  );
}
