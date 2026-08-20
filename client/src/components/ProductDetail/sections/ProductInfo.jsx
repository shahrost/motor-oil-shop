import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import LanguageContext from "../../../context/LanguageContext";

function ProductInfo({ product }) {
  const { language, t } = useContext(LanguageContext);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-black">{product.name}</h1>

      <div className="mt-6 space-y-3 text-black">
        <p>
          <b className="text-green-700">{t("common.brand")}</b>{" "}
          {getBrandLabel(product.brand, language)}
        </p>

        <p>
          <b className="text-green-700">{t("common.viscosity")}</b> {product.viscosity}
        </p>

        <p>
          <b className="text-green-700">{t("common.volume")}</b> {product.volume}
        </p>

        <p>
          <b className="text-green-700">API:</b> {product.api}
        </p>

        <p>
          <b className="text-green-700">ACEA:</b> {product.acea}
        </p>

        <p>
          <b className="text-green-700">{t("productDetail.oilType")}</b>{" "}
          {product.oilType}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-extrabold text-green-700">
          {formatPrice(product.price, language)}
        </p>

        <span className="inline-block mt-3 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
          🟢 {t("productDetail.inStock")}
        </span>
      </div>

      {product.description && (
        <div className="mt-6 bg-gray-50 rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3">{t("productDetail.description")}</h3>

          <p className="leading-8 text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
