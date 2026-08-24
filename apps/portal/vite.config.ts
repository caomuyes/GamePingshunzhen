import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ["@psz/forum", "@psz/school", "@psz/social", "@psz/yuanmishe", "@psz/underworld", "@psz/game-state", "@psz/puzzle-engine", "@psz/shared-data", "@psz/shared-ui", "@psz/effects", "@psz/audio"]
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});
