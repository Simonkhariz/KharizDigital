import {
  BillingToggle,
  CompareTable,
  Faq,
  Header,
  Logo,
  PlanCards,
  SelectionProvider,
  SignupForm,
  StorageGuide,
} from "@/demos/showcase/stowbox-pricing/components/Interactive";
import { navLinks, reasons } from "@/demos/showcase/stowbox-pricing/data/content";
import "@/demos/showcase/stowbox-pricing/components/Site.css";

export default function StowboxPricingPage() {
  return (
    <SelectionProvider>
      <div className="sb-page" id="top">
        <Header />
        <main>
          <section className="sb-hero">
            <div>
              <p className="sb-kicker">Secure cloud storage</p>
              <h1>Storage that stays out of your way</h1>
              <p>Keep every brief, draft and final file in one tidy place, with version history and sharing your clients can follow.</p>
              <div className="sb-hero-actions">
                <a className="sb-btn" href="#pricing">
                  Choose your plan
                </a>
                <a className="sb-btn sb-btn-ghost" href="#compare">
                  Compare plans
                </a>
              </div>
            </div>
            <StorageGuide />
          </section>

          <section className="sb-section" id="why" aria-labelledby="sb-why-title">
            <h2 id="sb-why-title" className="sb-sr">
              Why Stowbox
            </h2>
            <ul className="sb-reasons">
              {reasons.map((reason, index) => (
                <li key={reason.title}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="sb-section sb-pricing" id="pricing" aria-labelledby="sb-pricing-title">
            <h2 id="sb-pricing-title">Choose your plan</h2>
            <p className="sb-lead">Pick the tier that fits your workflow.</p>
            <BillingToggle />
            <PlanCards />
          </section>

          <section className="sb-section" id="compare" aria-labelledby="sb-compare-title">
            <h2 id="sb-compare-title">Compare every plan</h2>
            <p className="sb-lead">The same list, side by side.</p>
            <CompareTable />
          </section>

          <section className="sb-section" id="faq" aria-labelledby="sb-faq-title">
            <h2 id="sb-faq-title">Questions, answered</h2>
            <p className="sb-lead">Billing, limits and what happens next.</p>
            <Faq />
          </section>

          <section className="sb-section sb-signup" id="signup" aria-labelledby="sb-signup-title">
            <div>
              <h2 id="sb-signup-title">Start with the plan you picked</h2>
              <p className="sb-lead">Fourteen days free on Starter and Growth. Change plan or billing period here before you begin.</p>
            </div>
            <SignupForm />
          </section>
        </main>
        <footer className="sb-footer">
          <Logo />
          <nav aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <p>© 2026 Stowbox. Concept website with demonstration content.</p>
        </footer>
      </div>
    </SelectionProvider>
  );
}
