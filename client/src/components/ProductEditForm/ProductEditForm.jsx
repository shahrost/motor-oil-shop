import useProductEdit from "./hooks/useProductEdit";

import {
  BasicEdit,
  TechnicalEdit,
  DescriptionEdit,
  StatusEdit,
  ImageEdit,
  PromotionEdit,
} from "./sections";

function ProductEditForm({ product, updateProduct, closeEdit }) {
  const {
    editForm,
    error,
    saving,
    handleEditChange,
    handlePromotionChange,
    saveEdit,
    cancelEdit,
  } = useProductEdit(product, updateProduct, closeEdit);
  return (
    <div>
      <h2 className="text-xl font-bold mb-5">ویرایش محصول</h2>

      <BasicEdit editForm={editForm} handleEditChange={handleEditChange} />

      <TechnicalEdit editForm={editForm} handleEditChange={handleEditChange} />

      <DescriptionEdit
        editForm={editForm}
        handleEditChange={handleEditChange}
      />

      <StatusEdit editForm={editForm} handleEditChange={handleEditChange} />

      <PromotionEdit
        editForm={editForm}
        handlePromotionChange={handlePromotionChange}
      />

      <ImageEdit editForm={editForm} handleEditChange={handleEditChange} />

      {error && <p role="alert" className="my-3 text-red-700">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveEdit}
          disabled={saving}
          className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {saving ? "در حال ذخیره…" : "ذخیره تغییرات"}
        </button>

        <button
          type="button"
          onClick={cancelEdit}
          disabled={saving}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}

export default ProductEditForm;
