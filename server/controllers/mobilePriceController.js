const { applyPriceChanges } = require("../services/mobilePriceService");
const apiResponse = require("../utils/apiResponse");

async function applyMobilePrices(req, res, next) {
  try {
    const results = await applyPriceChanges(req.body);
    return apiResponse.success(res, results, "نتیجه ثبت قیمت‌های انتخاب‌شده");
  } catch (error) {
    next(error);
  }
}

module.exports = { applyMobilePrices };
