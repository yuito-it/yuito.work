import type { PageProps } from "./types";
import { Link } from "@tanstack/react-router";
import { categories, pick, profile, works } from "../content";
import { Artwork } from "../components/Artwork";
import { SocialLinks } from "../components/SocialLinks";
import { MotionText } from "../motion/MotionText";
import portrait from "../assets/img/me/icon.png";
export default function HomePage({ lang, heading }: PageProps) {
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  return (
    <>
      <section className="hero editorial-hero">
        <div className="hero-topline">
          <span>PORTFOLIO / 2023 — 2026</span>
          <span>WEB · INFRASTRUCTURE · COMMUNITY</span>
        </div>
        <h1 ref={heading} tabIndex={-1} className="name-title">
          <MotionText text="YUITO" />
          <MotionText text="AKATSUKI." delay={0.12} />
        </h1>
        <div className="hero-index">
          <p>
            {t("あかつきゆいと", "Yuito Akatsuki")}
            <br />
            <span>
              {t("つくる。つなぐ。その先へ。", "Create. Connect. And beyond.")}
            </span>
          </p>
          <p>
            Web development
            <br />
            Infrastructure
            <br />
            Community management
          </p>
          <p>
            {t("UniProject 創設者", "Founder of UniProject")}
            <br />
            {t("セキュリティ・キャンプ修了生", "Security Camp graduate")}
            <br />
            {t("S高等学校4期生", "S High School, fourth cohort")}
          </p>
          <Link
            className="text-link"
            to="/$lang/$page/"
            params={{ lang, page: "works" }}
          >
            {t("活動を見る", "Explore works")} <span>↓</span>
          </Link>
        </div>
      </section>
      <section className="section" id="selected">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORKS</p>
            <h2>Selected works</h2>
          </div>
          <Link
            className="text-link"
            to="/$lang/$page/"
            params={{ lang, page: "works" }}
          >
            {t("すべての活動", "All works")} <span>↗</span>
          </Link>
        </div>
        <div className="selected-grid">
          {[works[3], works[0], works[9]].map((w) => (
            <Link
              className="work-card"
              to="/$lang/$page/"
              params={{ lang, page: "works" }}
              search={{ work: w.id }}
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
            </Link>
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
              alt={t("あかつきゆいとのアイコン", "Yuito Akatsuki’s avatar")}
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
            <SocialLinks />
            <Link
              className="text-link"
              to="/$lang/$page/"
              params={{ lang, page: "about" }}
            >
              {t("もう少し、私について", "A little more about me")}{" "}
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
