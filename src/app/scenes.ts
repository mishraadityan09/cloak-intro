// All GSAP scroll scenes for the Cloak landing page. These are pure builder functions invoked
// synchronously inside the provider's single useGSAP() callback (after ScrollSmoother is created),
// so every animation/ScrollTrigger is registered to the active gsap.context and auto-reverts on
// unmount. Functions that add raw DOM listeners (copy buttons, magnetic, scramble timers) return a
// cleanup the provider aggregates. Everything is transform/opacity-first and guarded against missing
// nodes so the page degrades gracefully.
//
// Reveal pattern: hide targets immediately (gsap.set, runs pre-paint in the layout effect → no
// FOUC) and play a one-shot tween in a ScrollTrigger onEnter callback. This DECOUPLES the reveal
// from ScrollTrigger progress, so ScrollSmoother's settle at page edges can't scrub/stall a
// non-scrubbed timeline (which it does when a trigger's `end` sits beyond maxScroll, e.g. the CTA).
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

type Cleanup = () => void;
const noop: Cleanup = () => {};

const list = <T extends Element = HTMLElement>(sel: string, root: ParentNode): T[] =>
  Array.from(root.querySelectorAll<T>(sel));
const one = <T extends Element = HTMLElement>(sel: string, root: ParentNode): T | null =>
  root.querySelector<T>(sel);

// Fire `run` once when `trigger` scrolls into view. The reveal animation lives inside run() and
// plays on its own clock — independent of scroll position, so it always completes.
function onEnter(trigger: Element, start: string, run: () => void) {
  ScrollTrigger.create({ trigger, start, once: true, onEnter: run });
}

// A masked, staggered line rise — the signature Apple headline reveal.
function revealLead(lead: HTMLElement, start = "top 82%") {
  const split = SplitText.create(lead, { type: "lines", mask: "lines" });
  gsap.set(split.lines, { yPercent: 110, autoAlpha: 0 });
  onEnter(lead, start, () =>
    gsap.to(split.lines, { yPercent: 0, autoAlpha: 1, duration: 0.85, stagger: 0.12, ease: "power4.out" }),
  );
  return split;
}

