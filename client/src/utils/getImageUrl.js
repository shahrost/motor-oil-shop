const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/api\/?$/, "");

function getImageUrl(path) {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

// نسخه‌ی کوچک عکس برای کارت‌ها: Cloudinary خودش عکس رو کوچیک و فشرده می‌کنه.
// عکس‌های لوکال (/uploads) همون آدرس اصلی رو برمی‌گردونن.
export function getThumbUrl(path, width = 320) {
  const url = getImageUrl(path);

  if (!/^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url)) {
    return url;
  }

  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

export default getImageUrl;
