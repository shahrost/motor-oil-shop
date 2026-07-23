function ImageUploader({ product, updateField }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">تصویر محصول</h3>

      <input
        type="text"
        value={product.image}
        onChange={(e) => updateField("image", e.target.value)}
        placeholder="آدرس تصویر محصول"
        className="border p-3 rounded-lg w-full"
      />

      {product.image && (
        <div className="flex justify-center bg-gray-100 p-5 rounded-lg">
          <img
            src={product.image}
            alt="preview"
            className="w-48 h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
