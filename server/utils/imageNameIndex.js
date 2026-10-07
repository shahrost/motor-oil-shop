const path = require("path");
const RowError = require("./RowError");

const MISSING_GROUP = "فایل عکس در بین عکس‌های ارسالی پیدا نشد";

const lower = (name) => String(name || "").trim().toLowerCase();
const baseName = (name) => lower(path.basename(name, path.extname(name)));

// ایندکس عکس‌های ارسالی برای پیدا کردن فایل هر ردیف. اول نام دقیق (بی‌توجه به حروف
// بزرگ/کوچک)، بعد نام بدون پسوند: اکسل «A.jpg» می‌گه ولی عکس «A.webp» ارسال شده.
// اگه چند فایل با همان نام بدون پسوند باشن (A.jpg و A.png) حدس نمی‌زنیم.
function buildImageNameIndex(imageFiles) {
  const byExact = new Map();
  const byBase = new Map();

  imageFiles.forEach((file) => {
    byExact.set(lower(file.originalname), file);

    const base = baseName(file.originalname);

    byBase.set(base, [...(byBase.get(base) || []), file]);
  });

  return {
    // فایل عکس یا خطای RowError (پیدا نشد / مبهم)
    find(name) {
      const exact = byExact.get(lower(name));

      if (exact) return exact;

      const sameBase = byBase.get(baseName(name)) || [];

      if (sameBase.length === 1) return sameBase[0];

      if (sameBase.length > 1) {
        throw new RowError(
          `برای عکس «${name}» چند فایل هم‌نام ارسال شده (${sameBase
            .map((f) => f.originalname)
            .join("، ")}). پسوند دقیق را در اکسل بنویسید`,
          "برای عکس چند فایل هم‌نام ارسال شده",
        );
      }

      const missing = new RowError(`فایل عکس «${name}» پیدا نشد`, MISSING_GROUP);

      missing.code = "IMAGE_MISSING";
      throw missing;
    },
  };
}

module.exports = { buildImageNameIndex };
