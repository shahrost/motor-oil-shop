import fs from "node:fs";
import path from "node:path";

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import brand from "./src/data/brand.js";

// نام و توضیح برند در فایل‌هایی که React بهشون دسترسی نداره (index.html، manifest.json، offline.html)
// به شکل %BRAND_NAME% و … نوشته شده و موقع dev/build از src/data/brand.js پر می‌شه
const BRAND_TOKENS = {
  BRAND_NAME: brand.name,
  BRAND_TITLE: brand.title,
  BRAND_DESCRIPTION: brand.description,
  BRAND_TAGLINE: brand.tagline,
  BRAND_SITE_URL: brand.siteUrl,
  BRAND_OG_IMAGE: brand.siteUrl + brand.ogImage,
  BRAND_THEME_COLOR: brand.themeColor,
};

const PUBLIC_BRAND_FILES = ["manifest.json", "offline.html"];

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeJson = (value) => JSON.stringify(value).slice(1, -1);

function fillBrand(text, file) {
  const escape = file.endsWith(".json") ? escapeJson : escapeHtml;
  return text.replace(/%(BRAND_[A-Z_]+)%/g, (token, key) =>
    key in BRAND_TOKENS ? escape(BRAND_TOKENS[key]) : token,
  );
}

function brandFiles() {
  let outDir;

  return {
    name: "brand-files",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    // pre: قبل از جایگزینی %VITE_*% خود Vite
    transformIndexHtml: { order: "pre", handler: (html) => fillBrand(html, "index.html") },
    // dev: فایل‌های public با مقدار پرشده سرو می‌شن
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = PUBLIC_BRAND_FILES.find((name) => req.url === `/${name}`);
        if (!file) return next();

        const text = fs.readFileSync(path.join(server.config.publicDir, file), "utf8");
        res.setHeader(
          "Content-Type",
          file.endsWith(".json") ? "application/manifest+json" : "text/html; charset=utf-8",
        );
        res.end(fillBrand(text, file));
      });
    },
    // build: کپی public در خروجی پر می‌شه
    writeBundle() {
      for (const file of PUBLIC_BRAND_FILES) {
        const target = path.join(outDir, file);
        fs.writeFileSync(target, fillBrand(fs.readFileSync(target, "utf8"), file));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), brandFiles()],

  server: {
    open: true,
  },

  build: {
    outDir: process.env.RUNFLARE ? "dist" : "build",
  },
});
