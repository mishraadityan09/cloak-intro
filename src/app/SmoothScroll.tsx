"use client";
// ScrollSmoother provider. Renders the nav + progress hairline OUTSIDE the transformed
// #smooth-content (so position:fixed/sticky keeps working), wraps all page content inside it,
// and owns the single useGSAP() lifecycle: plugin registration, the reduced-motion matchMedia
// gate, smoother creation, scene building (in page order), copy/anchor wiring, and the
// document.fonts.ready refresh. All cleanup is automatic via useGSAP.
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { buildScenes, wireAnchors, wireCopyButtons } from "./scenes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function SmoothScroll({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!wrapper || !content) return;

      const cleanups: Array<() => void> = [wireCopyButtons(content)];

      const mm = gsap.matchMedia();
      mm.add(
        { animate: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { animate } = ctx.conditions as { animate: boolean; reduce: boolean };
          if (!animate) return; // reduced motion → native scroll, content stays visible

          document.documentElement.classList.add("gsap-ready");
          const smoother = ScrollSmoother.create({
            wrapper,
            content,
            smooth: 1.1,
            effects: true,
            normalizeScroll: true,
          });
          const cleanupScenes = buildScenes(content, smoother);
          ScrollTrigger.refresh();
          const cleanupAnchors = wireAnchors(smoother);
          if (process.env.NODE_ENV !== "production") (window as unknown as { __smoother?: ScrollSmoother }).__smoother = smoother;

          return () => {
            cleanupScenes();
            cleanupAnchors();
            smoother.kill();
            document.documentElement.classList.remove("gsap-ready");
          };
        },
      );

      // Three non-variable Google fonts shift layout after first paint — recompute trigger geometry.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: wrapperRef },
  );

  return (
    <>
      {nav}
      <div className="scroll-progress" aria-hidden />
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </>
  );
}
