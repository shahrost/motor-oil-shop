// هویت برند — نام، توضیح سایت و اطلاعات فروشگاه فقط اینجا تعریف می‌شن.
// هدر، فوتر، متاتگ‌ها (PageMeta)، و موقع build هم index.html و manifest.json از همین فایل می‌خونن
// (پلاگین brandFiles در vite.config.js)، پس این فایل نباید چیزی import کنه.
// مقدارهای داخل [ ] جای خالی‌ان و باید با اطلاعات واقعی فروشگاه پر بشن.
const brand = {
  name: "شهرام روغن",
  nameEn: "Shahram Roghan",
  handle: "shahram_roghan",

  // عنوان صفحه‌ی اصلی و پیش‌نمایش لینک
  title: "شهرام روغن | فروش عمده روغن موتور و روانکار",
  description:
    "تأمین و فروش عمده‌ی روغن موتور، فیلتر، اسپری‌جات و اکتان برای فروشگاه‌های لوازم یدکی و اتوسرویس‌ها، با امکان پرداخت نقدی و چکی.",
  tagline: "تأمین عمده‌ی روغن موتور و روانکار — پرداخت نقدی و چکی",

  siteUrl: "https://www.shoil.ir",
  ogImage: "/og-image.png",
  themeColor: "#0f1b2d",

  // اطلاعات فروشگاه (صفحه‌ی درباره ما، تماس و فوتر)
  address: "شهریار، چهارراه ملارد، شهرک جعفریه، جنب فروشگاه خاجی، فروشگاه بزرگ جهان روغن",
  hours: "۸:۳۰ صبح تا ۸:۳۰ شب",
  landline: "021-91028636",
  landlineUrl: "tel:+982191028636",
  hoursEn: "8:30 AM to 8:30 PM",

  // صفحه‌ی اصلی: تیتر و زیرتیتر بخش معرفی (Hero) و متن ارسال نوار اعتماد (فارسی / انگلیسی)
  heroTitle: "تأمین عمده‌ی روغن موتور و روانکار",
  heroTitleEn: "Wholesale Engine Oil & Lubricants",
  heroSubtitle: "برای لوازم یدکی‌ها و اتوسرویس‌ها — پرداخت نقدی و چکی",
  heroSubtitleEn: "For auto parts stores and service shops — cash and cheque payment",
  deliveryArea: "پرند - رباط‌کریم - الارد - فردوسیه - نصیرشهر - نسیم‌شهر - کهنز - جاده آدران و اطراف",
  deliveryAreaEn: "Parand - Robat Karim - Alard - Ferdowsieh - Nasirshahr - Nasimshahr - Kahnez - Adran Road and nearby",

  // شرایط پرداخت چکی (صفحه‌ی درباره ما، زیر «چکی»)؛ تا خالیه جمله‌ی «شرایط: …» نمایش داده نمی‌شه
  checkTerms: "",
  checkTermsEn: "",

  // کد رسمی نماد اعتماد الکترونیکی (اینماد) — همون تکه HTMLی که سایت enamad.ir می‌ده،
  // کامل و بدون تغییر بین دو ` ` بچسبونید. تا خالیه، فوتر چیزی جای اینماد نشون نمی‌ده.
  enamadHtml: ``,
};

export default brand;
