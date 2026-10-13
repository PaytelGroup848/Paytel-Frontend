import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr:true,
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  //  Suppress parse5 warnings
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore parse5 warning about noscript
        if (warning.message?.includes('disallowed-content-in-noscript-in-head')) {
          return;
        }
        if (warning.message?.includes('parse5')) {
          return;
        }
        warn(warning);
      }
    }
  },
  //  Also suppress warnings in dev mode
  logLevel: 'warn',
  clearScreen: false,
})