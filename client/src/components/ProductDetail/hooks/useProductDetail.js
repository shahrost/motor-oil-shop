import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import usePurchaseOptions from "../../../hooks/usePurchaseOptions";

// محصول صفحه از روی :id آدرس + انتخاب‌های خرید همون محصول.
// اگه از صفحه‌ی خودرو اومده، نام خودرو در state لینکه (با Back/Forward هم می‌مونه)
function useProductDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const { products } = useContext(ProductContext);

  const product = products.find((item) => item.id === id);

  return { product, ...usePurchaseOptions(product, { vehicle: state?.vehicle }) };
}

export default useProductDetail;
