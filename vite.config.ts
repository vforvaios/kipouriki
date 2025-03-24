import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      srcDir: "src",
      filename: "my-worker.js",
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectManifest: {
        minify: false,
        enableWorkboxModulesLogs: true,
      },
      injectRegister: "auto",
      devOptions: {
        enabled: false,
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Kipourgies",
        short_name: "Kipourgies",
        screenshots: [
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
            label: "Application",
          },
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile application",
          },
        ],
        icons: [
          {
            src: "/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#171717",
        background_color: "#f0e7db",
        display: "standalone",
        description: "Thodoris Pasxalidis Company",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [],
        globPatterns: [],
      },
    }),
  ],
});
