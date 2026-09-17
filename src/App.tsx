import { useEffect, useRef, useState } from "react";
import { categories, pick, profile, socials, works } from "./content";
import type { Category, Locale, Work } from "./content";
import cilium from "./assets/img/works/cilium.png";
import linkle from "./assets/img/works/Linkle.png";
import portrait from "./assets/img/me/icon.png";
import awardPhoto from "./assets/img/works/seccamp_forum_award_unique.JPG?url";
import uniLogo from "./assets/img/works/UniPro_black.png";
import "./App.css";
const pages = ["home", "works", "about", "contact"] as const;
type Page = (typeof pages)[number];
function readRoute() {
  const [language, page] = window.location.hash
    .replace(/^#\/?/, "")
    .split("?")[0]
    .split("/");
  return {
    lang: (language === "en" ? "en" : "ja") as Locale,
    page: (pages.includes(page as Page) ? page : "home") as Page,
  };
}
function Artwork({
  work,
  decorative = false,
}: {
  work: Work;
  decorative?: boolean;
}) {
  return (
    <div
      className={`art art-${work.art}`}
      aria-hidden={decorative || undefined}
    >
      {work.art === "award" ? (
        <img
          className="photo"
          src={awardPhoto}
          alt={decorative ? "" : "UniQUE / Security Camp Forum 2026"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : work.art === "uniproject" ? (
        <img
          src={uniLogo}
          alt={decorative ? "" : "UniProject"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : work.art === "cilium" ? (
        <img
          src={cilium}
          alt={decorative ? "" : "Cilium"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : work.art === "linkle" ? (
        <img
          src={linkle}
          alt={decorative ? "" : "Linkle"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : (
        <>
          <div className="art-orbit" />
          <span className="art-word">
            {
              {
                unique: "UniQUE",
                uniproject: "UniProject",
                community: "Connect.",
                security: "CVE",
                charity: "For good.",
                award: "Together.",
                camp: "Explore.",
                web: "Create.",
                school: "Next.",
              }[work.art]
            }
          </span>
          <span className="art-caption">
            {work.art === "unique"
              ? "ONE ID. ONE COMMUNITY."
              : work.date.slice(0, 4) + " / " + work.category.toUpperCase()}
          </span>
        </>
      )}
    </div>
  );
}
function App() {
  const [route, setRoute] = useState(readRoute);
  const [filter, setFilter] = useState<Category>("all");
  const [menu, setMenu] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const { lang, page } = route;
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  const href = (p: Page) => `#/${lang}/${p}`;
  useEffect(() => {
    const update = () => {
      setRoute(readRoute());
      setMenu(false);
      setFilter("all");
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${page[0].toUpperCase() + page.slice(1)} — ${lang === "ja" ? "あかつきゆいと" : "Yuito Akatsuki"} / yuitopia`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", pick(profile, lang));
    if (!first.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      heading.current?.focus({ preventScroll: true });
    }
    first.current = false;
    const work = new URLSearchParams(window.location.hash.split("?")[1]).get(
      "work",
    );
    if (page === "works" && work)
      document.getElementById(work)?.scrollIntoView({ block: "center" });
  }, [lang, page]);
  const title = (label: string, ja: string, en: string) => (
    <div className="page-title">
      <p className="eyebrow">{label}</p>
      <h1 ref={heading} tabIndex={-1}>
        {t(ja, en)}
      </h1>
    </div>
  );
  const socialLinks = (
    <div className="socials">
      {socials.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
          {s.name} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
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
        <a className="brand" href={href("home")} aria-label="yuitopia Home">
          yuitopia<span className="brand-dot">.</span>
        </a>
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
            <a
              href={href(p)}
              key={p}
              aria-current={page === p ? "page" : undefined}
            >
              {p[0].toUpperCase() + p.slice(1)}
            </a>
          ))}
        </nav>
        <div className="languages" aria-label={t("言語", "Language")}>
          <a
            href={`#/ja/${page}`}
            lang="ja"
            aria-current={lang === "ja" ? "true" : undefined}
          >
            JP
          </a>
          <span>/</span>
          <a
            href={`#/en/${page}`}
            lang="en"
            aria-current={lang === "en" ? "true" : undefined}
          >
            EN
          </a>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {page === "home" && (
          <>
            <section className="hero editorial-hero">
              <div className="hero-topline"><span>PORTFOLIO / 2023 — 2026</span><span>WEB · INFRASTRUCTURE · COMMUNITY</span></div>
              <h1 ref={heading} tabIndex={-1} className="name-title"><span>YUITO</span><span>AKATSUKI<span className="name-period">.</span></span></h1>
              <div className="hero-index">
                <p>{t("あかつきゆいと", "Yuito Akatsuki")}<br/><span>{t("つくる。つなぐ。その先へ。", "Create. Connect. And beyond.")}</span></p>
                <p>Web development<br/>Infrastructure<br/>Community management</p>
                <p>{t("UniProject 創設者", "Founder of UniProject")}<br/>{t("セキュリティ・キャンプ修了生", "Security Camp graduate")}<br/>{t("S高等学校4期生", "S High School, fourth cohort")}</p>
                <a className="text-link" href={href("works")}>{t("活動を見る", "Explore works")} <span>↓</span></a>
              </div>
            </section>
            <section className="section" id="selected">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">01 / SELECTED WORKS</p>
                  <h2>
                    Selected works
                  </h2>
                </div>
                <a className="text-link" href={href("works")}>
                  {t("すべての活動", "All works")} <span>↗</span>
                </a>
              </div>
              <div className="selected-grid">
                {[works[3], works[0], works[9]].map((w) => (
                  <a
                    className="work-card"
                    href={`${href("works")}?work=${w.id}`}
                    key={w.id}
                  >
                    <Artwork work={w} />
                    <div className="card-meta">
                      <span>{w.date}</span>
                      <span>{pick(categories[w.category], lang)}</span>
                    </div>
                    <h3>
                      {pick(w.title, lang)} <span>↗</span>
                    </h3>
                    <p>{pick(w.description, lang)}</p>
                  </a>
                ))}
              </div>
            </section>
            <section className="profile-section section">
              <p className="eyebrow">02 / ABOUT ME</p>
              <div className="profile-grid">
                <div>
                  <img
                    className="profile-avatar"
                    src={portrait}
                    alt={t(
                      "あかつきゆいとのアイコン",
                      "Yuito Akatsuki’s avatar",
                    )}
                    loading="lazy"
                  />
                  <p className="small-label">YUITO AKATSUKI</p>
                  <h2>
                    {t("あかつきゆいと", "Yuito Akatsuki")}
                    <span className="green-dot">.</span>
                  </h2>
                  <div className="profile-tags">
                    <span>{t("つくる人", "Creator")}</span>
                    <span>{t("つなぐ人", "Connector")}</span>
                  </div>
                </div>
                <div>
                  <p className="profile-text">{pick(profile, lang)}</p>
                  {socialLinks}
                  <a className="text-link" href={href("about")}>
                    {t("もう少し、私について", "A little more about me")}{" "}
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
        {page === "works" && (
          <section className="section inner">
            {title(
              "WORKS / 2023 — 2026",
              "つくってきたもの。\nつないできたこと。",
              "Things I’ve built.\nConnections I’ve made.",
            )}
            <p className="intro">
              {t(
                "制作、挑戦、そしてコミュニティ。その歩みを、新しい順に。",
                "Projects, challenges, and communities. A timeline, from the latest back to the beginning.",
              )}
            </p>
            <div
              className="filters"
              aria-label={t("活動カテゴリ", "Work categories")}
            >
              {(Object.keys(categories) as Category[]).map((c) => (
                <button
                  key={c}
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {pick(categories[c], lang)}
                </button>
              ))}
            </div>
            <p className="result-count" aria-live="polite">
              {
                works.filter((w) => filter === "all" || w.category === filter)
                  .length
              }{" "}
              {t("件の活動", "activities")}
            </p>
            <div className="timeline">
              {works
                .filter((w) => filter === "all" || w.category === filter)
                .map((w) => (
                  <article className="timeline-item" key={w.id} id={w.id}>
                    <div className="timeline-date">
                      <span className="timeline-dot" />
                      <time>{w.date}</time>
                    </div>
                    <Artwork work={w} />
                    <div className="timeline-copy">
                      <span className="small-label">
                        {pick(categories[w.category], lang)}
                      </span>
                      <h2>{pick(w.title, lang)}</h2>
                      <p>{pick(w.description, lang)}</p>
                      {w.url && (
                        <a
                          className="text-link"
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("プロジェクトサイト", "Project website")}{" "}
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </section>
        )}
        {page === "about" && (
          <section className="section inner about-page">
            {title(
              "ABOUT / YUITO AKATSUKI",
              "好奇心を、原動力に。",
              "Driven by curiosity.",
            )}
            <div className="about-layout">
              <div className="name-art">
                <img
                  src={portrait}
                  alt={t("あかつきゆいとのアイコン", "Yuito Akatsuki’s avatar")}
                />
                <small>CREATE. CONNECT. EXPLORE.</small>
              </div>
              <div>
                <p className="small-label">PROFILE</p>
                <h2>{t("あかつきゆいと", "Yuito Akatsuki")}</h2>
                <p className="profile-text">{pick(profile, lang)}</p>
                {socialLinks}
                <dl className="profile-details">
                  <div>
                    <dt>{t("活動領域", "Focus")}</dt>
                    <dd>
                      {t(
                        "Webサイト制作 / インフラ / コミュニティ運営",
                        "Web development / Infrastructure / Community",
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>{t("所属・学び", "Community & education")}</dt>
                    <dd>
                      {t("UniProject 創設者", "Founder of UniProject")}
                      <br />
                      {t(
                        "セキュリティ・キャンプ修了生",
                        "Security Camp graduate",
                      )}
                      <br />
                      {t("S高等学校4期生", "S High School, fourth cohort")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="capabilities">
              <p className="eyebrow">WHAT I DO</p>
              {[
                [
                  "01",
                  "Web development",
                  "アイデアを、触れられるかたちに。",
                  "Turning ideas into things people can use.",
                ],
                [
                  "02",
                  "Infrastructure",
                  "活動を支える、仕組みをつくる。",
                  "Building the systems that keep things running.",
                ],
                [
                  "03",
                  "Community",
                  "人と人が、つながる場所を。",
                  "Creating places where people connect.",
                ],
              ].map(([n, label, ja, en]) => (
                <div className="capability" key={n}>
                  <span>{n}</span>
                  <h3>{label}</h3>
                  <p>{t(ja, en)}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {page === "contact" && (
          <section className="section inner contact-page">
            {title("CONTACT", "お話ししましょう。", "Let’s talk.")}
            <p className="intro">
              {t(
                "制作のご相談、コミュニティのこと、ちょっとしたアイデア。",
                "A project, a community, or a small idea.",
              )}
              <br />
              {t(
                "下記のメール、またはSNSからお気軽にご連絡ください。",
                "Feel free to reach out by email or on social media.",
              )}
            </p>
            <a className="email-link" href="mailto:yuito@yuito-it.jp">
              <span>
                <small>EMAIL</small>yuito@yuito-it.jp
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  href={s.url}
                  key={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <small>{s.name}</small>
                  <span>{s.handle} ↗</span>
                </a>
              ))}
            </div>
          </section>
        )}
        {page !== "contact" && (
          <section className="contact-strip">
            <div>
              <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
              <h2>
                {t("次は、どんなことをつくろう。", "What shall we make next?")}
              </h2>
            </div>
            <a
              href={href("contact")}
              className="round-link"
              aria-label={t("お問い合わせ", "Contact")}
            >
              ↗
            </a>
          </section>
        )}
      </main>
      <footer>
        <a className="brand" href={href("home")}>
          yuitopia<span className="brand-dot">.</span>
        </a>
        <span>© {new Date().getFullYear()} Yuito Akatsuki</span>
        <a href={href("contact")}>Contact ↗</a>
      </footer>
    </>
  );
}
export default App;
