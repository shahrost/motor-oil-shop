import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

import { getScrollMemory, saveScrollMemory } from "../../../services/scrollMemoryStorage";
import {
  isBackForwardPageLoad,
  readScrollSnapshot,
  restoreScrollSnapshot,
} from "../helpers/scrollSnapshot";

// مرورگر بعد از رفرش جای قبلی اسکرول رو برمی‌گردونه؛ چون محصولات دیرتر لود می‌شن
// صفحه آخرش به پایین می‌پرید. بازگردانی خودکار مرورگر خاموشه و این hook خودش انجامش می‌ده.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// - رفتن به صفحه‌ی جدید (لینک): از بالای صفحه شروع می‌شه
// - Back/Forward: همون جای اسکرول صفحه، اسکرول افقی ردیف برندها و کارت محصول
//   کلیک‌شده برمی‌گرده (بعد از رندر کامل لیست)
// - عوض شدن فقط query (فیلترها، تب دسته‌ی خودرو): اسکرول دست نمی‌خوره
// - لود اول / رفرش: بالای صفحه (لود کامل با Back مرورگر: جای قبلی)
function useScrollRestoration() {
  const { key, pathname, search } = useLocation();
  const navigationType = useNavigationType();
  const lastPathname = useRef(null);

  // اولین صفحه‌ی هر تب کلید "default" داره؛ آدرس کنارش میاد تا صفحه‌های مختلف قاطی نشن
  const memoryKey = key === "default" ? `default:${pathname}${search}` : key;

  // جای اسکرول این صفحه‌ی تاریخچه مدام ثبت می‌شه. layout effect: پاکسازی قبل از
  // اولین رویداد اسکرولِ صفحه‌ی بعدی انجام می‌شه تا جای صفحه‌ی قبل خراب نشه
  useLayoutEffect(() => {
    let frame = 0;

    const record = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => saveScrollMemory(memoryKey, readScrollSnapshot()));
    };

    // آخرین محصول کلیک‌شده (هر جای کارت) تا بعد از برگشت حتماً دیده بشه
    const recordClick = (event) => {
      const card = event.target.closest?.("[data-product-id]");

      saveScrollMemory(memoryKey, {
        ...readScrollSnapshot(),
        productId: card ? card.dataset.productId : null,
      });
    };

    // capture: اسکرول افقی ردیف‌ها bubble نمی‌شه
    document.addEventListener("scroll", record, { capture: true, passive: true });
    document.addEventListener("click", recordClick, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", record, { capture: true });
      document.removeEventListener("click", recordClick, true);
    };
  }, [memoryKey]);

  useLayoutEffect(() => {
    const isFirstLoad = lastPathname.current === null;
    const pathnameChanged = lastPathname.current !== pathname;

    lastPathname.current = pathname;

    if (isFirstLoad && !isBackForwardPageLoad()) return undefined;

    if (navigationType === "POP") {
      const saved = getScrollMemory(memoryKey);

      if (saved) return restoreScrollSnapshot(saved);
    }

    if (pathnameChanged) window.scrollTo({ top: 0, behavior: "instant" });

    return undefined;
  }, [memoryKey, pathname, navigationType]);
}

export default useScrollRestoration;
