import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import LanguageContext from "../../../context/LanguageContext";
import { hasActivePromotion } from "../../../utils/promotionCalc";
import PromotionBadge from "../../common/PromotionBadge";

function ProductInfo({ product }) {
  const { language, t } = useContext(LanguageContext);

  return (
    <>
      {hasActivePromotion(product.promotion) && (
        <PromotionBadge className="mt-3" />
      )}

      <h2
        className="
        text-xl
        font-extrabold
        mt-4
        text-gray-900
        "
      >
        {product.name}
      </h2>

      <div className="mt-4 space-y-3 text-lg font-bold text-gray-800">
        <p>
          <span className="text-green-700">{t("common.brand")}</span>{" "}
          {getBrandLabel(product.brand, language)}
        </p>

        <p>
          <span className="text-green-700">{t("common.viscosity")}</span>{" "}
          {product.viscosity}
        </p>

        <p>
          <span className="text-green-700">{t("common.volume")}</span>{" "}
          {product.volume}
        </p>

        <p>
          <span className="text-green-700">
            {t("productCard.cartonCount")}
          </span>{" "}
          {product.cartonCount || "-"} {t("common.orderUnit.number")}
        </p>
      </div>

      <div className="mt-5">
        <p
          className="
          text-2xl
          font-extrabold
          text-green-700
          "
        >
          {formatPrice(product.price, language)}
        </p>

        <p className="text-sm text-gray-500">{t("productCard.pricePerUnit")}</p>
      </div>
    </>
  );
}

export default ProductInfo;
