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

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang);

  const res: Metadata = {
    title: `${dict.home.title}`,
    description: dict.home.description,
  };
  if (lang === "ja") {
    return res;
  }
  res.alternates = {
    canonical: `https://yuito.work/`,
    languages: {
      "ja": "https://yuito.work/ja",
    },
  };
  return res;
}

export const dynamic = 'force-dynamic';

export default async function Home(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  console.log(lang);
  const dict = await getDictionary(lang);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen p-8 pb-20 gap-20 md:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 md:flex-row flex-col row-start-2 items-center sm:items-start">
        <Image src={"https://avatars.githubusercontent.com/u/132048482?v=4"} className="rounded-full" width="80" height="80" alt={""} />
        <div className="flex flex-col gap-8 min-w-1/2 grow">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl md:text-left text-center font-bold" id="title"><ruby>{dict.home.name}<rp>(</rp><rt>{dict.home.ruby}</rt><rp>)</rp></ruby></h1>
            <p className="text-sm text-center md:text-left font-[family-name:var(--font-geist-mono)]">
              {dict.home.jobs}
            </p>
            <div className="flex flex-row gap-2 md:justify-start justify-center items-center w-full">
              <Link href={"https://github.com/yuito-it"} target="_blank"><ImGithub /></Link>
              <Link href={"https://x.com/yuito_it_"} target="_blank"><ImTwitter /></Link>
              <Link href={"https://qiita.com/yuito_it_"} target="_blank"><QiitaIcon /></Link>
            </div>
          </div>
          <NowPlayingWidget />
          <div className="flex gap-1 items-center flex-col sm:flex-row">
            <Button <"Link">
              href="/about"
              rel="noopener noreferrer"
            >
              {dict.home.button.about}
            </Button>
            <Button <"Link">
              href="#"
              rel="noopener noreferrer"
              disabled
            >
              {dict.home.button.works}
            </Button>
            <Button <"Link">
              href="/contacts"
              rel="noopener noreferrer"
            >
              {dict.home.button.contacts}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
