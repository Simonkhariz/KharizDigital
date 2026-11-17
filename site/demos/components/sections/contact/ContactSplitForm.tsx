"use client";

import { useState } from "react";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { DEMO_SENT_MESSAGE, sendContactEmail } from "@/demos/lib/email";
import type { TextAnimationVariant } from "@/demos/lib/types";

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

interface ContactSplitFormProps {
  tag: string;
  title: string;
  description: string;
  inputs: ContactFormInput[];
  textarea?: ContactFormTextarea;
  buttonText: string;
  /** Called with the submitted values after they were sent successfully. */
  onSubmit?: (formValues: ContactFormValues) => void;
  imageSrc?: string;
  videoSrc?: string;
  textAnimation: TextAnimationVariant;
}

/** Contact section with a multi-field form card next to an image or video. */
export default function ContactSplitForm({
  tag,
  title,
  description,
  inputs,
  textarea,
  buttonText,
  onSubmit,
  imageSrc,
  videoSrc,
  textAnimation,
}: ContactSplitFormProps) {
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <section aria-label="Contact section" className="py-20">
      <div className="w-content-width mx-auto">
        <ScrollReveal variant="slide-up" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 md:p-10 card rounded">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setIsSubmitting(true);
                setErrorMessage(null);
                setSuccessMessage(null);
                try {
                  await sendContactEmail({
                    formData: formValues,
                  });
                  setSuccessMessage(DEMO_SENT_MESSAGE);
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
                  setErrorMessage(
                    error instanceof Error ? error.message : "Failed to send. Please try again.",
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                  <p>{tag}</p>
                </div>
                <TextAnimation
                  text={title}
                  variant={textAnimation}
                  gradientText
                  tag="h2"
                  className="text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-balance"
                />
                <TextAnimation
                  text={description}
                  variant={textAnimation}
                  gradientText={false}
                  tag="p"
                  className="text-lg md:text-xl leading-snug text-balance"
                />
              </div>
              <div className="flex flex-col gap-3">
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
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                  />
                ))}
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
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none resize-none card rounded"
                  />
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full h-10 px-6 text-sm primary-button text-primary-cta-text rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : buttonText}
                </button>
                {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
                {successMessage && (
                  <p role="status" className="text-sm text-center">
                    {successMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="h-100 md:h-auto card rounded overflow-hidden">
            <ImageOrVideo
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              className="size-full object-cover rounded"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
