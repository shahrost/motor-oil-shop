import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const reader = vi.hoisted(() => ({
  textTable: vi.fn(), imageTable: vi.fn(), createWorker: vi.fn(), getDocument: vi.fn(),
}));
vi.mock("virtual:price-reader-assets", () => ({ ocrBase: "/ocr", pdfBase: "/pdf" }));
vi.mock("pdfjs-dist", () => ({ GlobalWorkerOptions: {}, OPS: {}, getDocument: reader.getDocument }));
vi.mock("tesseract.js", () => ({ createWorker: reader.createWorker }));
vi.mock("../../components/Admin/PriceManager/helpers/preparePriceImage", () => ({
  preparePriceImage: (canvas) => ({ ...canvas }), rotatePriceCanvas: (canvas) => ({ ...canvas }),
  lightPriceCanvas: (canvas) => canvas,
}));
vi.mock("../../components/Admin/PriceManager/helpers/pdfPriceTable", () => ({ readPdfPriceTable: reader.textTable }));
vi.mock("../../components/Admin/PriceManager/helpers/imagePriceTable", () => ({
  readImagePriceTable: reader.imageTable,
}));
vi.mock("../../components/Admin/PriceManager/helpers/ocrRegion", () => ({ recognizedWords: () => [] }));
vi.mock("../../components/Admin/PriceManager/helpers/imageTableGeometry", () => ({
  priceTextCanvas: (canvas) => ({ ...canvas }),
}));

import { readPriceFile } from "../../components/Admin/PriceManager/helpers/readPriceFile";
import { automaticPricePlan } from "../../components/Admin/PriceManager/helpers/automaticPricePlan";

const product = { id: "a", brand: "ایدلوب", name: "روغن موتور", volume: "4L",
  api: "SN", viscosity: "5W-40", price: 900000, priceCheck: 1000000 };
const row = { supplier: "ایدلوب", name: "روغن موتور", volume: "4", api: "sn",
  viscosity: "5w40", specs: "SN 5W40", amount: "11000000", source: "AIDLUBE SN 5W40 4L" };
const table = (entry = row) => ({ supplier: "ایدلوب", unit: "rial", basis: "item", rows: [entry] });
const file = { name: "aidlube.pdf", type: "application/pdf", size: 100, arrayBuffer: async () => new ArrayBuffer(100) };
let worker, destroy, page;

beforeEach(() => {
  vi.resetAllMocks();
  worker = { reinitialize: vi.fn(), setParameters: vi.fn(),
    recognize: vi.fn().mockResolvedValue({ data: { text: "AIDLUBE 11000000" } }),
    terminate: vi.fn().mockResolvedValue() };
  destroy = vi.fn().mockResolvedValue();
  page = {
    getViewport: () => ({ width: 600, height: 800 }),
    render: () => ({ promise: Promise.resolve() }), cleanup: vi.fn(),
    getTextContent: async () => ({ items: [{ str: "AIDLUBE 11000000", width: 100,
      height: 10, transform: [1, 0, 0, 1, 0, 100] }] }),
    getOperatorList: async () => ({ fnArray: [], argsArray: [] }),
  };
  reader.getDocument.mockReturnValue({ promise: Promise.resolve({ numPages: 1, getPage: async () => page }), destroy });
  reader.createWorker.mockResolvedValue(worker);
  reader.textTable.mockReturnValue(null);
  reader.imageTable.mockResolvedValue(table({ ...row, verifiedPrice: true }));
  vi.stubGlobal("document", { createElement: () => ({
    getContext: () => ({ drawImage: vi.fn() }), toBlob: (callback) => callback(new Blob(["preview"])),
  }) });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, headers: new Headers(),
    arrayBuffer: async () => new ArrayBuffer(10001) }));
});

afterEach(() => vi.unstubAllGlobals());

describe("PDF table fallback for automatic prices", () => {
  it("reads images when readable PDF text has no recognized table, and plans verified prices", async () => {
    const pages = await readPriceFile(file);
    expect(reader.imageTable).toHaveBeenCalledOnce();
    expect(pages[0].image).toBe(true);
    expect(automaticPricePlan(pages, [product], 5).changes[0]).toMatchObject({
      id: "a", price: 1045000, priceCheck: 1100000,
    });
    expect(worker.terminate).toHaveBeenCalledOnce();
    expect(destroy).toHaveBeenCalledOnce();
    pages.forEach((page) => URL.revokeObjectURL(page.preview));
  });

  it("uses exact PDF table prices without starting OCR", async () => {
    reader.textTable.mockReturnValue(table());
    const pages = await readPriceFile(file);
    expect(reader.createWorker).not.toHaveBeenCalled();
    expect(pages[0].image).toBe(false);
    expect(automaticPricePlan(pages, [product], 5).changes).toHaveLength(1);
    pages.forEach((page) => URL.revokeObjectURL(page.preview));
  });

  it("keeps a valid PDF table when unrelated text contains a replacement glyph", async () => {
    page.getTextContent = async () => ({ items: [{ str: "AIDLUBE 11000000 �", width: 100,
      height: 10, transform: [1, 0, 0, 1, 0, 100] }] });
    reader.textTable.mockReturnValue(table());
    const pages = await readPriceFile(file);
    expect(reader.createWorker).not.toHaveBeenCalled();
    expect(pages[0].image).toBe(false);
    expect(automaticPricePlan(pages, [product], 5).changes).toHaveLength(1);
    pages.forEach((page) => URL.revokeObjectURL(page.preview));
  });

  it("never plans an unverified image price or an unrecognized image table", async () => {
    for (const result of [table(), null]) {
      reader.imageTable.mockResolvedValue(result);
      const pages = await readPriceFile(file);
      const plan = automaticPricePlan(pages, [product], 5);
      expect(plan.changes).toEqual([]);
      expect(plan.skipped).toHaveLength(1);
      pages.forEach((page) => URL.revokeObjectURL(page.preview));
    }
  });
});
