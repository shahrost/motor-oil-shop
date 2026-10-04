// دکمه‌ی اجرا + پیام مرحله‌ی در حال انجام و خطا
function SubmitStatus({ loading, label, loadingLabel, progress, error }) {
  return (
    <>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? loadingLabel : label}
      </button>

      {loading && progress && <p className="text-gray-600 text-sm mt-3">{progress}</p>}

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </>
  );
}

export default SubmitStatus;
