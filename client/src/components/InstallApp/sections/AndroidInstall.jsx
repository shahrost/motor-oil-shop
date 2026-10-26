import StoreLinks from "./StoreLinks";

function AndroidInstall({ canPrompt, onInstall }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center">نصب روی اندروید</h2>

      {canPrompt ? (
        <button
          type="button"
          onClick={onInstall}
          className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg"
        >
          نصب اپلیکیشن
        </button>
      ) : (
        <div className="mt-5 bg-gray-100 rounded-xl p-5 text-gray-700 leading-8">
          <p>اگر دکمه‌ی نصب نمایش داده نشد:</p>
          <ol className="list-decimal pr-5 mt-2">
            <li>این صفحه را در مرورگر Chrome باز کنید.</li>
            <li>دکمه‌ی منو (⋮) بالای مرورگر را بزنید.</li>
            <li>
              «نصب برنامه» یا «افزودن به صفحه‌ی اصلی» (Install app / Add to
              Home screen) را انتخاب کنید.
            </li>
          </ol>
        </div>
      )}

      <StoreLinks />
    </div>
  );
}

export default AndroidInstall;
