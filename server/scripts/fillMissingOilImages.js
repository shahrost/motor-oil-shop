require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { isEnabled, uploadLocalFile } = require("../utils/cloudStorage");

// روغن‌های بی‌عکس سایت (فیلترها عمداً بی‌عکس می‌مونن).
// هر فایل assets/missing-oils/<SKU>.webp عکس همون کده: پس‌زمینه با rembg حذف و
// هم‌اندازه‌ی بقیه‌ی عکس‌های همون برند (ووفر ۸۰۰×۸۰۰، وم اویل/ادینول ۱۵۳۶×۲۰۴۸ ...).
// فقط محصولی که الان عکس نداره عوض می‌شه.
const ASSETS = path.join(__dirname, "assets", "missing-oils");

const APPLY = process.argv.includes("--apply");

(async () => {
  if (APPLY && !isEnabled()) throw new Error("Cloudinary تنظیم نشده");

  const skus = fs
    .readdirSync(ASSETS)
    .filter((file) => file.endsWith(".webp"))
    .map((file) => path.basename(file, ".webp"));

  await mongoose.connect(process.env.MONGO_URI);

  const rows = [];

  for (const sku of skus) {
    const existing = await Product.findOne({ sku }).lean();
    const old = existing?.image?.main || "";
    const row = { sku, name: existing?.name ?? "-", status: "-", new: "-" };
    rows.push(row);

    if (!existing) row.status = "پیدا نشد";
    else if (old) row.status = "عکس داره، رد شد";
    else row.status = "بی‌عکس";

    if (!APPLY || row.status !== "بی‌عکس") continue;

    row.new = await uploadLocalFile(path.join(ASSETS, `${sku}.webp`), { keepLocal: true });
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
