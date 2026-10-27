import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import formatPrice from "../../utils/formatPrice";
import {
  getProductPrice,
  getUnitTotalPrice,
  hasProductPrice,
} from "../../utils/productPrice";

// قیمت محصول با روش پرداخت و واحد خرید انتخاب‌شده (کارت‌ها، صفحه‌ی محصول، سبد):
// «عدد» ← قیمت + «هر عدد»؛ «کارتن» ← قیمت کل کارتن + زیرش «هر کارتن N عدد — عددی X تومان»؛
// قیمت خالی/صفر ← «برای قیمت تماس بگیرید»
function ProductPrice({ product, paymentType, orderType, className = "", noteClassName = "" }) {
  const { language, t } = useContext(LanguageContext);

  if (!hasProductPrice(product, paymentType)) {
    return (
      <p className="text-sm sm:text-base font-bold text-gray-700">
        {t("common.callForPrice")}
      </p>
    );
  }

  const isCarton = orderType === "carton";
  const note = `text-xs font-normal text-gray-500 ${noteClassName}`;

  return (
    <div>
      <p className={`whitespace-nowrap ${className}`}>
        {formatPrice(getUnitTotalPrice(product, paymentType, orderType), language)}
        {!isCarton && <span className={`ms-1 ${note}`}>{t("productCard.perUnit")}</span>}
      </p>

      {isCarton && (
        <p className={note}>
          {t("productCard.perCarton")
            .replace("{count}", product.cartonCount || 1)
            .replace("{price}", formatPrice(getProductPrice(product, paymentType), language))}
        </p>
      )}
    </div>
  );
}

export default ProductPrice;
