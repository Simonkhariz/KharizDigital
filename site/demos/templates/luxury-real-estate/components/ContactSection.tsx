"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import { sendContactEmail } from "@/demos/lib/email";

interface ContactFormInput {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface ContactFormTextarea {
  name: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
}

/** Field values keyed by field name. */
type ContactFormValues = Record<string, string>;

interface ContactFooterLink {
  text: string;
  href: string;
  /** Small round avatar shown inside the link pill. */
  imageSrc?: string;
}

interface ContactSectionProps {
  title: string;
  imageSrc?: string;
  videoSrc?: string;
  inputs: ContactFormInput[];
  textarea?: ContactFormTextarea;
  buttonText: string;
  footerText: string;
  footerLink: ContactFooterLink;
  /** Called with the submitted values after they were sent successfully. */
  onSubmit?: (formValues: ContactFormValues) => void;
}

/** Contact section with a glass form card over a full-bleed parallax image or video. */
export default function ContactSection({
  title,
  imageSrc,
  videoSrc,
  inputs,
  textarea,
  buttonText,
  footerText,
  footerLink,
  onSubmit,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [formValues, setFormValues] = useState(() => {
    const initialValues: ContactFormValues = {};
    inputs.forEach((input) => {
      initialValues[input.name] = "";
    });
    if (textarea) {
      initialValues[textarea.name] = "";
    }
    return initialValues;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await sendContactEmail({
        formData: formValues,
      });
      onSubmit?.(formValues);
      const emptyValues: ContactFormValues = {};
      inputs.forEach((input) => {
        emptyValues[input.name] = "";
      });
      if (textarea) {
        emptyValues[textarea.name] = "";
      }
      setFormValues(emptyValues);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Contact section"
      className="relative overflow-hidden h-[90svh] my-20"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
        }}
      >
        <ImageOrVideo
          imageSrc={imageSrc}
          videoSrc={videoSrc}
          className="absolute inset-0 w-full h-[120%] object-cover rounded-none"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      <div className="relative z-10 flex items-center h-full px-8 md:px-12">
        <div className="mx-auto w-content-width">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full md:w-1/2 lg:w-5/12 rounded border border-primary-cta-text/10 bg-primary-cta-text/10 backdrop-blur-xl p-6 md:p-10"
          >
            <h2 className="mb-6 text-4xl md:text-5xl font-semibold text-white">{title}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {inputs.map((input) => (
                  <input
                    key={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formValues[input.name] || ""}
                    onChange={(event) =>
                      setFormValues({
                        ...formValues,
                        [input.name]: event.target.value,
                      })
                    }
                    required={input.required}
                    aria-label={input.placeholder}
                    className="w-full h-13 rounded border border-primary-cta-text/15 bg-primary-cta-text/10 px-5 text-base text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none"
                  />
                ))}
              </div>
              {textarea && (
                <textarea
                  placeholder={textarea.placeholder}
                  value={formValues[textarea.name] || ""}
                  onChange={(event) =>
                    setFormValues({
                      ...formValues,
                      [textarea.name]: event.target.value,
                    })
                  }
                  required={textarea.required}
                  rows={textarea.rows || 5}
                  aria-label={textarea.placeholder}
                  className="w-full resize-none rounded border border-primary-cta-text/15 bg-primary-cta-text/10 px-5 py-3 text-base text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none"
                />
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full h-13 px-6 text-base font-medium rounded bg-background text-foreground cursor-pointer transition-colors hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : buttonText}
              </button>
              {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
            </form>
            <div className="mt-6 flex items-center justify-between border-t border-primary-cta-text/10 pt-6">
              <p className="text-base text-white/75">{footerText}</p>
              <a
                href={footerLink.href}
                className="flex items-center gap-2 rounded-full bg-primary-cta-text/15 backdrop-blur-sm p-1.5 pr-5 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-primary-cta-text/25"
              >
                <ImageOrVideo
                  imageSrc={footerLink.imageSrc}
                  className="h-8 w-8 rounded-full object-cover"
                />
                {footerLink.text}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
