import Image from "next/image";
import { Button } from "@/components/button";
import { NowPlayingWidget } from "@/components/spotify";
//const token = process.env.SPOTIFY_TOKEN;

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <Image src={"https://avatars.githubusercontent.com/u/132048482?v=4"} className="rounded-full" width="80" height="80" alt={""} />
        <div className="flex flex-col gap-8 min-w-1/2 grow">
          <h1 className="text-2xl sm:text-3xl font-bold" id="title">Yuito Akatsuki</h1>
          <p className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            DigitalCreator / WebDeveloper / InfrastructureEngineer / ProjectManager
          </p>
          <NowPlayingWidget />
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button <"Link">
              href="/about"
              rel="noopener noreferrer"
            >
              About more...
            </Button>
            <Button <"Link">
              href="/products"
              rel="noopener noreferrer"
            >
              Products
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
