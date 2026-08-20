import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import LanguageContext from "../../../context/LanguageContext";

function ProductInfo({ product }) {
  const { language, t } = useContext(LanguageContext);

  return (
    <>
      <h2
        className="
        text-lg
        font-extrabold
        mt-4
        text-gray-900
        "
      >
        {product.name}
      </h2>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="font-bold text-green-700">{t("common.brand")}</span>{" "}
          {getBrandLabel(product.brand, language)}
        </p>

        <p>
          <span className="font-bold text-green-700">{t("common.viscosity")}</span>{" "}
          {product.viscosity}
        </p>

        <p>
          <span className="font-bold text-green-700">{t("common.volume")}</span>{" "}
          {product.volume}
        </p>

        <p>
          <span className="font-bold text-green-700">
            {t("productCard.cartonCount")}
          </span>{" "}
          {product.cartonCount || "-"} {t("common.orderUnit.number")}
        </p>
      </div>

      <div className="mt-5">
        <p
          className="
          text-xl
          font-extrabold
          text-green-700
          "
        >
          {formatPrice(product.price, language)}
        </p>

        <p className="text-xs text-gray-500">{t("productCard.pricePerUnit")}</p>
      </div>
    </>
  );
}

export default ProductInfo;
