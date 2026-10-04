import getBrandLabel from "../../../utils/brandLabel";
import { formatVolume } from "../../../utils/formatVolume";
import SpecLine, { ApiLabel } from "../../common/SpecLine";

// مشخصات کارت ردیفی؛ گرید و API روی موبایل پنهان‌اند تا کارت جمع‌وجور بمونه
function RowCardSpecs({ product, name, language, t }) {
  return (
    <>
      <h3 className="hidden sm:line-clamp-2 mt-2 text-sm font-bold text-gray-900">
        {name}
      </h3>

      <div className="mt-2 text-xs sm:text-sm font-bold text-gray-700 space-y-1">
        <SpecLine
          className="line-clamp-1"
          label={t("common.brand")}
          value={getBrandLabel(product.brand, language)}
        />

        <SpecLine
          className="hidden sm:line-clamp-1"
          label={t("common.viscosity")}
          value={product.viscosity}
          reserveSpace
        />

        <SpecLine
          className="hidden sm:line-clamp-1"
          label={<ApiLabel />}
          value={product.api}
          reserveSpace
          isolate
        />

        <SpecLine
          className="line-clamp-1"
          label={t("common.volume")}
          value={formatVolume(product.volume, language)}
        />
      </div>
    </>
  );
}

export default RowCardSpecs;
