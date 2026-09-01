import { useContext } from "react";
import useProductDetail from "./hooks/useProductDetail";
import ProductGallery from "./sections/ProductGallery";
import ProductInfo from "./sections/ProductInfo";
import ProductPurchase from "./sections/ProductPurchase";
import LanguageContext from "../../context/LanguageContext";

function ProductDetail() {
  const { t } = useContext(LanguageContext);
  const {
    product,
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    paymentType,
    setPaymentType,
    finalCount,
    handleCart,
    added,
  } = useProductDetail();

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
          <ProductInfo product={product} />

          <ProductPurchase
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            orderType={orderType}
            setOrderType={setOrderType}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            finalCount={finalCount}
            handleCart={handleCart}
            added={added}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
