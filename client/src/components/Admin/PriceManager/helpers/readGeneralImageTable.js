import { readPriceTableFromLines } from "./pdfPriceTable.js";
import { latinDigits, normalizeText, parseAmount } from "./priceListHelpers.js";
import { readPersianPricePixels } from "./priceDigitReader.js";
import { readCoordinatePriceTable, priceHeaderRole, tableUnit, technicalFields } from "./coordinatePriceTable.js";
import { loadSupplierGlyphs } from "./loadSupplierGlyphs.js";
import { imageTableLines, priceTextCanvas, suppliedImageHeaders } from "./imageTableGeometry.js";
import { ocrItems, recognizeRegion, cleanOcrAmount } from "./ocrRegion.js";
import { readCodePriceTable } from "./codePriceTable.js";
import { readTechnicalPriceTable, technicalVolume } from "./technicalPriceTable.js";

// Any brand/column order, using the same header and cell geometry as native PDFs.
// Only bounded cells with agreeing numeric readings can be saved automatically.
export default async function readGeneralImageTable(canvas, words, worker, { signal, onProgress, brands, products }) {
  const check = () => signal?.throwIfAborted();
  const lines = imageTableLines(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height));
  let items = ocrItems(words, canvas.height);
  const profile = suppliedImageHeaders(canvas, words, lines, brands);
  if (profile) items = [...items.filter((item) => item.transform[5] + item.height * 0.4 < profile.bottom), ...profile.headers];
  const moneyHeadings = items.filter((item) => {
    if (priceHeaderRole(item.str) !== "price") return false;
    const x = item.transform[4] + item.width / 2, y = item.transform[5] + item.height * 0.4;
    const edges = lines.vertical.filter((line) => line.top > y && line.bottom < y);
    return edges.some((line) => line.x < x) && edges.some((line) => line.x > x);
  });
  if (moneyHeadings.length === 1) {
    const heading = moneyHeadings[0], x = heading.transform[4] + heading.width / 2;
    const y = heading.transform[5] + heading.height * 0.4;
    const edges = lines.vertical.filter((line) => line.top > y && line.bottom < y);
    const left = Math.max(...edges.filter((line) => line.x < x).map((line) => line.x));
    const right = Math.min(...edges.filter((line) => line.x > x).map((line) => line.x));
    const cuts = lines.horizontal.filter((line) => line.left < x && line.right > x && line.y < y)
      .map((line) => line.y).sort((a, b) => b - a)
      .filter((cut, i, values) => !i || values[i - 1] - cut > 4);
    if ([left, right].every(Number.isFinite) && cuts.length > 1) {
      items = items.filter((item) => item.transform[5] >= cuts[0]
        || item.transform[4] + item.width / 2 <= left || item.transform[4] + item.width / 2 >= right);
      for (let i = 0; i < cuts.length - 1; i++) {
        if (cuts[i] - cuts[i + 1] < 12) continue;
        items.push({ str: "0", width: 8, height: 6, transform: [1, 0, 0, 1, x - 4, (cuts[i] + cuts[i + 1]) / 2 - 2.4] });
      }
    }
  }
  const options = { brands, supplier: profile?.supplier, unit: tableUnit(words.map((word) => word.text).join(" ")) };
  const read = () => readPriceTableFromLines(items, lines, options) || readCoordinatePriceTable(items, options)
    || readCodePriceTable(items, products) || readTechnicalPriceTable(items, options);
  let table = read();
  if (!table?.rows.length) return null;
  const supplierGlyphs = await loadSupplierGlyphs(table.supplier);
  check();
  const originalRows = table.rows;
  // Whole-page bilingual OCR often loses W/API characters. Re-read just technical
  // columns in English while keeping Persian names, volumes and brand evidence.
  const bodyTop = Math.max(...table.rows.map((row) => row.priceBounds.top));
  const technical = items.filter((item) => priceHeaderRole(item.str) === "specs" && item.transform[5] >= bodyTop);
  const textImage = priceTextCanvas(canvas);
  await worker.reinitialize("eng");
  await worker.setParameters({ tessedit_pageseg_mode: "6", tessedit_char_whitelist: "" });
  for (const heading of technical) {
    check();
    const x = heading.transform[4] + heading.width / 2;
    const edges = lines.vertical.filter((line) => line.top > heading.transform[5] && line.bottom < heading.transform[5]);
    const left = Math.max(...edges.filter((line) => line.x < x).map((line) => line.x));
    const right = Math.min(...edges.filter((line) => line.x > x).map((line) => line.x));
    if (![left, right].every(Number.isFinite)) continue;
    const top = Math.max(...table.rows.map((row) => row.priceBounds.top));
    const bottom = Math.min(...table.rows.map((row) => row.priceBounds.bottom));
    const region = { x: left + 3, y: canvas.height - top + 3, width: right - left - 6, height: top - bottom - 6 };
    if (region.width <= 0 || region.height <= 0) continue;
    const result = await recognizeRegion(worker, textImage, region, 2);
    items = items.filter((item) => item === heading || item.transform[5] >= top
      || item.transform[4] + item.width / 2 <= left || item.transform[4] + item.width / 2 >= right);
    items.push(...result.items);
  }
  const nameHeading = items.find((item) => priceHeaderRole(item.str) === "name" && item.transform[5] >= bodyTop);
  if (nameHeading) {
    const x = nameHeading.transform[4] + nameHeading.width / 2, y = nameHeading.transform[5];
    const edges = lines.vertical.filter((line) => line.top > y && line.bottom < y);
    const left = Math.max(...edges.filter((line) => line.x < x).map((line) => line.x));
    const right = Math.min(...edges.filter((line) => line.x > x).map((line) => line.x));
    const bottom = Math.min(...table.rows.map((row) => row.priceBounds.bottom));
    if ([left, right].every(Number.isFinite)) {
      const names = await recognizeRegion(worker, textImage, { x: left + 3, y: canvas.height - bodyTop + 3,
        width: right - left - 6, height: bodyTop - bottom - 6 }, 3);
      items.push(...names.items.filter((item) => item.confidence >= 80
        && /^(?:xn[3-9]|cvt|dct|atf|al4|dx[36]|c3|chb|extra|flushing|mtf|\d{1,2}w\d{2}|gl[45])$/i.test(item.str.trim())));
    }
  }
  table = read() || table;
  const technicalCache = new Map();
  await worker.setParameters({ tessedit_pageseg_mode: "7", tessedit_char_whitelist: "" });
  for (const heading of technical) {
    const x = heading.transform[4] + heading.width / 2, y = heading.transform[5];
    const edges = lines.vertical.filter((line) => line.top > y && line.bottom < y);
    const left = Math.max(...edges.filter((line) => line.x < x).map((line) => line.x));
    const right = Math.min(...edges.filter((line) => line.x > x).map((line) => line.x));
    if (![left, right].every(Number.isFinite)) continue;
    for (const row of table.rows) {
      check();
      const middle = (row.priceBounds.top + row.priceBounds.bottom) / 2;
      const cuts = lines.horizontal.filter((line) => line.left < x && line.right > x);
      const top = Math.min(...cuts.filter((line) => line.y > middle).map((line) => line.y));
      const bottom = Math.max(...cuts.filter((line) => line.y < middle).map((line) => line.y));
      if (![top, bottom].every(Number.isFinite) || top - bottom < 12) continue;
      const key = `${left}:${right}:${top}:${bottom}`;
      if (!technicalCache.has(key)) {
        const region = { x: left + 3, y: canvas.height - top + 3, width: right - left - 6, height: top - bottom - 6 };
        const first = await recognizeRegion(worker, textImage, region, 3);
        const second = await recognizeRegion(worker, textImage, region, 4);
        const a = technicalFields(first.text), b = technicalFields(second.text);
        technicalCache.set(key, { api: a.api && a.api === b.api && first.confidence >= 75 && second.confidence >= 75 ? a.api : "",
          viscosity: a.viscosity && a.viscosity === b.viscosity && first.confidence >= 75 && second.confidence >= 75 ? a.viscosity : "" });
      }
      const fields = technicalCache.get(key);
      if (fields.api) row.api = fields.api;
      if (fields.viscosity) row.viscosity = fields.viscosity;
    }
  }
  if (nameHeading) {
    const x = nameHeading.transform[4] + nameHeading.width / 2, y = nameHeading.transform[5];
    const edges = lines.vertical.filter((line) => line.top > y && line.bottom < y);
    const left = Math.max(...edges.filter((line) => line.x < x).map((line) => line.x));
    const right = Math.min(...edges.filter((line) => line.x > x).map((line) => line.x));
    const cache = new Map();
    if ([left, right].every(Number.isFinite)) for (const row of table.rows) {
      if (row.api && row.viscosity) continue;
      check();
      const middle = (row.priceBounds.top + row.priceBounds.bottom) / 2;
      const cuts = lines.horizontal.filter((line) => line.left < x && line.right > x);
      const top = Math.min(...cuts.filter((line) => line.y > middle).map((line) => line.y));
      const bottom = Math.max(...cuts.filter((line) => line.y < middle).map((line) => line.y));
      if (![top, bottom].every(Number.isFinite) || top - bottom < 12) continue;
      const key = `${top}:${bottom}`;
      if (!cache.has(key)) {
        const region = { x: left + 3, y: canvas.height - top + 3, width: right - left - 6, height: top - bottom - 6 };
        const result = await recognizeRegion(worker, textImage, region, 3);
        const text = result.items.filter((item) => item.confidence >= 80
          && /^(?:xn[3-9]|cvt|dct|atf|al4|dx[36]|c3|chb|extra|flushing|mtf|fluid|\d{1,2}w\d{2}|gl[45])$/i.test(item.str.trim()))
          .map((item) => item.str).join(" ");
        cache.set(key, text);
      }
      const text = cache.get(key), fields = technicalFields(text);
      row.name += " " + text;
      row.api ||= fields.api;
      row.viscosity ||= fields.viscosity;
    }
  }
  const volumeHeading = items.find((item) => priceHeaderRole(item.str) === "volume" && item.transform[5] >= bodyTop);
  if (volumeHeading) {
    const x = volumeHeading.transform[4] + volumeHeading.width / 2, y = volumeHeading.transform[5];
    const edges = lines.vertical.filter((line) => line.top > y && line.bottom < y);
    const left = Math.max(...edges.filter((line) => line.x < x).map((line) => line.x));
    const right = Math.min(...edges.filter((line) => line.x > x).map((line) => line.x));
    if ([left, right].every(Number.isFinite)) {
      await worker.reinitialize(["fas", "eng"]);
      await worker.setParameters({ tessedit_pageseg_mode: "7", tessedit_char_whitelist: "" });
      for (const row of table.rows) {
        check();
        const bounds = row.priceBounds;
        const l = /لیت/.test(normalizeText(volumeHeading.str)) ? (left + right) / 2 : left + 3;
        const region = { x: l, y: canvas.height - bounds.top + 3, width: right - l - 3, height: bounds.top - bounds.bottom - 6 };
        if (region.width < 5 || region.height < 5) continue;
        const first = await recognizeRegion(worker, textImage, region, 3);
        const second = await recognizeRegion(worker, textImage, region, 4);
        const volume = (value) => latinDigits(value).replace(/\s/g, "").match(/\d+(?:\.\d+)?/)?.[0];
        const a = volume(first.text), b = volume(second.text);
        if (!a && !b && !row.volume) continue;
        row.verifiedIdentity = !!a && a === b && first.confidence >= 75 && second.confidence >= 75;
        let confirmed = a;
        const glyphTemplates = supplierGlyphs[table.supplier + ":volume"];
        if (!row.verifiedIdentity && glyphTemplates && Object.keys(glyphTemplates).length >= 2) {
          const pixels = textImage.getContext("2d").getImageData(Math.round(region.x), Math.round(region.y), Math.floor(region.width), Math.floor(region.height));
          const options = { glyphTemplates, ignoreClipped: true, clipMargin: 3 };
          const one = readPersianPricePixels(pixels, bounds.top - bounds.bottom, options);
          const two = readPersianPricePixels(pixels, bounds.top - bounds.bottom, { ...options, threshold: 140 });
          if (one?.confidence >= 0.94 && two?.confidence >= 0.94 && one.amount === two.amount
            && (!a && !b || [a, b].includes(one.amount))) {
            confirmed = one.amount; row.verifiedIdentity = true;
          }
        }
        if (row.verifiedIdentity) {
          const unit = /kg|کیلو/.test(normalizeText(row.volume)) ? "kg" : /cc|ml|میلی|سیسی/.test(normalizeText(row.volume)) ? "ml" : "L";
          row.volume = confirmed + unit;
        }
      }
    }
  }
  for (const row of table.rows) {
    const original = originalRows.find((other) => Math.abs(other.priceBounds.top - row.priceBounds.top) < 2);
    if ((original?.viscosity && row.viscosity && original.viscosity !== row.viscosity)
      || (original?.api && row.api && original.api !== row.api)) row.verifiedIdentity = false;
  }
  if (table.technicalLayout) {
    await worker.reinitialize(["fas", "eng"]);
    await worker.setParameters({ tessedit_pageseg_mode: "7", tessedit_char_whitelist: "" });
    for (const row of table.rows) {
      check();
      const b = row.identityBounds;
      const region = { x: b.left, y: canvas.height - b.top, width: b.right - b.left, height: b.top - b.bottom };
      const first = await recognizeRegion(worker, textImage, region, 3);
      const second = await recognizeRegion(worker, textImage, region, 4);
      row.verifiedIdentity = technicalFields(first.text).viscosity === row.viscosity
        && technicalFields(second.text).viscosity === row.viscosity
        && technicalVolume(first.text) === row.volume && technicalVolume(second.text) === row.volume;
    }
  }
  textImage.width = textImage.height = 0;
  await worker.reinitialize(["fas", "eng"]);
  await worker.setParameters({ tessedit_pageseg_mode: "7", tessedit_char_whitelist: "0123456789۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩,٬،.٫" });
  for (let index = 0; index < table.rows.length; index++) {
    check();
    onProgress(`خواندن و کنترل مبلغ ردیف ${index + 1} از ${table.rows.length}…`);
    const row = table.rows[index], bounds = row.priceBounds;
    const region = { x: Math.max(0, bounds.left + 3), y: Math.max(0, canvas.height - bounds.top + 3),
      width: Math.min(canvas.width, bounds.right) - Math.max(0, bounds.left) - 6,
      height: Math.min(canvas.height, bounds.top) - Math.max(0, bounds.bottom) - 6 };
    if (region.width < 5 || region.height < 5) { row.verifiedPrice = false; continue; }
    const first = await recognizeRegion(worker, canvas, region, 3);
    await worker.setParameters({ tessedit_pageseg_mode: "8" });
    const second = await recognizeRegion(worker, canvas, region, 4);
    await worker.setParameters({ tessedit_pageseg_mode: "7" });
    const a = cleanOcrAmount(first.text), b = cleanOcrAmount(second.text);
    row.priceEvidence = [{ amount: a, confidence: first.confidence }, { amount: b, confidence: second.confidence }];
    row.verifiedPrice = a !== null && b !== null && parseAmount(a) === parseAmount(b)
      && first.confidence >= 85 && second.confidence >= 85;
    if (row.verifiedPrice) row.amount = a;
    const glyphTemplates = supplierGlyphs[table.supplier + (canvas.priceDark ? ":designed" : "")] || supplierGlyphs[table.supplier];
    if (!row.verifiedPrice && glyphTemplates && Object.keys(glyphTemplates).length >= 10) {
      const pixels = canvas.getContext("2d").getImageData(Math.round(region.x), Math.round(region.y), Math.floor(region.width), Math.floor(region.height));
      const one = readPersianPricePixels(pixels, bounds.top - bounds.bottom, { glyphTemplates });
      const two = readPersianPricePixels(pixels, bounds.top - bounds.bottom, { glyphTemplates, threshold: 140 });
      if (one?.confidence >= 0.93 && two?.confidence >= 0.93 && parseAmount(one.amount) === parseAmount(two.amount)) {
        row.amount = one.amount; row.verifiedPrice = true;
        row.priceEvidence.push({ amount: one.amount, confidence: one.confidence * 100 }, { amount: two.amount, confidence: two.confidence * 100 });
      }
    }
    row.source = [row.supplier, row.code || row.name, row.volume, row.api, row.viscosity, row.amount].filter(Boolean).join(" · ");
  }
  return table;
}
