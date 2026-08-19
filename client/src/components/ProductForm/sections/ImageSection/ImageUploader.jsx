import { useRef } from "react";

function ImageUploader({ product, updateField }) {
  const inputRef = useRef();

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    updateField("image", {
      file,
      preview: URL.createObjectURL(file),
    });
  }

  return (
    <div className="mb-5">
      <h4 className="font-bold mb-3">
        آپلود تصویر محصول
      </h4>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        انتخاب تصویر
      </button>

      {product.image?.preview && (
        <div className="mt-4">
          <img
            src={product.image.preview}
            alt="preview"
            className="w-40 h-40 object-contain border rounded-xl"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;