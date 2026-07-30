import api from "../../data/productOptions/api";
import viscosities from "../../data/productOptions/viscosities";
import acea from "../../data/productOptions/acea";

function TechnicalInfo({ product, updateField }) {
  const oilTypes = ["مینرال", "نیمه سنتتیک", "تمام سنتتیک"];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">مشخصات فنی</h3>

      {/* API */}

      <select
        value={product.api}
        onChange={(e) => updateField("api", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب API</option>

        {api.map((item) => (
          <option key={item} value={item}>
            API {item}
          </option>
        ))}
      </select>

      {/* Viscosity */}

      <select
        value={product.viscosity}
        onChange={(e) => updateField("viscosity", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب ویسکوزیته</option>

        {viscosities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Oil Type */}

      <select
        value={product.oilType}
        onChange={(e) => updateField("oilType", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب نوع روغن</option>

        {oilTypes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* ACEA */}

      <select
        value={product.acea}
        onChange={(e) => updateField("acea", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب استاندارد ACEA</option>

        {acea.map((item) => (
          <option key={item} value={item}>
            ACEA {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TechnicalInfo;
