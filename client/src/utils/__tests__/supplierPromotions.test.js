import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { calcPromotionGiftDetails, getPromotionRuleLines } from "../promotionCalc";
import liveCartItems from "../liveCartItems";

const require = createRequire(import.meta.url);
const { getSupplierPromotion } = require("../../../../server/utils/supplierPromotion");
const server = require("../../../../server/utils/promotionGift");
const aid = (volume) => getSupplierPromotion({ brand: "ایدلوب", category: "روغن موتور", volume });
const wom = (volume, viscosity = "20W-50") => getSupplierPromotion({ brand: "وم اویل", category: "روغن موتور", volume, viscosity });
const gift = (promotion, quantity, payment = "check", unit = "carton") => calcPromotionGiftDetails(promotion, unit, quantity, payment);

describe("شرایط فروش ارسالی ایدلوب و وم اویل", () => {
  it.each([
    ["aid 1L", aid("1L"), [[1, 1, "number"], [3, 3, "number"], [4, 6, "number"], [5, 7, "number"], [7, 9, "number"], [8, 1, "carton"], [9, 1, "carton"], [16, 2, "carton"]]],
    ["aid 4L", aid("4L"), [[1, 0, "carton"], [2, 1, "number"], [4, 2, "number"], [7, 3, "number"], [8, 1, "carton"]]],
    ["aid 5L", aid("5L"), [[2, 1, "number"], [4, 2, "number"], [8, 1, "carton"]]],
    ["wom 1L", wom("1L"), [[1, 2, "number"], [4, 8, "number"], [5, 1, "carton"], [6, 1, "carton"], [10, 2, "carton"]]],
    ["wom 3.5L", wom("3.5L"), [[1, 1, "number"], [4, 4, "number"], [5, 1, "carton"]]],
    ["wom 4.5L", wom("4.5L"), [[2, 0, "carton"], [3, 2, "number"], [4, 2, "number"], [5, 1, "carton"]]],
    ["wom 5L 5W40", wom("5L", "5W-40"), [[2, 0, "carton"], [3, 2, "number"], [5, 2, "number"], [6, 1, "carton"], [12, 2, "carton"]]],
    ["wom 1L 10W40", wom("1L", "10W-40"), [[1, 2, "number"], [5, 10, "number"], [6, 1, "carton"]]],
  ])("%s: تعداد و واحد هدیه از جدول", (_name, promotion, cases) => {
    for (const [qty, giftQty, giftUnit] of cases) {
      for (const payment of ["cash", "check"]) {
        expect(gift(promotion, qty, payment)).toEqual({ giftQty, giftUnit });
        expect(server.calcPromotionGiftDetails(promotion, "carton", qty, payment)).toEqual(gift(promotion, qty, payment));
      }
    }
  });

  it("خرید عددی، تعداد نامعتبر و طرح غیرفعال در هر دو روش پرداخت هدیه ندارند", () => {
    for (const promotion of [aid("1L"), wom("1L")]) {
      for (const qty of [1, 4, 8, 24]) {
        for (const payment of ["cash", "check"]) {
          expect(gift(promotion, qty, payment, "number").giftQty).toBe(0);
          expect(gift({ ...promotion, isActive: false }, qty, payment).giftQty).toBe(0);
        }
      }
      for (const qty of [0, -1, 1.5, Infinity, "bad"]) expect(gift(promotion, qty).giftQty).toBe(0);
    }
  });

  it("فقط گروه‌های مندرج در فایل طرح می‌گیرند و موتورسیکلت وم حدنصاب ۶ دارد", () => {
    expect(getSupplierPromotion({ brand: "وم اویل", sku: "WOM-GEAR-001", name: "روغن دنده", volume: "1L" }).isActive).toBe(false);
    expect(getSupplierPromotion({ brand: "وم اویل", name: "روغن هیدرولیک" }).isActive).toBe(false);
    expect(getSupplierPromotion({ brand: "ایدلوب", sku: "AL-FUNC-002", name: "ضدیخ" }).isActive).toBe(false);
    expect(getSupplierPromotion({ brand: "ایدلوب", sku: "AL-FUNC-004", name: "کولانت موتورسیکلت", category: "کولانت" }).isActive).toBe(false);
    expect(getSupplierPromotion({ brand: "وم اویل", sku: "WOM-ATF-001", volume: "1L" }).buyQtyCheck).toBe(5);
    expect(getSupplierPromotion({ brand: "وم اویل", sku: "WOM-MOTO-003", volume: "1L", viscosity: "20W-50" }).buyQtyCheck).toBe(6);
    expect(getSupplierPromotion({ brand: "وم اویل", sku: "WOM-2T-001", volume: "1L" }).buyQtyCheck).toBe(6);
    expect(getSupplierPromotion({ brand: "پترولکس" })).toBeNull();
  });

  it("حجم و گرید فارسی و اعشاری قابل تطبیق‌اند؛ حجم ذکرنشده هدیه عددی ندارد", () => {
    const promo = getSupplierPromotion({ brand: "وم اویل", name: "روغن موتور", volume: "۳/۵ لیتری", viscosity: "۲۰W-۵۰" });
    expect(gift(promo, 1)).toEqual({ giftQty: 1, giftUnit: "number" });
    expect(gift(aid("800CC"), 4).giftQty).toBe(0);
    expect(gift(aid("800CC"), 8)).toEqual({ giftQty: 1, giftUnit: "carton" });
  });

  it("سبد قدیمی با طرح جدید به‌روز می‌شود و متن شرایط واحد عدد را نشان می‌دهد", () => {
    const promotion = aid("1L");
    const [item] = liveCartItems([{ id: "a", orderType: "carton", quantity: 4, paymentType: "check", promotion: { isActive: false } }], [{ id: "a", promotion }]);
    expect(gift(item.promotion, item.quantity)).toEqual({ giftQty: 6, giftUnit: "number" });
    const lines = getPromotionRuleLines(promotion, (key) => key);
    expect(lines.join(" ")).toContain("common.promotion.paymentTerms");
    expect(lines.join(" ")).toContain("6 common.orderUnit.number");
  });

  it("همه پله‌ها در مرورگر و سرور یکسان محاسبه می‌شوند", () => {
    for (const promotion of [aid("1L"), aid("4L"), wom("4.5L"), wom("5L", "5W-30")]) {
      for (let qty = 0; qty <= 32; qty++) {
        for (const payment of ["cash", "check"]) {
          expect(server.calcPromotionGiftDetails(promotion, "carton", qty, payment)).toEqual(gift(promotion, qty, payment));
        }
      }
    }
  });
});
