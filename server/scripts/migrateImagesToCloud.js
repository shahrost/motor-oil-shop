// انتقال عکس‌های موجود (/uploads/products/...) به Cloudinary و به‌روزرسانی دیتابیس.
// اجرا:  node scripts/migrateImagesToCloud.js
// نیازمند MONGO_URI و CLOUDINARY_* در .env است. اجرای دوباره بی‌خطر است.
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");
const Vehicle = require("../models/Vehicle");
const { isEnabled, uploadLocalFile } = require("../utils/cloudStorage");

const uploadsDir = path.join(__dirname, "..", "uploads", "products");
const cache = new Map();
const stats = { moved: 0, missing: 0, skipped: 0 };

async function toCloud(localUrl) {
  if (!localUrl || !localUrl.startsWith("/uploads/")) {
    stats.skipped += 1;
    return localUrl;
  }

  if (cache.has(localUrl)) return cache.get(localUrl);

  const fullPath = path.join(uploadsDir, path.basename(localUrl));

  if (!fs.existsSync(fullPath)) {
    console.warn("فایل روی دیسک نیست:", localUrl);
    stats.missing += 1;
    return localUrl;
  }

  // فایل لوکال پاک نمی‌شود تا اگر مشکلی بود نسخه‌ی اصلی بماند
  const url = await uploadLocalFile(fullPath, { keepLocal: true });
  cache.set(localUrl, url);
  stats.moved += 1;
  console.log("آپلود شد:", localUrl, "->", url);

  return url;
}

async function main() {
  if (!isEnabled()) {
    throw new Error("متغیرهای CLOUDINARY_* در .env تنظیم نشده‌اند");
  }

  await mongoose.connect(process.env.MONGO_URI);

  for (const product of await Product.find({ "image.main": /^\/uploads\// })) {
    const main = await toCloud(product.image.main);
    const gallery = [];

    for (const g of product.image.gallery || []) gallery.push(await toCloud(g));

    await Product.updateOne({ _id: product._id }, { $set: { image: { main, gallery } } });
  }

  for (const vehicle of await Vehicle.find({ image: /^\/uploads\// })) {
    await Vehicle.updateOne(
      { _id: vehicle._id },
      { $set: { image: await toCloud(vehicle.image) } },
    );
  }

  console.log("پایان:", stats);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
