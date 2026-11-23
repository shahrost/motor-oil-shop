import { describe, expect, it } from "vitest";
import { extractAmounts, needsPdfOcr, parseAmount, pdfTextLines, priceInToman, rowsFromPages, suggestProduct } from "../../components/Admin/PriceManager/helpers/priceListHelpers";

const products = [
  { id: "a", sku: "WOM-001", name: "روغن موتور", brand: "WOM", viscosity: "0W20", api: "SN", volume: "5 لیتر", price: 900000, cartonCount: 4 },
  { id: "b", sku: "WOM-002", name: "روغن موتور", brand: "WOM", viscosity: "10W40", api: "SL", volume: "4 لیتر", price: 700000, cartonCount: 6 },
];

describe("mobile price list review", () => {
  it("accepts Persian and Arabic numbers but rejects empty, malformed, negative and exponential prices", () => {
    expect(parseAmount("۱۲٬۵۰۰٬۰۰۰")).toBe(12500000);
    expect(parseAmount("١٢,٥٠٠,٠٠٠")).toBe(12500000);
    for (const value of ["", " ", "-100", "1e6", "12,50", "100 تومان", "Infinity"]) expect(parseAmount(value)).toBeNull();
  });
  it("converts rial/carton to toman/item and rejects unknown settings and carton sizes", () => {
    expect(priceInToman("۴۸٬۰۰۰٬۰۰۰", "rial", "carton", 4)).toBe(1200000);
    expect(priceInToman("۱۲۵۰۰۰۰", "toman", "item", 0)).toBe(1250000);
    expect(priceInToman("0", "rial", "item", 1)).toBe(0);
    expect(priceInToman("۱۰۰٬۰۰۱", "rial", "carton", 4)).toBe(2500);
    for (const count of [0, -1, 1.5, undefined]) expect(priceInToman("1000", "rial", "carton", count)).toBeNull();
    expect(priceInToman("1000", "", "item", 1)).toBeNull();
    expect(priceInToman("1000", "toman", "", 1)).toBeNull();
  });
  it("keeps multiple price columns separate and excludes viscosity, dates, SKUs and percentages", () => {
    expect(extractAmounts("WOM-1234 SN 0W20 5 لیتر 4 عدد ۱۴۰۵/۰۸/۱۰ ۱۲٬۵۰۰٬۰۰۰ ۱۳٬۰۰۰٬۰۰۰ 1000%"))
      .toEqual(["12٬500٬000", "13٬000٬000"]);
    expect(extractAmounts("SN 0W20 5 لیتر 0")).toEqual(["0"]);
  });
  it("does not infer a product when the match is ambiguous or has a different viscosity", () => {
    expect(suggestProduct("WOM-001 12500000", products)?.id).toBe("a");
    expect(suggestProduct("SN روغن موتور 10W40 12500000", [products[0]])).toBeNull();
    expect(suggestProduct("SN 0W20 روغن موتور", [products[0], { ...products[0], id: "c", sku: "OTHER" }])).toBeNull();
  });
  it("never auto-selects OCR rows, never treats a blank price column as zero", () => {
    const rows = rowsFromPages([{ page: 1, text: "WOM-001 12500000 13000000\nWOM-002 0" }], products);
    expect(rows).toHaveLength(2);
    expect(rows[0].amount).toBe("");
    expect(rows[0].baseline.price).toBe(900000);
    expect(rows[1].amount).toBe("0");
    expect(rows.every((row) => row.selected === false)).toBe(true);
  });
  it("groups table cells by visual row regardless of PDF stream order", () => {
    const item = (str, x, y) => ({ str, height: 10, transform: [1, 0, 0, 1, x, y] });
    expect(pdfTextLines([item("second", 80, 20), item("12500000", 10, 80), item("first", 80, 81), item("0", 10, 20)]))
      .toBe("12500000   first\n0   second");
  });
  it("uses OCR for unreadable PDFs and preserves exact prices in tables with merged product-name cells", () => {
    expect(needsPdfOcr("12500000 4 5 1\n0 4 5 18")).toBe(true);
    expect(needsPdfOcr("لیست شرکت\n12500000 4 5 1\n0 4 5 18")).toBe(false);
    expect(needsPdfOcr("SN 0W20 12500000\nSL 10W40 13000000")).toBe(false);
  });
  it("keeps OCR descenders on the same row as product names", () => {
    const item = (str, x, y, height) => ({ str, height, transform: [1, 0, 0, 1, x, y] });
    expect(pdfTextLines([item("WOM-001", 70, -147, 48), item("12,500,000", 788, -152.5, 57)], { maxTolerance: 20 }))
      .toBe("WOM-001   12,500,000");
  });
});
