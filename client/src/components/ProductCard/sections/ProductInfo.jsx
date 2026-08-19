import formatPrice from "../../../utils/formatPrice";

function ProductInfo({ product }) {
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
          <span className="font-bold text-green-700">برند:</span>{" "}
          {product.brand}
        </p>

        <p>
          <span className="font-bold text-green-700">گرید:</span>{" "}
          {product.viscosity}
        </p>

        <p>
          <span className="font-bold text-green-700">حجم:</span>{" "}
          {product.volume}
        </p>

        <p>
          <span className="font-bold text-green-700">تعداد در کارتن:</span>{" "}
          {product.cartonCount || "-"} عدد
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
          {formatPrice(product.price)}
        </p>

        <p className="text-xs text-gray-500">قیمت هر عدد</p>
      </div>
    </>
  );
}

export default ProductInfo;
