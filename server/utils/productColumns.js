// نام ستون‌های اکسل محصولات ← فیلد دیتابیس (ایمپورت محصولات و بروزرسانی قیمت هر دو از این استفاده می‌کنن)

const PRODUCT_COLUMN_MAP = {
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
};


module.exports = PRODUCT_COLUMN_MAP;
