import { useContext } from "react";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { formatVolume } from "../../../utils/formatVolume";
import LanguageContext from "../../../context/LanguageContext";
import { hasActivePromotion } from "../../../utils/promotionCalc";
import PromotionBadge from "../../common/PromotionBadge";
import DiscountBadge from "../../common/DiscountBadge";
import SpecLine, { ApiLabel } from "../../common/SpecLine";
import CompatibleVehicles from "../../common/CompatibleVehicles";
import ProductPrice from "../../common/ProductPrice";
import { getProductTypeSpec } from "../../../utils/productTypeSpec";
import { formatApi, formatViscosity } from "../../../utils/specLabel";

function ProductInfo({ product, paymentType, orderType }) {
  const { language, t } = useContext(LanguageContext);
  const typeSpec = getProductTypeSpec(product);

  return (
    <>
      {hasActivePromotion(product.promotion) && (
        <PromotionBadge className="mt-3" />
      )}

      <h2
        className="
        text-xl
        font-extrabold
        mt-2
        text-gray-900
        "
      >
        {getProductNameLabel(product.name, language)}
      </h2>

      <div className="mt-2 space-y-1 text-base font-bold text-gray-800">
        {/* گیربکس اتوماتیک و روغن ترمز گرید و API ندارن؛ به‌جاش نوع (CVT، DCT...) یا
            استاندارد (DOT3، DOT4) میاد و یک خط خالی می‌مونه تا با کارت‌های کناری هم‌قد بمونه */}
        {typeSpec ? (
          <>
            <SpecLine
              className="line-clamp-1 break-words"
              label={t(typeSpec.labelKey)}
              value={typeSpec.value}
              reserveSpace
              isolate
            />
            <SpecLine label="-" value="" reserveSpace />
          </>
        ) : (
          <>
            <SpecLine
              className="line-clamp-2 break-words"
              label={t("common.viscosity")}
              value={formatViscosity(product.viscosity)}
              title={product.viscosity}
              reserveSpace
            />

            <SpecLine
              className="line-clamp-1 break-words"
              label={<ApiLabel />}
              value={formatApi(product.api)}
              title={product.api}
              reserveSpace
              isolate
            />
          </>
        )}

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

      <CompatibleVehicles product={product} className="mt-2" />

      {/* قیمت و نشان تخفیف تو یک ردیف تا کارت یک ردیف کوتاه‌تر بشه؛
          mt-auto: قیمت و کنترل‌های خرید زیرش در کارت‌های هم‌ردیف ته کارت و هم‌ترازن */}
      <div className="mt-auto pt-2 flex items-start justify-between gap-2">
        <ProductPrice
          product={product}
          paymentType={paymentType}
          orderType={orderType}
          className="text-lg sm:text-xl font-extrabold text-gray-950"
        />

        <DiscountBadge percent={product.discountPercent || 0} />
      </div>
    </>
  );
}

export default ProductInfo;
