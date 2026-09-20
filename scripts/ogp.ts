import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import type { Plugin } from "vite";

const title = "あかつきゆいと / yuitopia";
const description =
  "Webサイト制作、インフラ、コミュニティ運営。つくる。つなぐ。その先へ。";
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

export function ogpPlugin(publicUrl: string): Plugin {
  const site = new URL(publicUrl);
  if (
    !["https:", "http:"].includes(site.protocol) ||
    site.username ||
    site.password ||
    site.search ||
    site.hash
  ) {
    throw new Error(
      "SITE_URL must be an absolute HTTP(S) URL without credentials, query or hash.",
    );
  }
  if (!site.pathname.endsWith("/")) site.pathname += "/";
  let png: Buffer;
  let filename: string;
  return {
    name: "portfolio-ogp",
    buildStart() {
      const font = fileURLToPath(
        new URL("./fonts/NotoSansJP-Regular.ttf", import.meta.url),
      );
      const portrait = fileURLToPath(
        new URL("../src/assets/img/me/icon.png", import.meta.url),
      );
      const bold = fileURLToPath(
        new URL("./fonts/NotoSansJP-Black.ttf", import.meta.url),
      );
      this.addWatchFile(font);
      this.addWatchFile(bold);
      this.addWatchFile(portrait);
      const avatar = readFileSync(portrait).toString("base64");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
        <defs><clipPath id="avatar"><circle cx="1020" cy="235" r="104"/></clipPath></defs>
        <rect width="1200" height="630" fill="#fafaf8"/>
        <g font-family="OGP Noto Regular" fill="#191919">
          <text x="64" y="66" font-size="23" font-family="OGP Noto Black">yuitopia.</text>
          <text x="1136" y="64" text-anchor="end" font-size="14" letter-spacing="2">PORTFOLIO / CREATE · CONNECT</text>
          <path d="M64 92H1136" stroke="#c9c9c3"/>
          <text x="56" y="235" font-size="120" font-family="OGP Noto Black" letter-spacing="-5">YUITO</text>
          <text x="56" y="365" font-size="120" font-family="OGP Noto Black" letter-spacing="-5">AKATSUKI.</text>
          <circle cx="1020" cy="235" r="111" fill="none" stroke="#d6d6cf"/>
          <image x="916" y="131" width="208" height="208" clip-path="url(#avatar)" xlink:href="data:image/png;base64,${avatar}"/>
          <text x="64" y="429" font-size="25" font-family="OGP Noto Black">あかつきゆいと</text>
          <text x="64" y="479" font-size="23">つくる。つなぐ。その先へ。</text>
          <path d="M64 534H1136" stroke="#c9c9c3"/>
          <text x="64" y="580" font-size="16">WEB DEVELOPMENT / INFRASTRUCTURE / COMMUNITY</text>
          <text x="1136" y="580" text-anchor="end" font-size="17">${escapeXml(site.host)}</text>
        </g>
      </svg>`;
      png = new Resvg(svg, {
        font: {
          fontFiles: [font, bold],
          loadSystemFonts: false,
          defaultFontFamily: "OGP Noto Regular",
        },
      })
        .render()
        .asPng();
      const hash = createHash("sha256").update(png).digest("hex").slice(0, 12);
      filename = `ogp-${hash}.png`;
      if (this.environment.config.command === "build") {
        this.emitFile({ type: "asset", fileName: filename, source: png });
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (filename && req.url?.split("?")[0]?.endsWith("/" + filename)) {
          res.setHeader("Content-Type", "image/png");
          res.end(png);
        } else next();
      });
    },
    transformIndexHtml() {
      const image = new URL(filename, site).href;
      const properties: Record<string, string> = {
        "og:type": "website",
        "og:site_name": "yuitopia",
        "og:title": title,
        "og:description": description,
        "og:url": site.href,
        "og:locale": "ja_JP",
        "og:locale:alternate": "en_US",
        "og:image": image,
        "og:image:type": "image/png",
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:alt": description,
      };
      const twitter: Record<string, string> = {
        "twitter:card": "summary_large_image",
        "twitter:title": title,
        "twitter:description": description,
        "twitter:image": image,
        "twitter:image:alt": description,
        "twitter:creator": "@yuito_it_",
      };
      return [
        ...Object.entries(properties).map(([property, content]) => ({
          tag: "meta",
          attrs: { property, content },
          injectTo: "head" as const,
        })),
        ...Object.entries(twitter).map(([name, content]) => ({
          tag: "meta",
          attrs: { name, content },
          injectTo: "head" as const,
        })),
        {
          tag: "link",
          attrs: { rel: "canonical", href: site.href },
          injectTo: "head" as const,
        },
      ];
    },
  };
}
