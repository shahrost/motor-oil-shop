import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import getBrandLabel from "../../utils/brandLabel";
import CompatibleVehicles from "../common/CompatibleVehicles";
import NotFound from "../NotFound";
import ProductPrice from "../common/ProductPrice";
import useProductDetail from "./hooks/useProductDetail";
import useGoBack from "./hooks/useGoBack";
import {
  ProductGallery,
  ProductSpecs,
  PurchaseOptions,
  PromotionInfo,
  ProductDescription,
  ProductPurchase,
  BackButton,
  StickyPurchaseBar,
  ProductDetailSkeleton,
} from "./sections";

function ProductDetail() {
  const { language, t } = useContext(LanguageContext);
  const { product, loading, ...purchase } = useProductDetail();
  const goBack = useGoBack();
  // نام بعضی محصولات عمومیه («مکمل روغن موتور»)؛ برند کنارش میاد مگر اینکه خود نام داشته باشه‌ش
  const brandLabel = product ? getBrandLabel(product.brand, language) : "";
  const metaName =
    product && (product.name.includes(brandLabel) ? product.name : `${product.name} ${brandLabel}`);
  usePageMeta(metaName, t("meta.product").replace("{name}", metaName));

  // تا لیست محصولات نرسیده «پیدا نشد» نشون داده نمی‌شه
  if (!product && loading) return <ProductDetailSkeleton />;

  if (!product) return <NotFound message={t("productDetail.notFound")} />;

  return (
    // زیر lg نوار پایین (StickyPurchaseBar) آخرین بخش صفحه‌ست، پس padding پایین فقط دسکتاپ
    <div className="max-w-7xl mx-auto px-5 pt-10 lg:pb-10">
      <BackButton onBack={goBack} label={t("productDetail.back")} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery product={product} />

        <div>
          <ProductSpecs product={product} language={language} t={t} />

          <CompatibleVehicles
            product={product}
            defaultOpen
            className="mt-4"
          />

          <PurchaseOptions
            t={t}
            product={product}
            orderType={purchase.orderType}
            setOrderType={purchase.setOrderType}
            quantity={purchase.quantity}
            setQuantity={purchase.setQuantity}
            paymentType={purchase.paymentType}
            setPaymentType={purchase.setPaymentType}
          />

          <div className="mt-6">
            <ProductPrice
              product={product}
              paymentType={purchase.paymentType}
              orderType={purchase.orderType}
              className="text-3xl sm:text-4xl font-extrabold text-gray-950"
              noteClassName="sm:text-sm"
            />
          </div>

          <PromotionInfo
            product={product}
            orderType={purchase.orderType}
            quantity={purchase.quantity}
            paymentType={purchase.paymentType}
            t={t}
          />

          <ProductDescription description={product.description} language={language} t={t} />

          {/* دکمه‌ی داخل صفحه فقط دسکتاپ؛ موبایل و تبلت نوار ثابت پایین دارن */}
          <div className="hidden lg:block">
            <ProductPurchase
              onAddCart={purchase.handleAddCart}
              added={purchase.added}
              canAdd={purchase.priceAvailable}
            />
          </div>
        </div>
      </div>

      <StickyPurchaseBar product={product} purchase={purchase} t={t} />
    </div>
  );
}

export default ProductDetail;
