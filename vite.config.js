import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/c24-wholesale-market/",

  plugins: [react()],
});