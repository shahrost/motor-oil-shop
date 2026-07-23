function TechnicalInfo({ product, updateField }) {
  const apiList = [
    "SL",
    "SM",
    "SN",
    "SP",
    "SJ",
    "SC",
    "SD",
    "SE",
    "SF",
    "SG",
    "CH-4",
    "CI-4",
    "CJ-4",
    "CK-4",
  ];

  const viscosityList = [
    "SAE 40",
    "SAE 50",
    "20W50",
    "10W40",
    "10W50",
    "10W30",
    "5W30",
    "5W40",
    "0W20",
    "15W40",
    "25W50",
    "10W60",
  ];

  const oilTypes = ["مینرال", "نیمه سنتتیک", "تمام سنتتیک"];

  const aceaList = ["ندارد", "A3/B4", "A5/B5", "C2", "C3", "C4", "E7", "E9"];

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

        {apiList.map((item) => (
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

        {viscosityList.map((item) => (
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

        {aceaList.map((item) => (
          <option key={item} value={item}>
            ACEA {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TechnicalInfo;
