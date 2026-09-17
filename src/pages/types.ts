import type { RefObject } from "react";
import type { Locale } from "../content";
export type PageProps = {
  lang: Locale;
  heading: RefObject<HTMLHeadingElement | null>;
};
