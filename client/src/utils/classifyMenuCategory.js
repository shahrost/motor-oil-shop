// دسته‌بندی خامِ محصول (category) بین برندها یکدست نیست: بعضی برندها یک
// category رو برای چند نوع محصول واقعاً متفاوت به کار بردن (مثلاً «روغن های
// گیربکس» ایدلوب هم روغن دنده معمولی داره هم روغن دنده اتوماتیک). این تابع
// برند + category خام + اسم محصول رو با هم می‌بینه تا هر محصول به یکی از
// دسته‌های ثابت منو (menuCategories) برسه.
export function getMenuCategorySlug(product) {
  const brand = product.brand;
  const category = product.category || "";
  const name = product.name || "";

  switch (brand) {
    case "سمن شیمی":
      if (category === "مکمل روغن موتور") return "oil-additive";
      if (category === "ضد یخ") return "antifreeze";
      if (category === "روغن ترمز") return "brake-fluid";
      if (category === "روغن موتور دیزلی") return "diesel-engine-oil";
      if (category === "روغن دنده") {
        return name === "واسکازین" ? "extreme-pressure-gear-oil" : "gear-oil";
      }
      if (category === "شیشه‌شوی") return "windshield-washer";
      if (category === "گریس") return "grease";
      if (category === "روغن هیدرولیک") return "hydraulic-oil";
      if (category === "روغن موتور بنزینی") return "gasoline-engine-oil";
      if (category === "روغن ۱۰ قطره") return "light-machine-oil";
      return "other";

    case "پترولکس":
      if (category === "روغن دنده اتومات") return "automatic-transmission";
      if (category === "شیشه‌شوی") return "windshield-washer";
      if (category === "روغن موتور سیکلت") return "motorcycle-oil";
      if (category === "اکتان بوستر") return "octane-booster";
      if (category === "روغن موتور بنزینی") return "gasoline-engine-oil";
      if (category === "روغن موتور دیزلی") return "diesel-engine-oil";
      if (category === "کولانت") return "coolant";
      return "other";

    case "وم اویل":
      if (category === "روغن موتور") return "gasoline-engine-oil";
      if (category === "روغن موتورسیکلت") return "motorcycle-oil";
      if (category === "روغن دنده") return "gear-oil";
      if (category === "روغن دنده اتومات") return "automatic-transmission";
      if (category === "روغن هیدرولیک") return "hydraulic-oil";
      return "other";

    case "بهتام":
      if (category === "بنزینی") return "gasoline-engine-oil";
      if (category === "اتوماتیک") return "automatic-transmission";
      if (category === "دستی") return "gear-oil";
      return "other";

    case "ایدلوب":
      if (category === "روغن موتور") return "gasoline-engine-oil";
      if (category === "روغن های گیربکس") {
        return name === "روغن اتوماتیک" ? "automatic-transmission" : "gear-oil";
      }
      if (category === "سیالات عملکردی") return "antifreeze";
      return "other";

    case "ادینول":
      if (category === "Automatikgetriebe") return "automatic-transmission";
      if (category === "Schaltgetriebe" || category === "Getriebeöle") return "gear-oil";
      if (category === "Stoßdämpferöl / Gabelöl / Servolenkung") return "hydraulic-oil";
      if (category === "Motorenöle") return "gasoline-engine-oil";
      if (category === "Motorradöle") return "motorcycle-oil";
      if (category === "Additive") return name === "اکتان" ? "octane-booster" : "other";
      return "other";

    default:
      return "other";
  }
}

export default getMenuCategorySlug;
