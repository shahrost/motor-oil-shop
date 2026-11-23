import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import useBrandRows from "../../components/common/ProductRows/hooks/useBrandRows";

vi.mock("../../data/brands", () => ({
  default: [{ name: "first" }, { name: "second" }, { name: "empty" }],
}));

function readRows(products) {
  let rows;
  function Probe() {
    rows = useBrandRows(products);
    return null;
  }
  renderToStaticMarkup(<Probe />);
  return rows;
}

describe("product ordering within existing brand rows", () => {
  it("keeps rows in place and moves inquiry products only to their own row's end", () => {
    const products = [
      { id: "second-inquiry", brand: "second", price: 0 },
      { id: "first-inquiry", brand: "first", price: null },
      { id: "first-paid", brand: "first", price: 100 },
      { id: "second-paid", brand: "second", price: 200 },
      { id: "first-check", brand: "first", price: 0, priceCheck: 300 },
      { id: "first-inquiry-2", brand: "first" },
    ];
    const original = structuredClone(products);
    const rows = readRows(products);
    expect(rows.map(({ brand }) => brand.name)).toEqual(["first", "second"]);
    expect(rows.map(({ items }) => items.map(({ id }) => id))).toEqual([
      ["first-paid", "first-check", "first-inquiry", "first-inquiry-2"],
      ["second-paid", "second-inquiry"],
    ]);
    expect(products).toEqual(original);
  });

  it("preserves existing order for rows whose products all require inquiry", () => {
    const products = [
      { id: "closed", brand: "first", price: 100, salesClosed: true },
      { id: "inactive", brand: "first", price: 200, isActive: false },
      { id: "unpriced", brand: "first", price: 0 },
    ];
    expect(readRows(products)[0].items).toEqual(products);
  });
});
