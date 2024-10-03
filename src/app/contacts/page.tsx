import { Button } from "@/components/button";
import { ImMail, ImTwitter } from "react-icons/im";
import Link from "next/link";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacts | yuito.work",
    description: "How you can contact Yuito Akatsuki",
};

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] grid-cols-1 items-center justify-center min-h-screen w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="flex items-left justify-left w-full">
                <Button<"Link"> href="/" back="true">Back to Home</Button>
            </header>
            <main className="flex flex-col md:flex-row gap-8 row-start-2 items-center justify-center grow w-full mb-10 md:mb-0">
                <div className="flex flex-col gap-8 justify-center max-w-1/2">
                    <h1 className="text-2xl sm:text-3xl text-center font-bold md:text-left" id="title">Contact</h1>
                    <p className="text-sm text-center md:text-left font-[family-name:var(--font-geist-mono)]">
                        If you want to contact me, please contact me via these way.
                    </p>
                    <div className="flex flex-col justify-center items-center md:items-start gap-0">
                        <Link href={"https://x.com/yuito_it_"} target="_blank" className="flex hover:underline items-center justify-center gap-1"><ImTwitter />Twitter: @yuito_it_(DM)</Link>
                        <Link href={"mailto:yuito@yuito.work"} target="_blank" className="flex hover:underline items-center justify-center gap-1"><ImMail />Mail: yuito[at]yuito.work</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
