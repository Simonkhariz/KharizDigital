/** What a contact form hands over: a single email address, or the named fields of a full form. */
export interface ContactSubmission {
  email?: string;
  message?: string;
  formData?: Record<string, string>;
}

/** Builds the body of the notification email from whatever the form collected. */
const buildMessageBody = (submission: ContactSubmission) => {
  if (submission.message && submission.message.trim()) {
    return submission.message.trim();
  }

  if (submission.formData && Object.keys(submission.formData).length > 0) {
    if (submission.formData.message && submission.formData.message.trim()) {
      return submission.formData.message.trim();
    }

    const lines: string[] = [];
    Object.entries(submission.formData).forEach(([fieldName, fieldValue]) => {
      if (fieldValue && fieldValue.trim()) {
        const fieldLabel =
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, " $1");
        lines.push(`${fieldLabel}: ${fieldValue.trim()}`);
      }
    });
    if (lines.length > 0) {
      return lines.join("\n\n");
    }
  }

  return "A new contact form submission has been received.";
};

/** Shown under a form after a successful (simulated) submission. */
const DEMO_SENT_MESSAGE = "Thank you. This is a demonstration website, so nothing was sent.";

/**
 * Handles a contact form submission.
 *
 * These are demonstration websites with no email service behind them: the submission is
 * accepted after a short pause and nothing leaves the browser. To deliver real messages, post
 * `buildMessageBody(submission)` and the sender address
 * (`submission.formData?.email || submission.email`) to your own API here.
 */
const sendContactEmail = async (submission: ContactSubmission): Promise<void> => {
  void submission;
  await new Promise((resolve) => setTimeout(resolve, 600));
};

export { buildMessageBody, DEMO_SENT_MESSAGE, sendContactEmail };
