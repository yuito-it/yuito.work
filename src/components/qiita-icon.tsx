"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function QiitaIcon() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "dark" : "light");
        };

        setTheme(mediaQuery.matches ? "dark" : "light");
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    if (theme === "dark") {
        return (<Image src={"/img/qiita-white.webp"} className="rounded-full" width="15" height="15" alt={""} />);
    }
    return (<Image src={"/img/qiita-black.webp"} className="rounded-full" width="15" height="15" alt={""} />);
}