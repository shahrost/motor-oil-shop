# Shahram Roghan Project State

آخرین بروزرسانی:
Session Update 2026-10-06 — طرح فروش نقدی/اعتباری جدا، جشنواره ضدیخ لوکینی، فیلتر صفحه‌ی محصولات، فوتر چت خصوصی، تقسیم وظایف کامپوننت‌ها/سرویس‌ها طبق معماری ✅

---

# Session Update — 2026-10-05 / 06

## ۱. طرح فروش: نقدی/اعتباری جدا + حداقل سفارش

Status: Completed ✅ (دیپلوی شد — کلاینت و سرور)

✅ `promotion` محصول سه فیلد جدید گرفت: `buyQtyCash` و `buyQtyCheck` (پله‌ی خرید جدا برای هر نوع پرداخت؛ اگر خالی باشن `buyQty` قدیمی استفاده می‌شه) و `minQty` (حداقل کارتن برای تعلق هدیه)
✅ `utils/promotionCalc.js`: محاسبه و متن طرح (مثلاً «نقدی: هر ۳ کارتن، ۱ کارتن هدیه / اعتباری: هر ۴ کارتن… / حداقل سفارش: ۶۰ کارتن») — طرح‌های قدیمی بدون تغییر کار می‌کنن
✅ فرم افزودن و ویرایش محصول هر دو از `components/common/PromotionFields.jsx` استفاده می‌کنن؛ نرمال‌سازی قبل از ذخیره در `utils/buildPromotionData.js`
✅ `scripts/seedPromotions.js`: گزینه‌ی `--only=پیشوند` برای اعمال فقط بخشی از طرح‌ها

## ۲. طرح‌های ثبت‌شده در دیتابیس

✅ ضدیخ سمن شیمی ۱، ۲ و ۴ کیلویی: هر ۴ کارتن ۱ کارتن هدیه (نقدی و چکی یکسان). سطل ۲۰ و بشکه ۲۱۰ کیلویی بدون طرح
✅ جشنواره ضدیخ لوکینی (مهر ۱۴۰۵): ۴ محصول جدید ساخته شد — `LK-AF-1KG` (۱۲تایی، حداقل ۶۰ کارتن)، `LK-AF-2.5KG` (۶تایی)، `LK-AF-4KG` (۶تایی)، `LK-COOL-RED-1KG` کولانت قرمز (۱۲تایی). نقدی هر ۳ کارتن ۱ هدیه، اعتباری هر ۴ کارتن ۱ هدیه. قیمت پایه (نقدی = اعتباری) از PDF جشنواره؛ عکس‌ها از همان PDF جدا شده (۳۰۰px). اسکریپت: `scripts/seedLookiniAntifreeze.js` (+ عکس‌ها در `scripts/assets/lookini/`)

⚠️ طرح‌های قبلی روغن ترمز سمن شیمی و وم اویل در دیتابیس غیرفعال‌اند (محصولات ۱۴۰۵/۰۶/۱۴ دوباره ایمپورت شدن) — اگه هنوز معتبرن باید دوباره فعال بشن
⚠️ بقیه‌ی محصولات لوکینی (اکسل ۳۴ ردیفی در `D:/OIL/CLAUDE-PIC/lookini-product-photos-clean`) هنوز ایمپورت نشده
⚠️ کش لیست محصولات: تغییری که با اسکریپت روی دیتابیس داده می‌شه حداکثر ۶۰ ثانیه بعد (و بعد از یک درخواست) روی سایت دیده می‌شه

## ۳. فیلتر صفحه‌ی محصولات

Status: Completed ✅ (دیپلوی شد)

✅ `Products/sections/ProductFilters.jsx` دقیقاً مثل فیلتر سریع صفحه‌ی اصلی: کارت `max-w-5xl`، دو ردیف سه‌تایی (گرید، API، لیتراژ / برند، نوع، قیمت) حتی روی موبایل، برچسب بالای هر فیلد و placeholder «همه‌ی …». دکمه‌ی پاک کردن و تیک «فقط موجودها» حفظ شد

## ۴. فوتر: چت خصوصی به‌جای کانال

Status: Completed ✅ (دیپلوی شد)

✅ `data/socialLinks.js`: تلگرام `t.me/shr546`، روبیکا `rubika.ir/SHAHROST1`، ایتا `eitaa.com/shahrost`، بله `ble.ir/shahrost`؛ واتس‌اپ از قبل چت خصوصی بود. هیچ لینک کانالی در پروژه باقی نمونده (به درخواست کاربر)
⚠️ لینک روبیکا از روی وب قابل تأیید نبود (صفحه اسم حساب رو نشون نمی‌ده) — باید با گوشی تست بشه

## ۵. تقسیم وظایف طبق معماری (فایل‌هایی که دو کار می‌کردن)

Status: Completed ✅ (lint و build کلاینت تمیز؛ سرور لوکال اجرا و endpointهای محصولات/خودروها/سفارش تست شد؛ تست بصری در مرورگر انجام نشد)

کلاینت:
✅ محاسبه‌ی مبلغ/تعداد ردیف سبد (۳ نسخه‌ی تکراری در `CartContext`، `buildOrderData`، `OrderProductCard`) → `utils/cartItemCalc.js` (`getItemUnitCount`, `getItemTotal`)
✅ برچسب «🎁 هدیه این خرید» (۴ نسخه) → `common/GiftBadge.jsx`
✅ گزینه‌های هاردکد واحد خرید/نوع پرداخت در `CartItem`، `OrderProductCard`، `PaymentSelector` → `common/OrderOptions.jsx` (از `data/orderUnits` و `data/paymentTypes`)
✅ `Account`: رنگ/برچسب وضعیت → `Account/helpers/orderStatus.js`؛ ظاهر → `sections/ProfileCard`, `OrderHistory`, `OrderHistoryItem`
✅ `VehicleDetail`: ساخت ردیف‌های مشخصات → `Vehicles/helpers/vehicleSpecs.js`؛ `sections/VehicleSpecsCard`, `OilGrid` (شبکه‌ی تکراری)
✅ `ProtectedRoute`: بررسی توکن ادمین → `hooks/useAdminAuthCheck.js`
✅ `ProductImage`: مودال بزرگ‌نمایی → `ProductCard/sections/ImageZoomModal.jsx`
✅ `Promotions`: کارت → `Promotions/sections/PromotionCard.jsx`
✅ تعریف فیلدهای فیلتر (تکراری بین فیلتر سریع و صفحه‌ی محصولات) → `utils/filterFields.js`؛ `useProducts` به‌جای ۶ مقدار + ۶ setter + ۶ لیست گزینه، `values` و `setValue(key, value)` برمی‌گردونه

سرور:
✅ هیچ سرویسی دیگه مستقیم مدل Mongoose رو صدا نمی‌زنه: توابع جدید `productRepository` (`findDuplicate`, `findBySku`, `setFieldsById`, `bulkWrite`, `findExistingSkus`, `deleteWhereSkuNotIn`) و `repositories/vehicleRepository.js` جدید
✅ `vehicleImportService` (۳۳۶ → ۲۰۸ خط): ستون‌ها → `utils/vehicleColumns.js`، تبدیل ردیف → `utils/vehicleRowMapper.js` (مثل ایمپورت محصول)

