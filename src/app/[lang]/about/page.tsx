import { Button } from "@/components/button";
import { ImGithub, ImTwitter } from "react-icons/im";
import Link from "next/link";
import QiitaIcon from "@/components/qiita-icon";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/i18n-config";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lang } = params;

  const dict = await getDictionary(lang);
  const res: Metadata = {
    title: `${dict.about.title} - yuitopia${lang === "ja" ? "" : " (ユイトピア)"}`,
    description: dict.about.description,
    openGraph: {
      title: dict.about.title,
      description: dict.about.description,
      url: `https://ゆいと.jp/${lang}/about`,
    },
    twitter: {
      card: "summary",
      title: dict.about.title,
      description: dict.about.description,
      site: "@yuito_it_",
      creator: "@yuito_it_",
    },
    alternates: {
      canonical: `https://ゆいと.jp/about`,
      languages: {
        ja: "https://yuito-it.jp/ja/about",
        en: "https://yuito-it.jp/en/about",
      },
    },
  };
  return res;
}

import type { Viewport } from "next";
import MotionWrapper from "@/components/fadeinWrapper";

export const viewport: Viewport = {
  themeColor: "#80604b",
};

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;

  const { lang } = params;

  const dict = await getDictionary(lang);
  return (
    <MotionWrapper>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background text-foreground">
        <header className="w-full px-4 sm:px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <Button<"Link">
              href={`/${lang}`}
              back="true"
            >
              {dict.common.BackHome}
            </Button>
          </div>
        </header>
        <main className="w-full px-4 sm:px-8 flex-1">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="flex flex-col gap-6 justify-center w-full md:w-2/3 p-4 sm:p-8 rounded-lg border border-foreground/10">
                <h1
                  className="text-2xl sm:text-3xl font-bold text-center md:text-left pb-3 border-b border-foreground/[0.08]"
                  id="title"
                >
                  About
                </h1>
                <p className="text-base leading-relaxed text-center md:text-left font-[family-name:var(--font-geist-mono)] opacity-80">
                  {dict.about.contents}
                </p>
                <div className="flex flex-col justify-center md:items-start items-center gap-4 pt-3">
                  <Link
                    href={"https://github.com/yuito-it"}
                    target="_blank"
                    className="flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <ImGithub className="text-xl" />
                    <span className="text-base">GitHub: @yuito-it</span>
                  </Link>
                  <Link
                    href={"https://x.com/yuito_it_"}
                    target="_blank"
                    className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <ImTwitter className="text-lg" />
                    <span>Twitter: @yuito_it_</span>
                  </Link>
                  <Link
                    href={"https://qiita.com/yuito_it_"}
                    target="_blank"
                    className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <QiitaIcon />
                    <span>Qiita: @yuito_it_</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="w-full px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <Footer />
          </div>
        </footer>
      </div>
    </MotionWrapper>
  );
}
