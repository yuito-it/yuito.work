import type { RefObject } from "react";
import { MotionText } from "../motion/MotionText";
export function PageTitle({
  label,
  text,
  heading,
}: {
  label: string;
  text: string;
  heading: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="page-title">
      <p className="eyebrow">{label}</p>
      <h1 ref={heading} tabIndex={-1}>
        <MotionText text={text} />
      </h1>
    </div>
  );
}
