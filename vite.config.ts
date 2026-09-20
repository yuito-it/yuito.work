import react from "@vitejs/plugin-react-swc";
import { ogpPlugin } from "./scripts/ogp.ts";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "SITE_");
  const siteUrl = env.SITE_URL || "https://www.yuito-it.jp/";
  return {
    base: new URL(siteUrl).pathname.replace(/\/?$/, "/"),
    root: "./src",
    build: {
      outDir: "../dist",
    },
    plugins: [react(), ogpPlugin(siteUrl)],
  };
});
