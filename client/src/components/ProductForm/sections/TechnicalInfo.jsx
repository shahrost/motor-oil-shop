import api from "../../../data/productOptions/api";
import acea from "../../../data/productOptions/acea";

function TechnicalInfo({ product, updateField }) {
  const oilTypes = ["تمام سنتتیک", "نیمه سنتتیک", "معدنی"];

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">اطلاعات فنی</h2>

      <select
        value={product.api || ""}
        onChange={(e) => updateField("api", e.target.value)}
        className="border p-3 rounded w-full mb-3"
      >
        <option value="">انتخاب API</option>

        {api.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={product.acea || ""}
        onChange={(e) => updateField("acea", e.target.value)}
        className="border p-3 rounded w-full mb-3"
      >
        <option value="">انتخاب ACEA</option>

        {acea.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={product.oilType || ""}
        onChange={(e) => updateField("oilType", e.target.value)}
        className="border p-3 rounded w-full"
      >
        <option value="">انتخاب نوع روغن</option>

        {oilTypes.map((oilType) => (
          <option key={oilType} value={oilType}>
            {oilType}
          </option>
        ))}
      </select>

      <input
        type="text"
        inputMode="numeric"
        name="price"
        value={product.price || ""}
        onChange={(e) => updateField("price", e.target.value)}
        placeholder="قیمت (تومان)"
        className="border p-3 rounded w-full mt-3"
      />
    </section>
  );
}

export default TechnicalInfo;
