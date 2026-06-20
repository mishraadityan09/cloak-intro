// Shared contact-form types + initial state. Kept out of actions.ts because a
// "use server" file may only export async functions — not types/objects.
export type ContactState = {
  ok: boolean | null;
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  // Echo values back so a failed submit doesn't wipe what the visitor typed.
  values?: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = { ok: null, message: "" };
