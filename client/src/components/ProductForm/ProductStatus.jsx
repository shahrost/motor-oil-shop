function ProductStatus({ product, updateField }) {
  const statuses = [
    {
      name: "isNew",
      label: "🆕 محصول جدید",
    },
    {
      name: "isBestSeller",
      label: "🔥 پرفروش",
    },
    {
      name: "isSpecial",
      label: "⭐ پیشنهاد ویژه",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">وضعیت محصول</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {statuses.map((item) => (
          <label
            key={item.name}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 flex gap-3 items-center"
          >
            <input
              type="checkbox"
              checked={product[item.name]}
              onChange={(e) => updateField(item.name, e.target.checked)}
            />

            <span className="font-bold">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ProductStatus;
