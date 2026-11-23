const brandSaleRepository = require("../repositories/brandSaleRepository");
const productRepository = require("../repositories/productRepository");
const AppError = require("../utils/AppError");

async function listBrandSales() {
  return brandSaleRepository.findClosedBrands();
}

async function applyBrandSales(products) {
  const closed = new Set((await listBrandSales()).map((row) => row.brand));
  return products.map((product) => ({ ...product, salesClosed: closed.has(product.brand) }));
}

async function setBrandSale(body) {
  if (!body || typeof body.brand !== "string" || !body.brand.trim() || body.brand.length > 150 || typeof body.closed !== "boolean") {
    throw new AppError("برند و وضعیت فروش نامعتبر است", 400);
  }
  const brand = body.brand.trim();
  if (!await productRepository.hasBrand(brand)) throw new AppError("برند یافت نشد", 404);
  await brandSaleRepository.setBrandClosed(brand, body.closed);
  return { brand, closed: body.closed };
}

module.exports = { listBrandSales, applyBrandSales, setBrandSale };
