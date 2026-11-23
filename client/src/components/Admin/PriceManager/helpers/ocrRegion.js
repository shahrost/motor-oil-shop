import { latinDigits, parseAmount } from "./priceListHelpers.js";

export function cleanOcrAmount(text) {
  const normalized = latinDigits(text).trim().replace(/\s+/g, "").replace(/[٬،]/g, ",");
  // A tiny Persian zero may look like a dot; do not turn punctuation into a price.
  return parseAmount(normalized) === null ? null : normalized;
}

export function ocrItems(words, height, offset = { x: 0, y: 0 }) {
  return words.map((word) => ({ str: word.text, width: word.bbox.x1 - word.bbox.x0,
    height: word.bbox.y1 - word.bbox.y0, confidence: word.confidence,
    transform: [1, 0, 0, 1, word.bbox.x0 + offset.x, height - word.bbox.y1 - offset.y] }));
}

export function recognizedWords(data) {
  if (data.words?.length) return data.words;
  return (data.blocks || []).flatMap((block) => block.paragraphs || [])
    .flatMap((paragraph) => paragraph.lines || []).flatMap((line) => line.words || []);
}

export async function recognizeRegion(worker, canvas, rectangle, scale = 2) {
  const crop = document.createElement("canvas");
  crop.width = Math.ceil(rectangle.width * scale); crop.height = Math.ceil(rectangle.height * scale);
  const ctx = crop.getContext("2d");
  ctx.fillStyle = "white"; ctx.fillRect(0, 0, crop.width, crop.height);
  ctx.drawImage(canvas, rectangle.x, rectangle.y, rectangle.width, rectangle.height, 0, 0, crop.width, crop.height);
  try {
    const { data } = await worker.recognize(crop, {}, { text: true, blocks: true });
    const words = recognizedWords(data).map((word) => ({ ...word, bbox: {
      x0: word.bbox.x0 / scale, x1: word.bbox.x1 / scale,
      y0: word.bbox.y0 / scale, y1: word.bbox.y1 / scale,
    } }));
    return { text: data.text, confidence: data.confidence, items: ocrItems(words, canvas.height, rectangle) };
  } finally { crop.width = crop.height = 0; }
}
