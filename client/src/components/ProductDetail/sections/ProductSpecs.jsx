import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { formatVolume } from "../../../utils/formatVolume";
import { hasActivePromotion } from "../../../utils/promotionCalc";
import { formatApi, formatViscosity } from "../../../utils/specLabel";
import { untranslatedProps } from "../../../utils/untranslatedText";
import PromotionBadge from "../../common/PromotionBadge";
import SpecLine, { ApiLabel } from "../../common/SpecLine";

const LABEL_CLASS = "text-gray-500 font-bold";

// عنوان و مشخصات فنی محصول؛ مشخصه‌های خالی نمایش داده نمی‌شن
function ProductSpecs({ product, language, t }) {
  const name = getProductNameLabel(product.name, language);
  const brandLabel = getBrandLabel(product.brand, language);

  return (
    <div>
      {hasActivePromotion(product.promotion) && <PromotionBadge className="mb-3" />}

      <h1 {...untranslatedProps(name, language)} className="text-3xl font-extrabold text-black">
        {name}
      </h1>

      <div className="mt-6 space-y-3 text-black">
        <SpecLine
          labelClassName={LABEL_CLASS} label={t("common.brand")}
          value={<span {...untranslatedProps(brandLabel, language)}>{brandLabel}</span>}
        />

        <SpecLine
          labelClassName={LABEL_CLASS}
          className="break-words"
          label={t("common.viscosity")}
          value={formatViscosity(product.viscosity)}
        />

        <SpecLine
          labelClassName={LABEL_CLASS}
          label={t("common.volume")}
          value={formatVolume(product.volume, language)}
        />

        <SpecLine
          labelClassName={LABEL_CLASS} label={<ApiLabel />} value={formatApi(product.api)} isolate />

        <SpecLine
          labelClassName={LABEL_CLASS}
          label={
            <>
              <bdi>ACEA</bdi>:
            </>
          }
          value={product.acea}
          isolate
        />

        <SpecLine
          labelClassName={LABEL_CLASS} label={t("productDetail.oilType")}
          value={
            product.oilType && (
              <span {...untranslatedProps(product.oilType, language)}>{product.oilType}</span>
            )
          }
        />
      </div>
    </div>
  );
}

export default ProductSpecs;
