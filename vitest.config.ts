import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    include: ["packages/**/src/**/*.test.ts", "packages/**/src/**/*.test.tsx", "apps/**/src/**/*.test.ts", "apps/**/src/**/*.test.tsx"]
  }
});
