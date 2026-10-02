// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     open: true,
//   },
//   build: {
//     outDir: "build",
//   },
// });
//---------------------------------
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    open: true,
  },

  build: {
    outDir: process.env.RUNFLARE ? "dist" : "build",
  },
});