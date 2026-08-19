import useProductEdit from "./hooks/useProductEdit";

import {
  BasicEdit,
  TechnicalEdit,
  DescriptionEdit,
  StatusEdit,
  ImageEdit,
} from "./sections";

function ProductEditForm({ product, updateProduct, closeEdit }) {
  const { editForm, handleEditChange, saveEdit, cancelEdit } = useProductEdit(
    product,
    updateProduct,
    closeEdit,
  );
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

      <ImageEdit editForm={editForm} handleEditChange={handleEditChange} />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveEdit}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          ذخیره تغییرات
        </button>

        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}

export default ProductEditForm;
