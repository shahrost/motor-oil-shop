# راهنمای هاست کردن — شهرام روغن

آخرین بروزرسانی: 2026-08-26

مسیر انتخاب‌شده: هاست ایرانی (Liara) برای هم سرور و هم دیتابیس، تا سرعت و پایداری برای مشتری ایرانی تضمین بشه (به‌جای ترکیب سرور داخل + Atlas خارج که ریسک قطعی داره).

## پیش‌نیازها (کارهایی که باید خودت انجام بدی)

- [ ] ثبت دامنه `.ir` (مثلاً `shahramoil.ir`) از یه رجیسترار مثل ایران‌سرور یا ملی‌دامین
- [ ] ساخت حساب روی [liara.ir](https://liara.ir) و شارژ حساب (پرداخت با کارت بانکی ایرانی)
- [ ] دسترسی به همون اکانت MongoDB Atlas فعلی (برای مرحله‌ی کوچ داده)

## مرحله ۱ — ساخت دیتابیس روی Liara

1. تو پنل Liara یه دیتابیس MongoDB جدید بساز.
2. رشته‌ی اتصال (connection string) جدید رو یادداشت کن.
3. **کوچ داده از Atlas:**
   ```
   mongodump --uri="<connection string فعلی Atlas>" --out=./backup
   mongorestore --uri="<connection string جدید Liara>" ./backup
   ```
   (نیاز به نصب `mongodb-database-tools` رو سیستمت داره)
4. بعد از کوچ، با یه کلاینت Mongo (مثل Compass) وصل شو و تعداد رکوردهای `products`، `customers`، `orders` رو با Atlas مقایسه کن تا مطمئن بشی چیزی جا نمونده.

## مرحله ۲ — دیپلوی سرور (Express)

1. یه App جدید از نوع Node.js تو Liara بساز و به ریپوی گیت‌هاب پروژه (پوشه‌ی `server`) وصلش کن.
2. Environment Variableهای زیر رو تو پنل Liara ست کن (لیست کامل تو [server/.env.example](server/.env.example)):
   - `MONGO_URI` → همون رشته‌ی اتصال دیتابیس Liara
   - `JWT_SECRET` → **یه مقدار جدید و رندوم بساز، هرگز مقدار توسعه رو استفاده نکن**
     ```
     node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
     ```
   - `CORS_ORIGIN` → آدرس نهایی سایت، مثلاً `https://shahramoil.ir`
   - `ADMIN_USERNAME` و `ADMIN_PASSWORD_HASH` → با `server/scripts/hashPassword.js` یه پسورد قوی جدید بساز
   - `PORT` → معمولاً Liara خودش ست می‌کنه، دست نزن
3. دستور استارت: `npm start` (تازه اضافه شد، `server.js` رو اجرا می‌کنه).
4. بعد از دیپلوی، آدرس `https://<app-name>.liara.run/` رو باز کن و پیام «Shahram Roghan API is running» رو ببین.

## مرحله ۳ — دیپلوی کلاینت (React build)

1. یه App استاتیک (Static Site) دیگه تو Liara بساز، به پوشه‌ی `client` وصلش کن.
2. Environment Variable: `VITE_API_URL` = آدرس سرور مرحله‌ی قبل + `/api` (مثلاً `https://api.shahramoil.ir/api`)
3. دستور build: `npm run build`، پوشه‌ی خروجی: `dist`

## مرحله ۴ — وصل کردن دامنه

1. تو پنل رجیسترار دامنه، رکوردهای DNS رو طبق راهنمای Liara به سمت IP/CNAME اونجا تغییر بده (برای دامنه‌ی اصلی سایت و یه ساب‌دامین مثل `api.` برای سرور).
2. SSL رایگان (Let's Encrypt) رو معمولاً Liara خودکار فعال می‌کنه — بعد از انتشار DNS چک کن قفل HTTPS تو مرورگر بیاد.

## چک‌لیست نهایی قبل از اعلام عمومی سایت

- [ ] `JWT_SECRET` و `ADMIN_PASSWORD_HASH` پروداکشن با مقادیر توسعه فرق دارن
- [ ] `CORS_ORIGIN` فقط دامنه‌ی نهایی رو مجاز می‌کنه (نه `localhost`)
- [ ] لاگین ادمین و پنل مدیریت با اکانت جدید تست شده
- [ ] یه سفارش آزمایشی از ابتدا تا ثبت نهایی تست شده
- [ ] آپلود عکس محصول از پنل ادمین کار می‌کنه (مسیر `uploads` روی هاست جدید persist می‌مونه — این رو با Liara چک کن، چون بعضی پلتفرم‌ها دیسک رو در هر دیپلوی ریست می‌کنن)
- [ ] بک‌آپ دستی از دیتابیس گرفته شده (قبل از عمومی شدن سایت)
