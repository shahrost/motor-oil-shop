// خودروسازان داخلی منوی «خودروها». هر خودرو با ستون «گروه خودروسازی / واردکننده»
// (فیلد maker) به یکی از این‌ها نسبت داده می‌شه؛ بقیه‌ی خودروها (چینی‌های جدید،
// واردات، بازار دست‌دوم و …) توی بخش «برندهای خارجی» بر اساس برند یکی می‌شن.
// `keys`: شکل‌های نوشتاری مقدار maker (بدون فاصله و نیم‌فاصله) که با این خودروساز تطبیق می‌خوره.
const vehicleMakers = [
  { slug: "iran-khodro", label: "ایران‌خودرو", labelEn: "Iran Khodro", keys: ["ایرانخودرو"] },
  { slug: "saipa", label: "سایپا", labelEn: "SAIPA", keys: ["سایپا"] },
  { slug: "modiran", label: "مدیران خودرو", labelEn: "Modiran Khodro", keys: ["مدیرانخودرو"] },
  { slug: "kerman-motor", label: "کرمان موتور", labelEn: "Kerman Motor", keys: ["کرمانموتور"] },
  { slug: "bahman", label: "گروه بهمن", labelEn: "Bahman Group", keys: ["بهمن"] },
  { slug: "persia-khodro", label: "پرشیا خودرو", labelEn: "Persia Khodro", keys: ["پرشیاخودرو"] },
];

export default vehicleMakers;
