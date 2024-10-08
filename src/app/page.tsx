import Image from "next/image";
import { Button } from "@/components/button";
import NowPlayingWidget from "@/components/spotify";
import { ImGithub, ImTwitter } from "react-icons/im";
import Link from "next/link";
import QiitaIcon from "@/components/qiita-icon";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yuito Akatsuki - DigitalCreator",
  description: "It is HP of a digital creator whose name is Yuito Akatsuki.",
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen p-8 pb-20 gap-20 md:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 md:flex-row flex-col row-start-2 items-center sm:items-start">
        <Image src={"https://avatars.githubusercontent.com/u/132048482?v=4"} className="rounded-full" width="80" height="80" alt={""} />
        <div className="flex flex-col gap-8 min-w-1/2 grow">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl md:text-left text-center font-bold" id="title">Yuito Akatsuki</h1>
            <p className="text-sm text-center md:text-left font-[family-name:var(--font-geist-mono)]">
              DigitalCreator / WebDeveloper / InfrastructureEngineer / ProjectManager
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
              About more...
            </Button>
            <Button <"Link">
              href="#"
              rel="noopener noreferrer"
              disabled
            >
              Products(Coming soon)
            </Button>
            <Button <"Link">
              href="/contacts"
              rel="noopener noreferrer"
            >
              Contacts
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
