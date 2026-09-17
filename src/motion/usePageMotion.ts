import type { RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
type Scope = RefObject<HTMLElement | null>;

/** One observer per group; all tweens are created inside the GSAP context. */
function reveal(root: HTMLElement, selector: string, distance = 26) {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) return () => {};
  const animations = new Map<Element, gsap.core.Tween>();
  const observer = new IntersectionObserver(
    (entries) => {
      let order = 0;
      for (const entry of entries)
        if (entry.isIntersecting) {
          animations
            .get(entry.target)
            ?.delay(Math.min(order++ * 0.07, 0.21))
            .play();
          observer.unobserve(entry.target);
        }
    },
    { threshold: 0, rootMargin: "0px 0px -24px 0px" },
  );
  for (const target of targets) {
    animations.set(
      target,
      gsap.fromTo(
        target,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          paused: true,
          clearProps: "transform,opacity",
        },
      ),
    );
    observer.observe(target);
  }
  // A keyboard-focused link must never remain hidden below the reveal boundary.
  const onFocus = (event: FocusEvent) => {
    for (const [target, tween] of animations)
      if (target.contains(event.target as Node)) {
        tween.progress(1);
        observer.unobserve(target);
      }
  };
  root.addEventListener("focusin", onFocus);
  return () => {
    observer.disconnect();
    root.removeEventListener("focusin", onFocus);
  };
}

export function usePageMotion(scope: Scope, page: string, lang: string) {
  useGSAP(
    () => {
      const root = scope.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = root.querySelectorAll(
          ".hero-topline, .hero-index > *, .page-title > .eyebrow, .contact-page > .intro",
        );
        if (intro.length)
          gsap.fromTo(
            intro,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.055,
              delay: 0.12,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
          );
        const stop = reveal(
          root,
          ".section-heading, .work-card, .profile-grid > *, .about-layout > *, .capability, .email-link, .contact-socials > a, .contact-strip",
        );
        return stop;
      });
      // Hover animations are prebuilt and reused, and excluded on touch devices.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const cleanups: Array<() => void> = [];
          root
            .querySelectorAll<HTMLElement>(
              ".text-link, .round-link, .email-link, .work-card",
            )
            .forEach((link) => {
              const arrow = link.matches(".round-link")
                ? link
                : link.querySelector(":scope > span:last-child, h3 > span");
              const picture = link.matches(".work-card")
                ? link.querySelector(".art img")
                : null;
              if (!arrow && !picture) return;
              const tl = gsap.timeline({
                paused: true,
                defaults: { duration: 0.3, ease: "power2.out" },
              });
              if (arrow) tl.to(arrow, { x: 4, y: -4, rotation: 7 }, 0);
              if (picture) tl.to(picture, { scale: 1.035 }, 0);
              const enter = () => tl.play();
              const leave = () => tl.reverse();
              link.addEventListener("pointerenter", enter);
              link.addEventListener("pointerleave", leave);
              link.addEventListener("focus", enter);
              link.addEventListener("blur", leave);
              cleanups.push(() => {
                link.removeEventListener("pointerenter", enter);
                link.removeEventListener("pointerleave", leave);
                link.removeEventListener("focus", enter);
                link.removeEventListener("blur", leave);
              });
            });
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
      return () => mm.revert();
    },
    { scope, dependencies: [page, lang], revertOnUpdate: true },
  );
}

export function useWorksMotion(
  scope: Scope,
  page: string,
  lang: string,
  filter: string,
) {
  useGSAP(
    () => {
      if (page !== "works") return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () =>
        reveal(scope.current!, ".timeline-item", 20),
      );
      return () => mm.revert();
    },
    { scope, dependencies: [page, lang, filter], revertOnUpdate: true },
  );
}
