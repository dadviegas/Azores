import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@azores/ui": new URL("./packages/ui/src/index.ts", import.meta.url).pathname,
      "@azores/ux": new URL("./packages/ux/src/index.ts", import.meta.url).pathname,
      "@azores/core": new URL("./packages/core/src/index.ts", import.meta.url).pathname,
      "@azores/config": new URL("./packages/config/src/index.ts", import.meta.url).pathname,
      "@azores/dataprovider": new URL("./packages/dataprovider/src/index.ts", import.meta.url).pathname,
      "@azores/widgets": new URL("./packages/widgets/src/index.ts", import.meta.url).pathname,
    },
  },
});
