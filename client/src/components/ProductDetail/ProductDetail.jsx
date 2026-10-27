import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import getBrandLabel from "../../utils/brandLabel";
import CompatibleVehicles from "../common/CompatibleVehicles";
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
} from "./sections";

function ProductDetail() {
  const { language, t } = useContext(LanguageContext);
  const { product, ...purchase } = useProductDetail();
  const goBack = useGoBack();
  // نام بعضی محصولات عمومیه («مکمل روغن موتور»)؛ برند کنارش میاد مگر اینکه خود نام داشته باشه‌ش
  const brandLabel = product ? getBrandLabel(product.brand, language) : "";
  const metaName =
    product && (product.name.includes(brandLabel) ? product.name : `${product.name} ${brandLabel}`);
  usePageMeta(metaName, t("meta.product").replace("{name}", metaName));

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-bold text-gray-700">
          {t("productDetail.notFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
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

          <ProductDescription description={product.description} t={t} />

          <ProductPurchase
            onAddCart={purchase.handleAddCart}
            added={purchase.added}
            canAdd={purchase.priceAvailable}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
