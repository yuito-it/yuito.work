import react from "@vitejs/plugin-react-swc";
import { ogpPlugin } from "./scripts/ogp.ts";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "SITE_");
  return {
    base: "./",
    root: "./src",
    build: {
      outDir: "../dist",
    },
    plugins: [react(), ogpPlugin(env.SITE_URL || "https://yuito.work/")],
  };
});
