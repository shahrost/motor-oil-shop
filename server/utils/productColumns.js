// نام ستون‌های اکسل محصولات ← فیلد دیتابیس (ایمپورت محصولات و بروزرسانی قیمت هر دو از این استفاده می‌کنن)

// نام‌های جایگزین ستون‌ها برای لیست فیلترها. اول آمده‌اند تا در پیام خطا
// همان عنوان اصلی (فایل نمونه) نمایش داده شود.
const FILTER_COLUMN_ALIASES = {
  "کد فنی": "sku",
  "نام فیلتر": "name",
  "برند سازنده": "brand",
  "نوع فیلتر": "category",
};

const PRODUCT_COLUMN_MAP = {
  ...FILTER_COLUMN_ALIASES,
  "کد محصول": "sku",
  "نام محصول": "name",
  برند: "brand",
  دسته‌بندی: "category",
  حجم: "volume",
  ویسکوزیته: "viscosity",
  "استاندارد API": "api",
  "استاندارد ACEA": "acea",
  "نوع روغن": "oilType",
  توضیحات: "description",
  "قیمت (تومان)": "price",
  "قیمت نقدی (تومان)": "price",
  "قیمت اعتباری (تومان)": "priceCheck",
  "تعداد در کارتن": "cartonCount",
  موجودی: "stock",
  "تامین‌کننده": "supplier",
  گارانتی: "warranty",
  "برچسب‌ها": "tags",
  "پرفروش (بله/خیر)": "isBestSeller",
  "نام فایل عکس اصلی": "mainImage",
  "نام فایل‌های گالری": "galleryImages",
  // نام خودروهای سازگار (با کاما جدا)؛ محصول به صفحه‌ی همان خودروها وصل می‌شه
  "خودروهای سازگار": "compatibleVehicles",
};


module.exports = PRODUCT_COLUMN_MAP;
