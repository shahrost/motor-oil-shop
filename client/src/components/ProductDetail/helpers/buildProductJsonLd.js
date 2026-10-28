import brand from "../../../data/brand";
import { getProductImageSrc, hasProductImage } from "../../../utils/productImage";
import { getProductPrice } from "../../../utils/productPrice";

// داده‌ی ساختاریافته‌ی schema.org/Product برای نمایش نام، عکس و قیمت در نتایج گوگل.
// قیمت سایت تومانه و schema فقط کد ارز ISO می‌پذیره، پس به ریال (IRR) نوشته می‌شه.
// محصول بی‌قیمت («تماس بگیرید») offers نداره.
function buildProductJsonLd(product, name) {
  const url = new URL(`/product/${product.id}`, brand.siteUrl).href;
  const price = getProductPrice(product, "cash") || getProductPrice(product, "check");

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    url,
    sku: product.sku || undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    description: product.description || undefined,
    image: hasProductImage(product)
      ? new URL(getProductImageSrc(product), brand.siteUrl).href
      : undefined,
  };

  if (price > 0) {
    data.offers = {
      "@type": "Offer",
      url,
      priceCurrency: "IRR",
      price: price * 10,
      availability:
        product.isActive === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: brand.name },
    };
  }

  return data;
}

export default buildProductJsonLd;
