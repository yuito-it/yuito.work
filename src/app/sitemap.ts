import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "about", "contacts", "ja", "ja/about", "ja/contacts"].map(
    (route) => ({
      url: `https://www.yuito-it.jp/${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes];
}
