import type { PageProps } from "./types";
import { pick, profile } from "../content";
import { SocialLinks } from "../components/SocialLinks";
import portrait from "../assets/img/me/icon.png";
import { PageTitle } from "../components/PageTitle";
export default function AboutPage({ lang, heading }: PageProps) {
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  return (
    <section className="section inner about-page">
      <PageTitle
        label={"ABOUT / YUITO AKATSUKI"}
        text={t("好奇心を、原動力に。", "Driven by curiosity.")}
        heading={heading}
      />
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
          <SocialLinks />
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
                {t("セキュリティ・キャンプ修了生", "Security Camp graduate")}
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
  );
}
