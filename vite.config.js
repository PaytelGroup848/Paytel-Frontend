import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: true,
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react-router-dom") ||
              id.includes("react-dom") ||
              id.includes("react")
            )
              return "vendor-core";
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("lucide-react")) return "vendor-icons";
            return "vendor-utils";
          }
        },
      },
      onwarn(warning, warn) {
        if (warning.message?.includes("disallowed-content-in-noscript-in-head"))
          return;
        if (warning.message?.includes("parse5")) return;
        warn(warning);
      },
    },
  },
  logLevel: "warn",
  clearScreen: false,
});
