import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { gunzipSync } from "node:zlib";

const require = createRequire(import.meta.url);

// Host all OCR/PDF dependencies on our own site, including Persian language data.
// Reading a company's list must not depend on an overseas CDN being reachable.
export default function priceReaderAssets() {
  const files = new Map();
  const ocrRoot = path.dirname(require.resolve("tesseract.js/package.json"));
  const coreRoot = path.dirname(require.resolve("tesseract.js-core/package.json"));
  const pdfRoot = path.dirname(require.resolve("pdfjs-dist/package.json"));
  const ocrVersion = JSON.parse(fs.readFileSync(path.join(ocrRoot, "package.json"))).version;
  const pdfVersion = JSON.parse(fs.readFileSync(path.join(pdfRoot, "package.json"))).version;
  const ocrBase = `/price-reader/ocr-${ocrVersion}`;
  const pdfBase = `/price-reader/pdf-${pdfVersion}`;
  const add = (url, file) => files.set(url, file);
  // nginx installations often serve .mjs as octet-stream; module workers require JS MIME.
  add(`${pdfBase}/pdf.worker.min.js`, path.join(pdfRoot, "build/pdf.worker.min.mjs"));
  add(`${ocrBase}/worker.min.js`, path.join(ocrRoot, "dist/worker.min.js"));
  // OEM=1 uses only LSTM; ship its standard, SIMD and relaxed-SIMD variants.
  for (const file of fs.readdirSync(coreRoot).filter((f) => f.endsWith("-lstm.wasm.js"))) {
    add(`${ocrBase}/core/${file}`, path.join(coreRoot, file));
  }
  for (const lang of ["fas", "eng"]) {
    const root = path.dirname(require.resolve(`@tesseract.js-data/${lang}/package.json`));
    add(`${ocrBase}/lang/${lang}.traineddata`, gunzipSync(fs.readFileSync(path.join(root, "4.0.0_best_int", `${lang}.traineddata.gz`))));
  }
  for (const folder of ["cmaps", "standard_fonts", "wasm"]) {
    for (const file of fs.readdirSync(path.join(pdfRoot, folder))) {
      add(`${pdfBase}/${folder}/${file}`, path.join(pdfRoot, folder, file));
    }
  }
  const mime = (file) => file.endsWith(".js") ? "text/javascript"
    : file.endsWith(".wasm") ? "application/wasm" : "application/octet-stream";
  return {
    name: "price-reader-assets",
    resolveId(id) { if (id === "virtual:price-reader-assets") return `\0${id}`; },
    load(id) {
      if (id === "\0virtual:price-reader-assets") {
        return `export const ocrBase = ${JSON.stringify(ocrBase)}; export const pdfBase = ${JSON.stringify(pdfBase)};`;
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = files.get(req.url?.split("?")[0]);
        if (!file) return next();
        res.setHeader("Content-Type", mime(req.url?.split("?")[0] || ""));
        if (Buffer.isBuffer(file)) res.end(file);
        else fs.createReadStream(file).pipe(res);
      });
    },
    generateBundle() {
      for (const [url, file] of files) {
        this.emitFile({ type: "asset", fileName: url.slice(1), source: Buffer.isBuffer(file) ? file : fs.readFileSync(file) });
      }
    },
  };
}
