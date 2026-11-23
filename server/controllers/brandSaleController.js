const service = require("../services/brandSaleService");
const apiResponse = require("../utils/apiResponse");

async function listBrandSales(req, res, next) {
  try { return apiResponse.success(res, await service.listBrandSales()); }
  catch (error) { next(error); }
}
async function setBrandSale(req, res, next) {
  try { return apiResponse.success(res, await service.setBrandSale(req.body)); }
  catch (error) { next(error); }
}
module.exports = { listBrandSales, setBrandSale };
