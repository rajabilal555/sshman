import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: [
        /\.jsx$/,
        /\.tsx$/,
        /\.ts$/,
        /\.js$/,
        /\.mjs$/,
        /\.cjs$/,
        /\.ts$/,
        /\.tsx$/,
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      $: path.resolve(__dirname, "./wailsjs"),
    },
  },
});