⚠️ ایمپورت اکسل محصول/خودرو و بروزرسانی گروهی قیمت بعد از این تغییر با فایل واقعی تست نشده (توابع خواندنی روی دیتابیس واقعی تست شدن) — اولین ایمپورت بعدی رو چک کنید

---

# Session Update — 2026-10-04

## ۱. سرعت لود اولیه (قبلاً ۱۰ تا ۲۸ ثانیه)

Status: Completed ✅ (دیپلوی شد؛ `/api/products` حالا حدود ۲.۵ ثانیه از سمت کاربر، تقریباً همه‌اش تأخیر شبکه)

✅ سرور: فشرده‌سازی gzip (پکیج `compression`) — JSON محصولات ۴۰۶KB → ۴۹KB
✅ سرور: کش حافظه‌ای لیست محصولات (`utils/productListCache.js`)؛ با هر نوشتن روی Product فوراً باطل می‌شه (پلاگین `models/plugins/onAnyWrite.js`)، تغییرات خارج از پروسه (اسکریپت‌ها) حداکثر بعد از ۶۰ ثانیه؛ موقع استارت سرور گرم می‌شه (`server.js`)
✅ سرور: `/uploads` با کش ۳۰ روزه (`immutable`)
✅ کلاینت: اسکلتون ردیف‌های برند تا رسیدن محصولات (`Home/sections/BrandRowsSkeleton.jsx`) — بخش «فیلتر سریع» دیگه بالا نمی‌پره؛ `loading` به `ProductContext` اضافه شد
✅ کلاینت: عکس کارت‌ها `loading="lazy"` + نسخه‌ی کوچک Cloudinary (`getThumbUrl` در `utils/getImageUrl.js`)
✅ کلاینت: خودروها فقط در مسیرهای `/vehicle*` و `/admin` دریافت می‌شن (`VehicleProvider`)
✅ کلاینت: پنل ادمین lazy-load (chunk جدا)
✅ لوگوی برندها PNG → WebP کوچک‌شده (۱MB → ۱۷۱KB)

## ۲. اصلاحات ظاهری و کارت‌ها

✅ کارت ادینول (AHF-22-S) با گرید خیلی بلند ۹۸۹px ارتفاع داشت و ردیف آخر رو کش می‌داد: `sm:block` کلاس `line-clamp` رو خنثی می‌کرد → `hidden sm:line-clamp-*`
✅ فیلتر سریع: همیشه دو ردیف سه‌تایی (گرید، API، لیتراژ / برند، نوع، قیمت)
✅ پالت جدید «سرمه‌ای + کهربایی» (انتخاب کاربر): در `index.css` خانواده‌های `yellow-*` (کهربایی `#faa61a`)، `gray-*` (خنثی سرد، سرهای تیره سرمه‌ای `#0f1b2d`) و `black` بازتعریف شدن؛ دکمه‌های خرید کهربایی با متن سرمه‌ای، قیمت سرمه‌ای، برچسب‌ها خاکستری، لینک‌ها کهربایی تیره؛ سبز فقط برای موفقیت و واتس‌اپ؛ لوگو (`shahram-monogram-yellow.svg`) کهربایی
✅ نشان تخفیف ۰٪ مخفی (جاش حفظ می‌شه)؛ حالت شب سرمه‌ای و متن دکمه‌های کهربایی تیره می‌مونه
✅ خط‌های خالی «گرید / API / ACEA / نوع روغن» نمایش داده نمی‌شن (کارت‌ها خط نامرئی نگه می‌دارن تا هم‌تراز باشن)
✅ خط «API:» روی کارت‌ها بین گرید و حجم، با چینش درست راست‌به‌چپ (`<bdi>`)
✅ محصول بدون عکس ← لوگوی برند (`utils/productImage.js`)

⚠️ ۲۱۷ محصول گرید ندارن چون خانه‌ی «ویسکوزیته» در اکسل خالیه (نه باگ ایمپورت). حدود ۱۵۰ تاش ذاتاً گرید ندارن (فیلتر ATFO، ضدیخ، گریس، ...). برای بقیه (روغن ترمز DOT3/DOT4، ATF ها، روغن موتورهای ایدلوب، بهتام BT-PET-001) باید اکسل پر و دوباره ایمپورت بشه
⚠️ ایمپورت: گرید بیشتر از ۳۰ کاراکتر که با الگوی شناخته‌شده (`5W-30`، `SAE`، `ISO VG`) شروع نشه خالی ذخیره می‌شه — گرید رو کوتاه بنویسید
⚠️ ایمپورت: تیک «حذف محصولاتی که در اکسل نیستند» همه‌ی محصولات بقیه‌ی برندها رو هم پاک می‌کنه؛ ستون عکس پر بدون آپلود عکس ← ردیف خطا می‌گیره؛ قیمت‌های اکسل جایگزین قیمت فعلی می‌شن

## ۳. بازسازی ساختار (هر فایل یک مسئولیت)

Status: Completed ✅ (lint تمیز، build موفق، تست دستی هدر/فیلتر/صفحه‌ی محصول/سبد و endpointهای سرور)

کلاینت:
✅ `layout/Header.jsx` (۶۰۴ خط) → `layout/Header/` با `Header.jsx` (فقط ترکیب) + sections: `HeaderBrand`, `DesktopNav`, `HeaderActions`, `LanguageSwitch`, `ThemeToggle`, `MobileMenu`, `OwnerPhotoModal`
✅ اطلاعات تماس یک‌جا: `data/contact.js` (`WHATSAPP_URL`, `PHONE_URL`) و `data/socialLinks.js` (قبلاً در ۵ فایل تکرار)
✅ آدرس سرور یک‌جا: `api/config.js` (`API_URL`, `API_ORIGIN`)
✅ `common/FilterSelect.jsx` مشترک بین فیلتر سریع و فیلترهای صفحه‌ی محصولات؛ منطق فیلتر سریع → `Home/hooks/useQuickFilter.js`
✅ `common/SpecLine.jsx` (خط «برچسب: مقدار» با حالت مخفی/نامرئی و `ApiLabel`)
✅ `hooks/usePurchaseOptions.js` (جایگزین `useProductCard` و منطق تکراری `useProductDetail`) — اعتبارسنجی تعداد اینجاست (باگ: خالی‌کردن تعداد، صفر به سبد اضافه می‌کرد)
✅ `ProductRowCard` → sections `RowCardSpecs`, `RowCardPurchase` (گزینه‌ها از `data/orderUnits` و `data/paymentTypes`)
✅ صفحه‌ی محصول: `ProductInfo` حذف و به `ProductSpecs`, `PurchaseOptions`, `PromotionInfo`, `ProductDescription` تقسیم شد
✅ صفحه‌ی محصولات: فیلتر/مرتب‌سازی خالص → `utils/filterProducts.js`؛ دکمه‌ی «برگشت به بالا» خودش اسکرول رو مدیریت می‌کنه
✅ `CartContext`: تبدیل فرمت قدیمی سبد به `services/cartStorage.js` منتقل شد (+ محافظت در برابر JSON خراب)؛ به‌روزرسانی ردیف‌ها یک تابع
✅ `BulkTools`: هوک مشترک `useExcelImport` برای ایمپورت محصول و خودرو + `usePriceUpdate`؛ فرم‌ها در sections (`ProductImportForm`, `PriceUpdateForm`, `VehicleImportForm`, `ImportFields`, `SubmitStatus`, `ResultBox`, `ResultList`)
✅ `services/productImportService.js` (کلاینت) جدا از `productService.js`
✅ حذف کد مرده (نسخه‌ی کامنت‌شده در `useOrderManager.js` و `vite.config.js`)

