import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const base = process.env.VITE_BASE || "/";

export default defineConfig({
  plugins: [react()],
  base: base,
  server: {
    port: 8080,
  },
});
