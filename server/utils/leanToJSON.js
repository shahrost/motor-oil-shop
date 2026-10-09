// خروجی lean() هم‌شکل toJSON() مدل‌ها: پیش‌فرض‌های اسکیما اعمال و _id به id تبدیل می‌شه
// (همون transform داخل toJSON مدل‌های Product و Vehicle).
// برای لیست‌های کامل استفاده می‌شه: ساختن هزار سند کامل Mongoose موقع پر شدن کش،
// حافظه‌ی سرور رو تا بالای سقف هاست می‌برد و پروسه کشته می‌شد.
function leanToJSON(Model, doc) {
  const plain = Model.applyDefaults(doc);

  plain.id = plain._id.toString();

  delete plain._id;

  return plain;
}

module.exports = leanToJSON;
