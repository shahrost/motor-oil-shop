/* =========================
      Service Worker — PWA شهرام روغن

      فقط درخواست‌های GET همین دامنه رو می‌بینه. API روی
      api.shoil.ir است، پس قیمت، موجودی، سبد، سفارش، ورود و
      پرداخت هیچ‌وقت از اینجا رد نمی‌شن و کش نمی‌شن.

      - صفحه‌ها (HTML): همیشه از اینترنت (network-first)؛ قطع بود ← offline.html.
        خود صفحه کش نمی‌شه تا اطلاعات کهنه هیچ‌وقت دیده نشه.
      - /assets/ (JS/CSS/فونت/عکس با اسم هش‌دار Vite): cache-first.
      - بقیه‌ی عکس/آیکون‌های همین دامنه: از کش + تازه‌سازی در پس‌زمینه.

      با عوض کردن CACHE_VERSION کش قدیمی همه‌ی کاربرها پاک می‌شه.
      در آپدیت‌های معمولی سایت لازم نیست (HTML همیشه تازه است و
      فایل‌های build جدید اسم جدید دارن).
========================= */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `shoil-static-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";
const MAX_STATIC_ENTRIES = 120;

const PRECACHE_URLS = [OFFLINE_URL, "/favicon.svg", "/icons/icon-192.png"];

const STATIC_EXTENSIONS =
  /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|webp|avif|gif|svg|ico)$/i;

// مسیرهایی که هرگز نباید کش بشن (حتی اگه روزی روی همین دامنه بیان)
const NEVER_CACHE = /^\/(?:api|admin|login|account|cart|order|register)(?:\/|$)/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("shoil-") && key !== STATIC_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (NEVER_CACHE.test(url.pathname) || url.search) return;
  if (!STATIC_EXTENSIONS.test(url.pathname)) return;

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(event, request));
  }
});

async function networkFirstPage(request) {
  try {
    return await fetch(request);
  } catch {
    const offline = await caches.match(OFFLINE_URL);
    return offline || Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await putInCache(request, response);
  return response;
}

async function staleWhileRevalidate(event, request) {
  const cached = await caches.match(request);
  const network = fetch(request).then(async (response) => {
    await putInCache(request, response);
    return response;
  });
  if (cached) {
    event.waitUntil(network.catch(() => {}));
    return cached;
  }
  return network;
}

async function putInCache(request, response) {
  // فقط جواب کامل و موفق؛ nginx برای فایل نبود index.html برمی‌گردونه که نباید جای فایل کش بشه
  const type = response.headers.get("content-type") || "";
  if (!response.ok || response.type !== "basic" || type.includes("text/html")) {
    return;
  }
  const cache = await caches.open(STATIC_CACHE);
  await cache.put(request, response.clone());
  await trimCache(cache);
}

async function trimCache(cache) {
  const keys = await cache.keys();
  const extra = keys.length - MAX_STATIC_ENTRIES;
  for (let i = 0; i < extra; i += 1) {
    if (!PRECACHE_URLS.includes(new URL(keys[i].url).pathname)) {
      await cache.delete(keys[i]);
    }
  }
}
