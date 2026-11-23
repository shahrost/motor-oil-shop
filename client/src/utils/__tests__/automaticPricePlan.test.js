import { describe, expect, it } from "vitest";
import { automaticPricePlan as buildPlan } from "../../components/Admin/PriceManager/helpers/automaticPricePlan";
import { getProductPrice } from "../productPrice";

const automaticPricePlan = (pages, products, percent = 5) => buildPlan(pages, products, percent);

const product = { id: "a", sku: "WOM-PET-002", brand: "وم اویل", name: "روغن موتور", volume: "5L", api: "SN", viscosity: "5W-40", price: 10000000, priceCheck: 11000000 };
const row = { supplier: "وم اویل", name: "روغن موتور بنزینی", volume: "5", api: "sn", viscosity: "5w40", specs: "SN 5W40", source: "SN 5W40 5L", amount: "111,400,000" };
const pages = (entry = row, extra = {}) => [{ page: 1, table: { supplier: entry.supplier, unit: "rial", basis: "item", rows: [entry] }, ...extra }];

describe("upload-only automatic price plan", () => {
  it("applies the chosen cash discount to the source list and preserves both expected prices", () => {
    const plan = automaticPricePlan(pages(), [product]);
    expect(plan.changes).toHaveLength(1);
    expect(plan.changes[0]).toMatchObject({ id: "a", price: 10583000, priceCheck: 11140000, expectedPrice: 10000000, expectedPriceCheck: 11000000 });
  });
  it("applies the chosen discount for Aidlube too and supports explicit supplier zeroes", () => {
    const entry = { ...row, supplier: "ایدلوب" };
    const p = { ...product, brand: "ایدلوب" };
    expect(automaticPricePlan(pages(entry), [p], 10).changes[0]).toMatchObject({ price: 10026000, priceCheck: 11140000 });
    expect(automaticPricePlan(pages({ ...row, amount: "0" }), [product]).changes[0]).toMatchObject({ price: 0, priceCheck: 0 });
  });
  it("does not auto-save fuzzy/unknown layouts, unverified image prices, duplicate products or held products", () => {
    expect(automaticPricePlan([{ page: 1, text: "WOM-PET-002 111400000" }], [product]).changes).toEqual([]);
    expect(automaticPricePlan(pages(row, { image: true }), [product]).changes).toEqual([]);
    expect(automaticPricePlan(pages(), [product, { ...product, id: "b" }]).changes).toEqual([]);
    expect(automaticPricePlan(pages({ ...row, supplier: "ایدلوب" }), [{ ...product, brand: "ایدلوب", sku: "AL-ENG-011-20L" }]).changes).toEqual([]);
  });
  it("skips unchanged prices and rejects conflicting rows for the same product", () => {
    expect(automaticPricePlan(pages(), [{ ...product, price: 10583000, priceCheck: 11140000 }]).unchanged).toHaveLength(1);
    const input = pages(); input[0].table.rows.push({ ...row, amount: "115000000" });
    const plan = automaticPricePlan(input, [product]);
    expect(plan.changes).toEqual([]); expect(plan.skipped).toHaveLength(1);
  });
  it("requires two-read verified image prices and rejects implausible OCR jumps", () => {
    expect(automaticPricePlan(pages({ ...row, verifiedPrice: true }, { image: true }), [product]).changes).toHaveLength(1);
    expect(automaticPricePlan(pages({ ...row, verifiedPrice: true, amount: "1114000000" }, { image: true }), [product]).changes).toEqual([]);
  });
  it("accepts both limits and every whole percentage between them for cash only", () => {
    for (let percent = 1; percent <= 90; percent++) {
      const plan = automaticPricePlan(pages(), [product], percent);
      const saved = plan.changes[0];
      expect(getProductPrice(saved, "cash")).toBe(Math.round(11140000 * (100 - percent) / 100));
      expect(getProductPrice(saved, "check")).toBe(11140000);
      expect(plan.cashDiscountPercent).toBe(percent);
    }
  });
  it("rejects missing, fractional or out-of-range percentages before planning updates", () => {
    for (const percent of [undefined, null, "5", "", 0, -1, 91, 5.5, NaN, Infinity]) {
      expect(() => buildPlan(pages(), [product], percent)).toThrow("۱ تا ۹۰");
    }
  });
  it("never compounds discounts on a repeated upload and recalculates a changed percentage from the list", () => {
    const [first] = automaticPricePlan(pages(), [product], 90).changes;
    const saved = { ...product, price: first.price, priceCheck: first.priceCheck };
    expect(automaticPricePlan(pages(), [saved], 90).changes).toHaveLength(0);
    expect(automaticPricePlan(pages(), [saved], 1).changes[0]).toMatchObject({ price: 11028600, priceCheck: 11140000 });
    const fractional = automaticPricePlan(pages({ ...row, amount: "123450" }), [product], 7).changes[0];
    expect(fractional.price).toBe(11481);
  });
});
