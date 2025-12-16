import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path, { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@rent-a-van/shared": resolve(__dirname, "../shared"),
      "@style": path.resolve(__dirname, "src/style"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@style/variables" as *;
          @use "@style/mixins" as *;
        `,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // 2000 kB = 2 Mo, pour que le warning disparaisse
  },
});
