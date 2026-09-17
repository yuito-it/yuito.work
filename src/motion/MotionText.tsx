import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
const graphemes = new Intl.Segmenter(undefined, { granularity: "grapheme" });

/** Only short display headings are split. Body text stays untouched. */
export function MotionText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const scope = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const element = scope.current!;
        const chars = element.querySelectorAll(".motion-char");
        const entrance = gsap.fromTo(
          chars,
          { yPercent: 105, rotation: 4, opacity: 0 },
          {
            yPercent: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.72,
            stagger: { amount: 0.24 },
            delay,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
        // Reuse a paused timeline on interaction: no new tweens per pointer event.
        const wave = gsap
          .timeline({ paused: true })
          .to(chars, {
            yPercent: -9,
            duration: 0.16,
            stagger: { amount: 0.18 },
            ease: "power2.out",
          })
          .to(
            chars,
            {
              yPercent: 0,
              duration: 0.32,
              stagger: { amount: 0.18 },
              ease: "back.out(1.6)",
              clearProps: "transform",
            },
            0.16,
          );
        const onEnter = () => {
          if (
            matchMedia("(hover: hover) and (pointer: fine)").matches &&
            !entrance.isActive() &&
            !wave.isActive()
          )
            wave.restart();
        };
        element.addEventListener("pointerenter", onEnter);
        return () => element.removeEventListener("pointerenter", onEnter);
      });
      return () => mm.revert();
    },
    { scope, dependencies: [text, delay], revertOnUpdate: true },
  );

  return (
    <span ref={scope} className="motion-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, index) => {
          if (/^\s+$/.test(word)) return word;
          const letters = Array.from(
            graphemes.segment(word),
            ({ segment }) => segment,
          );
          const content = letters.map((letter, i) => (
            <span className="motion-char" key={i}>
              {letter}
            </span>
          ));
          // Keep English words intact, while allowing natural Japanese line breaks.
          return /[\u3000-\u9fff]/.test(word) ? (
            <span key={index}>{content}</span>
          ) : (
            <span className="motion-word" key={index}>
              {content}
            </span>
          );
        })}
      </span>
    </span>
  );
}
