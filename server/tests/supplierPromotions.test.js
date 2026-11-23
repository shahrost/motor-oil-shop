const test = require("node:test");
const assert = require("node:assert/strict");
const zlib = require("node:zlib");
const productRepository = require("../repositories/productRepository");
const brandSaleRepository = require("../repositories/brandSaleRepository");
const orderRepository = require("../repositories/orderRepository");
const orderService = require("../services/orderService");
const productService = require("../services/productService");
const productListCache = require("../utils/productListCache");
const Order = require("../models/Order");

const id = "64b000000000000000000001";
const product = { _id: id, id, name: "روغن موتور", brand: "وم اویل", category: "روغن موتور", volume: "1L", viscosity: "20W-50", price: 100, priceCheck: 110, cartonCount: 12, promotion: { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 } };

test("catalog replaces the old supplier offer; order uses the same authoritative rule and stores the gift unit", async (t) => {
  t.mock.method(productRepository, "iterateProducts", async function* () { yield product; });
  t.mock.method(productRepository, "findPricingByIds", async () => [product]);
  t.mock.method(brandSaleRepository, "findClosedBrands", async () => []);
  t.mock.method(orderRepository, "createOrder", async (data) => data);
  t.mock.method(global, "fetch", async () => ({ json: async () => ({ return: { status: 200 } }) }));
  productListCache.invalidate();
  t.after(() => productListCache.invalidate());
  const catalog = JSON.parse(zlib.gunzipSync(await productService.getProductsBody()).toString()).data;
  assert.equal(catalog[0].promotion.buyQtyCheck, 5);
  assert.equal(catalog[0].promotion.buyQtyCash, 5);
  assert.equal(catalog[0].promotion.buyQty, undefined);
  assert.equal(catalog[0].promotion.giftQtyCash, 1);
  assert.deepEqual(catalog[0].promotion.belowThresholdRulesCash, catalog[0].promotion.belowThresholdRulesCheck);

  for (const [quantity, paymentType, giftQty, giftUnit] of [[4, "check", 8, "number"], [5, "check", 1, "carton"], [10, "check", 2, "carton"], [4, "cash", 8, "number"], [5, "cash", 1, "carton"], [10, "cash", 2, "carton"]]) {
    const order = await orderService.createOrder({
      customer: { name: "تست طرح", phone: "09121234567" },
      items: [{ productId: id, quantity, paymentType, orderType: "carton", giftQty: 999, giftUnit: "number", price: 1 }],
    });
    assert.equal(order.items[0].giftQty, giftQty);
    assert.equal(order.items[0].giftUnit, giftUnit);
    assert.equal(order.totalPrice, quantity * 12 * (paymentType === "check" ? 110 : 100));
    assert.equal(new Order(order).items[0].giftUnit, giftUnit);
  }
});

test("legacy order gifts default to cartons", () => {
  assert.equal(new Order({ items: [{ giftQty: 1 }] }).items[0].giftUnit, "carton");
});
