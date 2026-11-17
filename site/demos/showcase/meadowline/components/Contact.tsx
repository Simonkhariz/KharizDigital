import { ContactForm } from "./ContactForm";
import { Butterfly } from "./Butterfly";
import { Tag } from "./Brand";
import { Scene } from "./Scene";
import "./Contact.css";

export function Contact() {
  return (
    <section id="contact" className="ml-contact-section">
      <Scene className="ml-contact-scene" palette="golden" />
      <div className="ml-contact-veil" />
      <Butterfly size={34} top="16%" left="52%" rotate={-20} />
      <Butterfly size={22} top="64%" left="46%" rotate={24} delay={1.4} />
      <div className="ml-contact-inner">
        <div className="ml-contact-copy">
          <Tag>Contact</Tag>
          <h2>
            Tell us what slows
            <br />
            your team <em>down.</em>
          </h2>
          <p>
            Describe one workflow you would like off your plate. We reply within one working day with a short plan and
            an honest estimate.
          </p>
          <dl className="ml-contact-facts">
            <div>
              <dt>Reply time</dt>
              <dd>1 working day</dd>
            </div>
            <div>
              <dt>First workflow live</dt>
              <dd>1 to 2 weeks</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
