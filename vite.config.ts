import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss(), imagetools()],
  cacheDir: "node_modules/.vite",
  optimizeDeps: {
    force: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: false,
      ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
    },
    fs: {
      allow: [process.cwd()],
      strict: false,
    },
    hmr: {
      overlay: true,
      clientPort: 5173,
    },
  },
});
