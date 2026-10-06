// لوگوی برندهای خودرو از پوشه‌ی assets/vehicleBrands؛ نام فایل = نام انگلیسی برند
// با حروف کوچک و خط تیره به‌جای فاصله و علامت‌ها (مثلاً bmw.webp، mercedes-benz.png، iran-khodro.webp)
const logoFiles = import.meta.glob("../assets/vehicleBrands/*.{webp,png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});

// برندهایی که نام فایل لوگوشون با نام انگلیسی فرق داره
const ALIASES = {
  "iran-khodro": "ikco",
  "mercedes-benz": "mercedes",
  bestune: "besturn",
  "great-wall": "greatwall",
};

export function vehicleBrandSlug(nameEn) {
  return (nameEn || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const logos = Object.fromEntries(
  Object.entries(logoFiles).map(([path, url]) => [
    path.split("/").pop().replace(/\.[^.]+$/, ""),
    url,
  ]),
);

// آدرس لوگو یا رشته‌ی خالی اگه هنوز فایلی برای این برند نیست
export function getVehicleBrandLogo(nameEn) {
  const slug = vehicleBrandSlug(nameEn);

  return logos[ALIASES[slug] || slug] || "";
}

export default getVehicleBrandLogo;
