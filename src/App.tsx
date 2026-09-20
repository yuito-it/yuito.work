import { useEffect, useRef, useState } from "react";
import { Link, getRouteApi } from "@tanstack/react-router";
import { updateMetadata } from "./seo/updateMetadata";
import { usePageMotion } from "./motion/usePageMotion";
import HomePage from "./pages/HomePage";
import WorksPage from "./pages/WorksPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";
import "./motion/motion.css";
const pages = ["home", "works", "about", "contact"] as const;
const routeApi = getRouteApi("/$lang/$page");
function App() {
  const { lang, page } = routeApi.useParams();
  const { work } = routeApi.useSearch();
  const [menu, setMenu] = useState(false);
  const motionScope = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  usePageMotion(motionScope, page, lang);
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  useEffect(() => {
    updateMetadata(lang, page);
    heading.current?.focus({ preventScroll: true });
    // Wait for the committed layout before targeting a timeline entry.
    if (page === "works" && work) {
      const frame = requestAnimationFrame(() => {
        document
          .getElementById(work)
          ?.scrollIntoView({ block: "center", behavior: "instant" });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [lang, page, work]);
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        {t("本文へスキップ", "Skip to content")}
      </a>
      <header
        className="header"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMenu(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        <Link
          className="brand"
          to="/$lang/$page/"
          params={{ lang, page: "home" }}
          aria-label="yuitopia Home"
        >
          yuitopia<span className="brand-dot">.</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? t("閉じる", "Close") : t("メニュー", "Menu")}{" "}
          <span aria-hidden="true">{menu ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          className={menu ? "nav open" : "nav"}
          aria-label={t("メインナビゲーション", "Main navigation")}
        >
          {pages.map((p) => (
            <Link
              to="/$lang/$page/"
              params={{ lang, page: p }}
              key={p}
              aria-current={page === p ? "page" : undefined}
            >
              {p[0].toUpperCase() + p.slice(1)}
            </Link>
          ))}
        </nav>
        <div className="languages" aria-label={t("言語", "Language")}>
          <Link
            to="/$lang/$page/"
            params={{ lang: "ja", page }}
            search={{ work }}
            lang="ja"
            aria-current={lang === "ja" ? "true" : undefined}
          >
            JP
          </Link>
          <span>/</span>
          <Link
            to="/$lang/$page/"
            params={{ lang: "en", page }}
            search={{ work }}
            lang="en"
            aria-current={lang === "en" ? "true" : undefined}
          >
            EN
          </Link>
        </div>
      </header>
      <main id="main" ref={motionScope} tabIndex={-1}>
        {page === "home" && <HomePage lang={lang} heading={heading} />}
        {page === "works" && <WorksPage lang={lang} heading={heading} />}
        {page === "about" && <AboutPage lang={lang} heading={heading} />}
        {page === "contact" && <ContactPage lang={lang} heading={heading} />}
        {page !== "contact" && (
          <section className="contact-strip">
            <div>
              <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
              <h2>
                {t("次は、どんなことをつくろう。", "What shall we make next?")}
              </h2>
            </div>
            <Link
              to="/$lang/$page/"
              params={{ lang, page: "contact" }}
              className="round-link"
              aria-label={t("お問い合わせ", "Contact")}
            >
              ↗
            </Link>
          </section>
        )}
      </main>
      <footer>
        <Link
          className="brand"
          to="/$lang/$page/"
          params={{ lang, page: "home" }}
        >
          yuitopia<span className="brand-dot">.</span>
        </Link>
        <span>© {new Date().getFullYear()} Yuito Akatsuki</span>
        <Link to="/$lang/$page/" params={{ lang, page: "contact" }}>
          Contact ↗
        </Link>
      </footer>
    </>
  );
}
export default function PortfolioPage() {
  const { lang, page } = routeApi.useParams();
  const { work } = routeApi.useSearch();
  return <App key={`${lang}/${page}/${work ?? ""}`} />;
}
