import type { Locale } from "../content";
import "./FriendLinks.css";

const banners = [
  {
    name: "荒音の夜",
    url: "https://arane.uniproject.jp",
    image: "aranenoyoru.png",
  },
  {
    name: "Ysmservice デジタル創作サークル - 創作と技術の交差点",
    url: "https://group.ysmserv.com/",
    image: "ysmservice.png",
  },
  {
    name: "しひろのポートフォリオサイト",
    url: "https://shihiro.com",
    image: "shihiro-banner.png",
  },
  { name: "やーはり", url: "https://ya-hari.skyia.jp", image: "yahari.png" },
  { name: "256server", url: "https://256server.com/", image: "256server.png" },
  {
    name: "ゆーのホームページ",
    url: "https://drsb.f5.si/",
    image: "https://drsb.f5.si/img/banner.png",
  },
];
const textLinks = [
  { name: "彩音のてきとーなさいと", url: "https://ayane0857.net/" },
  { name: "甲斐智丈の個人サイト", url: "https://modern-sys.dev/" },
];
export function FriendLinks({ lang }: { lang: Locale }) {
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  const bannerPath = `${import.meta.env.BASE_URL}img/banner/`;
  const ownImage = new URL("img/banner/yuitopia_367x130.gif", __SITE_URL__)
    .href;
  const code = `<a href="${__SITE_URL__}"><img src="${ownImage}" alt="yuitopia" width="367" height="130" /></a>`;
  return (
    <section
      className="section friend-links"
      aria-labelledby="friend-links-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / FRIEND LINKS</p>
          <h2 id="friend-links-title">{t("相互リンク", "Friend links")}</h2>
        </div>
        <p>
          {t(
            "友人のウェブサイトやプロジェクト。",
            "Friends’ websites and projects.",
          )}
        </p>
      </div>
      <div className="friend-banner-grid">
        {banners.map((link) => (
          <a
            className="friend-banner"
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="friend-banner-image">
              <img
                src={
                  link.image.startsWith("https:")
                    ? link.image
                    : bannerPath + link.image
                }
                alt={link.name}
                loading="lazy"
              />
            </div>
            <span>
              {link.name} <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
      <div className="friend-text-links">
        {textLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <details className="friend-exchange">
        <summary>
          {t(
            "相互リンクについて・このサイトのバナー",
            "Exchange links / banners for this site",
          )}
        </summary>
        <div className="friend-exchange-content">
          <div>
            <p>
              {t(
                "相互リンクをご希望の方は、サイト名・URL・紹介文（50文字以内）・バナー画像（任意、88×31推奨）を添えてご連絡ください。",
                "To exchange links, please send your site name, URL, a short description (up to 50 characters), and an optional banner (88×31 recommended).",
              )}
            </p>
            <a href="mailto:contact@yuito-it.jp">contact@yuito-it.jp ↗</a>
          </div>
          <div>
            <a href={bannerPath + "yuitopia_367x130.gif"} download>
              <img
                className="own-banner"
                src={bannerPath + "yuitopia_367x130.gif"}
                alt="yuitopia — 367×130"
                width="367"
                height="130"
                loading="lazy"
              />
            </a>
            <p>
              <a href={bannerPath + "yuitopia_80x31.gif"} download>
                {t("小さいバナー（80×31）", "Small banner (80×31)")} ↓
              </a>
            </p>
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </details>
    </section>
  );
}
