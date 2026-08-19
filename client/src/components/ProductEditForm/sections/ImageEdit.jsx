import { useRef } from "react";
import getImageUrl from "../../../utils/getImageUrl";

function ImageEdit({ editForm, handleEditChange }) {
  const inputRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    handleEditChange({
      target: {
        name: "image",
        value: {
          file,
          preview: URL.createObjectURL(file),
          gallery: editForm.image?.gallery || [],
        },
      },
    });
  }

  const previewSrc = editForm.image?.preview || getImageUrl(editForm.image?.main);

  return (
    <div className="mb-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-3"
      >
        تغییر تصویر محصول
      </button>

      {previewSrc && (
        <div className="bg-gray-100 rounded-xl p-4 mb-3 flex justify-center">
          <img
            src={previewSrc}
            alt={editForm.name}
            className="w-40 h-40 object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default ImageEdit;