سرور:
✅ `controllers/importController.js`: آپلود دسته‌ای عکس و وضعیت job مشترک (قبلاً در هر دو کنترلر تکرار)
✅ `vehicleController` از `utils/importJobs.js` استفاده می‌کنه (سیستم job تکراری حذف شد)؛ `getVehicles` → `services/vehicleService.js`
✅ `productImportService` فقط ایمپورت: تبدیل ردیف → `utils/productRowMapper.js`، ستون‌ها → `utils/productColumns.js`، بروزرسانی قیمت → `services/priceUpdateService.js`

⚠️ ایمپورت کامل محصول/خودرو با فایل واقعی بعد از این بازسازی تست نشده (روی دیتابیس واقعی می‌نویسه) — اولین ایمپورت بعدی رو چک کنید

## ۴. سفارش‌ها در پنل ادمین نمیومد + متن ناخوانا در سبد/ثبت سفارش

Status: Completed ✅ (دیپلوی شد)

علت سفارش‌ها: سرور روی Runflare گاهی بی‌صدا ری‌استارت می‌شه و چند ده ثانیه 502/503 می‌ده (بدون هیچ خطایی در لاگ؛ حافظه ~۹۰MB ثابت، پس کمبود حافظه نیست). در اون بازه:
- ثبت سفارش شکست می‌خورد ولی خطا قورت داده می‌شد، سبد خالی و به مشتری «سبد خالی» نشون داده می‌شد ← سفارش گم می‌شد
- دریافت سفارش‌ها در ادمین شکست می‌خورد و «سفارشی پیدا نشد» نمایش داده می‌شد
- بررسی توکن ادمین شکست می‌خورد و ادمین از پنل بیرون انداخته می‌شد

✅ `api/apiClient.js`: تکرار خودکار درخواست‌های GET روی 502/503/504/خطای شبکه و بقیه فقط روی 503 (۱، ۲ و ۴ ثانیه)
✅ ثبت سفارش منتظر ذخیره می‌مونه؛ در صورت خطا پیام می‌ده و سبد حفظ می‌شه؛ بعد از ثبت موفق پیام موفقیت (نه «سبد خالی»)
✅ `ProtectedRoute` فقط با 401/403 خارج می‌کنه
✅ لیست سفارش‌های ادمین: «در حال دریافت» / خطا + «تلاش دوباره» (`OrderListStatus.jsx`)
✅ سرور: `utils/processMonitor.js` (لاگ حافظه هر ۳۰ ثانیه، سیگنال‌های توقف، خطاهای مهارنشده) برای پیدا کردن علت ری‌استارت‌ها

علت متن ناخوانا: قانون سراسری `p, span, label, ... { color }` در `index.css` (بیرون از layer) همه‌ی کلاس‌های رنگ Tailwind رو خنثی می‌کرد؛ در حالت شب متن روشن روی کادرهای زرد روشن (قیمت محصول، مبلغ کل سفارش) نامرئی می‌شد.
✅ قانون‌های رنگ تگ‌ها حذف شد (متن از body ارث می‌بره)، وزن تیترها در `@layer base`، ته‌رنگ تیره برای کادرهای روشن در حالت شب، هک‌های `!important` هدر/فوتر حذف شد

⚠️ علت ری‌استارت‌های سرور هنوز پیدا نشده؛ لاگ‌های `[process]` رو بعد از ری‌استارت بعدی بررسی کنید (اگه قبل از ری‌استارت `received SIGTERM` باشه، هاست پروسه رو متوقف کرده). استارت سرور حدود ۱۷ ثانیه طول می‌کشه

---

# Session Update — 2026-10-02 (بخش دوم)

## بخش «خودروها» + ایمپورت گروهی خودرو (اکسل + عکس)

Status: Completed ✅ (روی shoil.ir و api.shoil.ir دیپلوی شد؛ `/api/vehicles` جواب می‌ده)

Changes:

✅ دکمه‌ی «خودروها» توی منوی هدر بین «خانه» و «محصولات» (`data/menu.js` + کلید `nav.vehicles`؛ منوی ادمین هم از همین فایل می‌خونه)
✅ مسیرها: `/vehicles` (لیست برندهای خودرو) ← `/vehicles/:brand` (مدل‌ها + جستجو) ← `/vehicle/:id` (عکس، کارت مشخصات، روغن‌های مناسب). کامپوننت‌ها توی `components/Vehicles/`
✅ کارت خودرو هم‌استایل کارت روغن‌هاست؛ روغن‌های مناسب با همون `ProductCard` (قالب و قیمت فعلی) نمایش داده می‌شن
✅ منطق روغن مناسب (`utils/vehicleOils.js`): روغن موتور بنزینیِ فعال که ویسکوزیته‌اش جزو `viscosities` خودرو باشه
✅ ترجمه‌ی EN/FA (namespace `vehicles` + `nav.vehicles`)
✅ سرور: مدل `Vehicle` (کلید یکتا `sku`)، `GET /api/vehicles` (عمومی)، `POST /api/vehicles/import` (ادمین، اکسل + عکس‌ها، گزینه‌ی حذف خودروهای غایب در اکسل) — `routes/vehicleRoutes.js`, `controllers/vehicleController.js`, `services/vehicleImportService.js`
✅ توابع خوندن اکسل مشترک شد: `server/utils/excelReader.js` (ایمپورت محصولات هم ازش استفاده می‌کنه)
✅ ادمین: فرم «ایمپورت گروهی خودروها» توی `BulkTools` (`VehicleImport.jsx`) با لینک دانلود `templates/vehicle-import-template.xlsx` (ساخته‌شده با `server/scripts/generateVehicleTemplate.js` از `client/src/data/vehicles.js`)
✅ ستون‌های اکسل: کد خودرو، نام خودرو، برند خودرو، سال ساخت، موتور، حجم روغن موتور (لیتر)، ویسکوزیته‌های پیشنهادی (با ویرگول)، استاندارد API، فاصله تعویض روغن، نام فایل عکس (+ ستون‌های انگلیسی اختیاری)
✅ تا وقتی هیچ خودرویی توی دیتابیس نیست، سایت لیست پیش‌فرض ۲۲ خودرو (`data/vehicles.js`) رو نشون می‌ده؛ بعد از اولین ایمپورت فقط خودروهای دیتابیس نمایش داده می‌شن (`VehicleProvider`)
✅ آدرس‌های اشتباه `shahramoil.ir` توی `DEPLOYMENT.md` به آدرس واقعی `shoil.ir` (و `api.shoil.ir`) اصلاح شد

⚠️ داده‌ی پیش‌فرض خودروها (حجم روغن، ویسکوزیته، API) تقریبی و ساخته‌ی خودمونه، نه از منبع رسمی — قبل از اتکا بررسی بشه
⚠️ ایمپورت خودرو و ایمپورت محصول بعد از refactor روی دیتابیس واقعی تست نشدن — بعد از اولین استفاده چک بشه
⚠️ عکس و لوگوی برند خودرو فعلاً placeholder (حرف اول برند)؛ دیپلوی همچنان دستی با Runflare CLI

---
# Session Update — 2026-10-02

