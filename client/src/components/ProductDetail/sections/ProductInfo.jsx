import formatPrice from "../../../utils/formatPrice";

function ProductInfo({ product }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-black">{product.name}</h1>

      <div className="mt-6 space-y-3 text-black">
        <p>
          <b className="text-green-700">برند:</b> {product.brand}
        </p>

        <p>
          <b className="text-green-700">گرید:</b> {product.viscosity}
        </p>

        <p>
          <b className="text-green-700">حجم:</b> {product.volume}
        </p>

        <p>
          <b className="text-green-700">API:</b> {product.api}
        </p>

        <p>
          <b className="text-green-700">ACEA:</b> {product.acea}
        </p>

        <p>
          <b className="text-green-700">نوع روغن:</b> {product.oilType}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-extrabold text-green-700">
          {formatPrice(product.price)}
        </p>

        <span className="inline-block mt-3 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
          🟢 موجود
        </span>
      </div>

      {product.description && (
        <div className="mt-6 bg-gray-50 rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3">توضیحات محصول</h3>

          <p className="leading-8 text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
