import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

import { calcPromotionGift } from "../promotionCalc";
import { getProductPrice } from "../productPrice";
import { getItemTotal, getItemUnitCount } from "../cartItemCalc";
import liveCartItems from "../liveCartItems";

// منطق قیمت سرور (مبلغ ثبت‌شده‌ی سفارش) باید دقیقاً همون عدد سایت رو بده
const require = createRequire(import.meta.url);
const serverPricing = require("../../../../server/utils/orderPricing.js");

const promotion = {
  isActive: true,
  buyQtyCash: 10,
  giftQtyCash: 1,
  buyQtyCheck: 20,
  giftQtyCheck: 1,
  minQty: 5,
};

describe("calcPromotionGift", () => {
  it("فقط خرید کارتنی هدیه داره", () => {
    expect(calcPromotionGift(promotion, "number", 30, "cash")).toBe(0);
    expect(calcPromotionGift(promotion, "carton", 30, "cash")).toBe(3);
  });

  it("پله‌ی نقدی و چکی جدا حساب می‌شه", () => {
    expect(calcPromotionGift(promotion, "carton", 40, "check")).toBe(2);
  });

  it("زیر حداقل سفارش هدیه نداره", () => {
    expect(calcPromotionGift({ ...promotion, minQty: 50 }, "carton", 40, "cash")).toBe(0);
  });

  it("طرح غیرفعال هدیه نداره", () => {
    expect(calcPromotionGift({ ...promotion, isActive: false }, "carton", 40, "cash")).toBe(0);
  });

  it("با نسخه‌ی سرور یکسانه", () => {
    const cases = [
      ["carton", 0, "cash"],
      ["carton", 9, "cash"],
      ["carton", 25, "cash"],
      ["carton", 45, "check"],
      ["number", 100, "cash"],
    ];

    cases.forEach(([orderType, quantity, paymentType]) => {
      expect(serverPricing.calcPromotionGift(promotion, orderType, quantity, paymentType)).toBe(
        calcPromotionGift(promotion, orderType, quantity, paymentType),
      );
    });
  });
});

describe("قیمت و مبلغ ردیف", () => {
  const product = { price: 100000, priceCheck: 110000, cartonCount: 12 };

  it("محصول غیرفعال برای هیچ روش پرداخت قابل خرید نیست", () => {
    for (const type of ["cash", "check"]) {
      expect(getProductPrice({ ...product, isActive: false }, type)).toBe(0);
      expect(serverPricing.getUnitPrice({ ...product, isActive: false }, type)).toBe(0);
    }
  });

  it("چکی خالی ← قیمت نقدی (مثل سرور)", () => {
    expect(getProductPrice({ price: 5000 }, "check")).toBe(5000);
    expect(serverPricing.getUnitPrice({ price: 5000 }, "check")).toBe(5000);
  });

  it("بستن برند هر دو روش خرید را می‌بندد و بازکردن آن قیمت‌های قبلی را برمی‌گرداند", () => {
    for (const type of ["cash", "check"]) {
      expect(getProductPrice({ ...product, salesClosed: true }, type)).toBe(0);
      expect(serverPricing.getUnitPrice({ ...product, salesClosed: true }, type)).toBe(0);
      expect(getProductPrice({ ...product, salesClosed: false }, type)).toBe(product[type === "cash" ? "price" : "priceCheck"]);
    }
    const cart = [{ id: "a", ...product, salesClosed: true }];
    expect(liveCartItems(cart, [{ id: "a", ...product }])[0].salesClosed).toBe(false);
    expect(liveCartItems(cart, [{ id: "a", ...product, salesClosed: true }])[0].salesClosed).toBe(true);
  });

  it("کارتنی = تعداد × تعداد در کارتن", () => {
    const item = { ...product, orderType: "carton", quantity: 2, paymentType: "check" };

    expect(getItemUnitCount(item)).toBe(24);
    expect(serverPricing.getUnitCount(product, "carton", 2)).toBe(24);
    expect(getItemTotal(item)).toBe(24 * 110000);
  });
});

describe("liveCartItems", () => {
  it("قیمت ردیف سبد از لیست فعلی محصولات خونده می‌شه", () => {
    const cart = [{ id: "a", price: 100, quantity: 2, orderType: "number" }];
    const [line] = liveCartItems(cart, [{ id: "a", price: 150 }]);

    expect(line.price).toBe(150);
    expect(line.quantity).toBe(2);
  });

  it("محصول ناموجود در لیست دست نمی‌خوره", () => {
    const cart = [{ id: "a", price: 100 }];

    expect(liveCartItems(cart, [{ id: "b", price: 1 }])[0].price).toBe(100);
    expect(liveCartItems(cart, [])).toBe(cart);
  });
});