## انتقال هاست از Liara به Runflare

Status: Completed ✅

Changes:

✅ کل پروژه (سرور، کلاینت، دیتابیس) روی Runflare دیپلوی شده؛ پروژه‌ی `shoil-client` (id: 34043) با دو سرویس: `frontend` (80267) و `backend` (80422)
✅ همه‌ی فایل‌ها و تنظیمات Liara حذف شدن: `liara.json` (client، client/public، server)، دو workflow گیت‌هاب (`deploy-client.yml`, `deploy-server.yml`) و کامنت‌های «deploy trigger/retry» ته `main.jsx` و `server.js`
✅ `client/vite.config.js`: با ست بودن `RUNFLARE` خروجی build به `dist` می‌ره، وگرنه `build`
✅ دیپلوی دیگه با push خودکار نیست؛ دستی با Runflare CLI (`runflare deploy --project-id ... --item-id ... --yes` از داخل پوشه‌ی هر سرویس) — جزئیات تو `DEPLOYMENT.md`
✅ `DEPLOYMENT.md` کامل برای Runflare بازنویسی شد

⚠️ بعد از هر تغییر `VITE_API_URL` باید کلاینت دوباره build/deploy بشه (مقدار موقع build داخل کد قرار می‌گیره)

---

# Session Update — 2026-08-20 (بخش چهارم)

## Logo / Branding در Header، Footer، Admin، Favicon

Status: Completed ✅

Structure:

client/src/assets/logo/
├── shahram-logo.png (عکس شخصی شهرام — قبلاً مستقیم توی assets/ بود، منتقل شد به این پوشه)
└── shahram-monogram-{black,white,yellow,blue,green,red}.{svg,png,jpg}

Changes:

✅ `assets/shahram-logo.png` → `assets/logo/shahram-logo.png` منتقل شد (با `git mv`، تاریخچه حفظ شد)
✅ هدر (`layout/Header.jsx`): لوگوی مونوگرام (نسخه‌ی زرد، هماهنگ با `yellow-400` برند) کنار اسم «شهرام روغن» به‌عنوان لوگو/ووردمارک اصلی؛ عکس شخصی شهرام تبدیل شد به یه بج دایره‌ای کوچیک که روی گوشه‌ی لوگو overlap می‌کنه (کلیک‌پذیر، مودال بزرگ‌نمایی قبلی حفظ شد) — به‌جای این‌که دو المان جدا و شلوغ کنار هم باشن، یه واحد بصری واحده
✅ فوتر (`layout/Footer.jsx`): همون لوگوی زرد کنار عنوان «شهرام روغن» اضافه شد
✅ AdminHeader: نسخه‌ی مشکی لوگو (برای پس‌زمینه‌ی سفید پنل ادمین) کنار عنوان پنل اضافه شد
✅ Favicon (`public/favicon.svg`): از آیکون پیش‌فرض جایگزین شد با بخش مرکزی (شکل V/لوزی) لوگوی مونوگرام — چون خود لوگو خیلی کشیده و افقیه، این بخش مرکزیش به‌تنهایی به‌عنوان آیکون تب مرورگر خواناتره
✅ عنوان تب مرورگر (`index.html`) از placeholder پیش‌فرض ویت (`client`) به «شهرام روغن» تغییر کرد
✅ تست بصری واقعی: با headless Edge (چون chromium-cli در ویندوز موجود نبود) اسکرین‌شات گرفته شد از هدر در چند عرض (۳۹۰ موبایل تا ۱۴۴۰ دسکتاپ) — یه سوءتفاهم اولیه پیش اومد (به‌نظر می‌رسید لوگو کنار اسکرول‌بار زرد رنگ سایت clip شده)، با اندازه‌گیری واقعی DOM (`getBoundingClientRect` از طریق CDP) تایید شد که هیچ overflow واقعی وجود نداره و طراحی درسته

---

## تکمیل کامل ترجمه‌ی سایت (EN/FA) — رفع محدودیت بخش قبل

Status: Completed ✅ (جایگزین وضعیت «Partially Completed ⚠️» بخش دوم پایین‌تر)

Changes:

✅ ~۱۸۸ کلید ترجمه‌ی جدید به `i18n/translations.js` اضافه شد، توی namespace های جدید: `common`, `home`, `products`, `productCard`, `productDetail`, `cart`, `order`, `account`, `accountLogin`, `register`, `contact`, `about`, `brands`, `brandProducts`, `viscosity`, `viscosityProducts`, `homeSlider` (علاوه بر `nav`/`header`/`footer` قبلی)
✅ ۳۹ کامپوننت مشتری‌محور (خانه، محصولات، جزئیات محصول، سبد خرید، سفارش، تماس، درباره‌ما، برندها، ثبت‌نام/ورود مشتری، حساب کاربری، ویسکوزیته و...) به `t()` وصل شدن
✅ `utils/productFilters.js` (`getViscosities`/`getVolumes`/`getPriceOptions`) حالا `language` می‌گیرن و `{value, label}` برمی‌گردونن (مقدار فیلتر داخلی دست‌نخورده، فقط برچسب نمایشی عوض می‌شه)
✅ `utils/formatPrice.js` حالا زبان می‌گیره و «تومان»/«Toman» رو بر همون اساس نشون می‌ده
✅ `data/productOptions/priceRanges.js` فیلد `labelEn` گرفت
✅ مقدار پیش‌فرض فارسی (fa) کلمه‌به‌کلمه دست‌نخورده موند — فقط یه لایه‌ی `t()` بین متن‌های هاردکد و JSX اضافه شد، هیچ متن فارسی بازنویسی نشد
✅ عمداً ترجمه نشدن (تصمیم آگاهانه): نام/توضیحات محصول و نام برندها (محتوای پویای دیتابیس/API، نه رشته‌ی ثابت UI)، کدهای گرید ویسکوزیته (SAE 40، 5W30 — فنی و زبان‌مستقل)، و کل پنل ادمین (Admin/ProductForm/ProductEditForm/Login) — این‌ها اصلاً به سوییچ زبان مشتری وصل نبودن و ابزار داخلی خود فروشگاه‌دار هستن
✅ تست شد: `npm run lint` تمیز (فقط ۲ خطای از قبل موجود توی `scripts/generateImages.js` و یه warning قدیمی توی `HomeSlider.jsx`، هیچ‌کدوم مربوط به این تغییر نیست)، `npm run build` موفق
✅ تست بصری واقعی با headless Edge روی چند صفحه (خانه، محصولات) در حالت EN — منو، فیلترها، کارت محصول، دکمه‌ها، بنر همکاری، فوتر همه به انگلیسی درست نمایش داده می‌شن

---

# Session Update — 2026-08-20 (بخش سوم)

## Brand Name Translation (EN mode) + Addinol Brand

Status: Completed ✅

Changes:

✅ برند «ادینول» (Addinol) به `data/brands.js` اضافه شد — الان ۱۷ برند، با لوگوی رسمی (`assets/brands/addinol.png`)
✅ هر برند یه فیلد `nameEn` گرفت (مثلاً «سمن شیمی» → Seman Chimie)؛ کمکی `utils/brandLabel.js` ساخته شد که با گرفتن نام فارسی + زبان فعلی، برچسب درست رو برمی‌گردونه
✅ در حالت EN، اسم برند این‌جاها به انگلیسی نشون داده می‌شه: لیست برندهای خانه، صفحه‌ی برندها، دراپ‌دان فیلتر برند (هم خانه هم محصولات)، برند روی کارت محصول، جزئیات محصول، آیتم سبد خرید، و عنوان صفحه‌ی «محصولات برند X»
✅ منطق فیلتر/روتینگ (`/brand/:name`, تطبیق `product.brand`) همچنان روی نام فارسی کار می‌کنه — فقط برچسب نمایشی عوض می‌شه، نه مقدار داخلی؛ یعنی چیزی نمی‌شکنه

