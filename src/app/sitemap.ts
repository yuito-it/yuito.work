import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const routes = ["", "blog", "projects", "photos"].map((route) => ({
        url: `https://yuito.work${route}`,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes];
}