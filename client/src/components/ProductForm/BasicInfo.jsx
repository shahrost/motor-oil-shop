function BasicInfo({ product, updateField }) {
  const brands = [
    "سمن شیمی",
    "Seman Chimie",
    "پترولکس",
    "Petrolex",
    "وم اویل",
    "Wom Oil",
    "بهتام",
    "Behtam",
    "توتال",
    "Total",
    "ادینول",
    "Addinol",
    "ایدلوب",
    "Aidlube",
    "لوکینی",
    "Lookini",
    "ووفر",
    "Woofer",
    "فیلتر لوکومبیل",
    "Locomobil Filter",
    "فیلتر البرز",
    "Alborz Filter",
    "فیلتر میهن",
    "Mihan Filter",
    "فیلتر گیربکس ATF",
    "بهران",
    "Behran",
    "ایرانول",
    "Iranol",
    "پارس",
    "Pars",
    "اسپیدی",
    "Speedy",
  ];

  const categories = [
    "روغن موتور بنزینی",
    "روغن موتور دیزلی",
    "روغن موتورسیکلت",
    "مکمل سوخت",
    "محصولات دیگر",
  ];

  const volumes = [
    "300cc",
    "500cc",
    "1 لیتری",
    "4 لیتری",
    "5 لیتری",
    "20 لیتری",
    "100 گرمی",
    "120 گرمی",
    "1 پوندی",
    "2 پوندی",
    "3 پوندی",
    "5 پوندی",
    "7 کیلویی",
    "17 کیلویی",
    "180 کیلویی",
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">اطلاعات اصلی محصول</h3>

      {/* برند */}

      <select
        value={product.brand}
        onChange={(e) => updateField("brand", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب برند</option>

        {brands.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      {/* دسته بندی */}

      <select
        value={product.category}
        onChange={(e) => updateField("category", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب دسته بندی</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* حجم */}

      <select
        value={product.volume}
        onChange={(e) => updateField("volume", e.target.value)}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">انتخاب حجم</option>

        {volumes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BasicInfo;
