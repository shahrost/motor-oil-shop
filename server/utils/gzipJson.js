const zlib = require("zlib");

// جواب‌های لیستی بزرگ (همه‌ی محصولات، خودروهای سازگار فیلترها) یک بار به شکل
// gzip‌شده ساخته و همین بافر کوچک (~۱۰۰KB) کش می‌شه، نه آرایه‌ی آبجکت‌ها (چند MB) —
// هر درخواست هم دیگه JSON و gzip رو از نو نمی‌سازه. سقف حافظه‌ی Runflare: PROJECT_STATE بخش ۳۵.

// بدنه‌ی هم‌شکل apiResponse.success؛ dataJson رشته‌ی JSON آماده‌ی data است
function gzipSuccessBody(dataJson) {
  return zlib.gzipSync(`{"success":true,"message":"موفق","data":${dataJson}}`);
}

// ارسال بافر gzip‌شده؛ کلاینتی که gzip نمی‌پذیره (نادر) نسخه‌ی باز‌شده رو می‌گیره.
// چون Content-Encoding از قبل ست شده، middleware ‏compression دوباره فشرده نمی‌کنه.
function sendGzippedJson(req, res, body) {
  res.type("json");
  res.vary("Accept-Encoding");

  if (!req.acceptsEncodings("gzip")) return res.send(zlib.gunzipSync(body));

  res.set("Content-Encoding", "gzip");

  return res.send(body);
}

module.exports = { gzipSuccessBody, sendGzippedJson };
