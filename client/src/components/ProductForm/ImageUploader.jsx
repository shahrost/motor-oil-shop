function ImageUploader({ product, updateField }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">تصویر محصول</h3>

      <input
        type="text"
        value={product.image?.main || ""}
        onChange={(e) =>
          updateField("image", {
            main: e.target.value,
            gallery: product.image?.gallery || [],
          })
        }
        placeholder="/products/brand/product-name.png"
        className="border p-3 rounded-lg w-full"
      />

      {product.image?.main && (
        <div className="flex justify-center bg-gray-100 p-5 rounded-lg">
          <img
            src={product.image.main}
            alt={product.name || "product"}
            className="w-48 h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
