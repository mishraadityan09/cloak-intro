"use client";
// Contact form. A Client Component so it can show validation, pending and result
// state via useActionState, while the actual send runs server-side in sendContact.
import { useActionState } from "react";
import { sendContact } from "./actions";
import { initialContactState } from "./contact-types";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initialContactState);

  if (state.ok) {
    return (
      <div className="contact-done" role="status" aria-live="polite">
        <span className="blk" />
        <p>{state.message}</p>
      </div>
    );
  }

  const v = state.values;

  return (
    <form action={action} className="contact-form" noValidate>
      {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
      <div className="contact-hp" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="contact-row">
        <label className="contact-field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            defaultValue={v?.name}
            aria-invalid={Boolean(state.errors?.name)}
          />
          {state.errors?.name && <em className="contact-err">{state.errors.name}</em>}
        </label>

        <label className="contact-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={v?.email}
            aria-invalid={Boolean(state.errors?.email)}
          />
          {state.errors?.email && <em className="contact-err">{state.errors.email}</em>}
        </label>
      </div>

      <label className="contact-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={4}
          required
          defaultValue={v?.message}
          aria-invalid={Boolean(state.errors?.message)}
          placeholder="What's on your mind?"
        />
        {state.errors?.message && <em className="contact-err">{state.errors.message}</em>}
      </label>

      <div className="contact-foot">
        <button type="submit" className="contact-submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.ok === false && (
          <p className="contact-status" role="alert" aria-live="polite">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
