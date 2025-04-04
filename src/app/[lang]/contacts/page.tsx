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
    title: `${dict.contacts.title} - あかつきゆいとHP`,
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

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const dict = await getDictionary(lang);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] grid-cols-1 items-center justify-center min-h-screen w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-left justify-left w-full">
        <Button<"Link"> href={`/${lang}`} back="true">
          {dict.common.BackHome}
        </Button>
      </header>
      <main className="flex flex-col md:flex-row gap-8 row-start-2 items-center justify-center grow w-full mb-10 md:mb-0">
        <div className="flex flex-col gap-8 justify-center max-w-1/2">
          <h1
            className="text-2xl sm:text-3xl text-center font-bold md:text-left"
            id="title"
          >
            Contact
          </h1>
          <p className="text-sm text-center md:text-left font-[family-name:var(--font-geist-mono)]">
            {dict.contacts.contents}
          </p>
          <div className="flex flex-col justify-center items-center md:items-start gap-0">
            <Link
              href={"https://x.com/yuito_it_"}
              target="_blank"
              className="flex hover:underline items-center justify-center gap-1"
            >
              <ImTwitter />
              Twitter: @yuito_it_(DM)
            </Link>
            <Link
              href={"mailto:yuito@yuito-it.jp"}
              target="_blank"
              className="flex hover:underline items-center justify-center gap-1"
            >
              <ImMail />
              Mail: yuito[at]yuito-it.jp
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
