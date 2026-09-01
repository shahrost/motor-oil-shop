require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

// لیست قیمت وم اویل — شهریور ۱۴۰۵. قیمت‌های PDF به «ریال» است؛
// دیتابیس قیمت را به «تومان» نگه می‌دارد، پس بر ۱۰ تقسیم می‌شود.
const NEW_PRICES_RIAL = {
  "WOM-PET-010": 6810000, // بنزینی SL 20W-50 1L
  "WOM-PET-011": 6810000, // بنزینی SL 20W-50 1L (نسخه دوم)
  "WOM-PET-008": 22540000, // بنزینی SL 20W-50 3.5L
  "WOM-PET-009": 25270000, // بنزینی SL 20W-50 4L
  "WOM-PET-003": 40690000, // بنزینی SM 10W-40 5L
  "WOM-PET-002": 54210000, // بنزینی SN 5W-40 5L
  "WOM-PET-001": 57550000, // بنزینی SN 0W-20 5L
  "WOM-GEAR-001": 8610000, // دنده دستی GL5 85W-90 1L
  "WOM-GEAR-003": 10520000, // دنده دستی GL5 75W-80 1L
  "WOM-GEAR-002": 10760000, // دنده دستی GL5 75W-90 1L
  "WOM-ATF-004": 11600000, // دنده اتومات ATF III 1L
  "WOM-ATF-002": 16060000, // دنده اتومات ATF VI 1L
  "WOM-ATF-001": 13530000, // دنده اتومات ATF AL4 1L
  "WOM-ATF-005": 17330000, // دنده اتومات ATF CVT 1L
  "WOM-MOTO-003": 7060000, // موتورسیکلت SL 20W-50 1L
  "WOM-MOTO-001": 8600000, // موتورسیکلت SL 10W-40 1L
  "WOM-MOTO-002": 9050000, // موتورسیکلت SN 10W-50 1L
};

const APPLY = process.argv.includes("--apply");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const rows = [];
  for (const [sku, rial] of Object.entries(NEW_PRICES_RIAL)) {
    const toman = rial / 10;
    const p = await Product.findOne({ sku }).lean();

    if (!p) {
      rows.push({ sku, old_toman: "NOT FOUND", new_toman: toman.toLocaleString(), change: "-" });
      continue;
    }

    const pct = p.price
      ? (((toman - p.price) / p.price) * 100).toFixed(1) + "%"
      : "-";

    rows.push({
      sku,
      old_toman: (p.price || 0).toLocaleString(),
      new_toman: toman.toLocaleString(),
      change: pct,
    });

    if (APPLY) {
      await Product.updateOne({ sku }, { $set: { price: toman } });
    }
  }

  console.table(rows);
  console.log(APPLY ? "\n✅ در دیتابیس اعمال شد" : "\n(اجرای آزمایشی — برای ثبت، --apply را اضافه کنید)");

  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
