import { useContext } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import usePurchaseOptions from "../../../hooks/usePurchaseOptions";

// محصول صفحه از روی :id آدرس + انتخاب‌های خرید همون محصول
function useProductDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products.find((item) => item.id === id);

  return { product, ...usePurchaseOptions(product) };
}

export default useProductDetail;