// Pointer-following "magnetic" pull on a button. Returns a cleanup that removes the listeners.
function magnetic(el: HTMLElement, strength = 0.4): Cleanup {
  const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

// ---- Copy-to-clipboard buttons (works in every motion mode) ----
export function wireCopyButtons(scope: HTMLElement): Cleanup {
  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLElement;
    navigator.clipboard?.writeText("npx cloak-remote");
    const prev = btn.textContent;
    btn.textContent = "COPIED";
    btn.classList.add("copied");
    gsap.fromTo(btn, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
    window.setTimeout(() => {
      btn.textContent = prev;
      btn.classList.remove("copied");
    }, 1300);
  };
  const btns = list<HTMLElement>(".copy", scope);
  btns.forEach((b) => b.addEventListener("click", onClick));
  return () => btns.forEach((b) => b.removeEventListener("click", onClick));
}

// ---- Anchor nav links glide via the smoother (offset for the fixed nav) ----
export function wireAnchors(smoother: ScrollSmoother): Cleanup {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const onClick = (e: MouseEvent) => {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    e.preventDefault();
    smoother.scrollTo(target, true, "top 76px");
  };
  links.forEach((a) => a.addEventListener("click", onClick));
  return () => links.forEach((a) => a.removeEventListener("click", onClick));
}

// ---- Hero wordmark glitch-decode (GSAP-cleaned port of the original ClientFX scramble) ----
function wordmarkScramble(wm: HTMLElement): Cleanup {
  const GLITCH = "!<>-_/[]{}=+*^?#%&";
  const letters = list<HTMLElement>(".wm-letter", wm);
  if (!letters.length) return noop;
  letters.forEach((l) => l.classList.add("scrambling"));
  let resolved = 0;
  const scramble = window.setInterval(() => {
    letters.forEach((l, i) => {
      if (i >= resolved) l.textContent = GLITCH[Math.floor(Math.random() * GLITCH.length)];
    });
  }, 45);
  const step = window.setInterval(() => {
    if (resolved < letters.length) {
      const l = letters[resolved];
      l.textContent = l.dataset.final ?? "";
      l.classList.remove("scrambling");
      resolved++;
    } else {
      window.clearInterval(scramble);
      window.clearInterval(step);
    }
  }, 150);
  return () => {
    window.clearInterval(scramble);
    window.clearInterval(step);
    letters.forEach((l) => {
      l.textContent = l.dataset.final ?? "";
      l.classList.remove("scrambling");
    });
  };
}

// ===========================================================================================
// SCENE B — Hero entrance (plays on load)
// ===========================================================================================
function heroEntrance(content: HTMLElement, cleanups: Cleanup[]) {
  const hero = one(".hero", content);
  if (!hero) return;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  const eyebrow = one(".eyebrow", hero);
  if (eyebrow) tl.from(eyebrow, { y: 12, autoAlpha: 0, duration: 0.5 });

  const wm = one("#wm", hero);
  if (wm) cleanups.push(wordmarkScramble(wm));

  const copy = one(".h1-copy", hero);
  const cursor = one(".cursor", hero);
  if (copy) {
    const s = SplitText.create(copy, { type: "lines", mask: "lines" });
    // Keep the blinking cursor riding the end of the last line (SplitText turns lines into blocks).
    if (cursor && s.lines.length) s.lines[s.lines.length - 1].appendChild(cursor);
    tl.from(s.lines, { yPercent: 110, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" }, "-=0.15");
  }
  if (cursor) tl.from(cursor, { autoAlpha: 0, duration: 0.3 }, "-=0.1");

  const sub = one(".sub", hero);
  if (sub) tl.from(sub, { y: 14, autoAlpha: 0, duration: 0.6 }, "-=0.35");

  const term = one(".term", hero);
  if (term) {
    tl.from(term, { y: 18, autoAlpha: 0, scale: 0.98, duration: 0.6 }, "-=0.3");
    const cmd = one(".term-cmd .cmd", hero);
    if (cmd) tl.from(cmd, { text: "", duration: 0.8, ease: "none" }, "-=0.05");
  }
  const proof = list(".proof span", hero);
  if (proof.length) tl.from(proof, { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.05 }, "-=0.3");

  const phone = one(".phone-stage", hero);
  if (phone) {
    tl.from(
      phone,
      { xPercent: 8, autoAlpha: 0, scale: 0.94, rotateY: 6, transformPerspective: 900, duration: 1.0, ease: "expo.out" },
      "<",
    );
  }
}

// ===========================================================================================
// SCENE C — "Watch it work" pinned scrub story
// ===========================================================================================
function watchScene(content: HTMLElement) {
  const watch = one(".watch", content);
  if (!watch) return;
  const tabs = list(".tab", watch);
  const underline = one(".tab-underline", watch);
  const ubub = one(".ubub", watch);
  const abub = one(".abub", watch);
  const tool = one(".tool", watch);
  const stripe = one(".tool-stripe", watch);
  const dlines = list(".dline", watch);
  const footer = list(".always, .tool-btns", watch);
  const allow = one(".tbtn.allow", watch);

  // Initial state: TERMINAL tab active, chat empty.
  gsap.set([ubub, abub, tool].filter(Boolean) as Element[], { autoAlpha: 0 });
  if (underline) gsap.set(underline, { left: "0%" });
  if (tabs[0]) gsap.set(tabs[0], { color: "var(--text)" });
  if (tabs[1]) gsap.set(tabs[1], { color: "var(--dim)" });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: { trigger: ".watch", start: "top top", end: "+=1800", pin: ".watch-pin", scrub: 1, anticipatePin: 1 },
  });

  // Beat 1 — switch TERMINAL → CHAT
  if (underline) tl.to(underline, { left: "50%", duration: 1, ease: "power2.inOut" });
  if (tabs[0]) tl.to(tabs[0], { color: "var(--dim)", duration: 0.6 }, "<");
  if (tabs[1]) tl.to(tabs[1], { color: "var(--text)", duration: 0.6 }, "<");

  // Beat 2 — user message rises in
  if (ubub) tl.fromTo(ubub, { y: 14, scale: 0.96, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "back.out(1.4)" }, "+=0.2");

  // Beat 3 — agent reply slides from the left
  if (abub) tl.fromTo(abub, { x: -10, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, "+=0.3");

  // Beat 4 — tool-approval card rises, stripe wipes across
  if (tool) tl.fromTo(tool, { y: 24, scale: 0.97, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "expo.out" }, "+=0.3");
  if (stripe) tl.fromTo(stripe, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0 50%", duration: 0.6 }, "<");

  // Beat 5 — diff draws in line by line
  if (dlines.length) tl.from(dlines, { x: -8, autoAlpha: 0, stagger: 0.6, duration: 0.6 }, "+=0.1");

  // Beat 6 — always-allow + buttons settle
  if (footer.length) tl.from(footer, { y: 8, autoAlpha: 0, stagger: 0.25, duration: 0.5 }, "+=0.2");

  // Beat 7 — ALLOW pulses with a lime bloom
  if (allow)
    tl.to(
      allow,
      { scale: 1.06, boxShadow: "0 0 22px color-mix(in srgb, var(--lime) 60%, transparent)", duration: 0.4, yoyo: true, repeat: 1, ease: "power2.inOut" },
      "+=0.3",
    );
}

// ===========================================================================================
// SCENE D — Section eyebrows / leads / sub-copy reveals (generic loop)
// ===========================================================================================
function sectionReveals(content: HTMLElement) {
  list(".reveal", content).forEach((block) => {
    if (block.closest(".cta")) return; // CTA has its own finale
    const eyebrow = one(".sec-eyebrow", block);
    const lead = one(".lead", block);
    const sub = one(".lead-sub", block);
    if (eyebrow) {
      gsap.set(eyebrow, { y: 14, autoAlpha: 0 });
      onEnter(block, "top 84%", () => gsap.to(eyebrow, { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }));
    }
    if (lead) revealLead(lead);
    if (sub) {
      gsap.set(sub, { y: 16, autoAlpha: 0 });
      onEnter(sub, "top 86%", () => gsap.to(sub, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }));
    }
  });
}

// ===========================================================================================
// SCENE E — How steps (stagger + counters + drawing line)
// ===========================================================================================
function stepsScene(content: HTMLElement) {
  const steps = one(".steps", content);
  if (!steps) return;
  const cards = list(".step", steps);
  gsap.set(cards, { y: 30, autoAlpha: 0 });
  onEnter(steps, "top 80%", () => gsap.to(cards, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.14, ease: "power3.out" }));

  list<HTMLElement>(".step .n .num", steps).forEach((numEl, i) => {
    onEnter(numEl, "top 88%", () => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: i + 1,
        duration: 1,
        ease: "power1.out",
        snap: { v: 1 },
        onUpdate: () => {
          numEl.textContent = String(Math.round(obj.v)).padStart(2, "0");
        },
      });
    });
  });

  const line = one(".steps-line", steps);
  if (line)
    gsap.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", transformOrigin: "0 50%", scrollTrigger: { trigger: steps, start: "top 72%", end: "bottom 72%", scrub: 0.6 } },
    );
}

