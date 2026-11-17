import { navLinks } from "../data/content";
import { Brand } from "./Nav";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="dl-footer">
      <div className="dl-wrap dl-footer__inner">
        <div>
          <a href="#top" aria-label="Driftlayer, back to top">
            <Brand />
          </a>
          <p>The ambient assistant layer for teams who would rather not think about their tools.</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#access">Early access</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="dl-wrap dl-footer__base">
        <p>Driftlayer, 2026</p>
        <p>Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
