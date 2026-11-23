const mongoose = require("mongoose");
const onAnyWrite = require("./plugins/onAnyWrite");
const productListCache = require("../utils/productListCache");

// Independent of product prices/imports: reopening a brand restores its existing prices.
const schema = new mongoose.Schema({
  brand: { type: String, required: true, unique: true, trim: true },
  closed: { type: Boolean, required: true, default: false },
}, { timestamps: true, versionKey: false });
schema.plugin(onAnyWrite, { handler: productListCache.invalidate });
module.exports = mongoose.model("BrandSale", schema);
