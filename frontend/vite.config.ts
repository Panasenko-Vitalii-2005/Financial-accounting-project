import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5180,
    strictPort: false,
    allowedHosts: [".trycloudflare.com", ".lhr.life"],
    proxy: {
      "/api": {
        target: "http://localhost:3006",
        changeOrigin: true,
      },
    },
  },
});
