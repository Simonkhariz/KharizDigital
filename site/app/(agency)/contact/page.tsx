import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { UnderlineLink } from "@/components/links";
import { address, contact, socialLinks } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project or collaborate with Khariz Digital. Reach us on WhatsApp or by email.",
  alternates: { canonical: "/contact" },
};

const MONO_LABEL = "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-[1.9]";
const VALUE = "font-mono text-[13px] leading-relaxed";
const ROW = "grid grid-cols-12 gap-4 border-t border-border py-4";
const ROW_LABEL = `col-span-4 md:col-span-3 ${MONO_LABEL} pt-0.5 text-muted-foreground`;
const ROW_VALUE = `col-span-8 md:col-span-9 ${VALUE}`;

export default function ContactPage() {
  return (
    <main className="relative">
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 container-x">
        <h1 className="text-[clamp(2rem,4.6vw,3.6rem)] font-medium tracking-[-0.03em] leading-[1.05] mb-10 md:mb-14">Let&apos;s talk.</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 items-start">
          {/* Laid out like a message being written: a "To" line, then the form. */}
          <div className="md:col-span-7 border border-border p-4 md:p-6">
            <dl>
              <div className="grid grid-cols-12 gap-4 border-b border-border py-3">
                <dt className={`col-span-3 md:col-span-2 ${MONO_LABEL} pt-0.5 text-muted-foreground`}>To</dt>
                <dd className={`col-span-9 md:col-span-10 ${VALUE}`}>
                  <UnderlineLink href={contact.whatsapp.href} external>
                    {contact.whatsapp.label} {contact.whatsapp.display}
                  </UnderlineLink>
                </dd>
              </div>
            </dl>
            <div className="mt-2">
              <ContactForm />
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className={`${MONO_LABEL} text-foreground`}>Elsewhere</p>
            <dl className="mt-4">
              <div className={ROW}>
                <dt className={ROW_LABEL}>WhatsApp</dt>
                <dd className={ROW_VALUE}>
                  <UnderlineLink href={contact.whatsapp.href} external>
                    {contact.whatsapp.display}
                  </UnderlineLink>
                </dd>
              </div>
              <div className={ROW}>
                <dt className={ROW_LABEL}>Email</dt>
                <dd className={`${ROW_VALUE} break-all`}>
                  <UnderlineLink href={contact.email.href}>{contact.email.display}</UnderlineLink>
                </dd>
              </div>
              <div className={ROW}>
                <dt className={ROW_LABEL}>Studio</dt>
                <dd className={ROW_VALUE}>
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.city}, {address.country}
                  </address>
                </dd>
              </div>
              <div className={`${ROW} border-b`}>
                <dt className={ROW_LABEL}>Social</dt>
                <dd className={`${ROW_VALUE} flex flex-wrap gap-x-5 gap-y-1`}>
                  {socialLinks.map((link) => (
                    <UnderlineLink key={link.href} href={link.href} external>
                      {link.label}
                    </UnderlineLink>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <Footer cta={false} />
    </main>
  );
}
