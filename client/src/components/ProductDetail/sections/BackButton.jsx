// دکمه‌ی «بازگشت» بالای صفحه‌ی محصول؛ فلش در RTL به راست اشاره می‌کنه
function BackButton({ onBack, label }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-6 inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-xl"
    >
      <span aria-hidden="true" className="rtl:rotate-180">
        ←
      </span>

      {label}
    </button>
  );
}

export default BackButton;
