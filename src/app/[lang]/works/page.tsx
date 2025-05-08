import { Button } from "@/components/button";
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
    title: `${dict.works.title} - yuitopia${lang === "ja" ? "" : " (ユイトピア)"}`,
    description: dict.works.description,
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: `https://ゆいと.jp/${lang}`,
    },
    twitter: {
      card: "summary",
      title: dict.home.title,
      description: dict.home.description,
      site: "@yuito_it_",
      creator: "@yuito_it_",
    },
  };
  res.alternates = {
    canonical: `https://ゆいと.jp/about`,
    languages: {
      ja: "https://yuito-it.jp/ja/about",
    },
  };
  return res;
}

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#80604b",
};

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;

  const { lang } = params;

  const dict = await getDictionary(lang);
  return (
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
          <div className="flex flex-col gap-4 p-4 sm:p-8 rounded-lg border border-foreground/10">
            <div className="flex flex-col gap-2">
              <h1
                className="text-2xl sm:text-3xl font-bold pb-3 border-b border-foreground/[0.08]"
                id="title"
              >
                Works
              </h1>
              <p className="opacity-80 text-sm max-w-2xl">{dict.works.description}</p>
            </div>
            <div className="opacity-90 pt-4">{dict.works.contents}</div>
          </div>
        </div>
      </main>
      <footer className="w-full px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
