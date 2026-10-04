function ProductDescription({ description, t }) {
  if (!description) return null;

  return (
    <div className="mt-6 bg-gray-50 rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-3">{t("productDetail.description")}</h3>

      <p className="leading-8 text-gray-700 whitespace-pre-line">{description}</p>
    </div>
  );
}

export default ProductDescription;
