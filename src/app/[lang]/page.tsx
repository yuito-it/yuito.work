import Image from "next/image";
import { Button } from "@/components/button";
import NowPlayingWidget from "@/components/spotify";
import { ImGithub, ImTwitter } from "react-icons/im";
import Link from "next/link";
import QiitaIcon from "@/components/qiita-icon";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { getDictionary } from "./dictionaries";
import BannerLinkSection from "@/components/sections/bannerLinkSection";
import TextLinkSection from "@/components/sections/textLinkSection";

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lang } = params;

  const dict = await getDictionary(lang);

  const res: Metadata = {
    title: `${dict.home.title}`,
    description: dict.home.description,
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
    canonical: `https://ゆいと.jp/`,
    languages: {
      ja: "https://yuito-it.jp/ja",
    },
  };
  return res;
}

import type { Viewport } from "next";
import LPMotionWrapper from "@/components/fadeinLP";

export const viewport: Viewport = {
  themeColor: "#80604b",
};

export const dynamic = "force-dynamic";

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <LPMotionWrapper>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background text-foreground">
        <header className="w-full px-8 py-6">
          <div className="max-w-5xl mx-auto"></div>
        </header>
        <main className="w-full px-4 sm:px-8 flex-1">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-240px)] gap-8">
              <section
                id="about"
                className="flex flex-col md:flex-row gap-6 md:gap-8 items-start p-4 sm:p-8 rounded-lg border border-foreground/10 backdrop-blur-sm w-full md:w-auto"
              >
                <div className="relative group mx-auto md:mx-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition group-hover:opacity-30"></div>
                  <Image
                    src={"https://avatars.githubusercontent.com/u/132048482?v=4"}
                    className="rounded-full relative"
                    width="100"
                    height="100"
                    alt={""}
                    priority
                  />
                </div>
                <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left w-full">
                  <div className="space-y-2">
                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl font-bold"
                      id="title"
                    >
                      <ruby>
                        {dict.home.name}
                        <rp>(</rp>
                        <rt className="opacity-70 text-sm">{dict.home.ruby}</rt>
                        <rp>)</rp>
                      </ruby>
                    </h1>
                    <p className="text-sm sm:text-base font-[family-name:var(--font-geist-mono)] opacity-80">
                      {dict.home.jobs}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center md:justify-start items-center">
                    <Link
                      href={"https://github.com/yuito-it"}
                      target="_blank"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <ImGithub className="text-xl" />
                    </Link>
                    <Link
                      href={"https://x.com/yuito_it_"}
                      target="_blank"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <ImTwitter className="text-xl" />
                    </Link>
                    <Link
                      href={"https://qiita.com/yuito_it_"}
                      target="_blank"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <QiitaIcon />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button<"Link"> href={`/${lang}/about`}>About</Button>
                    <Button<"Link"> href={`/${lang}/works`}>Works</Button>
                    <Button<"Link"> href={`/${lang}/contacts`}>Contact</Button>
                  </div>
                  <div className="w-full opacity-80">
                    <NowPlayingWidget />
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-4 p-4 sm:p-8 rounded-lg border border-foreground/10 w-full">
                <h2 className="text-xl font-bold pb-3 border-b border-foreground/[0.08]">
                  {dict.home.aboutSite.title}
                </h2>
                <p className="text-base opacity-80 whitespace-pre-wrap">
                  {dict.home.aboutSite.description}
                </p>
              </section>
              <section className="flex flex-col gap-6 md:gap-8 w-full">
                <div className="flex flex-col gap-4 p-4 sm:p-8 rounded-lg border border-foreground/10">
                  <h2 className="text-xl font-bold pb-3 border-b border-foreground/[0.08]">
                    {dict.home.friendLinks}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-6 lg:grid-cols-9 content-start">
                    <BannerLinkSection />
                    <TextLinkSection />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <footer className="w-full px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <Footer />
          </div>
        </footer>
      </div>
    </LPMotionWrapper>
  );
}
