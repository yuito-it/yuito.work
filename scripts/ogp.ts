import { crawlFiles, notFoundHtml } from "./site-files.ts";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import type { Plugin } from "vite";
import {
  languages,
  pageNames,
  pageCopy,
  pageMetadata,
} from "../src/seo/metadata.ts";
import type { Language, PageName } from "../src/seo/metadata.ts";

const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
const metadataBlock = /<!-- page-meta:start -->[\s\S]*?<!-- page-meta:end -->/;

export function ogpPlugin(publicUrl: string): Plugin {
  const site = new URL(publicUrl);
  if (
    !["https:", "http:"].includes(site.protocol) ||
    site.username ||
    site.password ||
    site.search ||
    site.hash
  )
    throw new Error(
      "SITE_URL must be an absolute HTTP(S) URL without credentials, query or hash.",
    );
  if (!site.pathname.endsWith("/")) site.pathname += "/";
  const fonts = ["Regular", "Black"].map((weight) =>
    fileURLToPath(new URL(`./fonts/NotoSansJP-${weight}.ttf`, import.meta.url)),
  );
  const portrait = fileURLToPath(
    new URL("../src/assets/img/me/icon.png", import.meta.url),
  );
  const avatar = readFileSync(portrait).toString("base64");
  const crawl = crawlFiles(site);
  const images: Record<string, string> = {};
  const assets = new Map<string, Buffer>();
  for (const lang of languages)
    for (const page of pageNames) {
      const copy = pageCopy[page];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
      <defs><clipPath id="avatar"><circle cx="1020" cy="235" r="104"/></clipPath></defs>
      <rect width="1200" height="630" fill="#fafaf8"/>
      <g font-family="OGP Noto Regular" fill="#191919">
        <text x="64" y="66" font-size="23" font-family="OGP Noto Black">yuitopia.</text>
        <text x="1136" y="64" text-anchor="end" font-size="14" letter-spacing="2">${copy.label} / ${lang.toUpperCase()}</text>
        <path d="M64 92H1136" stroke="#c9c9c3"/>
        <text x="56" y="235" font-size="108" font-family="OGP Noto Black" letter-spacing="-5">${escapeXml(copy.lines[0])}</text>
        <text x="56" y="365" font-size="108" font-family="OGP Noto Black" letter-spacing="-5">${escapeXml(copy.lines[1])}</text>
        <circle cx="1020" cy="235" r="111" fill="none" stroke="#d6d6cf"/>
        <image x="916" y="131" width="208" height="208" clip-path="url(#avatar)" xlink:href="data:image/png;base64,${avatar}"/>
        <text x="64" y="429" font-size="25" font-family="OGP Noto Black">${lang === "ja" ? "あかつきゆいと" : "Yuito Akatsuki"}</text>
        <text x="64" y="479" font-size="23">${escapeXml(copy[lang].heading)}</text>
        <path d="M64 534H1136" stroke="#c9c9c3"/>
        <text x="64" y="580" font-size="15">WEB DEVELOPMENT / INFRASTRUCTURE / COMMUNITY</text>
        <text x="1136" y="580" text-anchor="end" font-size="17">${escapeXml(site.host)}</text>
      </g>
    </svg>`;
      const png = new Resvg(svg, {
        font: {
          fontFiles: fonts,
          loadSystemFonts: false,
          defaultFontFamily: "OGP Noto Regular",
        },
      })
        .render()
        .asPng();
      const hash = createHash("sha256").update(png).digest("hex").slice(0, 12);
      const filename = `ogp/${lang}-${page}-${hash}.png`;
      assets.set(filename, png);
      images[`${lang}/${page}`] = new URL(filename, site).href;
    }
  function renderHtml(html: string, lang: Language, page: PageName) {
    const data = pageMetadata(
      lang,
      page,
      site.href,
      images[`${lang}/${page}`]!,
    );
    const tags = Object.entries(data.meta).map(
      ([key, content]) =>
        `<meta ${key.startsWith("og:") ? "property" : "name"}="${key}" content="${escapeXml(content)}" />`,
    );
    tags.push(
      `<title>${escapeXml(data.title)}</title>`,
      `<link rel="canonical" href="${escapeXml(data.url)}" />`,
    );
    return html
      .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
      .replace(
        metadataBlock,
        `<!-- page-meta:start -->\n${tags.join("\n")}\n<!-- page-meta:end -->`,
      );
  }
  return {
    name: "portfolio-ogp",
    enforce: "post",
    config() {
      return {
        define: {
          __SITE_URL__: JSON.stringify(site.href),
          __OGP_IMAGES__: JSON.stringify(images),
        },
      };
    },
    buildStart() {
      for (const path of [...fonts, portrait]) this.addWatchFile(path);
      if (this.environment.config.command === "build")
        for (const [fileName, source] of assets)
          this.emitFile({ type: "asset", fileName, source });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url || "/", "http://localhost").pathname;
        const crawlName = pathname.slice(
          site.pathname.length,
        ) as keyof typeof crawl;
        if (
          pathname.startsWith(site.pathname) &&
          Object.hasOwn(crawl, crawlName)
        ) {
          res.setHeader(
            "Content-Type",
            crawlName.endsWith(".xml")
              ? "application/xml; charset=utf-8"
              : "text/plain; charset=utf-8",
          );
          res.end(crawl[crawlName]);
          return;
        }
        const key = pathname.slice(pathname.indexOf("/ogp/") + 1);
        const png = assets.get(key);
        if (png) {
          res.setHeader("Content-Type", "image/png");
          res.end(png);
        } else next();
      });
    },
    transformIndexHtml: {
      order: "post",
      handler(html, context) {
        const match = (context.originalUrl || context.path).match(
          /\/(ja|en)\/(home|works|about|contact)(?:\/|\?|$)/,
        );
        return renderHtml(
          html,
          (match?.[1] || "ja") as Language,
          (match?.[2] || "home") as PageName,
        );
      },
    },
    generateBundle: {
      order: "post",
      handler(_, bundle) {
        const entry = bundle["index.html"];
        if (!entry || entry.type !== "asset")
          throw new Error("Missing index.html for static page generation");
        const html = String(entry.source);
        for (const lang of languages)
          for (const page of pageNames)
            this.emitFile({
              type: "asset",
              fileName: `${lang}/${page}/index.html`,
              source: renderHtml(html, lang, page),
            });
        // Unknown paths can still reach the router on GitHub Pages.
        this.emitFile({
          type: "asset",
          fileName: "404.html",
          source: notFoundHtml(html, site),
        });
        for (const [fileName, source] of Object.entries(crawl))
          this.emitFile({ type: "asset", fileName, source });
      },
    },
  };
}
