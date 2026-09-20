import { readFileSync } from "node:fs";
import { languages, pageNames, themeColor } from "../src/seo/metadata.ts";
const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );

export function crawlFiles(site: URL) {
  const entries = pageNames.flatMap((page) =>
    languages.map((lang) => {
      const alternates = languages
        .map(
          (other) =>
            `<xhtml:link rel="alternate" hreflang="${other}" href="${escapeXml(new URL(`${other}/${page}/`, site).href)}" />`,
        )
        .join("\n");
      return `<url><loc>${escapeXml(new URL(`${lang}/${page}/`, site).href)}</loc>\n${alternates}\n</url>`;
    }),
  );
  return {
    "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`,
    "robots.txt": `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", site).href}\n`,
  };
}

export function notFoundHtml(html: string, site: URL) {
  const css = readFileSync(
    new URL("../src/pages/NotFoundPage.css", import.meta.url),
    "utf8",
  );
  const home = escapeXml(new URL("ja/home/", site).pathname);
  const nav = pageNames
    .map(
      (page) =>
        `<a href="${escapeXml(new URL(`ja/${page}/`, site).pathname)}">${page[0].toUpperCase() + page.slice(1)}</a>`,
    )
    .join("");
  return html
    .replace(
      /<!-- page-meta:start -->[\s\S]*?<!-- page-meta:end -->/,
      `<title>404 — Page not found / yuitopia</title><meta name="robots" content="noindex, follow" /><meta name="theme-color" content="${themeColor}" /><style>${css}</style>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root"><div class="not-found"><header class="not-found-header"><a href="${home}">yuitopia.</a><nav aria-label="Navigation">${nav}</nav></header><main class="not-found-main"><p class="not-found-code" aria-hidden="true">404<span>.</span></p><h1 id="not-found-title" tabindex="-1">ページが見つかりません。</h1><p lang="en">Page not found. This page may have moved, or the address may be incorrect.</p><a class="not-found-home" href="${home}">Homeへ戻る ↗</a></main><footer class="not-found-footer">CREATE. CONNECT. AND BEYOND.</footer></div></div>`,
    );
}
