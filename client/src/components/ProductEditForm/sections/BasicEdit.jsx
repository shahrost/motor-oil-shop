import brands from "../../../data/brands";
import categories from "../../../data/productOptions/categories";
import volumes from "../../../data/productOptions/volumes";

function BasicEdit({ editForm, handleEditChange }) {
  return (
    <>
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
    </>
  );
}

export default BasicEdit;
