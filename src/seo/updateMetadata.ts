import { pageMetadata } from "./metadata";
import type { Language, PageName } from "./metadata";

export function updateMetadata(lang: Language, page: PageName) {
  const data = pageMetadata(
    lang,
    page,
    __SITE_URL__,
    __OGP_IMAGES__[`${lang}/${page}`],
  );
  document.documentElement.lang = lang;
  document.title = data.title;
  for (const [key, content] of Object.entries(data.meta)) {
    const attribute = key.startsWith("og:") ? "property" : "name";
    let tag = document.head.querySelector<HTMLMetaElement>(
      `meta[${attribute}="${key}"]`,
    );
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, key);
      document.head.append(tag);
    }
    tag.content = content;
  }
  document.head
    .querySelector<HTMLLinkElement>('link[rel="canonical"]')
    ?.setAttribute("href", data.url);
}
