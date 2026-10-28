const zlib = require("zlib");

const sitemapService = require("../services/sitemapService");

// GET /sitemap-dynamic.xml — صفحه‌ی همه‌ی محصولات و خودروها برای موتورهای جستجو
async function getSitemap(req, res, next) {
  try {
    const body = await sitemapService.getSitemapGzip();

    res.type("application/xml");
    res.vary("Accept-Encoding");
    res.set("Cache-Control", "public, max-age=3600");

    if (!req.acceptsEncodings("gzip")) return res.send(zlib.gunzipSync(body));

    res.set("Content-Encoding", "gzip");

    return res.send(body);
  } catch (error) {
    next(error);
  }
}

module.exports = { getSitemap };
