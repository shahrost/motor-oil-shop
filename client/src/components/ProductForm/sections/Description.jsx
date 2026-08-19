function Description({ product, updateField }) {
  return (
    <section className="mb-6">
      <h3 className="text-xl font-bold mb-4">توضیحات</h3>

      <textarea
        value={product.description}
        onChange={(e) => updateField("description", e.target.value)}
        placeholder="توضیحات محصول"
        rows="4"
        className="border p-3 rounded w-full"
      />
    </section>
  );
}

export default Description;
