import { describe, expect, it } from "vitest";

import buildPromotionGroups from "../buildPromotionGroups";

const promotion = { isActive: true, buyQty: 4, giftQtyCash: 1, giftQtyCheck: 1 };

const product = (id, brand, activePromotion = promotion) => ({
  id,
  brand,
  promotion: activePromotion,
});

const CONFIG = [
  { id: "seman", brands: ["سمن شیمی", "پترولکس"], images: [] },
  { id: "lookini", brands: ["لوکینی"], images: [] },
  { id: "bundles", brands: [], images: [{ src: "a.webp" }] },
];

describe("buildPromotionGroups", () => {
  it("puts both brands of a group in one card", () => {
    const [group] = buildPromotionGroups(
      [product("1", "سمن شیمی"), product("2", "پترولکس")],
      CONFIG,
    );

    expect(group.id).toBe("seman");
    expect(group.products.map((item) => item.id)).toEqual(["1", "2"]);
  });

  it("ignores products without an active promotion", () => {
    const groups = buildPromotionGroups(
      [product("1", "لوکینی", { isActive: false, buyQty: 4 })],
      CONFIG,
    );

    expect(groups.map((group) => group.id)).toEqual(["bundles"]);
  });

  it("gives an unconfigured brand its own card before the bundles", () => {
    const groups = buildPromotionGroups(
      [product("1", "وم اویل"), product("2", "لوکینی")],
      CONFIG,
    );

    expect(groups.map((group) => group.id)).toEqual(["lookini", "وم اویل", "bundles"]);
  });

  it("adds listed skus to a group without a promotion", () => {
    const groups = buildPromotionGroups(
      [{ id: "1", sku: "BT-BUNDLE-1", brand: "بهتام" }],
      [{ id: "bundles", brands: [], skus: ["BT-BUNDLE-1"], images: [] }],
    );

    expect(groups).toHaveLength(1);
    expect(groups[0].products.map((item) => item.id)).toEqual(["1"]);
  });

  it("drops groups with no products and no images", () => {
    expect(buildPromotionGroups([], CONFIG).map((group) => group.id)).toEqual(["bundles"]);
  });
});
