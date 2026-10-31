import bundle1 from "../../../assets/bundles/behtam-bundle-1.webp";
import bundle2 from "../../../assets/bundles/behtam-bundle-2.webp";

// جدول سبدهای ترکیبی (عکس آماده)؛ برای افزودن/حذف سبد فقط همین آرایه عوض بشه.
// کلیک روی عکس نسخه‌ی کامل رو در تب جدا باز می‌کنه (روی گوشی جدول ریز می‌شه)
const BUNDLES = [
  { src: bundle1, width: 708, height: 401, alt: "سبد ترکیبی ۱ بهتام" },
  { src: bundle2, width: 777, height: 258, alt: "سبد ترکیبی ۲ بهتام" },
];

function BundleImages({ t }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold text-center">
        {t("promotions.bundlesTitle")}
      </h2>

      <p className="text-center mt-2 text-sm text-gray-600">
        {t("promotions.bundlesHint")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6 items-start">
        {BUNDLES.map((bundle) => (
          <a
            key={bundle.src}
            href={bundle.src}
            target="_blank"
            rel="noopener"
            className="block border-2 border-amber-300 rounded-2xl overflow-hidden bg-white hover:shadow-md transition cursor-zoom-in"
          >
            <img
              src={bundle.src}
              alt={bundle.alt}
              width={bundle.width}
              height={bundle.height}
              loading="lazy"
              className="w-full h-auto"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default BundleImages;
