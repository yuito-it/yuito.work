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
    title: `${dict.works.title} - ${dict.common.title}`,
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

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;

  const { lang } = params;

  const dict = await getDictionary(lang);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] grid-cols-1 items-center justify-items-center min-h-screen p-8 w-full pb-20 md:gap-16 gap-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-left justify-left w-full">
        <Button<"Link">
          href="/"
          back="true"
        >
          {dict.common.BackHome}
        </Button>
      </header>
      <main className="flex flex-col gap-6 row-start-2 items-left w-[70%] justify-center grow mb-10 md:mb-0">
        <div className="flex flex-col gap-1">
          <h1
            className="text-3xl sm:text-3xl font-bold md:text-left text-center"
            id="title"
          >
            Works
          </h1>
          <p>{dict.works.description}</p>
        </div>
        {dict.works.contents}
      </main>
      <Footer />
    </div>
  );
}
