import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { base, insights, partners, practices } from "../data/content";
import { Heading, Label, PillLink } from "./Bits";

function Closing({ text }: { text: string }) {
  return (
    <section className="wx-section wx-section--last">
      <div className="wx-closing">
        <h2>{text}</h2>
        <PillLink href={`${base}/#brief`}>Brief us on a search</PillLink>
      </div>
    </section>
  );
}

export function PracticesPage() {
  return (
    <>
      <section className="wx-section wx-section--top">
        <Heading as="h1" label="Practices" first="Four practices." second="One way of working." />
        <p className="wx-lede">Each practice is led by one partner, who takes on no more than four searches at a time.</p>
      </section>
      <section className="wx-section wx-section--tight" aria-label="Practice details">
        <ul className="wx-details">
          {practices.map((practice, index) => (
            <li key={practice.id} id={practice.id} className="wx-detail">
              <div>
                <Label>{String(index + 1).padStart(2, "0")}</Label>
                <h2>{practice.title}</h2>
                <p className="wx-detail__lead">{practice.text}</p>
              </div>
              <div>
                <p>{practice.detail}</p>
                <ul>
                  {practice.points.map((point) => (
                    <li key={point}>
                      <Check size={15} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <dl>
                  <div>
                    <dt>Typical roles</dt>
                    <dd>{practice.roles}</dd>
                  </div>
                  <div>
                    <dt>Led by</dt>
                    <dd>
                      <Link href={`${base}/partners/`} className="wx-arrowlink">
                        {practice.partner} <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Closing text="Not sure which practice fits? Start with the role." />
    </>
  );
}

export function PartnersPage() {
  return (
    <>
      <section className="wx-section wx-section--top">
        <Heading as="h1" label="Partners" first="The people" second="who do the work." />
        <p className="wx-lede">Four partners, no associates running searches in their name. The person you brief is the person who calls.</p>
      </section>
      <section className="wx-section wx-section--tight" aria-label="Partner profiles">
        <ul className="wx-profiles">
          {partners.map((partner) => (
            <li key={partner.id} id={partner.id}>
              <img src={partner.image} alt={partner.alt} width={640} height={800} loading="lazy" />
              <div>
                <Label>{partner.role}</Label>
                <h2>{partner.name}</h2>
                <p className="wx-detail__lead">{partner.text}</p>
                <p>{partner.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Closing text="Speak to a partner directly." />
    </>
  );
}

export function InsightsPage() {
  return (
    <>
      <section className="wx-section wx-section--top">
        <Heading as="h1" label="Insights" first="Notes on hiring" second="at the top." />
        <p className="wx-lede">Short pieces written by the partners, drawn from searches we have run. No names, by design.</p>
      </section>
      <section className="wx-section wx-section--tight" aria-label="Articles">
        <ul className="wx-articles">
          {insights.map((item) => (
            <li key={item.id} id={item.id}>
              <article>
                <img src={item.image} alt={item.alt} width={960} height={640} loading="lazy" />
                <div>
                  <span className="wx-insights__meta">
                    {item.date} · {item.minutes} min read
                  </span>
                  <h2>{item.title}</h2>
                  <p className="wx-detail__lead">{item.summary}</p>
                  <details>
                    <summary>Read the opening</summary>
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <p className="wx-articles__note">Excerpt only. The full article is not part of this concept site.</p>
                  </details>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <Closing text="Have a search in mind?" />
    </>
  );
}
