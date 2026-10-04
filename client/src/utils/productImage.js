import getImageUrl, { getThumbUrl } from "./getImageUrl";
import { getBrandLogo } from "./brandLogo";

// آدرس عکس محصول؛ اگه محصول عکس نداره لوگوی برندش نمایش داده می‌شه.
// (عکسی که آدرس داره ولی لود نمی‌شه، با onError به لوگوی برند برمی‌گرده.)
export function getProductImageSrc(product, width) {
  const main = product?.image?.main;

  if (!main) return getBrandLogo(product?.brand);

  return width ? getThumbUrl(main, width) : getImageUrl(main);
}

export default getProductImageSrc;
