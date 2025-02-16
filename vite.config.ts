import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path-browserify";

export default defineConfig({
  base: "/Bemsa/",
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve("/src"),
    },
  },
});