---

# Session Update — 2026-08-20 (بخش دوم)

## EN/FA Language Switcher

Status: Partially Completed ⚠️ (زیرساخت کامل، ترجمه‌ی محتوا محدود)

Structure:

client/src/
├── context/LanguageContext.jsx
├── i18n/translations.js (دیکشنری fa / en)
├── data/menu.js (بازسازی شد: `{ key, path, titleFa }`)
└── components/layout/Header.jsx, Footer.jsx (وصل شدن به ترجمه)

Changes:

✅ دکمه‌ی EN/FA توی هدر (کنار دکمه‌ی حالت شب/روز) — پیش‌فرض FA، با کلیک EN زبان و جهت صفحه (dir) عوض می‌شه، با کلیک FA برمی‌گرده
✅ انتخاب زبان در localStorage ذخیره می‌شه و `dir`/`lang` روی `<html>` تنظیم می‌شه
✅ `direction: rtl` هاردکد شده‌ی body و `dir="rtl"` هاردکد شده‌ی Header/Footer حذف شدن تا از تنظیم پویا پیروی کنن
✅ منو (خانه/محصولات/برندها/سبد خرید/تماس)، دکمه‌ی ثبت‌نام/حساب من، برچسب‌های فوتر (تگ‌لاین، حقوق، اسم پلتفرم‌های شبکه‌ی اجتماعی) ترجمه شدن
✅ AdminHeader (که از همون menu.js استفاده می‌کرد) با فیلد جدید (`titleFa`) هماهنگ شد تا نشکنه — پنل ادمین خودش ترجمه نمی‌شه (ابزار داخلی، نیازی نبود)

⚠️ **محدودیت مهم**: این فقط هدر/فوتر/منو رو ترجمه می‌کنه. بقیه‌ی متن‌های سایت (صفحات خانه/محصولات/سبد خرید/سفارش/تماس/درباره‌ما/برندها/حساب کاربری و...) هنوز مستقیم فارسی توی JSX نوشته شدن و به دیکشنری وصل نیستن — چون ده‌ها فایل و صدها رشته‌ی متنی داره، ترجمه‌ی کامل کل سایت یه کار جدا و بزرگه. زیرساخت (Context + دیکشنری + سوییچ) کاملاً آماده و کارکنه؛ فقط باید صفحه به صفحه بقیه‌ی متن‌ها به `t("...")` وصل بشن.

---

Status: Completed ✅

پاکسازی:

✅ ۵ فایل فونت بی‌استفاده حذف شدن (Black, ExtraLight, Light, Thin, نسخه‌ی variable) — هیچ‌کدوم در `@font-face` لود نمی‌شدن؛ فولدر فونت از ۵۸۴KB به ۲۶۴KB رسید
✅ بلوک کامل «SHAHRAM ROGHAN COLOR SYSTEM» (`@layer base`, متغیرهای `--color-primary-*`/`--color-secondary-*`/`--color-success` و...) حذف شد — در کل پروژه هیچ‌جا استفاده نمی‌شد (کپی موازی و بی‌ربط به پالت واقعی)
✅ کلاس‌های سفارشی بی‌استفاده حذف شدن: `.brand-card`, `.main-shadow`, `.btn-primary`, `.btn-buy`, `.btn-contact`, `.btn-sale` — هیچ کامپوننتی ازشون استفاده نمی‌کرد (همه‌جا مستقیم از کلاس‌های تیلویند استفاده شده)
✅ یه قانون باگ‌دار پیدا و حذف شد: `header/footer ... { color: var; }` — این CSS معتبر نیست (متغیر بدون مقدار) و بی‌اثر بود؛ override های واقعی و کارکننده (`!important`) دست‌نخورده موندن

پالت:

✅ `--black-brand` تیره‌تر شد (`#111111` → `#0a0a0a`)
✅ رنگ‌های معنایی (`--green-brand`, `--blue-brand`, `--red-brand`) به سایه‌های قوی‌تر و حرفه‌ای‌تر تغییر کردن (700 به‌جای 600) چون قبلی‌هاشون فقط داخل کلاس‌های حذف‌شده‌ی بالا استفاده می‌شدن و همه‌جای دیگه‌ی پروژه آزاد بودن
✅ `--yellow-brand` عمداً دست‌نخورده موند (`#facc15`) چون دقیقاً با `bg-yellow-400` تیلویند که در دهها کامپوننت مستقیم استفاده می‌شه یکیه — تغییرش باعث ناهماهنگی اسکرول‌بار با بقیه‌ی سایت می‌شد
✅ فایل با کامنت‌های واضح‌تر و بخش‌بندی منظم‌تر بازنویسی شد

⚠️ نکته: بیشتر رنگ‌های واقعی سایت (دکمه‌ها، برندینگ هدر/فوتر) مستقیم از کلاس‌های تیلویند (`bg-yellow-400`, `bg-green-600` و...) میان، نه از این متغیرهای CSS — یعنی این پالت فعلاً بیشتر نقش «مرجع مرکزی» داره تا این‌که همه‌جا واقعاً مصرف بشه. اگه بخوای کل سایت رو به این توکن‌ها وصل کنیم (یه دستکاری بزرگ‌تر روی کامپوننت‌هاست)، بگو.

---

## Critical Bug Fixes

Status: Completed ✅

Changes:

✅ productRepository.updateProduct/deleteProduct fixed — کوئری اشتباه با فیلد `id` به‌جای `_id` باعث می‌شد ویرایش و حذف محصول از پنل ادمین همیشه بی‌اثر باشه
✅ Order id generation تغییر کرد از `Date.now()` به `crypto.randomUUID()` — جلوگیری از تصادم id در ثبت هم‌زمان سفارش
✅ 404 handling و ObjectId validation به product/order services اضافه شد
✅ آدرس تصاویر آپلودی (`/uploads/...`) با `getImageUrl.js` درست resolve می‌شن (قبلاً بدون origin سرور نمایش داده نمی‌شدن)
✅ آپلود عکس واقعی در فرم ویرایش محصول (قبلاً فقط یه اینپوت متنی مسیر بود)
✅ فیلد قیمت که اصلاً در فرم افزودن محصول input نداشت اضافه شد

## Security Hardening

Status: Completed ✅

Changes:

✅ `POST /api/products` حالا نیاز به auth داره (قبلاً بدون احراز هویت بود)
✅ لاگ کردن کامل MONGO_URI از کنسول حذف شد
✅ CORS محدود شد به origin مشخص (`CORS_ORIGIN`)
✅ Rate limit روی لاگین ادمین و ثبت‌نام/ورود مشتری اضافه شد
✅ ProtectedRoute ادمین حالا واقعاً توکن رو با `GET /api/auth/verify` تایید می‌کنه (قبلاً فقط وجود یه string رو چک می‌کرد)
✅ hashPassword.js دیگه پسورد hardcoded نداره

