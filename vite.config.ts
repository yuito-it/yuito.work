import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  root: "./src",
  build: {
    outDir: "../dist",
  },
  plugins: [react()],
});
