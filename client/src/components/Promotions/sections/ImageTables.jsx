// بخش جدول‌های آماده (عکس) صفحه‌ی طرح فروش: عنوان، راهنما و عکس‌ها.
// کلیک روی عکس نسخه‌ی کامل رو در تب جدا باز می‌کنه (روی گوشی جدول ریز می‌شه)
function ImageTables({ title, hint, images }) {
  const layout =
    images.length === 1 ? "max-w-2xl mx-auto" : "grid grid-cols-1 lg:grid-cols-2 gap-5 items-start";

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold text-center">{title}</h2>

      <p className="text-center mt-2 text-sm text-gray-600">{hint}</p>

      <div className={`mt-6 ${layout}`}>
        {images.map((image) => (
          <a
            key={image.src}
            href={image.src}
            target="_blank"
            rel="noopener"
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
        ))}
      </div>
    </section>
  );
}

export default ImageTables;
