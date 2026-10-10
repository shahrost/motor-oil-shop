import ImageUploader from "./ImageUploader";

function ImageSection({ product, updateField }) {
  return (
    <section className="mb-6">
      <h3 className="text-xl font-bold mb-4">تصاویر محصول</h3>

      <ImageUploader product={product} updateField={updateField} />
    </section>
  );
}

export default ImageSection;
