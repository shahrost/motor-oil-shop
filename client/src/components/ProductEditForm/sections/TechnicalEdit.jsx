import viscosities from "../../../data/productOptions/viscosities";
import api from "../../../data/productOptions/api";
import acea from "../../../data/productOptions/acea";

function TechnicalEdit({ editForm, handleEditChange }) {
  return (
    <>
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
    </>
  );
}

export default TechnicalEdit;
