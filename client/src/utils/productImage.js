import getImageUrl, { getThumbUrl } from "./getImageUrl";
import { getBrandLogo } from "./brandLogo";

// آدرس عکس محصول؛ اگه محصول عکس نداره لوگوی برندش نمایش داده می‌شه.
export function getProductImageSrc(product, width) {
  const main = product?.image?.main;

  if (!main) return getBrandLogo(product?.brand);

  return width ? getThumbUrl(main, width) : getImageUrl(main);
}

// onError برای <img> محصول: عکسی که آدرس داره ولی لود نمی‌شه، با لوگوی برند جایگزین می‌شه
export function handleProductImageError(product) {
  return (e) => {
    e.target.onerror = null;
    e.target.src = getBrandLogo(product?.brand);
  };
}

export default getProductImageSrc;
