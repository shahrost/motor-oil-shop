import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { formatVolume } from "../../../utils/formatVolume";
import { hasActivePromotion } from "../../../utils/promotionCalc";
import PromotionBadge from "../../common/PromotionBadge";
import SpecLine, { ApiLabel } from "../../common/SpecLine";

const LABEL_CLASS = "text-gray-500 font-bold";

// عنوان و مشخصات فنی محصول؛ مشخصه‌های خالی نمایش داده نمی‌شن
function ProductSpecs({ product, language, t }) {
  return (
    <div>
      {hasActivePromotion(product.promotion) && <PromotionBadge className="mb-3" />}

      <h1 className="text-3xl font-extrabold text-black">
        {getProductNameLabel(product.name, language)}
      </h1>

      <div className="mt-6 space-y-3 text-black">
        <SpecLine
          labelClassName={LABEL_CLASS} label={t("common.brand")} value={getBrandLabel(product.brand, language)} />

        <SpecLine
          labelClassName={LABEL_CLASS}
          className="break-words"
          label={t("common.viscosity")}
          value={product.viscosity}
        />

        <SpecLine
          labelClassName={LABEL_CLASS}
          label={t("common.volume")}
          value={formatVolume(product.volume, language)}
        />

        <SpecLine
          labelClassName={LABEL_CLASS} label={<ApiLabel />} value={product.api} isolate />

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
          labelClassName={LABEL_CLASS} label={t("productDetail.oilType")} value={product.oilType} />
      </div>
    </div>
  );
}

export default ProductSpecs;
