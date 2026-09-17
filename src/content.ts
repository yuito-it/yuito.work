export type Locale = "ja" | "en";
export type Category =
  "all" | "web" | "infrastructure" | "community" | "security";
export type Work = {
  id: string;
  date: string;
  category: Exclude<Category, "all">;
  title: [string, string];
  description: [string, string];
  art: string;
  url?: string;
};
export const pick = (text: [string, string], lang: Locale) =>
  text[lang === "ja" ? 0 : 1];
export const categories: Record<Category, [string, string]> = {
  all: ["すべて", "All"],
  web: ["Web制作", "Web"],
  infrastructure: ["インフラ", "Infrastructure"],
  community: ["コミュニティ", "Community"],
  security: ["セキュリティ", "Security"],
};
export const works: Work[] = [
  {
    id: "cilium",
    date: "2026.09",
    category: "infrastructure",
    title: ["Ciliumへの初コントリビュート", "First contribution to Cilium"],
    description: [
      "KubernetesのCNIであるCiliumへ初めてコントリビュート。日々のインフラへの関心を、オープンソースへの貢献につなげました。",
      "Made my first contribution to Cilium, a Kubernetes CNI, turning my interest in infrastructure into an open-source contribution.",
    ],
    art: "cilium",
    url: "https://github.com/cilium/cilium",
  },
  {
    id: "cve",
    date: "2026.06",
    category: "security",
    title: ["CVE-2026-33244を報告・取得", "Reported CVE-2026-33244"],
    description: [
      "脆弱性の報告を行い、CVE-2026-33244を取得しました。",
      "Reported a vulnerability and obtained CVE-2026-33244.",
    ],
    art: "security",
  },
  {
    id: "charity",
    date: "2026.04.25–26",
    category: "community",
    title: [
      "磁石祭2026 チャリティー物販",
      "Charity project at Jishakusai 2026",
    ],
    description: [
      "磁石祭2026にてチャリティー物販を企画。公益財団法人 動物愛護協会へ寄付を行いました。",
      "Organized charity merchandise sales at Jishakusai 2026 and made a donation to the animal welfare association.",
    ],
    art: "charity",
  },
  {
    id: "award",
    date: "2026.02.14",
    category: "community",
    title: ["セキュリティ・キャンプ 講師賞", "Security Camp Instructor Award"],
    description: [
      "セキュリティ・キャンプ フォーラム / アワード 2026に出展。UniProjectとして講師賞を受賞しました。",
      "Exhibited at Security Camp Forum / Award 2026 and received the Instructor Award as UniProject.",
    ],
    art: "award",
  },
  {
    id: "unique",
    date: "2026.01.01",
    category: "infrastructure",
    title: ["統合認証基盤 UniQUE", "UniQUE — unified authentication"],
    description: [
      "UniProjectのサークルメンバーを一元管理する統合認証基盤を制作しました。",
      "Built a unified authentication platform to centrally manage UniProject members.",
    ],
    art: "unique",
  },
  {
    id: "community",
    date: "2025.09.15",
    category: "community",
    title: [
      "セキュリティ・キャンプ コミュニティ支援",
      "Supporting the Security Camp community",
    ],
    description: [
      "当時史上最年少のWGメンバーとしてコミュニティ支援グループに参画。修了生・関係者向けDiscordの構造を見直し、再整備。現在も運営を継続しています。",
      "Joined the community support group as its youngest-ever working group member at the time. Restructured the alumni and stakeholder Discord community and continue to help run it.",
    ],
    art: "community",
    url: "https://security-camp.or.jp",
  },
  {
    id: "camp",
    date: "2025.08.16",
    category: "security",
    title: [
      "セキュリティ・キャンプ2025 全国大会修了",
      "Completed Security Camp 2025",
    ],
    description: [
      "セキュリティ・キャンプ2025全国大会を修了しました。",
      "Completed the national Security Camp 2025 program.",
    ],
    art: "camp",
  },
  {
    id: "webcreative",
    date: "2025.06",
    category: "web",
    title: ["ウェブクリエイティブでWeb制作", "Web development at Web Creative"],
    description: [
      "岡山県のウェブクリエイティブ株式会社にてWeb制作を開始しました。（退職済み）",
      "Started working in web development at Web Creative in Okayama. This role has since ended.",
    ],
    art: "web",
  },
  {
    id: "talk",
    date: "2025.04.25",
    category: "community",
    title: ["磁石祭2025でLinkleについて登壇", "A lightning talk about Linkle"],
    description: [
      "磁石祭2025にて、同好会ポータルLinkleについてライトニングトークを行いました。",
      "Gave a lightning talk about the Linkle club portal at Jishakusai 2025.",
    ],
    art: "linkle",
  },
  {
    id: "linkle",
    date: "2025.01",
    category: "web",
    title: ["同好会ポータル Linkle", "Linkle — a club discovery portal"],
    description: [
      "N高グループの同好会を探しやすく。情報の検索と、わかりやすい表示を実現するポータルを制作しました。（サービス終了）",
      "Created a portal to make N High School Group clubs easier to find, with clear information and simple search. The service has ended.",
    ],
    art: "linkle",
  },
  {
    id: "school",
    date: "2024.04.01",
    category: "community",
    title: ["S高等学校に入学", "Entered S High School"],
    description: [
      "S高等学校に4期生として入学しました。",
      "Entered S High School as part of its fourth cohort.",
    ],
    art: "school",
  },
  {
    id: "uniproject",
    date: "2023.01.01",
    category: "community",
    title: ["デジタル創作サークル UniProjectを創設", "Founded UniProject"],
    description: [
      "Web、インフラ、さまざまな創作。デジタル創作活動を広く扱うサークルを創設しました。",
      "Founded a community exploring digital creativity, from websites and infrastructure to a wide range of creative projects.",
    ],
    art: "uniproject",
    url: "https://uniproject.jp",
  },
];
export const socials = [
  { name: "GitHub", url: "https://github.com/yuito-it", handle: "@yuito-it" },
  { name: "X / Twitter", url: "https://x.com/yuito_it_", handle: "@yuito_it_" },
  { name: "Qiita", url: "https://qiita.com/yuito_it_", handle: "@yuito_it_" },
];
export const profile: [string, string] = [
  "Webサイト制作、インフラ、コミュニティ運営。つくることと、人がつながる場所を育てることに取り組んでいます。デジタル創作サークルUniProject創設者。セキュリティ・キャンプ修了生、S高等学校4期生。",
  "I build websites, work with infrastructure, and run communities. I enjoy making things and nurturing places where people connect. Founder of UniProject, Security Camp graduate, and a member of S High School’s fourth cohort.",
];
