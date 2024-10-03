import Image from "next/image";
import { Button } from "@/components/button";
import { ImGithub, ImTwitter } from "react-icons/im";
import Link from "next/link";
import QiitaIcon from "@/components/qiita-icon";
import Footer from "@/components/footer";
import { FaExternalLinkAlt } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="flex items-left justify-left w-full">
                <Button<"Link"> href="/" back="true">Back to Home</Button>
            </header>
            <main className="flex gap-8 row-start-2 items-center w-full ">
                <div className="flex flex-col gap-8 justify-center w-1/2 ">
                    <h1 className="text-2xl sm:text-3xl font-bold" id="title">About</h1>
                    <p className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                        Yuito Akatsuki is a Digital Creator, Web Developer, Infrastructure Engineer, and Project Manager.
                        He was born in 2000 and is currently a student at a S High School in Japan.
                        He is also a member of the All-Japan Digital Creative Club <Link href={"https://UniProject-tech.net"} target="_blank" className="hover:underline inline-flex items-baseline">&quot;UniProject&quot;<FaExternalLinkAlt /></Link> and is working on various projects.
                    </p>
                    <div className="flex flex-col justify-center items-start gap-0">
                        <Link href={"https://github.com/yuito-it"} target="_blank" className="flex hover:underline items-center justify-center gap-1"><ImGithub />GitHub: @yuito-it</Link>
                        <Link href={"https://x.com/yuito_it_"} target="_blank" className="flex items-center hover:underline justify-center gap-1"><ImTwitter />Twitter: @yuito_it_</Link>
                        <Link href={"https://qiita.com/yuito_it_"} target="_blank" className="flex items-center hover:underline justify-center gap-1"><QiitaIcon />Qiita: @yuito_it_</Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center grow gap-5">
                    <div className="items-center flex justify-left grow  w-full">
                        <Image src={"/img/UniProGitTool.webp"} width={400} height={400} className="rounded" alt="UniPro-Git-Tool"/>
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
