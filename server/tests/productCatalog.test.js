const test = require("node:test");
const assert = require("node:assert/strict");
const zlib = require("node:zlib");
const productRepository = require("../repositories/productRepository");
const brandSaleRepository = require("../repositories/brandSaleRepository");
const productListCache = require("../utils/productListCache");
const productService = require("../services/productService");

test("catalog service preserves compact gzip responses, brand closures and cache invalidation", async (t) => {
  let closed = true;
  const iterate = t.mock.method(productRepository, "iterateProducts", async function* () {
    yield { id: "oil", name: "روغن", brand: "وم اویل", price: 100, priceCheck: 110, isActive: true };
    yield { id: "inactive", name: "محصول غیرفعال", brand: "ایدلوب", price: 200, isActive: false };
  });
  t.mock.method(brandSaleRepository, "findClosedBrands", async () => closed ? [{ brand: "وم اویل", closed: true }] : []);
  productListCache.invalidate();
  t.after(() => productListCache.invalidate());

  const body = await productService.getProductsBody();
  const response = JSON.parse(zlib.gunzipSync(body).toString());
  assert.equal(response.success, true);
  assert.equal(response.data[0].salesClosed, true);
  assert.equal(response.data[0].price, 100);
  assert.equal(response.data[0].priceCheck, 110);
  assert.equal(response.data[1].isActive, false);
  assert.equal(await productService.getProductsBody(), body);
  assert.equal(iterate.mock.callCount(), 1);

  closed = false;
  productListCache.invalidate();
  const reopened = JSON.parse(zlib.gunzipSync(await productService.getProductsBody()).toString());
  assert.notEqual(reopened.data[0].salesClosed, true);
  assert.equal(reopened.data[0].price, 100);
  assert.equal(iterate.mock.callCount(), 2);
});
