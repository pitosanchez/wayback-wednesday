import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//if this string is equal to production, then the base is /wayback/, otherwise it is /
const base =
  process.env.NODE_ENV === "production" ? "/wayback-wednesday/" : "/";

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  plugins: [react()],
});
