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
      mb-3
      "
    >
      <div>
        <h3 className="font-bold">{product.name}</h3>

        <p className="text-sm text-gray-500">{product.brand}</p>
      </div>

      <div className="flex gap-2">
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
