import { ocrBase, pdfBase } from "virtual:price-reader-assets";
import { pdfTextLines } from "./priceListHelpers";
import { readPdfPriceTable } from "./pdfPriceTable";
import { readImagePriceTable } from "./imagePriceTable";
import { recognizedWords } from "./ocrRegion";
import { priceTextCanvas } from "./imageTableGeometry";
import { preparePriceImage, rotatePriceCanvas, lightPriceCanvas, priceTextRows } from "./preparePriceImage";

const MAX_PAGES = 100;
const MAX_BYTES = 20 * 1024 * 1024;

function checkAbort(signal) { signal?.throwIfAborted(); }

function abortable(promise, signal) {
  if (!signal) return promise;
  checkAbort(signal);
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason || new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", abort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener("abort", abort));
  });
}

function canvasImage(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => {
    if (blob) resolve(URL.createObjectURL(blob));
    else reject(new Error("ساخت پیش‌نمایش فایل ممکن نشد"));
  }, "image/jpeg", 0.8));
}

async function imageCanvas(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(1, 3200 / Math.max(image.naturalWidth, image.naturalHeight),
      Math.sqrt(8_000_000 / (image.naturalWidth * image.naturalHeight)));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  } finally { URL.revokeObjectURL(url); }
}

export async function readPriceFile(file, { onProgress = () => {}, signal, forceOcr = false, products = [] } = {}) {
  if (!file || !file.size || file.size > MAX_BYTES) throw new Error("فایل باید بین ۱ بایت تا ۲۰ مگابایت باشد");
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  if (!isPdf && !/^image\//.test(file.type) && !/\.(jpe?g|png|webp|avif|bmp|gif|heic|heif|tiff?)$/i.test(file.name)) {
    throw new Error("یک فایل PDF یا عکس لیست قیمت انتخاب کنید");
  }
  const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))];
  const pages = [];
  let worker;
  let pdf;
  let loadingTask;
  const stopWorker = () => {
    worker?.terminate().catch(() => {});
    loadingTask?.destroy().catch(() => {});
  };
  signal?.addEventListener("abort", stopWorker, { once: true });
  async function recognize(canvas, page) {
    checkAbort(signal);
    if (!worker) {
      onProgress("آماده‌سازی خواندن فارسی؛ بار اول ممکن است کمی طول بکشد…");
      const { createWorker } = await import("tesseract.js");
      const languages = await abortable(Promise.all(["fas", "eng"].map(async (code) => {
        const response = await fetch(`${ocrBase}/lang/${code}.traineddata`, { signal, cache: "force-cache" });
        const data = new Uint8Array(await response.arrayBuffer());
        if (!response.ok || data.length < 10000 || response.headers.get("content-type")?.includes("text/html")) {
          throw new Error("فایل زبان فارسی دریافت نشد؛ اتصال اینترنت را بررسی و دوباره تلاش کنید");
        }
        return code;
      })), signal);
      let rejectWorker;
      const workerFailure = new Promise((resolve, reject) => { rejectWorker = reject; });
      const creatingWorker = createWorker(languages, 1, {
        workerPath: `${ocrBase}/worker.min.js`, corePath: `${ocrBase}/core`,
        langPath: `${ocrBase}/lang`, gzip: false, cachePath: "shoil-price-reader-v1", workerBlobURL: false,
        errorHandler: () => rejectWorker(new Error("خواندن تصویر ممکن نشد؛ عکس واضح‌تر یا PDF اصلی شرکت را انتخاب کنید")),
        logger: (message) => {
          if (!signal?.aborted && message.status === "recognizing text") {
            onProgress(`خواندن عکس صفحهٔ ${page} — ${Math.round(message.progress * 100)}٪`);
          }
        },
      });
      creatingWorker.then((created) => {
        if (signal?.aborted) created.terminate().catch(() => {});
      }, () => {});
      worker = await abortable(Promise.race([creatingWorker, workerFailure]), signal);
      checkAbort(signal);
      await worker.setParameters({ tessedit_pageseg_mode: "11", preserve_interword_spaces: "1" });
    }
    await worker.reinitialize(["fas", "eng"]);
    await worker.setParameters({ tessedit_pageseg_mode: "11", tessedit_char_whitelist: "" });
    let last = { text: "", table: null };
    let previousWords = [];
    const read = async (image, mode, tiled = false, cropTop = 0, strips = false) => {
      await worker.reinitialize(["fas", "eng"]);
      await worker.setParameters({ tessedit_pageseg_mode: mode, tessedit_char_whitelist: "" });
      const textCanvas = priceTextCanvas(image);
      let data;
      try {
        if (cropTop) {
          const words = previousWords.filter((word) => word.bbox.y1 < cropTop), texts = [];
          const regions = strips ? priceTextRows(textCanvas, cropTop) : [{ top: cropTop, height: image.height - cropTop }];
          for (const region of regions) {
            checkAbort(signal);
            const crop = document.createElement("canvas"), scale = Math.min(2, 3200 / image.width);
            crop.width = Math.ceil(image.width * scale); crop.height = Math.ceil(region.height * scale);
            crop.getContext("2d").drawImage(textCanvas, 0, region.top, image.width, region.height, 0, 0, crop.width, crop.height);
            try {
              const result = await abortable(worker.recognize(crop, {}, { text: true, blocks: true }), signal);
              texts.push(result.data.text);
              words.push(...recognizedWords(result.data).map((word) => ({ ...word, bbox: {
                x0: word.bbox.x0 / scale, x1: word.bbox.x1 / scale,
                y0: region.top + word.bbox.y0 / scale, y1: region.top + word.bbox.y1 / scale,
              } })));
            } finally { crop.width = crop.height = 0; }
          }
          data = { words, text: texts.join("\n") };
        }
        else if (!tiled) ({ data } = await abortable(worker.recognize(textCanvas, {}, { text: true, blocks: true }), signal));
        else {
          const words = [], texts = [];
          for (let top = 0; top < image.height; top += 360) {
            checkAbort(signal);
            onProgress(`خواندن جزئیات صفحهٔ ${page} — بخش ${Math.floor(top / 360) + 1}…`);
            const crop = document.createElement("canvas"), height = Math.min(400, image.height - top);
            const scale = Math.min(2, 3200 / image.width);
            crop.width = Math.ceil(image.width * scale); crop.height = Math.ceil(height * scale);
            crop.getContext("2d").drawImage(textCanvas, 0, top, image.width, height, 0, 0, crop.width, crop.height);
            try {
              const result = await abortable(worker.recognize(crop, {}, { text: true, blocks: true }), signal);
              texts.push(result.data.text);
              for (const word of recognizedWords(result.data)) {
                const bbox = { x0: word.bbox.x0 / scale, x1: word.bbox.x1 / scale,
                  y0: top + word.bbox.y0 / scale, y1: top + word.bbox.y1 / scale };
                const duplicate = words.find((other) => Math.abs(other.bbox.x0 - bbox.x0) < 8 && Math.abs(other.bbox.y0 - bbox.y0) < 8);
                if (!duplicate) words.push({ ...word, bbox });
                else if (word.confidence > duplicate.confidence) Object.assign(duplicate, word, { bbox });
              }
            } finally { crop.width = crop.height = 0; }
          }
          data = { words, text: texts.join("\n") };
        }
      }
      finally { textCanvas.width = textCanvas.height = 0; }
      checkAbort(signal);
      const words = recognizedWords(data);
      previousWords = words;
      const text = words.length ? pdfTextLines(words.map((word) => ({
        str: word.text, height: word.bbox.y1 - word.bbox.y0,
        transform: [1, 0, 0, 1, word.bbox.x0, -(word.bbox.y0 + word.bbox.y1) / 2],
      })), { maxTolerance: 20 }) : data.text;
      const table = await abortable(readImagePriceTable(image, words, worker, { signal, onProgress, brands, products }), signal);
      const verified = (value) => value?.rows?.filter((row) => row.verifiedPrice).length || 0;
      if ((!last.table && (!last.text || table)) || (table && (verified(table) > verified(last.table)
        || (verified(table) === verified(last.table) && table.rows.length > last.table.rows.length)))) last = { text, table };
      return !!table?.rows?.some((row) => row.verifiedPrice);
    };
    const originalCanvas = canvas;
    canvas = lightPriceCanvas(canvas);
    try {
    if (await read(canvas, "11")) return last;
    if (canvas.priceBodyTop && await read(canvas, "6", false, canvas.priceBodyTop)) return last;
    if (canvas.priceBodyTop && await read(canvas, "7", false, canvas.priceBodyTop, true)) return last;
    onProgress(`بهبود وضوح و اصلاح زاویهٔ صفحهٔ ${page}…`);
    const prepared = preparePriceImage(canvas);
    try {
      if (await read(prepared, "6")) return last;
      if (await read(prepared, "6", true)) return last;
      // A phone may save a sideways or upside-down scan. Try each orientation
      // sequentially, releasing the canvas before allocating the next one.
      for (const degrees of [90, 270, 180]) {
        checkAbort(signal);
        onProgress(`بررسی جهت عکس صفحهٔ ${page}…`);
        const rotated = rotatePriceCanvas(prepared, degrees);
        try { if (await read(rotated, "11")) return last; }
        finally { rotated.width = rotated.height = 0; }
      }
      return last;
    } finally { prepared.width = prepared.height = 0; }
    } finally { if (canvas !== originalCanvas) canvas.width = canvas.height = 0; }
  }
  try {
    checkAbort(signal);
    if (isPdf) {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `${pdfBase}/pdf.worker.min.js`;
      loadingTask = pdfjs.getDocument({
        data: new Uint8Array(await file.arrayBuffer()), isEvalSupported: false,
        cMapUrl: `${pdfBase}/cmaps/`, cMapPacked: true,
        standardFontDataUrl: `${pdfBase}/standard_fonts/`, wasmUrl: `${pdfBase}/wasm/`,
      });
      pdf = await abortable(loadingTask.promise, signal);
      if (pdf.numPages > MAX_PAGES) throw new Error("هر بار PDF حداکثر ۱۰۰ صفحه‌ای انتخاب کنید");
      let template = null;
      for (let number = 1; number <= pdf.numPages; number += 1) {
        checkAbort(signal);
        onProgress(`خواندن صفحهٔ ${number} از ${pdf.numPages}…`);
        const page = await pdf.getPage(number);
        const original = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: Math.min(2.5, 2200 / Math.max(original.width, original.height)) });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        await abortable(page.render({ canvas, viewport }).promise, signal);
        const items = (await page.getTextContent()).items;
        let text = pdfTextLines(items);
        let table = !forceOcr
          ? readPdfPriceTable(items, await page.getOperatorList(), pdfjs.OPS, { brands, products, template }) : null;
        if (table?.template) template = table.template;
        let image = false;
        // Readable text alone is insufficient: automatic updates need a recognized
        // table. Some exports keep the text but flatten or redraw its borders.
        if (forceOcr || !table?.rows?.length) {
          onProgress(`جدول صفحهٔ ${number} از متن تشخیص داده نشد؛ در حال خواندن تصویری…`);
          ({ text, table } = await recognize(canvas, number));
          image = true;
        }
        pages.push({ page: number, text, table, image, preview: await canvasImage(canvas) });
        canvas.width = canvas.height = 0;
        page.cleanup();
      }
    } else {
      const canvas = await imageCanvas(file);
      const { text, table } = await recognize(canvas, 1);
      pages.push({ page: 1, text, table, image: true, preview: await canvasImage(canvas) });
      canvas.width = canvas.height = 0;
    }
    checkAbort(signal);
    return pages;
  } catch (error) {
    pages.forEach((page) => URL.revokeObjectURL(page.preview));
    if (signal?.aborted || /[آ-ی]/u.test(error.message || "")) throw error;
    throw new Error(isPdf
      ? "فایل PDF خوانده نشد؛ سالم بودن فایل را بررسی کنید یا عکس واضح صفحات را انتخاب کنید."
      : "این عکس در مرورگر باز نشد؛ آن را به JPG یا PNG تبدیل کنید و دوباره انتخاب کنید.", { cause: error });
  } finally {
    signal?.removeEventListener("abort", stopWorker);
    if (worker && !signal?.aborted) await worker.terminate();
    else if (worker) stopWorker();
    if (loadingTask) await loadingTask.destroy();
  }
}
