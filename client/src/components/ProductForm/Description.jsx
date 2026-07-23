function Description({ product, updateField }) {
  function handlePriceChange(e) {
    const value = e.target.value;

    const onlyNumber = value.replace(/\D/g, "");

    updateField("price", onlyNumber);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">توضیحات و قیمت</h3>

      <input
        type="text"
        value={product.price}
        onChange={handlePriceChange}
        placeholder="قیمت فقط عدد وارد شود"
        className="border p-3 rounded-lg w-full"
      />

      {product.price && (
        <p className="text-yellow-600 font-bold">
          قیمت نمایش مشتری: {Number(product.price).toLocaleString()}
          {" تومان"}
        </p>
      )}

      <textarea
        value={product.description}
        onChange={(e) => updateField("description", e.target.value)}
        placeholder="توضیحات محصول"
        className="border p-3 rounded-lg w-full h-32"
      />
    </div>
  );
}

export default Description;
