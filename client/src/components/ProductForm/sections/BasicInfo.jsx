import brands from "../../../data/brands";
import categories from "../../../data/productOptions/categories";
import volumes from "../../../data/productOptions/volumes";
import viscosities from "../../../data/productOptions/viscosities";

function BasicInfo({ product, updateField }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">اطلاعات پایه</h2>

      <select
        name="brand"
        value={product.brand || ""}
        onChange={(e) => updateField("brand", e.target.value)}
        className="border p-3 rounded w-full mb-3"
      >
        <option value="">انتخاب برند</option>

        {brands.map((brand) => (
          <option key={brand.name} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>

      <select
        name="category"
        value={product.category || ""}
        onChange={(e) => updateField("category", e.target.value)}
        className="border p-3 rounded w-full mb-3"
      >
        <option value="">انتخاب دسته‌بندی</option>

        {categories.map((category) => (
          <option key={category.id} value={category.value}>
            {category.title}
          </option>
        ))}
      </select>

      <select
        name="volume"
        value={product.volume || ""}
        onChange={(e) => updateField("volume", e.target.value)}
        className="border p-3 rounded w-full mb-3"
      >
        <option value="">انتخاب حجم</option>

        {volumes.map((volume) => (
          <option key={volume} value={volume}>
            {volume}
          </option>
        ))}
      </select>

      <select
        name="viscosity"
        value={product.viscosity || ""}
        onChange={(e) => updateField("viscosity", e.target.value)}
        className="border p-3 rounded w-full"
      >
        <option value="">انتخاب ویسکوزیته</option>

        {viscosities.map((viscosity) => (
          <option key={viscosity} value={viscosity}>
            {viscosity}
          </option>
        ))}
      </select>
    </section>
  );
}

export default BasicInfo;
