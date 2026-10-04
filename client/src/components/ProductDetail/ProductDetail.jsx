import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import formatPrice from "../../utils/formatPrice";
import { getProductPrice } from "../../utils/productPrice";
import useProductDetail from "./hooks/useProductDetail";
import {
  ProductGallery,
  ProductSpecs,
  PurchaseOptions,
  PromotionInfo,
  ProductDescription,
  ProductPurchase,
} from "./sections";

function ProductDetail() {
  const { language, t } = useContext(LanguageContext);
  const { product, ...purchase } = useProductDetail();

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery product={product} />

        <div>
          <ProductSpecs product={product} language={language} t={t} />

          <PurchaseOptions
            t={t}
            orderType={purchase.orderType}
            setOrderType={purchase.setOrderType}
            quantity={purchase.quantity}
            setQuantity={purchase.setQuantity}
            paymentType={purchase.paymentType}
            setPaymentType={purchase.setPaymentType}
          />

          <p className="mt-6 text-4xl font-extrabold text-gray-950">
            {formatPrice(getProductPrice(product, purchase.paymentType), language)}
          </p>

          <PromotionInfo
            product={product}
            orderType={purchase.orderType}
            quantity={purchase.quantity}
            paymentType={purchase.paymentType}
            t={t}
          />

          <ProductDescription description={product.description} t={t} />

          <ProductPurchase onAddCart={purchase.handleAddCart} added={purchase.added} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
