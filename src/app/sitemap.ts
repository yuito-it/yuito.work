import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "about",
    "contacts",
    "works",
    "ja",
    "ja/about",
    "ja/contacts",
    "ja/works",
    "en",
    "en/about",
    "en/contacts",
    "en/works",
  ].map((route) => ({
    url: `https://www.yuito-it.jp/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
