const test = require("node:test");
const assert = require("node:assert/strict");
const BrandSale = require("../models/BrandSale");
const Product = require("../models/Product");
const service = require("../services/brandSaleService");
const repository = require("../repositories/productRepository");
const orderRepository = require("../repositories/orderRepository");
const orderService = require("../services/orderService");
const brandSaleRepository = require("../repositories/brandSaleRepository");

test("brand closure validates inputs, persists separately, and affects only the selected brand", async () => {
  const original = { find: BrandSale.find, update: BrandSale.findOneAndUpdate, exists: Product.exists };
  const state = new Map();
  let writes = 0;
  BrandSale.find = () => ({ select: () => ({ lean: async () => [...state].filter(([, closed]) => closed).map(([brand, closed]) => ({ brand, closed })) }) });
  Product.exists = async ({ brand }) => brand === "وم اویل";
  BrandSale.findOneAndUpdate = async ({ brand }, update) => { writes++; state.set(brand, update.$set.closed); };
  try {
    for (const body of [null, {}, { brand: { $ne: "" }, closed: true }, { brand: "وم اویل", closed: "false" }]) {
      await assert.rejects(service.setBrandSale(body), { statusCode: 400 });
    }
    await assert.rejects(service.setBrandSale({ brand: "unknown", closed: true }), { statusCode: 404 });
    assert.equal(writes, 0);
    const products = [{ brand: "وم اویل", price: 100, priceCheck: 110 }, { brand: "ایدلوب", price: 200 }];
    await service.setBrandSale({ brand: "وم اویل", closed: true });
    let result = await service.applyBrandSales(products);
    assert.deepEqual(result.map((p) => p.salesClosed), [true, false]);
    assert.equal(result[0].price, 100); assert.equal(result[0].priceCheck, 110);
    // A newly imported product follows the brand setting too.
    assert.equal((await service.applyBrandSales([{ brand: "وم اویل", price: 300 }]))[0].salesClosed, true);
    await service.setBrandSale({ brand: "وم اویل", closed: false });
    result = await service.applyBrandSales(products);
    assert.deepEqual(result.map((p) => p.salesClosed), [false, false]);
    assert.equal(result[0].price, 100);
  } finally { BrandSale.find = original.find; BrandSale.findOneAndUpdate = original.update; Product.exists = original.exists; }
});

test("an old cart cannot order a closed brand even when it submits a positive price", async () => {
  const find = repository.findPricingByIds, create = orderRepository.createOrder;
  const closedBrands = brandSaleRepository.findClosedBrands;
  let writes = 0;
  repository.findPricingByIds = async () => [{ _id: "64b000000000000000000001", name: "روغن", brand: "وم اویل", price: 100 }];
  brandSaleRepository.findClosedBrands = async () => [{ brand: "وم اویل", closed: true }];
  orderRepository.createOrder = async () => { writes++; };
  try {
    await assert.rejects(orderService.createOrder({
      customer: { name: "علی", phone: "09121234567", address: "تهران" },
      items: [{ productId: "64b000000000000000000001", quantity: 1, price: 100 }],
    }), (error) => error.statusCode === 400 && error.message.includes("فروش این برند بسته است"));
    assert.equal(writes, 0);
  } finally { repository.findPricingByIds = find; orderRepository.createOrder = create; brandSaleRepository.findClosedBrands = closedBrands; }
});
