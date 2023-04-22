import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // happy-dom dose not support [object Blob]
  },
});
