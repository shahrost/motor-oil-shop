import { lazy } from "react";

import { getLastChunkReload, markChunkReload } from "../services/chunkReloadStorage";

// حداقل فاصله‌ی دو رفرش خودکار؛ کمتر از این یعنی فایل واقعاً مشکل داره و خطا نشون داده می‌شه
const RELOAD_GAP_MS = 10000;

// مثل React.lazy برای صفحه‌ها، با یک فرق: با هر دیپلوی فایل‌های قدیمی صفحه‌ها از سرور پاک می‌شن
// و تبی که از قبل باز مونده موقع رفتن به صفحه‌ی جدید فایل قدیمی رو پیدا نمی‌کنه (کل صفحه سفید
// می‌شد). اون موقع یک بار صفحه رفرش می‌شه تا نسخه‌ی جدید سایت (و همون آدرس مقصد) لود بشه.
function lazyPage(load) {
  return lazy(() =>
    load().catch((error) => {
      if (Date.now() - getLastChunkReload() < RELOAD_GAP_MS) throw error;

      markChunkReload();
      window.location.reload();

      // تا رفرش انجام بشه چیزی رندر نمی‌شه
      return new Promise(() => {});
    }),
  );
}

export default lazyPage;
