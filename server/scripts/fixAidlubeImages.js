require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { isEnabled, uploadLocalFile } = require("../utils/cloudStorage");

// عکس این ۴ روغن موتورسیکلت ایدلوب خراب بود: 002 بی‌درب و ریز، 004 ریز،
// 006 تکه‌ی پایه‌ی مشکی زیر گالن، 009 واترمارک دایره‌ای فروشگاه.
// جایگزین با عکس کامل ترب — پس‌زمینه با rembg حذف، بوم شفاف ۱۵۳۶×۲۰۴۸ مثل بقیه‌ی ایدلوب.
const SKUS = ["AL-MOTO-002", "AL-MOTO-004", "AL-MOTO-006", "AL-MOTO-009"];

const APPLY = process.argv.includes("--apply");

const imageFile = (sku) => path.join(__dirname, "assets", "aidlube", `${sku}.webp`);

(async () => {
  if (APPLY && !isEnabled()) throw new Error("Cloudinary تنظیم نشده");

  await mongoose.connect(process.env.MONGO_URI);

  const rows = [];

  for (const sku of SKUS) {
    const existing = await Product.findOne({ sku }).lean();
    const row = { sku, name: existing?.name ?? "-", old: existing?.image?.main ?? "-", new: "-" };
    rows.push(row);

    if (!APPLY || !existing) continue;

    row.new = await uploadLocalFile(imageFile(sku), { keepLocal: true });
    await Product.updateOne({ sku }, { $set: { "image.main": row.new } });
  }

  console.table(rows);
  console.log(
    APPLY
      ? "\n✅ در دیتابیس اعمال شد"
      : "\n(اجرای آزمایشی — برای ثبت، --apply را اضافه کنید)",
  );

  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
