"use server";
// Contact-form Server Action. Invoked from the ContactForm Client Component via
// useActionState. Validates input server-side, then delivers the message with Resend.
// All addresses/keys come from env (.env.local) — see CONTACT_TO / CONTACT_FROM / RESEND_API_KEY.
import { Resend } from "resend";
import type { ContactState } from "./contact-types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field; bots usually do.
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true, message: "Thanks — your message is on its way." };
  }

  const name = ((formData.get("name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();
  const values = { name, email, message };

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!email) errors.email = "An email is required so we can reply.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!message) errors.message = "Add a short message.";
  else if (message.length > 5000) errors.message = "Message is too long (5000 char max).";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "Cloak Contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form misconfigured: RESEND_API_KEY and CONTACT_TO must be set.");
    return {
      ok: false,
      message: "Contact is temporarily unavailable. Please try again later.",
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: `${name} <${email}>`,
      subject: `Cloak contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend send failed:", error);
      return { ok: false, message: "Something went wrong sending your message. Please try again.", values };
    }
  } catch (err) {
    console.error("Resend threw:", err);
    return { ok: false, message: "Something went wrong sending your message. Please try again.", values };
  }

  return { ok: true, message: "Thanks — your message is on its way. We'll be in touch." };
}