## Dead Code / Architecture Cleanup

Status: Completed ✅

Changes:

✅ `server/utils/errorHandler.js` و `server/middleware/index.js` (استفاده‌نشده) حذف شدن
✅ `ImageSelector.jsx` و داده‌های استاتیک قدیمی (`productImages.js`, `brandFolderMap.js`) حذف شدن
✅ `normalizeProduct.js` (کد مرده، جایگزین با `createProduct.js`) حذف شد
✅ فرم افزودن محصول (BasicInfo/TechnicalInfo) به فایل‌های داده‌ی مرکزی (`data/brands.js`, `data/productOptions/*`) وصل شد به‌جای لیست‌های هاردکد ۵ تایی
✅ فیلدهای «تامین‌کننده» و «گارانتی» از فرم ادمین حذف شدن
✅ Contact.jsx از سکشن‌های تکراری خودش استفاده نمی‌کرد؛ الان از `ContactInfo`/`ContactActions` استفاده می‌کنه

## Admin Dashboard

Status: Completed ✅

✅ ۴ کارت بالای داشبورد ادمین (کل سفارش‌ها، فروش کل، محصولات فروخته‌شده، مشتریان) که hardcode بودن، به `OrderContext` وصل شدن
✅ `orderStats.js` یه محاسبه‌ی جدید گرفت: `totalCustomers`

## Product Filters Rebuild

Status: Completed ✅

Structure:

Products/sections/
├── ProductFilters.jsx (dropdown: برند / گرید / لیتراژ / قیمت)
├── ProductGrid.jsx
└── ScrollTopButton.jsx

Home/sections/
└── QuickFilter.jsx (فیلتر سریع، با همون گزینه‌ها، ناوبری به /products با query params)

Changes:

✅ گزینه‌های برند/گرید/لیتراژ دیگه فقط از محصولات موجود مشتق نمی‌شن، از فایل‌های داده‌ی مرکزی میان (همیشه کامل)
✅ فیلتر قیمت (بازه‌ی قیمتی + ارزان‌ترین/گران‌ترین) اضافه شد — `data/productOptions/priceRanges.js`
✅ Products page از `useSearchParams` می‌خونه تا فیلتر اومده از خانه اعمال بشه
✅ صفحه‌ی Brands هم مثل بخش برندهای خانه، از لیست کامل برندها با عکس استفاده می‌کنه (قبلاً بدون عکس و فقط برندهای موجود بود)

## Header / Footer / Mobile

Status: Completed ✅

Changes:

✅ منوی هدر در موبایل باعث overflow می‌شد (کلاس ریسپانسیو نداشت) — فیکس شد، پشت دکمه‌ی ☰/✕ رفت
✅ عکس صاحب فروشگاه جای لوگوی حرفی «ش» — با کلیک، نسخه‌ی کامل و بزرگ در یه مودال باز می‌شه (Esc/کلیک بیرون می‌بنده)
✅ فوتر: ۶ لوگوی واقعی (تلگرام، واتساپ، روبیکا، ایتا، بله، تماس تلفنی) با لینک مستقیم به کانال/چت هرکدوم (از 2026-10-06 همه چت خصوصی؛ کانال‌ها حذف شدن)

## Customer Accounts (New Feature)

Status: Completed ✅

Structure:

server/
├── models/Customer.js (+ Order.customerId)
├── validations/customerValidation.js
├── repositories/customerRepository.js
├── services/customerAuthService.js
├── controllers/customerController.js
├── middleware/customerAuth.js (JWT جدا از توکن ادمین)
└── routes/customerRoutes.js → /api/customers/register, /login, /me, /me/orders

client/src/
├── context/CustomerAuthContext.jsx
├── components/Register/ (+ hooks/useRegister.js)
├── components/AccountLogin/ (+ hooks/useAccountLogin.js)
├── components/Account/
├── components/CustomerProtectedRoute.jsx
└── pages/Register.jsx, AccountLogin.jsx, Account.jsx

Changes:

✅ ثبت‌نام و ورود مشتری با شماره موبایل + رمز عبور، جدا از حساب ادمین
✅ دکمه‌ی هدر کنار سبد خرید: «ثبت‌نام» وقتی لاگین نیست، اسم مشتری وقتی لاگین هست
✅ `/account` با CustomerProtectedRoute محافظت می‌شه
✅ apiClient interceptor اصلاح شد تا Authorization header صریح (برای مشتری) رو override نکنه
✅ سفارش‌ها به حساب مشتری وصل شدن — فیلد `customerId` روی Order، اندپوینت `GET /api/customers/me/orders`، و نمایش تاریخچه‌ی سفارش در `/account`
✅ باگ جانبی پیدا و فیکس شد: تولید id سفارش سمت سرور (`crypto.randomUUID`) توسط id ارسالی از کلاینت override می‌شد (ترتیب spread اشتباه بود) — الان id همیشه سمت سرور و یکتا تولید می‌شه

## Theme (Dark Mode + Eye-Comfort Light Mode)

Status: Completed ✅

Structure:

client/src/context/ThemeContext.jsx

Changes:

✅ دکمه‌ی تغییر حالت شب/روز در هدر (آیکون ماه🌙/خورشید☀️ با انیمیشن، ذخیره در localStorage)
✅ `@custom-variant dark` در index.css برای فعال‌سازی dark mode دستی (Tailwind v4)
✅ پس‌زمینه‌ی کلی صفحه در حالت شب از CSS variables پیروی می‌کنه
✅ حالت روز نرم‌تر شد — رنگ پایه‌ی `white`/`gray-50`/`gray-100` تیلویند بازتعریف شد (`#f7f6f2` و مشابه) تا نور/گلر کمتری داشته باشه، بدون افت خوانایی؛ چون این کلاس‌ها در ۴۴ فایل استفاده می‌شن، این تغییر خودکار همه‌جا اعمال شد
✅ حالت شب هم تکمیل شد به روش زیرساختی مشابه: کلاس‌های پرکاربرد (`bg-white`, `bg-gray-50/100`, `text-black`, `text-gray-600..900`, `border-gray-200/300`) و همچنین `input/select/textarea` زیر `.dark` بازتعریف شدن — بدون نیاز به دست‌زدن به تک‌تک ۴۰+ فایل کامپوننت، کل کارت‌ها/پنل‌ها/فرم‌های سایت الان در حالت شب واقعاً تیره می‌شن

## Git

Status: Completed ✅

✅ چک‌پوینت کامل ساخته و کامیت شد
✅ تداخل با کامیت قدیمی‌تر روی گیت‌هاب (که معماری لایه‌ای رو نداشت) resolve شد — نسخه‌ی جدیدتر و فیکس‌شده نگه داشته شد
✅ Push به `origin/design-home-page` انجام شد

---

# Completed

## ProductForm

Status: Completed ✅

Structure:

ProductForm/
├── ProductForm.jsx
├── index.js
├── hooks/
│ └── useProductForm.js
├── helpers/
│ └── buildProductData.js
└── sections/
├── BasicInfo.jsx
├── TechnicalInfo.jsx
├── Description.jsx
├── ProductStatus.jsx
├── VehicleSelector.jsx
└── ImageSection/

Changes:

✅ UI separated into sections
✅ Logic moved into hook
✅ Data processing moved into helpers

---

## ProductContext

Status: Completed ✅

