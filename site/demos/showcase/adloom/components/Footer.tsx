import { footerColumns } from "../data/navigation";
import { Logo } from "./Logo";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="al-footer-footer">
      <div className="al-container al-footer-inner">
        <div className="al-footer-brand">
          <a href="#top" aria-label="Adloom, back to top">
            <Logo />
          </a>
          <p>Ad creative for social commerce, generated from your own products and reviewed by your own team.</p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="al-container al-footer-base">
        <p>Adloom, 2026</p>
        <p>Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
