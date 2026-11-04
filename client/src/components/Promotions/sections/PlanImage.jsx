// جدول آماده‌ی طرح یا سبد (عکس): کلیک روی عکس نسخه‌ی کامل رو در تب جدا باز می‌کنه (روی گوشی جدول ریز می‌شه)
function PlanImage({ image, t }) {
  return (
    <a
      href={image.src}
      target="_blank"
      rel="noopener"
      title={t("promotions.bundlesHint")}
      className="block border-2 border-amber-300 rounded-2xl overflow-hidden bg-white hover:shadow-md transition cursor-zoom-in"
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full h-auto"
      />
    </a>
  );
}

export default PlanImage;
