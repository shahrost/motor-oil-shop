import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import getBrandLabel from "../../../utils/brandLabel";
import { findBrandLogo } from "../../../utils/brandLogo";
import BrandBadge from "../../common/BrandBadge";

// نشان برند کارت محصول (کارت عادی و ردیفی). محصول بی‌عکس نشان نمی‌گیره، چون
// عکس اصلی کارتش همین حالا خود لوگوی برنده.
function ProductBrandBadge({ product }) {
  const { language } = useContext(LanguageContext);

  return (
    <BrandBadge
      src={findBrandLogo(product.brand)}
      name={getBrandLabel(product.brand, language)}
      variant="product"
    />
  );
}

export default ProductBrandBadge;
