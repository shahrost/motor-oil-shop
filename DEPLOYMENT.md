# راهنمای هاست کردن — شهرام روغن

آخرین بروزرسانی: 2026-10-02

پلتفرم دیپلوی: **Runflare** ([runflare.com](https://runflare.com)) برای هم سرور، هم کلاینت و هم دیتابیس.

## پیش‌نیازها (کارهایی که باید خودت انجام بدی)

- [ ] ثبت دامنه `.ir` (مثلاً `shahramoil.ir`) از یه رجیسترار معتبر ایرانی — [ایران‌سرور](https://www.iranserver.com/domains/ir/) یا [پارس‌پک](https://parspack.com/domain/ir) پیشنهاد می‌شن
- [ ] حساب روی Runflare با اعتبار کافی
- [ ] دسترسی به دیتابیس قبلی (برای کوچ داده، اگه هنوز انجام نشده)
- [ ] (اختیاری) نصب Runflare CLI روی ویندوز با [client/install.bat](client/install.bat) — به‌صورت Administrator اجرا بشه

قیمت و پلن‌های Runflare رو موقع خرید از خود سایتشون چک کن.

## مرحله ۱ — دیتابیس

1. تو پنل Runflare یه دیتابیس MongoDB بساز و رشته‌ی اتصال (connection string) رو یادداشت کن.
2. اگه داده‌ها هنوز جای دیگه‌ان، کوچ بده:
   ```
   mongodump --uri="<connection string مبدا>" --out=./backup
   mongorestore --uri="<connection string Runflare>" ./backup
   ```
   (نیاز به نصب `mongodb-database-tools` داره)
3. با یه کلاینت Mongo (مثل Compass) تعداد رکوردهای `products`، `customers`، `orders` رو با مبدا مقایسه کن.

## مرحله ۲ — دیپلوی سرور (Express)

1. یه سرویس Node.js تو Runflare بساز و پوشه‌ی `server/` رو دیپلوی کن (نه ریشه‌ی ریپو).
2. **دیسک persistent برای `uploads`**: مسیر `server/uploads` باید روی یه دیسک/volume دائمی mount بشه، وگرنه عکس‌های محصولات با هر دیپلوی جدید پاک می‌شن. تو پنل Runflare چک کن این امکان چطور فعال می‌شه.
3. Environment Variableها رو تو پنل Runflare ست کن (لیست کامل: [server/.env.example](server/.env.example)):
   - `MONGO_URI` → رشته‌ی اتصال دیتابیس Runflare
   - `JWT_SECRET` → **مقدار جدید و رندوم، هرگز مقدار توسعه نه**
     ```
     node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
     ```
   - `CORS_ORIGIN` → آدرس نهایی سایت (مثلاً `https://shahramoil.ir`)؛ چند آدرس با کاما
   - `ADMIN_USERNAME` و `ADMIN_PASSWORD_HASH` → با `server/scripts/hashPassword.js` یه پسورد قوی بساز
   - `PORT` → اگه پلتفرم خودش ست نکرد، `5000`
4. دستور استارت: `npm start`
5. بعد از دیپلوی، آدرس سرور رو باز کن و پیام «Shahram Roghan API is running» رو ببین.

## مرحله ۳ — دیپلوی کلاینت (React build)

1. یه سرویس استاتیک/React تو Runflare بساز و پوشه‌ی `client/` رو دیپلوی کن.
2. Environment Variable: `VITE_API_URL` = آدرس سرور + `/api` (مثلاً `https://api.shahramoil.ir/api`)
3. دستور build: `npm run build`
4. پوشه‌ی خروجی: [client/vite.config.js](client/vite.config.js) وقتی متغیر محیطی `RUNFLARE` ست باشه خروجی رو تو **`dist`** می‌ریزه، وگرنه تو `build`. پس موقع build روی Runflare باید `RUNFLARE=1` ست باشه.

## مرحله ۴ — وصل کردن دامنه

1. رکوردهای DNS دامنه رو طبق راهنمای Runflare به سرویس‌ها وصل کن (دامنه‌ی اصلی برای کلاینت، ساب‌دامین مثل `api.` برای سرور).
2. SSL رو فعال کن و بعد از انتشار DNS چک کن قفل HTTPS بیاد.

## چک‌لیست نهایی قبل از اعلام عمومی سایت

- [ ] `JWT_SECRET` و `ADMIN_PASSWORD_HASH` پروداکشن با مقادیر توسعه فرق دارن
- [ ] `CORS_ORIGIN` فقط دامنه‌ی نهایی رو مجاز می‌کنه (نه `localhost`)
- [ ] لاگین ادمین و پنل مدیریت تست شده
- [ ] یه سفارش آزمایشی از ابتدا تا ثبت نهایی تست شده
- [ ] آپلود عکس محصول از پنل ادمین کار می‌کنه و بعد از دیپلوی مجدد عکس‌ها می‌مونن
- [ ] بک‌آپ دستی از دیتابیس گرفته شده

## دیپلوی با Runflare CLI

بعد از یک بار `runflare login`، دیپلوی غیرتعاملی (پروژه‌ی `shoil-client`، شناسه‌ی `34043`):

| سرویس | پوشه | شناسه‌ی سرویس (`item-id`) |
|---|---|---|
| کلاینت (`frontend`) | `client/` | `80267` |
| سرور (`backend`) | `server/` | `80422` |

```
# کلاینت (RUNFLARE=1 برای خروجی dist لازمه)
cd client
RUNFLARE=1 runflare deploy --project-id 34043 --item-id 80267 --yes

# سرور
cd server
runflare deploy --project-id 34043 --item-id 80422 --yes
```

دستور را حتماً از داخل پوشه‌ی همون سرویس اجرا کن. برای دیدن پروژه/سرویس انتخاب‌شده: `runflare deploy -o json`.

## نکات مهم (بخون قبل از هر تغییر دیپلوی)

### ۱. عوض کردن VITE_API_URL به‌تنهایی کافی نیست — باید Rebuild بشه
مقدار `VITE_API_URL` موقع **build** داخل فایل‌های خروجی کدگذاری (bake) می‌شه، نه موقع اجرا. اگه فقط env variable رو عوض کنی و بیلد جدید نگیری، سایت زنده به آدرس قدیمی وصل می‌مونه. بعد از هر تغییر این متغیر یه بیلد/دیپلوی کامل جدید بگیر.

### ۲. همیشه فقط پوشه‌ی `client/` یا `server/` دیپلوی بشه
سرور و کلاینت تو یه ریپوی مونورپو هستن. هر سرویس رو از پوشه‌ی خودش دیپلوی کن، نه از ریشه‌ی ریپو، تا فایل‌های بی‌ربط باعث fail شدن بیلد نشن.

### ۳. هیچ‌وقت `npm install` یا `npm init` رو تو ریشه‌ی ریپو اجرا نکن
یه `package.json` اضافی تو ریشه (با دیپندنسی خراب `xlsx@0.18.5` که npm روش خطای 402 می‌ده) قبلاً باعث fail شدن بیلدها شد و حذف شد. فقط داخل `client/` یا `server/` نصب کن.
