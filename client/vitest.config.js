import { defineConfig } from "vitest/config";

// Logic tests need the same automatic JSX runtime as the production React build.
// They do not need the build-only OCR asset plugin.
export default defineConfig({
  esbuild: { jsx: "automatic" },
});
