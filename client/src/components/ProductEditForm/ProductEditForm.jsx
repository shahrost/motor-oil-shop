import brands from "../../data/brands";
import categories from "../../data/productOptions/categories";
import volumes from "../../data/productOptions/volumes";
import viscosities from "../../data/productOptions/viscosities";
import api from "../../data/productOptions/api";
import acea from "../../data/productOptions/acea";

function ProductEditForm({ editForm, handleEditChange, saveEdit, cancelEdit }) {
  function handleImageChange(e) {
    handleEditChange({
      target: {
        name: "image",
        value: {
          main: e.target.value,
          gallery: editForm.image?.gallery || [],
        },
      },
    });
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8" dir="rtl">
      <h2 className="text-2xl font-bold mb-5">ویرایش محصول</h2>

      <select
        name="brand"
        value={editForm.brand || ""}
        onChange={handleEditChange}
        className="border p-3 w-full rounded mb-3"
      >
        <option value="">انتخاب برند</option>

        {brands.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        name="category"
        value={editForm.category || ""}
        onChange={handleEditChange}
        className="border p-3 w-full rounded mb-3"
      >
        <option value="">انتخاب دسته بندی</option>

        {categories.map((item) => (
          <option key={item.id} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>

      <select
        name="volume"
        value={editForm.volume || ""}
        onChange={handleEditChange}
        className="border p-3 w-full rounded mb-3"
      >
        <option value="">انتخاب حجم</option>

        {volumes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="viscosity"
        value={editForm.viscosity || ""}
        onChange={handleEditChange}
        className="border p-3 w-full rounded mb-3"
      >
        <option value="">انتخاب ویسکوزیته</option>

        {viscosities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="api"
        value={editForm.api || ""}
        onChange={handleEditChange}
        className="border p-3 w-full rounded mb-3"
      >
        <option value="">انتخاب API</option>

        {api.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="acea"
        value={editForm.acea || ""}
        onChange={handleEditChange}
        className="border p-3 w-full rounded mb-3"
      >
        <option value="">انتخاب ACEA</option>

        {acea.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        name="oilType"
        value={editForm.oilType || ""}
        onChange={handleEditChange}
        placeholder="نوع روغن"
        className="border p-3 w-full rounded mb-3"
      />

      <input
        name="price"
        value={editForm.price || ""}
        onChange={handleEditChange}
        placeholder="قیمت"
        className="border p-3 w-full rounded mb-3"
      />

      <input
        name="cartonCount"
        value={editForm.cartonCount || ""}
        onChange={handleEditChange}
        placeholder="تعداد در کارتن"
        className="border p-3 w-full rounded mb-3"
      />

      <input
        value={editForm.image?.main || ""}
        onChange={handleImageChange}
        placeholder="مسیر تصویر اصلی"
        className="border p-3 w-full rounded mb-3"
      />

      {editForm.image?.main && (
        <div className="bg-gray-100 rounded-xl p-4 mb-3 flex justify-center">
          <img
            src={editForm.image.main}
            alt={editForm.name}
            className="w-40 h-40 object-contain"
          />
        </div>
      )}

      <textarea
        name="description"
        value={editForm.description || ""}
        onChange={handleEditChange}
        placeholder="توضیحات"
        className="border p-3 w-full rounded mb-3"
      />

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
