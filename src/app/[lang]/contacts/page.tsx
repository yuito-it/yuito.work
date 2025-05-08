import { Button } from "@/components/button";
import { ImMail, ImTwitter } from "react-icons/im";
import Link from "next/link";
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
    title: `${dict.contacts.title} - yuitopia${lang === "ja" ? "" : " (ユイトピア)"}`,
    description: dict.contacts.description,
  };
  if (lang === "ja") {
    return res;
  }
  res.alternates = {
    canonical: `https://ゆいと.jp/contacts`,
    languages: {
      ja: "https://yuito-it.jp/ja/contacts",
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
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="flex flex-col gap-6 justify-center w-full md:w-2/3 p-4 sm:p-8 rounded-lg border border-foreground/10">
              <h1
                className="text-2xl sm:text-3xl font-bold text-center md:text-left pb-3 border-b border-foreground/[0.08]"
                id="title"
              >
                Contact
              </h1>
              <p className="text-base leading-relaxed text-center md:text-left font-[family-name:var(--font-geist-mono)] opacity-80">
                {dict.contacts.contents}
              </p>
              <div className="flex flex-col justify-center md:items-start items-center gap-4 pt-3">
                <Link
                  href={"https://x.com/yuito_it_"}
                  target="_blank"
                  className="flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <ImTwitter className="text-xl" />
                  <span className="text-base">Twitter: @yuito_it_ (DM)</span>
                </Link>
                <Link
                  href={"mailto:yuito@yuito-it.jp"}
                  target="_blank"
                  className="flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <ImMail className="text-xl" />
                  <span className="text-base">Mail: yuito[at]yuito-it.jp</span>
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
  );
}
