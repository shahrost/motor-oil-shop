import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { formatVolume } from "../../../utils/formatVolume";
import LanguageContext from "../../../context/LanguageContext";
import { hasActivePromotion } from "../../../utils/promotionCalc";
import { getProductPrice } from "../../../utils/productPrice";
import PromotionBadge from "../../common/PromotionBadge";
import DiscountBadge from "../../common/DiscountBadge";
import SpecLine, { ApiLabel } from "../../common/SpecLine";

function ProductInfo({ product, paymentType }) {
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
        {getProductNameLabel(product.name, language)}
      </h2>

      <div className="mt-4 space-y-3 text-lg font-bold text-gray-800">
        <SpecLine
          label={t("common.brand")}
          value={getBrandLabel(product.brand, language)}
        />

        <SpecLine
          className="line-clamp-2 break-words"
          label={t("common.viscosity")}
          value={product.viscosity}
          title={product.viscosity}
          reserveSpace
        />

        <SpecLine
          className="line-clamp-1 break-words"
          label={<ApiLabel />}
          value={product.api}
          title={product.api}
          reserveSpace
          isolate
        />

        <SpecLine
          className="line-clamp-2 break-words"
          label={t("common.volume")}
          value={formatVolume(product.volume, language)}
          title={formatVolume(product.volume, language)}
        />

        <SpecLine
          label={t("productCard.cartonCount")}
          value={`${product.cartonCount || "-"} ${t("common.orderUnit.number")}`}
        />
      </div>

      <div className="mt-3 text-right">
        <DiscountBadge percent={product.discountPercent || 0} />
      </div>

      <div className="mt-2">
        <p
          className="
          text-2xl
          font-extrabold
          text-gray-950
          "
        >
          {formatPrice(getProductPrice(product, paymentType), language)}
        </p>

        <p className="text-sm text-gray-500">{t("productCard.pricePerUnit")}</p>
      </div>
    </>
  );
}

export default ProductInfo;