Structure:

context/
└── ProductContext/
├── ProductContext.jsx
├── ProductProvider.jsx
├── hooks/
│ └── useProducts.js
└── helpers/
└── normalizeProduct.js

Changes:

✅ Product logic moved into useProducts
✅ Provider separated
✅ normalizeProduct created
✅ Exports centralized

---

## ProductEditForm

Status: Completed ✅

Changes:

✅ Form sections separated
✅ Edit logic moved into useProductEdit
✅ Data builder separated
✅ Imports cleaned
✅ Edit flow tested

---

## ProductCard

Status: Completed ✅

Changes:

✅ UI split into sections
✅ Cart logic moved into hook
✅ Actions separated
✅ Old structure removed
✅ Imports verified

---

# Architecture Rules

- Logic داخل hooks
- UI داخل components
- Processing داخل helpers
- Export مرکزی با index.js
- فایل‌ها کوچک و تک مسئولیتی
- ساخت فایل تکراری ممنوع
- قبل از ساخت فایل جدید، ساختار بررسی شود
- تغییرات بزرگ ابتدا در PROJECT_STATE ثبت شوند
- حذف فایل قدیمی فقط بعد از تست importها
- Refactor بدون تغییر رفتار اصلی
- Pageها فقط Route Wrapper هستند
- منطق Admin داخل Components و Hooks قرار می‌گیرد

---

# Admin Refactor

Status: Completed ✅

## Components Architecture

Structure:

Admin/
├── index.js
├── AdminPanel.jsx
├── AdminHeader/
├── Dashboard/
├── ProductManager/
├── ProductList/
└── OrderManager/

---

## AdminPanel

Status: Completed ✅

Changes:

✅ Container اصلی پنل
✅ بدون منطق داخلی
✅ فقط مدیریت Layout

Flow:

AdminPanel
↓
AdminHeader
↓
Dashboard
↓
ProductManager
↓
OrderManager

---

## Dashboard

Status: Completed ✅

Structure:

Dashboard/
├── Dashboard.jsx
├── DashboardCard.jsx
└── index.js

Changes:

✅ Dashboard layout created
✅ DashboardCard reusable created
✅ آماده اتصال به داده واقعی در آینده

---

## ProductManager

Status: Completed ✅

Structure:

ProductManager/
├── ProductManager.jsx
├── index.js
└── hooks/
└── useProductManager.js

Changes:

✅ Context connection moved into hook
✅ products management inside hook
✅ edit state inside hook
✅ save/edit/delete actions moved from Page
✅ ProductManager تبدیل به Coordinator شد

Flow:

ProductManager
↓
useProductManager
↓
ProductContext
↓
Product UI

---

## ProductList

Status: Completed ✅

Structure:

ProductList/
├── ProductList.jsx
├── ProductTable.jsx
└── ProductRow.jsx

Changes:

✅ فقط UI Layer
✅ بدون Context
✅ بدون State
✅ Props based

---

## OrderManager

Status: Completed ✅

Structure:

OrderManager/
├── OrderManager.jsx
├── hooks/
│ └── useOrderManager.js
├── helpers/
│ ├── exportOrders.js
│ └── orderStats.js
└── sections/
├── OrderDashboard.jsx
├── OrderFilters.jsx
├── OrderCard.jsx
└── OrderProducts.jsx

Changes:

✅ Logic moved into hook
✅ Statistics separated
✅ Excel export separated
✅ UI sections separated

---

# Admin Pages Refactor

Status: Completed ✅

Completed:

✅ Admin.jsx converted to wrapper
✅ AdminDashboard converted to wrapper
✅ AdminProducts converted to wrapper
✅ AdminOrders converted to wrapper
✅ ProductContext removed from Pages
✅ Page logic removed

Current Flow:

Route
↓
Pages
↓
Admin Components
↓
Hooks / Context

---

# Route Cleanup

Status: Completed ✅

Completed:

✅ AppRoutes.jsx created and integrated
✅ All routes moved from App.jsx
✅ ProtectedRoute preserved
✅ /admin route verified
✅ /admin/orders route verified
✅ Unused Header import removed from App.jsx
✅ App.jsx converted to clean application wrapper

Current Flow:

App.jsx
↓
router/AppRoutes.jsx
↓
Pages
↓
Components

---

# Order Refactor

Status: Completed ✅

Structure:

Order/
├── Order.jsx
├── index.js
├── OrderButtons.jsx
├── hooks/
│ └── useOrderForm.js
├── helpers/
│ ├── buildOrderData.js
│ └── index.js
└── sections/
├── CustomerInfo.jsx
├── OrderProductCard.jsx
├── OrderProducts.jsx
├── OrderSuccess.jsx
└── PaymentSelector.jsx

Changes:

✅ Order page converted to Route Wrapper / Composition layer
✅ Order logic moved into useOrderForm
✅ Order data processing moved into buildOrderData
✅ CustomerInfo separated
✅ OrderProducts separated
✅ OrderProductCard separated
✅ PaymentSelector separated
✅ OrderSuccess separated
✅ OrderButtons separated
✅ Central exports added through index.js
✅ Duplicate Order UI removed from Page
✅ Original order behavior preserved
✅ Imports verified

---

# Login Refactor

Status: Completed ✅

Structure:

Login/
├── Login.jsx
├── index.js
└── hooks/
└── useLogin.js

Changes:

✅ Login UI moved into components/Login/Login.jsx
✅ Login logic moved into useLogin
✅ username state moved into hook
✅ password state moved into hook
✅ handleLogin moved into hook
✅ API login request remains inside hook
✅ Authentication token handling remains inside hook
✅ Navigation logic moved into hook
✅ Central exports added through index.js
✅ pages/Login.jsx converted to Route Wrapper
✅ Original login behavior preserved

Current Flow:

Route
↓
pages/Login.jsx
↓
components/Login/Login.jsx
↓
hooks/useLogin.js
↓
apiClient

---

# Home Refactor

Status: Completed ✅

Structure:

Home/
├── Home.jsx
├── index.js
└── sections/
├── BrandList.jsx
├── FeaturedProducts.jsx
├── Features.jsx
├── FloatingActions.jsx
├── HomeSearch.jsx
└── SalesBanner.jsx

Changes:

✅ Home UI separated into sections
✅ BrandList separated
✅ FeaturedProducts separated
✅ Features separated
✅ FloatingActions separated
✅ HomeSearch separated
✅ SalesBanner separated
✅ Home converted into Composition layer
✅ ProductContext logic handled within Home architecture
✅ brands data separated from Home UI
✅ features data separated from Home UI
✅ pages/Home.jsx converted to Route Wrapper
✅ Original Home behavior preserved

Current Flow:

Route
↓
pages/Home.jsx
↓
components/Home/Home.jsx
↓
Home Sections

---

# Cart Refactor

Status: Completed ✅

Structure:

Cart/
├── Cart.jsx
├── index.js
├── hooks/
│ └── useCartPage.js
└── sections/
├── CartEmpty.jsx
├── CartItems.jsx
├── CartItem.jsx
└── CartSummary.jsx

Changes:

✅ Cart UI separated into sections
✅ CartEmpty separated
✅ CartItems separated
✅ CartItem separated
✅ CartSummary separated
✅ CartContext connection moved into useCartPage
✅ Cart page converted to Route Wrapper
✅ Original cart behavior preserved
✅ Quantity update preserved
✅ Order type selection preserved
✅ Payment type selection preserved
✅ Remove item preserved
✅ Clear cart preserved
✅ Cart total preserved
✅ Navigation to products/order preserved

