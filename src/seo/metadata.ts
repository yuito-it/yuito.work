export const pageNames = ["home", "works", "about", "contact"] as const;
export const languages = ["ja", "en"] as const;
export type PageName = (typeof pageNames)[number];
export type Language = (typeof languages)[number];
export const siteName = "yuitopia";
export const twitterAccount = "@yuito_it_";
// Shared by the static HTML, SPA navigation, and generated artwork.
export const themeColor = "#3b725d";
export const pageCopy = {
  home: {
    label: "HOME",
    lines: ["YUITO", "AKATSUKI."],
    ja: {
      heading: "つくる。つなぐ。その先へ。",
      description:
        "あかつきゆいとのポートフォリオ。Webサイト制作、インフラ、コミュニティ運営。つくる。つなぐ。その先へ。",
    },
    en: {
      heading: "Create. Connect. And beyond.",
      description:
        "Yuito Akatsuki’s portfolio. Web development, infrastructure, and community building. Create. Connect. And beyond.",
    },
  },
  works: {
    label: "WORKS",
    lines: ["SELECTED", "WORKS."],
    ja: {
      heading: "つくってきたもの。つないできたこと。",
      description:
        "Web制作、インフラ、セキュリティ、コミュニティ。あかつきゆいとの制作と活動を時系列で紹介します。",
    },
    en: {
      heading: "Projects. Challenges. Connections.",
      description:
        "Explore Yuito Akatsuki’s work in web development, infrastructure, security, and communities, in chronological order.",
    },
  },
  about: {
    label: "ABOUT",
    lines: ["DRIVEN BY", "CURIOSITY."],
    ja: {
      heading: "好奇心を、原動力に。",
      description:
        "あかつきゆいとのプロフィール。UniProject創設者、セキュリティ・キャンプ修了生。Web、インフラ、コミュニティをつなぐ活動について。",
    },
    en: {
      heading: "Meet the person behind the projects.",
      description:
        "Meet Yuito Akatsuki, founder of UniProject and Security Camp graduate, working across web development, infrastructure, and communities.",
    },
  },
  contact: {
    label: "CONTACT",
    lines: ["LET’S", "TALK."],
    ja: {
      heading: "お話ししましょう。",
      description:
        "制作のご相談、コミュニティのこと、ちょっとしたアイデア。あかつきゆいとへのお問い合わせはメールまたはSNSから。",
    },
    en: {
      heading: "A project, a community, or a small idea.",
      description:
        "Get in touch with Yuito Akatsuki about a project, a community, or a small idea. Reach out by email or social media.",
    },
  },
} as const;

export function pageMetadata(
  lang: Language,
  page: PageName,
  siteUrl: string,
  image: string,
) {
  const copy = pageCopy[page][lang];
  const title = `${page[0].toUpperCase() + page.slice(1)} — ${lang === "ja" ? "あかつきゆいと" : "Yuito Akatsuki"} / ${siteName}`;
  const url = new URL(`${lang}/${page}/`, siteUrl).href;
  return {
    title,
    url,
    meta: {
      description: copy.description,
      "theme-color": themeColor,
      "og:type": "website",
      "og:site_name": siteName,
      "og:title": title,
      "og:description": copy.description,
      "og:url": url,
      "og:locale": lang === "ja" ? "ja_JP" : "en_US",
      "og:locale:alternate": lang === "ja" ? "en_US" : "ja_JP",
      "og:image": image,
      "og:image:type": "image/png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": `${pageCopy[page].label} — ${copy.heading}`,
      "twitter:card": "summary_large_image",
      "twitter:site": twitterAccount,
      "twitter:creator": twitterAccount,
      "twitter:title": title,
      "twitter:description": copy.description,
      "twitter:image": image,
      "twitter:image:alt": `${pageCopy[page].label} — ${copy.heading}`,
    },
  };
}
