import brand from "../../../../data/brand";

// نماد اعتماد الکترونیکی: کد رسمی اینماد از brand.enamadHtml همون‌طور که enamad.ir داده رندر می‌شه
// (لینک + عکس، با referrerpolicy=origin که اینماد برای تأیید دامنه لازم داره).
// تا کد چسبونده نشده، چیزی نمایش داده نمی‌شه.
function EnamadSeal() {
  if (!brand.enamadHtml.trim()) return null;

  return (
    <div
      className="flex justify-center mt-8"
      dangerouslySetInnerHTML={{ __html: brand.enamadHtml }}
    />
  );
}

export default EnamadSeal;
