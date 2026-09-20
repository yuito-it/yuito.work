import { useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { pageNames } from "../seo/metadata";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const lang = pathname.slice(import.meta.env.BASE_URL.length).startsWith("en/")
    ? "en"
    : "ja";
  useEffect(() => {
    document.title = "404 — Page not found / yuitopia";
    document.documentElement.lang = lang;
    document.head
      .querySelectorAll(
        'meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]',
      )
      .forEach((tag) => tag.remove());
    let robots = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.append(robots);
    }
    robots.content = "noindex, follow";
    document.getElementById("not-found-title")?.focus();
    return () => robots.remove();
  }, [lang]);
  return (
    <div className="not-found">
      <header className="not-found-header">
        <Link to="/$lang/$page/" params={{ lang, page: "home" }}>
          yuitopia.
        </Link>
        <nav aria-label="Navigation">
          {pageNames.map((page) => (
            <Link key={page} to="/$lang/$page/" params={{ lang, page }}>
              {page[0].toUpperCase() + page.slice(1)}
            </Link>
          ))}
        </nav>
      </header>
      <main className="not-found-main">
        <p className="not-found-code" aria-hidden="true">
          404<span>.</span>
        </p>
        <h1 id="not-found-title" tabIndex={-1}>
          {lang === "ja" ? "ページが見つかりません。" : "Page not found."}
        </h1>
        <p>
          {lang === "ja"
            ? "URLが変更されたか、ページが存在しないようです。"
            : "This page may have moved, or the address may be incorrect."}
        </p>
        <Link
          className="not-found-home"
          to="/$lang/$page/"
          params={{ lang, page: "home" }}
        >
          {lang === "ja" ? "Homeへ戻る" : "Back to Home"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </main>
      <footer className="not-found-footer">CREATE. CONNECT. AND BEYOND.</footer>
    </div>
  );
}
