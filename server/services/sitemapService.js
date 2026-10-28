const zlib = require("zlib");

const productRepository = require("../repositories/productRepository");
const vehicleRepository = require("../repositories/vehicleRepository");
const createListCache = require("../utils/listCache");

// نقشه‌ی سایت پویا: صفحه‌ی همه‌ی محصولات فعال و همه‌ی خودروها. صفحه‌های ثابت (اصلی، دسته‌ها،
// برندها) در client/public/sitemap.xml می‌مونن؛ robots.txt سایت به هر دو اشاره می‌کنه.
// XML یک بار ساخته و gzip‌شده (~۲۰KB) کش می‌شه تا حافظه‌ی سرور کم مصرف بشه (سقف Runflare).
const SITE_URL = (process.env.SITE_URL || "https://www.shoil.ir").replace(/\/$/, "");

const sitemapCache = createListCache({ name: "Sitemap", ttlMs: 6 * 60 * 60 * 1000 });

function urlEntry(path, updatedAt) {
  const lastmod = updatedAt ? `<lastmod>${new Date(updatedAt).toISOString().slice(0, 10)}</lastmod>` : "";

  return `<url><loc>${SITE_URL}${path}</loc>${lastmod}</url>`;
}

async function buildSitemap() {
  const products = await productRepository.getSitemapEntries();
  const vehicles = await vehicleRepository.getSitemapEntries();

  const urls = [
    ...products.map((item) => urlEntry(`/product/${item._id}`, item.updatedAt)),
    ...vehicles.map((item) => urlEntry(`/vehicle/${item._id}`, item.updatedAt)),
  ];

  return zlib.gzipSync(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
  );
}

// بافر gzip‌شده‌ی XML
function getSitemapGzip() {
  return sitemapCache.get(buildSitemap);
}

module.exports = { getSitemapGzip };
