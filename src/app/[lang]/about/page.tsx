import Image from "next/image";
import { Button } from "@/components/button";
import { ImGithub, ImTwitter } from "react-icons/im";
import Link from "next/link";
import QiitaIcon from "@/components/qiita-icon";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/i18n-config";

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);
    const res: Metadata = {
        title: `${dict.about.title} | yuito.work`,
        description: dict.about.description,
    };
    if (lang === "ja") {
    return res;
    }
    res.alternates = {
        canonical: `https://yuito.work/about`,
        languages: {
            "ja": "https://yuito.work/ja/about",
        },
    };
    return res;
}

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] grid-cols-1 items-center justify-items-center min-h-screen p-8 w-full pb-20 md:gap-16 gap-20 font-[family-name:var(--font-geist-sans)]">
            <header className="flex items-left justify-left w-full">
                <Button<"Link"> href="/" back="true">{dict.common.BackHome}</Button>
            </header>
            <main className="flex flex-col md:flex-row gap-8 row-start-2 items-center justify-center grow w-full mb-10 md:mb-0">
                <div className="flex flex-col gap-8 justify-center md:w-1/3 md:ml-20 w-3/4">
                    <h1 className="text-2xl sm:text-3xl font-bold md:text-left text-center" id="title">About</h1>
                    <p className="text-sm text-center md:text-left font-[family-name:var(--font-geist-mono)]">
                        {dict.about.contents}
                    </p>
                    <div className="flex flex-col justify-center md:items-start items-center gap-0">
                        <Link href={"https://github.com/yuito-it"} target="_blank" className="flex hover:underline items-center justify-center gap-1"><ImGithub />GitHub: @yuito-it</Link>
                        <Link href={"https://x.com/yuito_it_"} target="_blank" className="flex items-center hover:underline justify-center gap-1"><ImTwitter />Twitter: @yuito_it_</Link>
                        <Link href={"https://qiita.com/yuito_it_"} target="_blank" className="flex items-center hover:underline justify-center gap-1"><QiitaIcon />Qiita: @yuito_it_</Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center md:max-w-1/2 gap-5">
                    <div className="items-center flex justify-left grow  w-full">
                        <Link href={"https://github.com/UniPro-tech/UniPro-Git-Tool"} target="_blank"><Image src={"/img/UniProGitTool.webp"} width={400} height={400} className="rounded" alt="UniPro-Git-Tool" /></Link>
                    </div>
                    {/*<div className="items-cen flex justify-end  grow w-full">
                        <Image src={"/img/UniProGitTool.webp"} width={400} height={400} className="rounded" alt=""/>
                    </div>*/}
                </div>
            </main>
            <Footer />
        </div>
    );
}
