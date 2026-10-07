const { toNumber } = require("./excelReader");
const { matchBrand } = require("./brandMatcher");
const RowError = require("./RowError");

// برند اکسل (فارسی/انگلیسی/نام مستعار، با هر ترتیب کلمات) ← نام فارسی ثبت‌شده‌ی برند
const normalizeBrand = (rawBrand) => matchBrand(rawBrand).name;

// ستون موجودی: عدد، یا متن «موجود» (تعداد نامشخص ← ۱) و «ناموجود» (۰)
function parseStock(rawStock) {
  const text = String(rawStock || "").trim();

  if (/^(ناموجود|نا\s*موجود)$/.test(text)) return 0;
  if (/^(موجود|دارد|بله)$/.test(text)) return 1;

  const number = toNumber(text);

  if (text && isNaN(number)) {
    throw new RowError(
      `مقدار ستون «موجودی» («${text}») عدد یا «موجود/ناموجود» نیست`,
      "مقدار ستون «موجودی» عدد یا «موجود/ناموجود» نیست",
    );
  }

  return number || 0;
}

// بعضی فایل‌ها (مثلاً ادینول) توی ستون ویسکوزیته، بعد از گرید لیست بلند
// تاییدیه‌های خودروسازها رو هم آوردن و کارت محصول به‌هم می‌ریزه. گرید واقعی
// نگه داشته می‌شه و بقیه به توضیحات منتقل می‌شه.
const MAX_GRADE_LENGTH = 30;
const GRADE_PATTERN = /^(ISO\s*VG\s*\d+|(SAE\s*)?\d{1,2}W-?\d{2,3}|SAE\s*\d{2,3})/i;

function splitGrade(rawGrade) {
  const value = String(rawGrade || "").trim();

  if (value.length <= MAX_GRADE_LENGTH) return { grade: value, approvals: "" };

  const match = value.match(GRADE_PATTERN);
  const grade = match ? match[0].trim() : "";
  const approvals = value.slice(grade.length).replace(/^[\s,;:-]+/, "");

  return { grade, approvals };
}

function toBoolean(value) {
  return ["بله", "yes", "true", "1"].includes(String(value).trim().toLowerCase());
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// یک ردیف اکسل ← سند محصول (بدون عکس). ردیف ناقص یا برند ناشناخته خطا می‌ده.
function rowToProductDoc(row) {
  if (!row.sku) throw new Error("کد محصول (sku) خالی است");
  if (!row.name) throw new Error("نام محصول خالی است");
  if (!row.brand) throw new Error("برند خالی است");

  const { grade, approvals } = splitGrade(row.viscosity);

  const doc = {
    sku: row.sku,
    name: row.name,
    brand: normalizeBrand(row.brand),
    category: row.category || "",
    volume: row.volume || "",
    viscosity: grade,
    api: row.api || "",
    acea: row.acea || "",
    oilType: row.oilType || "",
    description: [row.description, approvals && `تاییدیه‌ها: ${approvals}`]
      .filter(Boolean)
      .join("\n\n"),
    supplier: row.supplier || "",
    warranty: row.warranty || "",
    tags: splitList(row.tags),
    isBestSeller: toBoolean(row.isBestSeller),
  };

  // ستونی که در فایل نیست (مثلاً لیست فیلترهای بدون قیمت) مقدار فعلی/پیش‌فرض
  // محصول رو تغییر نمی‌ده؛ ستون موجود با خانه‌ی خالی همون رفتار قبلی رو داره.
  if (row.price !== undefined) doc.price = toNumber(row.price) || 0;
  if (row.cartonCount !== undefined) doc.cartonCount = toNumber(row.cartonCount) || 1;
  if (row.stock !== undefined) doc.stock = parseStock(row.stock);

  const priceCheck = toNumber(row.priceCheck);

  if (!isNaN(priceCheck)) {
    doc.priceCheck = priceCheck;
  }

  return doc;
}

module.exports = { rowToProductDoc, splitList, splitGrade, normalizeBrand, parseStock };
