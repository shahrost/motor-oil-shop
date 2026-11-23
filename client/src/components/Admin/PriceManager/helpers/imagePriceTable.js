import { readPriceTableFromLines } from "./pdfPriceTable.js";
import { latinDigits, normalizeText, parseAmount } from "./priceListHelpers.js";
import { readPersianPricePixels } from "./priceDigitReader.js";
import { imageTableLayout } from "./imageTableGeometry.js";
import { ocrItems, recognizeRegion, cleanOcrAmount } from "./ocrRegion.js";
import readGeneralImageTable from "./readGeneralImageTable.js";

function imageTableFromItems(layout, items) {
  const body = items.filter((item) => item.transform[5] + item.height * 0.4 < layout.headerBottom);
  return readPriceTableFromLines([...body, ...layout.headers], layout.lines, layout);
}

// Read Latin technical columns separately, then verify each price against a second
// reading of the entire price column. No image-derived price is saved on one guess.
export async function readImagePriceTable(canvas, words, worker, { signal, onProgress = () => {}, brands = [], products = [] } = {}) {
  const layout = imageTableLayout(canvas, words);
  if (!layout) return readGeneralImageTable(canvas, words, worker, { signal, onProgress, brands, products });
  const check = () => signal?.throwIfAborted();
  const { vertical, headerBottom } = layout;
  let items = ocrItems(words, canvas.height);
  const technicalColumns = layout.supplier === "وم اویل" ? [3, 4] : [1, 2];
  await worker.reinitialize("eng");
  await worker.setParameters({ tessedit_pageseg_mode: "11", tessedit_char_whitelist: "" });
  for (const column of technicalColumns) {
    check();
    const gradeOnly = column === technicalColumns[0] && (layout.supplier === "ایدلوب"
      || !/gl5|atf|jaso|cvt|dct/i.test(words.map((word) => word.text).join(" ")));
    await worker.setParameters({ tessedit_char_whitelist: gradeOnly ? "0123456789Ww-" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/-" });
    const left = vertical[column].x + 3, right = vertical[column + 1].x - 3;
    const bottom = Math.max(vertical[column].bottom, vertical[column + 1].bottom);
    const region = { x: left, y: canvas.height - headerBottom + 3, width: right - left, height: headerBottom - bottom - 6 };
    if (region.width < 5 || region.height < 5) return null;
    let recognized = await recognizeRegion(worker, canvas, region);
    if (gradeOnly && layout.supplier === "ایدلوب") {
      // Sparse-page OCR drops the short 0w20/5w40 lines at browser PDF scales.
      // Read each bounded SAE cell as one word; the grey merged area is ignored.
      const mid = (left + right) / 2;
      const cuts = layout.lines.horizontal.filter((line) => line.left < mid && line.right > mid
        && line.y <= headerBottom + 2 && line.y >= bottom - 2)
        .map((line) => line.y).sort((a, b) => b - a)
        .filter((y, index, values) => index === 0 || values[index - 1] - y > 4);
      const gradeItems = [];
      await worker.setParameters({ tessedit_pageseg_mode: "8" });
      for (let i = 0; i < cuts.length - 1; i += 1) {
        check();
        const height = cuts[i] - cuts[i + 1];
        if (height < 12 || height > canvas.height * 0.08) continue;
        const cell = { x: left, y: canvas.height - cuts[i] + 3, width: right - left, height: height - 6 };
        const row = await recognizeRegion(worker, canvas, cell, 3);
        const grade = normalizeText(row.text).replace(/[\s-]/g, "");
        if (!/^\d{1,2}w\d{2}$/.test(grade)) continue;
        await worker.setParameters({ tessedit_pageseg_mode: "13" });
        const second = await recognizeRegion(worker, canvas, cell, 3);
        await worker.setParameters({ tessedit_pageseg_mode: "8" });
        if (normalizeText(second.text).replace(/[\s-]/g, "") === grade) gradeItems.push({ str: grade, width: 10, height: 6,
          transform: [1, 0, 0, 1, mid - 5, (cuts[i] + cuts[i + 1]) / 2 - 2.4] });
      }
      recognized = { items: gradeItems };
      await worker.setParameters({ tessedit_pageseg_mode: "11" });
    }
    items = items.filter((item) => item.transform[4] + item.width / 2 < left || item.transform[4] + item.width / 2 > right);
    items.push(...recognized.items);
  }
  {
    const nameColumn = layout.supplier === "ایدلوب" ? 4 : 5;
    await worker.setParameters({ tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789- " });
    const name = await recognizeRegion(worker, canvas, { x: vertical[nameColumn].x + 3, y: canvas.height - headerBottom + 3,
      width: vertical[nameColumn + 1].x - vertical[nameColumn].x - 6, height: headerBottom - Math.max(vertical[nameColumn].bottom, vertical[nameColumn + 1].bottom) - 6 });
    items.push(...name.items);
  }
  await worker.reinitialize(["fas", "eng"]);
  await worker.setParameters({ tessedit_pageseg_mode: "6", tessedit_char_whitelist: "0123456789۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩,٬،." });
  const left = vertical[0].x + 3, right = vertical[1].x - 3, mid = (left + right) / 2;
  const bottom = Math.max(vertical[0].bottom, vertical[1].bottom);
  const column = await recognizeRegion(worker, canvas, { x: left, y: canvas.height - headerBottom + 3,
    width: right - left, height: headerBottom - bottom - 6 });
  const cuts = layout.lines.horizontal.filter((line) => line.left < mid && line.right > mid && line.y <= headerBottom + 2 && line.y >= bottom - 2)
    .map((line) => line.y).sort((a, b) => b - a).filter((y, index, values) => index === 0 || values[index - 1] - y > 4);
  const prices = [], verified = new Map(), extraItems = [];
  await worker.setParameters({ tessedit_pageseg_mode: "7" });
  for (let i = 0; i < cuts.length - 1; i += 1) {
    check();
    const top = cuts[i], low = cuts[i + 1];
    if (top - low < 12) continue;
    onProgress(`خواندن و کنترل مبلغ ردیف ${i + 1}…`);
    const region = { x: left, y: canvas.height - top + 3, width: right - left, height: top - low - 6 };
    const read = await recognizeRegion(worker, canvas, region);
    const pixels = layout.supplier === "ایدلوب" ? readPersianPricePixels(canvas.getContext("2d").getImageData(
      Math.round(region.x), Math.round(region.y), Math.floor(region.width), Math.floor(region.height)), top - low) : null;
    const amount = pixels?.amount || cleanOcrAmount(read.text);
    if (amount === null) continue;
    const columnItems = column.items.filter((item) => {
      const y = item.transform[5] + item.height * 0.4;
      return y > low && y < top;
    }).sort((a, b) => a.transform[4] - b.transform[4]);
    const first = cleanOcrAmount(columnItems.map((item) => item.str).join(""));
    let agreed = pixels?.confidence >= 0.9 || (first !== null && parseAmount(first) === parseAmount(amount)
      && read.confidence >= 85 && columnItems.every((item) => item.confidence >= 80));
    if (!agreed) {
      await worker.setParameters({ tessedit_pageseg_mode: "13" });
      const second = await recognizeRegion(worker, canvas, region, 3);
      const secondAmount = cleanOcrAmount(second.text);
      agreed = secondAmount !== null && parseAmount(secondAmount) === parseAmount(amount)
        && second.confidence >= 90 && read.confidence >= 90;
      await worker.setParameters({ tessedit_pageseg_mode: "7" });
    }
    const y = (top + low) / 2;
    prices.push({ str: amount, width: 10, height: 6, confidence: read.confidence,
      transform: [1, 0, 0, 1, mid - 5, y - 2.4] });
    verified.set(Math.round(y), agreed);
    const volumeColumn = layout.supplier === "وم اویل" ? 1 : 3;
    const vl = vertical[volumeColumn].x + 3, vr = vertical[volumeColumn + 1].x - 3;
    const volumeRegion = { x: vl, y: region.y, width: vr - vl, height: region.height };
    await worker.setParameters({ tessedit_char_whitelist: "0123456789۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩.CcMLml" });
    const volumeRead = await recognizeRegion(worker, canvas, volumeRegion, 3);
    let volume = latinDigits(volumeRead.text).replace(/\s/g, "").replace(/[^\d.CcMLml]/g, "");
    if (layout.supplier === "ایدلوب") {
      const candidates = new Set();
      for (const fraction of [0.4, 0.43, 0.47, 0.5, 0.53, 0.56]) {
        const digitLeft = Math.round(vr - (vr - vl) * fraction);
        const digit = readPersianPricePixels(canvas.getContext("2d").getImageData(digitLeft, Math.round(region.y), Math.floor(vr - digitLeft), Math.floor(region.height)), top - low, { ignoreClipped: true });
        if (digit && /^\d{1,2}$/.test(digit.amount) && Number(digit.amount) > 0) candidates.add(digit.amount);
      }
      if (candidates.size === 1) volume = [...candidates][0];
    }
    if (volume && /\d/.test(volume)) extraItems.push({ str: volume, width: 8, height: 6,
      transform: [1, 0, 0, 1, (vl + vr) / 2 - 4, y - 2.4] });
    await worker.setParameters({ tessedit_char_whitelist: "0123456789۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩,٬،." });
  }
  items = items.filter((item) => item.transform[4] + item.width / 2 <= vertical[0].x || item.transform[4] + item.width / 2 >= vertical[1].x);
  const volumeColumn = layout.supplier === "وم اویل" ? 1 : 3;
  items = items.filter((item) => item.transform[4] + item.width / 2 <= vertical[volumeColumn].x || item.transform[4] + item.width / 2 >= vertical[volumeColumn + 1].x);
  const table = imageTableFromItems(layout, [...items, ...prices, ...extraItems]);
  if (!table) return null;
  for (const row of table.rows) {
    row.verifiedPrice = verified.get(Math.round((row.priceBounds.top + row.priceBounds.bottom) / 2)) === true;
    if (row.api && row.viscosity) {
      if (/jaso|سیکل/i.test(row.name)) row.name += " روغن موتورسیکلت";
      else if (layout.supplier === "ایدلوب" || /بنزین|دیزل/.test(row.name)) row.name += " روغن موتور";
      else if (layout.supplier === "وم اویل" && !/gl[45]/i.test(row.api)) row.verifiedPrice = false;
    }
  }
  table.unreadable = Math.max(0, cuts.length - 1 - table.rows.length);
  return table;
}
