import templates from "../data/priceDigitTemplates.js";
import { parseAmount } from "./priceListHelpers.js";

// Glyph samples contain only numeral shapes, never a list of supplier prices.
// They cover the Persian numeral font used in the supplied Aidlube template.
export function readPersianPricePixels({ data, width, height }, rowHeight, { ignoreClipped = false, onUnclear,
  glyphTemplates = templates, threshold = 160, clipMargin = 0 } = {}) {
  const mask = new Uint8Array(width * height), visited = new Uint8Array(width * height), components = [];
  for (let i = 0; i < mask.length; i += 1) mask[i] = Math.max(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]) < threshold ? 1 : 0;
  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index] || visited[index]) continue;
    const queue = [index], pixels = [];
    visited[index] = 1;
    let left = width, right = 0, top = height, bottom = 0;
    for (let i = 0; i < queue.length; i += 1) {
      const p = queue[i], x = p % width, y = Math.floor(p / width);
      pixels.push(p); left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
      for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) {
        const nx = x + dx, ny = y + dy, next = ny * width + nx;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && mask[next] && !visited[next]) { visited[next] = 1; queue.push(next); }
      }
    }
    if (pixels.length >= 2) components.push({ left, right, top, bottom, pixels: new Set(pixels) });
  }
  let value = "", minimum = 1;
  for (const part of components.sort((a, b) => a.left - b.left)) {
    if (ignoreClipped && (part.left <= clipMargin || part.right >= width - 1 - clipMargin)) continue;
    const w = part.right - part.left + 1, h = part.bottom - part.top + 1;
    if (h > height * 0.85 || w > width * 0.3) return null;
    const bitmap = [];
    for (let y = 0; y < 24; y += 1) for (let x = 0; x < 16; x += 1) {
      bitmap.push(part.pixels.has((part.top + Math.min(h - 1, Math.floor((y + 0.5) * h / 24))) * width
        + part.left + Math.min(w - 1, Math.floor((x + 0.5) * w / 16))) ? 1 : 0);
    }
    const ranked = Object.entries(glyphTemplates).map(([digit, variants]) => ({ digit, score: Math.max(...variants.map((sample) => {
      let intersection = 0, total = 0;
      for (let n = 0; n < bitmap.length; n += 1) {
        const b = sample.bitmap[n] === "1" ? 1 : 0;
        intersection += bitmap[n] && b ? 1 : 0; total += bitmap[n] + b;
      }
      const shape = total ? 2 * intersection / total : 0;
      const aspect = Math.min(w / h, sample.aspect) / Math.max(w / h, sample.aspect);
      const relativeHeight = Math.min(h / rowHeight, sample.heightRatio) / Math.max(h / rowHeight, sample.heightRatio);
      return shape * 0.7 + aspect * 0.2 + relativeHeight * 0.1;
    })) })).sort((a, b) => b.score - a.score);
    if (!ranked.length || ranked[0].score < 0.88 || ranked[0].score - ranked[1].score < 0.065) {
      onUnclear?.({ value, ranked: ranked.slice(0, 3), bounds: { left: part.left, right: part.right, top: part.top, bottom: part.bottom } });
      return null;
    }
    minimum = Math.min(minimum, ranked[0].score);
    value += ranked[0].digit;
  }
  return parseAmount(value) === null ? null : { amount: value, confidence: minimum };
}
