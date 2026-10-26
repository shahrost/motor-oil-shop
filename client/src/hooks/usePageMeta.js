import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import LanguageContext from "../context/LanguageContext";
import brand from "../data/brand";

// تگ‌ها از قبل در index.html هستن (برای ربات‌های پیش‌نمایش که JS اجرا نمی‌کنن)؛ اینجا فقط مقدارشون عوض می‌شه
function setTag(selector, value) {
  const tag = document.head.querySelector(selector);
  if (!tag) return;
  tag.setAttribute(tag.tagName === "LINK" ? "href" : "content", value);
}

function applyTitle(title, description) {
  document.title = title;
  setTag('meta[property="og:title"]', title);
  setTag('meta[name="twitter:title"]', title);
  setTag('meta[name="description"]', description);
  setTag('meta[property="og:description"]', description);
  setTag('meta[name="twitter:description"]', description);
}

// عنوان و توضیح اختصاصی صفحه؛ با رفتن از صفحه، پیش‌فرض‌های brand برمی‌گردن
// (صفحه‌هایی که این hook رو ندارن عنوان کلی سایت رو نشون می‌دن)
export function usePageMeta(title, description) {
  const { language } = useContext(LanguageContext);
  const siteName = language === "en" ? brand.nameEn : brand.name;

  useEffect(() => {
    if (!title) return undefined;

    applyTitle(`${title} | ${siteName}`, description || brand.description);
    return () => applyTitle(brand.title, brand.description);
  }, [title, description, siteName]);
}

// آدرس canonical و og:url همیشه آدرس صفحه‌ی فعلی روی دامنه‌ی اصلی (www) است (در MainLayout)
export function useCanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = new URL(pathname, brand.siteUrl).href;
    setTag('link[rel="canonical"]', url);
    setTag('meta[property="og:url"]', url);
  }, [pathname]);
}
