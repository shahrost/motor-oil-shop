import { formatVolume } from "../../../utils/formatVolume";
import SpecLine, { ApiLabel } from "../../common/SpecLine";
import { getProductTypeSpec } from "../../../utils/productTypeSpec";

// مشخصات کارت ردیفی؛ روی موبایل هم دقیقاً همون خط‌های دسکتاپ نشون داده می‌شه
function RowCardSpecs({ product, name, language, t }) {
  const typeSpec = getProductTypeSpec(product);

  return (
    <>
      <h3 className="line-clamp-2 mt-2 text-xs sm:text-sm font-bold text-gray-900">
        {name}
      </h3>

      <div className="mt-2 text-xs sm:text-sm font-bold text-gray-700 space-y-1">
        {/* گیربکس اتوماتیک و روغن ترمز: به‌جای گرید و API فقط نوع (CVT، DCT...)
            یا استاندارد (DOT3، DOT4) */}
        {typeSpec ? (
          <>
            <SpecLine
              className="line-clamp-1"
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
              className="line-clamp-1"
              label={t("common.viscosity")}
              value={product.viscosity}
              reserveSpace
            />

            <SpecLine
              className="line-clamp-1"
              label={<ApiLabel />}
              value={product.api}
              reserveSpace
              isolate
            />
          </>
        )}

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
