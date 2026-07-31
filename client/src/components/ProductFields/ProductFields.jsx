import brands from "../../data/brands";
import categories from "../../data/productOptions/categories";
import volumes from "../../data/productOptions/volumes";
import viscosities from "../../data/productOptions/viscosities";
import api from "../../data/productOptions/api";
import acea from "../../data/productOptions/acea";

import ImageUploader from "../ProductForm/ImageUploader";

function ProductFields({ product, updateField }) {
  return (
    <>
      <select
        name="brand"
        value={product.brand || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
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
        value={product.category || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
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
        value={product.volume || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
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
        value={product.viscosity || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
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
        value={product.api || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
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
        value={product.acea || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
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
        placeholder="نوع روغن"
        value={product.oilType || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="price"
        placeholder="قیمت"
        value={product.price || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="cartonCount"
        placeholder="تعداد در کارتن"
        value={product.cartonCount || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <textarea
        name="description"
        placeholder="توضیحات"
        value={product.description || ""}
        onChange={(e) => updateField(e.target.name, e.target.value)}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <ImageUploader product={product} updateField={updateField} />
    </>
  );
}

export default ProductFields;
