import { DarkTraces } from "./Circuit";
import { DemoForm, Faq } from "./Closing";
import { Label, Mark, Tag } from "./Mark";

export function Questions() {
  return (
    <section className="fs-faq" id="faq" aria-labelledby="fs-faq-title">
      <header>
        <Label>Questions</Label>
        <h2 className="fs-title" id="fs-faq-title">
          What finance leads ask <span>before they switch.</span>
        </h2>
        <div className="fs-faq-aside">
          <p>Something else on your mind? A product specialist answers within one working day.</p>
          <a className="fs-button" href="#demo">
            Ask on a demo
          </a>
        </div>
      </header>
      <Faq />
    </section>
  );
}

export function Demo() {
  return (
    <section className="fs-demo fs-on-dark" id="demo" aria-labelledby="fs-demo-title">
      <DarkTraces />
      <div className="fs-demo-copy">
        <Tag>Request demo</Tag>
        <h2 className="fs-title" id="fs-demo-title">
          See your own close, <span>a week shorter.</span>
        </h2>
        <p>A 30-minute walkthrough with your chart of accounts in mind. Tell us where to reach you.</p>
        <ol>
          <li>
            <small>/01/</small>
            <span>We map your ledger and bank feeds on the call.</span>
          </li>
          <li>
            <small>/02/</small>
            <span>You see last month replayed with your own approval rules.</span>
          </li>
          <li>
            <small>/03/</small>
            <span>You leave with a set-up plan, whether or not you buy.</span>
          </li>
        </ol>
      </div>
      <DemoForm />
    </section>
  );
}

const footerGroups = [
  {
    title: "/Product/",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Features", href: "#features" },
      { label: "Estimate", href: "#estimate" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "/Company/",
    links: [
      { label: "About", href: "#about" },
      { label: "Questions", href: "#faq" },
      { label: "Request demo", href: "#demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="fs-footer">
      <div className="fs-footer-top">
        <div className="fs-footer-brand">
          <a className="fs-footer-logo" href="#top" aria-label="Fiscara home">
            <span className="fs-brand-icon">
              <Mark size={17} />
            </span>
            fiscara.
          </a>
          <p>
            Smarter financial management, <span>from the first invoice to the board pack.</span>
          </p>
        </div>
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title.replace(/\//g, "")}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Account">
          <h3>/Account/</h3>
          <ul>
            <li>
              <button type="button" data-fs-open="login">
                Log in
              </button>
            </li>
            <li>
              <button type="button" data-fs-open="signup">
                Sign up
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <span className="fs-footer-word" aria-hidden="true">
        fiscara.
      </span>
      <p className="fs-footer-base">
        <span>© 2026 Fiscara. Concept website with demonstration content.</span>
        <a href="#top">Back to top</a>
      </p>
    </footer>
  );
}
