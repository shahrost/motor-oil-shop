import { useEffect, useState } from "react";

// نتیجه‌ی هر loader به ازای هر ورودی نگه داشته می‌شه تا برگشت به صفحه فوری باشه
const caches = new WeakMap();

function getCache(loader) {
  if (!caches.has(loader)) caches.set(loader, new Map());

  return caches.get(loader);
}

// داده‌ی یک صفحه‌ی خودرو از سرور، با کش بین بازدیدها.
// loader باید تابع ثابت (بیرون از کامپوننت) باشه. خروجی: undefined تا رسیدن،
// بعد داده؛ در خطا null (خطا کش نمی‌شه تا دفعه‌ی بعد دوباره تلاش بشه).
function useCachedLoad(loader, arg) {
  const cache = getCache(loader);
  const [result, setResult] = useState(() => ({ arg, data: cache.get(arg) }));

  // ورودی عوض شد (مثلاً رفتن از یک برند به برند دیگه)
  if (result.arg !== arg) setResult({ arg, data: cache.get(arg) });

  useEffect(() => {
    if (cache.has(arg)) return;

    let cancelled = false;

    loader(arg)
      .then((data) => {
        cache.set(arg, data);

        if (!cancelled) setResult({ arg, data });
      })
      .catch((error) => {
        console.log("خطا در دریافت اطلاعات خودرو", error);

        if (!cancelled) setResult({ arg, data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [cache, loader, arg]);

  return result.arg === arg ? result.data : cache.get(arg);
}

export default useCachedLoad;
