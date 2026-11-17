import { footerColumns } from "../data/content";
import { Logo } from "./Brand";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="ml-footer-footer">
      <div className="ml-footer-inner">
        <div className="ml-footer-brand">
          <a href="#top" aria-label="Meadowline, back to top">
            <Logo />
          </a>
          <p>Workflow automation, designed and run for you. Built for teams that prefer calm over chaos.</p>
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
      <div className="ml-footer-base">
        <p>© 2026 Meadowline. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