// ===========================================================================================
// SCENE F — What → horizontal-scroll gallery (desktop), vertical fades (mobile)
// ===========================================================================================
function galleryScene(content: HTMLElement) {
  const pin = one(".what-pin", content);
  const track = one(".what-track", content);
  if (!pin || !track) return;
  const panels = list(".panel", track);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const horiz = gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
    });
    panels.forEach((panel) => {
      gsap.from(list(".blk, h3, p", panel), {
        yPercent: 28,
        autoAlpha: 0,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, containerAnimation: horiz, start: "left 78%", end: "left 40%", scrub: true },
      });
    });
  });

  mm.add("(max-width: 767px)", () => {
    panels.forEach((panel) => {
      gsap.set(panel, { y: 24, autoAlpha: 0 });
      onEnter(panel, "top 82%", () => gsap.to(panel, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }));
    });
  });
}

// ===========================================================================================
// SCENE G/H — Why quote + comparison, Security chain
// ===========================================================================================
function whyScene(content: HTMLElement) {
  const quote = one(".why-quote", content);
  if (quote) {
    const s = SplitText.create(quote, { type: "words" });
    gsap.set(s.words, { autoAlpha: 0, y: 10 });
    onEnter(quote, "top 80%", () => gsap.to(s.words, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power2.out" }));
  }
  const vs = one(".vs", content);
  if (vs) {
    const rows = list(".vs > div", vs);
    gsap.set(rows, { x: -14, autoAlpha: 0 });
    onEnter(vs, "top 82%", () => gsap.to(rows, { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }));
  }
}

function securityScene(content: HTMLElement) {
  const chain = one(".chain", content);
  if (!chain) return;
  const tags = list(".chain span", chain);
  gsap.set(tags, { scale: 0.8, autoAlpha: 0, y: 10 });
  onEnter(chain, "top 84%", () => gsap.to(tags, { scale: 1, autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }));
}

// ===========================================================================================
// SCENE I — Demo phone scale-in + play-button pulse
// ===========================================================================================
function demoScene(content: HTMLElement) {
  const demo = one(".demo-phone", content);
  if (!demo) return;
  gsap.set(demo, { y: 40, scale: 0.92, autoAlpha: 0 });
  onEnter(one(".demo-wrap", content) ?? demo, "top 82%", () => gsap.to(demo, { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "expo.out" }));
  const play = one(".play", content);
  if (play) {
    const pulse = gsap.to(play, {
      boxShadow: "0 0 26px color-mix(in srgb, var(--lime) 45%, transparent)",
      scale: 1.05,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true,
    });
    ScrollTrigger.create({ trigger: ".demo-wrap", start: "top 70%", end: "bottom 30%", onToggle: (self) => (self.isActive ? pulse.play() : pulse.pause()) });
  }
}

// ===========================================================================================
// SCENE J — CTA finale
// ===========================================================================================
function ctaScene(content: HTMLElement) {
  const cta = one(".cta", content);
  if (!cta) return;
  const wm = one(".wordmark", cta);
  const h2 = one("h2", cta);
  const term = one(".cta-term", cta);
  const badge = one(".badge", cta);

  if (wm) gsap.set(wm, { scale: 0.9, autoAlpha: 0 });
  const split = h2 ? SplitText.create(h2, { type: "lines", mask: "lines" }) : null;
  if (split) gsap.set(split.lines, { yPercent: 110, autoAlpha: 0 });
  if (term) gsap.set(term, { y: 20, scale: 0.98, autoAlpha: 0 });
  if (badge) gsap.set(badge, { y: 12, autoAlpha: 0 });

  onEnter(cta, "top 72%", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (wm) tl.to(wm, { scale: 1, autoAlpha: 1, duration: 0.9, ease: "expo.out" });
    if (split) tl.to(split.lines, { yPercent: 0, autoAlpha: 1, stagger: 0.12, duration: 0.8, ease: "power4.out" }, "-=0.4");
    if (term) tl.to(term, { y: 0, scale: 1, autoAlpha: 1, duration: 0.6 }, "-=0.3");
    if (badge) tl.to(badge, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
  });
}

// ===========================================================================================
// Parallax + chrome (nav state, progress hairline) + micro-interactions
// ===========================================================================================
function parallaxAndChrome(content: HTMLElement, smoother: ScrollSmoother, cleanups: Cleanup[]) {
  // Tasteful parallax on non-transform-animated containers only.
  smoother.effects(list(".sec-eyebrow", content), { speed: 1.08 });
  smoother.effects(list(".rule", content), { speed: 1.12 });
  const quote = one(".why-quote", content);
  if (quote) smoother.effects(quote, { speed: 1.05 });

  // Nav elevate/shrink past 64px.
  const nav = document.querySelector<HTMLElement>("nav");
  if (nav) {
    ScrollTrigger.create({ start: 64, end: "max", onToggle: (self) => nav.classList.toggle("scrolled", self.isActive) });
    const cta = nav.querySelector<HTMLElement>(".nav-cta");
    if (cta) cleanups.push(magnetic(cta));
  }

  // Scroll progress hairline.
  const progress = document.querySelector<HTMLElement>(".scroll-progress");
  if (progress)
    gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "0 50%", scrollTrigger: { start: "top top", end: "max", scrub: 0.3 } });
}

// ===========================================================================================
// Orchestrator — called once, in page order, inside the provider's useGSAP (animate branch).
// ===========================================================================================
export function buildScenes(content: HTMLElement, smoother: ScrollSmoother): Cleanup {
  const cleanups: Cleanup[] = [];
  parallaxAndChrome(content, smoother, cleanups);
  heroEntrance(content, cleanups);
  watchScene(content);
  sectionReveals(content);
  stepsScene(content);
  galleryScene(content);
  whyScene(content);
  securityScene(content);
  demoScene(content);
  ctaScene(content);
  return () => cleanups.forEach((fn) => fn());
}
