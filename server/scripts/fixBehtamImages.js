require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { isEnabled, uploadLocalFile } = require("../utils/cloudStorage");

// عکس قبلی این ۴ گالن کوانتیک پلاس بهتام بریده بود (درب و دسته و کنار گالن نبود)؛
// جایگزین با عکس رسمی behtamoil.ir — زمینه‌ی سفید شفاف و دور عکس تراز شده.
const SKUS = ["BT-PET-001", "BT-PET-009", "BT-PET-017", "BT-PET-018"];

const APPLY = process.argv.includes("--apply");

const imageFile = (sku) => path.join(__dirname, "assets", "behtam", `${sku}.webp`);

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
