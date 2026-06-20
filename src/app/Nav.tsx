"use client";
import { useState } from "react";
import Link from "next/link";

// Shared site nav. On the homepage (`home`) the section links are bare `#`
// anchors so GSAP's wireAnchors intercepts them for smooth-scroll; elsewhere
// they become `/#…` links back to the homepage sections. "Contact" always
// routes to the dedicated /contact page.
//
// The mobile menu's open-state class lives on `.nav-in`, NOT on `<nav>`:
// GSAP toggles `.scrolled` on `<nav>` directly, and a React-controlled
// className there would clobber it on every re-render.
export function Nav({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const sec = (id: string) => (home ? `#${id}` : `/#${id}`);
  const close = () => setOpen(false);

  return (
    <nav>
      <div className={`wrap nav-in${open ? " nav-open" : ""}`}>
        {home ? (
          <div className="brand">CLO<span className="blk" />AK</div>
        ) : (
          <Link className="brand" href="/" onClick={close}>CLO<span className="blk" />AK</Link>
        )}
        <div className="nav-links">
          <a href={sec("how")} onClick={close}>How it works</a>
          <a href={sec("what")} onClick={close}>What you get</a>
          <a href={sec("security")} onClick={close}>Security</a>
          <Link href="/contact" onClick={close}>Contact</Link>
        </div>
        <a className="nav-cta" href={sec("get")} onClick={close}>npx cloak-remote</a>
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