Current Flow:

Route
↓
pages/Cart.jsx
↓
components/Cart/Cart.jsx
↓
useCartPage
↓
CartContext

---

# Public Pages Refactor

Status: Completed ✅

All public Pages have been refactored.

Completed:

✅ About.jsx
✅ Contact.jsx
✅ Home.jsx
✅ Login.jsx
✅ Cart.jsx
✅ BrandProducts.jsx
✅ Products.jsx
✅ ProductDetail.jsx
✅ Viscosity.jsx
✅ ViscosityProducts.jsx

Result:

✅ No public Page with business logic remains
✅ Pages converted to Route Wrapper where applicable
✅ UI moved into Components
✅ Page logic moved into Hooks / Components
✅ Existing Context connections moved out of Pages
✅ Existing behavior preserved
✅ Existing ProductCard architecture reused
✅ No duplicate ProductCard architecture created
✅ Import paths reviewed during refactor

Current Public Pages Flow:

Route
↓
pages/_
↓
components/_
↓
hooks / context / helpers

---

# Products Refactor

Status: Completed ✅

Changes:

✅ Existing ProductCard architecture reviewed
✅ No duplicate ProductCard created
✅ Products filtering logic moved out of Page
✅ Search logic preserved
✅ Brand filtering preserved
✅ Viscosity filtering preserved
✅ Volume filtering preserved
✅ Sorting preserved
✅ Availability filtering preserved
✅ Clear filters preserved
✅ Scroll-to-top behavior preserved
✅ ProductCard reused
✅ Products page converted to Route Wrapper
✅ Imports verified

---

# ProductDetail Refactor

Status: Completed ✅

Changes:

✅ ProductContext logic moved out of Page
✅ CartContext connection moved out of Page
✅ Product lookup moved into component architecture
✅ Quantity handling preserved
✅ Order type handling preserved
✅ Payment type handling preserved
✅ Final quantity calculation preserved
✅ Add-to-cart behavior preserved
✅ Product image/gallery behavior preserved
✅ Product information display preserved
✅ Description display preserved
✅ ProductDetail page converted to Route Wrapper
✅ Original behavior preserved

---

# Viscosity Refactor

Status: Completed ✅

Changes:

✅ ProductContext logic moved out of Page
✅ Viscosity data processing moved into component architecture
✅ Product count preserved
✅ Viscosity links preserved
✅ Viscosity page converted to Route Wrapper
✅ Original behavior preserved

---

# ViscosityProducts Refactor

Status: Completed ✅

Changes:

✅ useParams logic moved out of Page
✅ ProductContext logic moved out of Page
✅ Product filtering moved into component architecture
✅ ProductCard reused
✅ Empty state preserved
✅ Back navigation preserved
✅ ViscosityProducts page converted to Route Wrapper
✅ Original behavior preserved

---

# Pages Refactor Final Status

Status: Completed ✅

pages/ currently contains Route Wrappers only.

Architecture:

Route
↓
Page Wrapper
↓
Component
↓
Hook
↓
Context / Helpers / API

No remaining public Page requires architectural refactor.

---

# Current Pending Tasks (به‌روزشده 2026-08-19)

✅ Import cleanup و حذف فایل‌های مرده — انجام شد
✅ باگ‌های بحرانی و امنیت سرور — انجام شد
✅ اتصال سفارش‌ها به حساب مشتری — انجام شد
✅ تکمیل حالت شب برای همه‌ی صفحات — انجام شد
✅ Performance review — lint کامل کلاینت (۰ خطا) و syntax-check کامل سرور انجام شد

⏳ تست نهایی روی مرورگر واقعی توسط کاربر (این محیط ابزار مرورگر/اسکرین‌شات نداره؛ لینت و بیلد تمیزن ولی تست بصری دستی لازمه)

---

# Next Tasks

هیچ کار برنامه‌ریزی‌شده‌ی باقی‌مونده‌ای نیست. مورد باز فقط تست دستی روی مرورگر واقعیه.

---

# Important Project Rule

از این مرحله به بعد:

- قبل از ساخت هر فایل، ساختار فعلی همان بخش بررسی شود.
- فایل تکراری ساخته نشود.
- اگر Component architecture قبلاً وجود دارد، همان ساختار تکمیل شود.
- Pageها فقط Route Wrapper باشند.
- منطق Page داخل Hook/Component منتقل شود.
- رفتار فعلی برنامه در Refactor تغییر نکند.
- فایل‌های قدیمی فقط بعد از بررسی Importها حذف شوند.
- مراحل پروژه پشت سر هم و بدون پرش به بخش‌های نامرتبط انجام شوند.
- وضعیت PROJECT_STATE بعد از هر بخش اصلی به‌روزرسانی شود.

---

backend===============

# Shahram Roghan Project State

## Current Phase

Backend layered architecture completed for Product / Order / Auth / Customer. Bug-fix and hardening pass done (2026-08-19). Next phase: deepen dark theme per page, link orders to customer accounts.

## Frontend Status

React frontend architecture completed and working, including a new Customer Accounts module and a light/dark theme toggle (see Session Update above).

## Backend Current Structure

server
├── config/db.js
├── controllers/
│ ├── authController.js
│ ├── productController.js
│ ├── orderController.js
│ └── customerController.js
├── services/
│ ├── authService.js
│ ├── productService.js
│ ├── orderService.js
│ └── customerAuthService.js
├── repositories/
│ ├── productRepository.js
│ ├── orderRepository.js
│ └── customerRepository.js
├── middleware/
│ ├── auth.js (admin JWT)
│ ├── customerAuth.js (customer JWT)
│ ├── upload.js
│ └── errorHandler.js
├── routes/
│ ├── authRoutes.js
│ ├── productRoutes.js
│ ├── orderRoutes.js
│ ├── customerRoutes.js
│ └── index.js
├── models/
│ ├── Product.js
│ ├── Order.js
│ └── Customer.js
├── validations/
│ ├── authValidation.js
│ ├── productValidation.js
│ ├── orderValidation.js
│ └── customerValidation.js
├── utils/
│ ├── AppError.js
│ └── apiResponse.js
└── scripts/
  └── hashPassword.js

توجه: `middleware/index.js` و `utils/errorHandler.js` قدیمی (کد مرده) حذف شدن؛ الان هر route فایل middleware مربوطه رو مستقیم import می‌کنه.

## Next Steps

1. اتصال سفارش‌ها به حساب مشتری (تاریخچه‌ی سفارش در صفحه‌ی Account)
2. تکمیل حالت شب برای تک‌تک صفحات (محصولات، سبد خرید، ادمین)
3. ایندکس‌های بیشتر روی فیلدهای پرکاربرد کوئری (در صورت رشد داده)
4. بازبینی نهایی import/فایل‌های استفاده‌نشده در کل پروژه (دوره‌ای)

## Important Architecture Rules

- Controllers should only handle request/response.
- Business logic belongs in Services.
- Database operations belong in Repositories.
- Models only define database schema.
- New features must follow the same layered architecture.
- Customer auth و Admin auth کاملاً جدا نگه داشته می‌شن (توکن‌های متفاوت، middleware متفاوت).
