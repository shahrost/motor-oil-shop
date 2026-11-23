const test = require("node:test");
const assert = require("node:assert/strict");
const productRepository = require("../repositories/productRepository");
const brandSaleRepository = require("../repositories/brandSaleRepository");
const orderRepository = require("../repositories/orderRepository");
const orderService = require("../services/orderService");
const validateProduct = require("../validations/productValidation");
const Product = require("../models/Product");

const id = "64b000000000000000000001";
const request = (orderType = "carton") => ({
  customer: { name: "مشتری آزمایشی", phone: "09121234567" },
  items: [{ productId: id, quantity: 2, orderType, price: 1, totalCount: 1 }],
});

function mockCatalog(t, product) {
  t.mock.method(productRepository, "findPricingByIds", async () => [{ _id: id, name: "روغن", price: 100, cartonCount: 6, ...product }]);
  t.mock.method(brandSaleRepository, "findClosedBrands", async () => []);
  // Even if SMS settings exist in the test environment, no real request can leave.
  t.mock.method(global, "fetch", async () => ({ json: async () => ({ return: { status: 200 } }) }));
}

test("inactive products cannot be ordered from an old cart", async (t) => {
  mockCatalog(t, { isActive: false });
  const create = t.mock.method(orderRepository, "createOrder", async () => {});
  await assert.rejects(orderService.createOrder(request()), (error) => error.statusCode === 400 && error.message.includes("غیرفعال"));
  assert.equal(create.mock.callCount(), 0);
});

test("invalid stored carton sizes are rejected before any order is written", async (t) => {
  mockCatalog(t, {});
  const create = t.mock.method(orderRepository, "createOrder", async () => {});
  for (const cartonCount of [-3, 1.5, Infinity, "invalid"]) {
    productRepository.findPricingByIds = async () => [{ _id: id, name: "روغن", price: 100, cartonCount }];
    await assert.rejects(orderService.createOrder(request()), { statusCode: 400 });
  }
  assert.equal(create.mock.callCount(), 0);
});

test("valid carton totals use server data and ignore client-submitted totals", async (t) => {
  mockCatalog(t, {});
  t.mock.method(orderRepository, "createOrder", async (data) => data);
  const order = await orderService.createOrder(request());
  assert.equal(order.items[0].totalCount, 12);
  assert.equal(order.totalPrice, 1200);
});

test("legacy missing or zero carton sizes retain the one-item fallback", async (t) => {
  mockCatalog(t, { cartonCount: 0 });
  t.mock.method(orderRepository, "createOrder", async (data) => data);
  assert.equal((await orderService.createOrder(request())).totalPrice, 200);
});

test("product validation and schema reject invalid carton sizes", async () => {
  for (const cartonCount of [-1, 0, 1.5, Infinity, "bad"]) {
    assert.equal(validateProduct({ name: "روغن", brand: "وم اویل", cartonCount }).valid, false);
    await assert.rejects(new Product({ name: "روغن", brand: "وم اویل", cartonCount }).validate());
  }
  assert.equal(validateProduct({ name: "روغن", brand: "وم اویل", cartonCount: "12" }).valid, true);
});

test("pricing queries include active status for the service to validate", async (t) => {
  let selected;
  t.mock.method(Product, "find", () => ({ select(fields) { selected = fields; return { lean: async () => [] }; } }));
  await productRepository.findPricingByIds([id]);
  assert.ok(selected.split(" ").includes("isActive"));
});
