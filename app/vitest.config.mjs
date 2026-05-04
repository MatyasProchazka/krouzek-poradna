// Konfigurace testovacího nástroje Vitest
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    // Stejná zkratka jako v jsconfig.json: "@/lib/..." = "src/lib/..."
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.js"],
    // Testy pracují s databází jen v paměti. Po skončení zmizí a nijak
    // neovlivní tvoji vývojovou databázi poradna.db.
    env: { DB_PATH: ":memory:" },
  },
});
