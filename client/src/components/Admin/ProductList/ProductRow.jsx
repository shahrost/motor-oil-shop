function ProductRow({ product, startEdit, deleteProduct }) {
  return (
    <div
      className="
      bg-gray-100
      p-4
      rounded-lg
      flex
      justify-between
      items-center
      gap-3
      mb-3
      "
    >
      {/* min-w-0 + شکستن کلمه: اسم‌های بلندِ بی‌فاصله (مثل لیست مدل‌های موتور با ویرگول)
          ردیف رو روی موبایل از صفحه بیرون نزنن */}
      <div className="min-w-0 flex-1">
        <h3 className="font-bold [overflow-wrap:anywhere]">{product.name}</h3>

        <p className="text-sm text-gray-500 [overflow-wrap:anywhere]">
          {[
            product.sku && `کد: ${product.sku}`,
            product.brand && `برند: ${product.brand}`,
            product.viscosity && `گرید: ${product.viscosity}`,
            product.volume && `حجم: ${product.volume}`,
          ]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => startEdit(product)}
          className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          ویرایش
        </button>

        <button
          onClick={() => deleteProduct(product.id)}
          className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          حذف
        </button>
      </div>
    </div>
  );
}

export default ProductRow;
