import { detectPriceSupplier } from "./pdfPriceTable.js";
import { normalizeText } from "./priceListHelpers.js";
import { priceHeaderRole } from "./coordinatePriceTable.js";
import supplierLayouts from "../data/supplierPriceLayouts.js";

function mergeSegments(segments, axis) {
  const groups = [];
  for (const line of segments.sort((a, b) => a[axis] - b[axis])) {
    const last = groups.find((group) => Math.abs(group[axis] - line[axis]) <= 3
      && Math.min(group.end, line.end) - Math.max(group.start, line.start) > 0);
    if (last && Math.abs(last[axis] - line[axis]) <= 3 && Math.min(last.end, line.end) - Math.max(last.start, line.start) > 0) {
      last[axis] = (last[axis] * last.count + line[axis]) / (last.count + 1);
      last.start = Math.min(last.start, line.start); last.end = Math.max(last.end, line.end); last.count += 1;
    } else groups.push({ ...line, count: 1 });
  }
  return groups;
}

export function imageTableLines({ data, width, height }) {
  const dark = new Uint8Array(width * height);
  for (let p = 0; p < dark.length; p += 1) dark[p] = data[p * 4] < 110 && data[p * 4 + 1] < 110 && data[p * 4 + 2] < 110 ? 1 : 0;
  const horizontal = [], vertical = [];
  function scan(length, minimum, pixel, add) {
    let start = -1, last = -1;
    for (let n = 0; n <= length + 2; n += 1) {
      if (n < length && pixel(n)) { if (start < 0) start = n; last = n; }
      else if (start >= 0 && n - last > 2) {
        if (last - start >= minimum) add(start, last);
        start = -1;
      }
    }
  }
  for (let y = 0; y < height; y += 1) scan(width, Math.max(35, width * 0.055), (x) => dark[y * width + x], (start, end) => horizontal.push({ y, start, end }));
  for (let x = 0; x < width; x += 1) scan(height, Math.max(60, height * 0.12), (y) => dark[y * width + x], (start, end) => vertical.push({ x, start, end }));
  return {
    horizontal: mergeSegments(horizontal, "y").map((line) => ({ left: line.start, right: line.end, y: height - line.y })),
    vertical: mergeSegments(vertical, "x").map((line) => ({ bottom: height - line.end, top: height - line.start, x: line.x })),
  };
}

export function priceTextCanvas(source) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width; canvas.height = source.height;
  const context = canvas.getContext("2d");
  context.drawImage(source, 0, 0);
  const lines = imageTableLines(context.getImageData(0, 0, canvas.width, canvas.height));
  context.strokeStyle = "white"; context.lineWidth = Math.max(4, canvas.width / 350);
  for (const line of lines.horizontal) {
    context.beginPath(); context.moveTo(line.left, canvas.height - line.y); context.lineTo(line.right, canvas.height - line.y); context.stroke();
  }
  for (const line of lines.vertical) {
    context.beginPath(); context.moveTo(line.x, canvas.height - line.top); context.lineTo(line.x, canvas.height - line.bottom); context.stroke();
  }
  return canvas;
}

export function imageTableLayout(canvas, words) {
  const text = words.map((word) => word.text).join(" ");
  const supplier = detectPriceSupplier(text);
  if (!["وم اویل", "ایدلوب"].includes(supplier)) return null;
  const lines = imageTableLines(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height));
  const count = supplier === "وم اویل" ? 8 : 6;
  const vertical = lines.vertical.filter((line) => line.top - line.bottom > canvas.height * 0.4).sort((a, b) => a.x - b.x);
  if (vertical.length !== count) return null;
  const top = Math.min(vertical[0].top, vertical[1].top);
  const headerBottom = Math.max(...lines.horizontal.filter((line) => line.left < (vertical[0].x + vertical[1].x) / 2
    && line.right > (vertical[0].x + vertical[1].x) / 2 && line.y < top - 4).map((line) => line.y));
  if (!Number.isFinite(headerBottom)) return null;
  const roles = supplier === "وم اویل"
    ? ["قیمت ریال", "لیتراژ", "تعداد در کارتن", "مشخصات فنی", "مشخصات فنی", "نام محصول", "ردیف"]
    : ["قیمت ریال", "SAE", "API", "لیتراژ", "نام محصول"];
  const headers = roles.map((str, i) => ({ str, width: 10, height: 5,
    transform: [1, 0, 0, 1, (vertical[i].x + vertical[i + 1].x) / 2 - 5, (top + headerBottom) / 2] }));
  return { supplier, lines, vertical, top, headerBottom, headers,
    unit: /تومان/.test(normalizeText(text)) ? "toman" : "rial" };
}

// Supplied layouts recover headings that OCR loses in a small phone photo.
// Both the brand and every column proportion must agree before a profile is used.
export function suppliedImageHeaders(canvas, words, lines, brands) {
  const supplier = detectPriceSupplier(words.filter((word) => word.bbox.y0 < canvas.height * 0.25).map((word) => word.text).join(" "), brands)
    || detectPriceSupplier(words.map((word) => word.text).join(" "), brands);
  const profile = supplierLayouts[supplier];
  if (!profile?.some((column) => priceHeaderRole(column.header) === "price")) return null;
  const candidates = [];
  for (const line of lines.vertical.filter((line) => line.top - line.bottom > 40)) {
    const edges = lines.vertical.filter((other) => other.top >= line.top - 5 && other.bottom < line.top - 40)
      .sort((a, b) => a.x - b.x).filter((other, i, values) => !i || other.x - values[i - 1].x > 4);
    if (edges.length !== profile.length + 1) continue;
    const width = edges.at(-1).x - edges[0].x;
    if (profile.some((column, i) => Math.abs((edges[i + 1].x - edges[i].x) / width - column.ratio) > 0.025)) continue;
    if (candidates.some((candidate) => Math.abs(candidate.top - line.top) < 5)) continue;
    candidates.push({ edges, top: line.top });
  }
  if (!candidates.length) return null;
  const { edges, top } = candidates.sort((a, b) => b.top - a.top)[0];
  const price = profile.findIndex((column) => priceHeaderRole(column.header) === "price");
  const x = (edges[price].x + edges[price + 1].x) / 2;
  const bottom = Math.max(...lines.horizontal.filter((line) => line.left < x && line.right > x && line.y < top - 5).map((line) => line.y));
  if (!Number.isFinite(bottom)) return null;
  return { supplier, bottom, headers: profile.map((column, i) => ({ str: column.header, width: 8, height: 6,
    transform: [1, 0, 0, 1, (edges[i].x + edges[i + 1].x) / 2 - 4, (top + bottom) / 2 - 2.4] })) };
}
