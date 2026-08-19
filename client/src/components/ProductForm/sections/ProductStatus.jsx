function ProductStatus({ product, updateField }) {
  return (
    <section className="mb-6">
      <h3 className="text-xl font-bold mb-4">وضعیت محصول</h3>

      <label className="flex items-center gap-3 mb-3">
        <input
          type="checkbox"
          checked={product.isActive}
          onChange={(e) => updateField("isActive", e.target.checked)}
        />
        فعال بودن محصول
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={product.isBestSeller}
          onChange={(e) => updateField("isBestSeller", e.target.checked)}
        />
        پرفروش
      </label>
    </section>
  );
}

export default ProductStatus;
