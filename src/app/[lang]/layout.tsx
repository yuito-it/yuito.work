import localFont from "next/font/local";
import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  userScalable: false,
}

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  params: { lang }
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang} className="w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={"G-BF3ZSP6SM1"} />
    </html>
  );
}
