"use client";

import { useState } from "react";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { DEMO_SENT_MESSAGE, sendContactEmail } from "@/demos/lib/email";
import type { TextAnimationVariant } from "@/demos/lib/types";

interface ContactSplitEmailProps {
  tag: string;
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  /** Called with the submitted email address after it was sent successfully. */
  onSubmit?: (email: string) => void;
  imageSrc?: string;
  videoSrc?: string;
  textAnimation: TextAnimationVariant;
}

/** Contact section with a one-field email form card next to an image or video. */
export default function ContactSplitEmail({
  tag,
  title,
  description,
  inputPlaceholder,
  buttonText,
  onSubmit,
  imageSrc,
  videoSrc,
  textAnimation,
}: ContactSplitEmailProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <section aria-label="Contact section" className="py-20">
      <div className="w-content-width mx-auto">
        <ScrollReveal variant="slide-up" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center justify-center py-15 md:py-20 card rounded">
            <div className="flex flex-col items-center w-full gap-2 px-5">
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p>{tag}</p>
              </div>
              <TextAnimation
                text={title}
                variant={textAnimation}
                gradientText
                tag="h2"
                className="text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance"
              />
              <TextAnimation
                text={description}
                variant={textAnimation}
                gradientText={false}
                tag="p"
                className="md:max-w-8/10 text-lg md:text-xl leading-snug text-center text-balance"
              />
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setIsSubmitting(true);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  try {
                    await sendContactEmail({
                      email: email,
                    });
                    setSuccessMessage(DEMO_SENT_MESSAGE);
                    onSubmit?.(email);
                    setEmail("");
                  } catch (error) {
                    setErrorMessage(
                      error instanceof Error ? error.message : "Failed to send. Please try again.",
                    );
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="flex flex-col md:flex-row w-full md:w-8/10 2xl:w-6/10 gap-3 md:gap-1 p-1 mt-2 md:mt-3 card rounded"
              >
                <input
                  type="email"
                  placeholder={inputPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="flex-1 min-w-0 px-5 py-3 md:py-0 text-base text-center md:text-left bg-transparent placeholder:opacity-75 focus:outline-none truncate"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex shrink-0 items-center justify-center h-10 px-6 text-sm whitespace-nowrap rounded primary-button text-primary-cta-text cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : buttonText}
                </button>
              </form>
              {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
              {successMessage && (
                <p role="status" className="text-sm text-center">
                  {successMessage}
                </p>
              )}
            </div>
          </div>
          <div className="h-100 md:h-auto md:aspect-square card rounded overflow-hidden">
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
