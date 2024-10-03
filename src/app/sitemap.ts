import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const routes = ["","about","contacts"].map((route) => ({
        url: `https://www.yuito.work/${route}`,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes];
}