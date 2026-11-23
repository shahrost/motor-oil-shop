import { describe, expect, it } from "vitest";
import fixtures from "../../../test/fixtures/aidlube-price-cells.json";
import addinol from "../../../test/fixtures/addinol-price-cells.json";
import womDesigned from "../../../test/fixtures/wom-designed-price-cells.json";
import addinolGlyphs from "../../components/Admin/PriceManager/data/glyphs/addinol";
import womGlyphs from "../../components/Admin/PriceManager/data/glyphs/wom-oil";
import { readPersianPricePixels } from "../../components/Admin/PriceManager/helpers/priceDigitReader";

const glyphs = { ...addinolGlyphs, ...womGlyphs };

function pixels(cell) {
  const ink = Uint8Array.from(atob(cell.ink), (char) => char.charCodeAt(0));
  const data = new Uint8ClampedArray(cell.width * cell.height * 4).fill(255);
  for (let i = 0; i < cell.width * cell.height; i++) {
    if (ink[i >> 3] & (1 << (7 - i % 8))) data.fill(0, i * 4, i * 4 + 3);
  }
  return { width: cell.width, height: cell.height, data };
}

describe("Persian price glyphs rendered by PDF.js", () => {
  it("does not change the meaning of any accepted amount in a supplied dark price list", () => {
    let count = 0;
    for (const cell of womDesigned.cells) {
      const gray = Uint8Array.from(atob(cell.gray), (char) => char.charCodeAt(0));
      const data = new Uint8ClampedArray(gray.length * 4).fill(255);
      for (let p = 0; p < gray.length; p++) data.fill(gray[p], p * 4, p * 4 + 3);
      const result = readPersianPricePixels({ data, width: cell.width, height: cell.height }, cell.rowHeight, { glyphTemplates: glyphs["وم اویل:designed"] });
      if (result) { count++; expect(result.amount.replaceAll(",", "")).toBe(cell.amount); }
    }
    expect(count).toBeGreaterThanOrEqual(10);
  });
  it("reads supplier-font prices and never mistakes accepted JPEG digits for another amount", () => {
    let recognized = 0;
    for (const cell of addinol.cells) {
      const gray = Uint8Array.from(atob(cell.gray), (char) => char.charCodeAt(0));
      const data = new Uint8ClampedArray(gray.length * 4).fill(255);
      for (let p = 0; p < gray.length; p++) data.fill(gray[p], p * 4, p * 4 + 3);
      const result = readPersianPricePixels({ data, width: cell.width, height: cell.height }, cell.rowHeight, { glyphTemplates: glyphs["ادینول"] });
      if (cell.variant === "original") expect(result?.amount.replaceAll(",", "")).toBe(cell.amount);
      if (result) { recognized++; expect(result.amount.replaceAll(",", "")).toBe(cell.amount); }
    }
    expect(recognized).toBeGreaterThanOrEqual(16);
  });
  it("reads exact new-list amounts without losing zeroes or separators at browser scale", () => {
    for (const cell of fixtures.cells) {
      const result = readPersianPricePixels(pixels(cell), cell.rowHeight);
      expect(result?.amount).toBe(cell.amount);
      expect(result?.confidence).toBeGreaterThanOrEqual(0.9);
    }
  });

  it("rejects blank or damaged cells rather than inventing a price", () => {
    const cell = fixtures.cells[0], image = pixels(cell);
    expect(readPersianPricePixels({ ...image, data: new Uint8ClampedArray(image.data.length).fill(255) }, cell.rowHeight)).toBeNull();
    // A vertical scan artefact is not a price glyph.
    for (let y = 0; y < image.height; y++) image.data.fill(0, (y * image.width + 10) * 4, (y * image.width + 12) * 4);
    expect(readPersianPricePixels(image, cell.rowHeight)).toBeNull();
  });
});
