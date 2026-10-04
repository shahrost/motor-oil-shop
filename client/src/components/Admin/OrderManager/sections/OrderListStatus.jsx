// پیام وضعیت لیست سفارش‌ها: در حال دریافت، خطای سرور (با دکمه‌ی تلاش دوباره) یا خالی بودن
function OrderListStatus({ loading, error, onRetry }) {
  let content = <p className="text-xl font-bold text-gray-600">سفارشی پیدا نشد</p>;

  if (loading) {
    content = <p className="text-xl font-bold text-gray-600">در حال دریافت سفارش‌ها...</p>;
  } else if (error) {
    content = (
      <>
        <p className="text-xl font-bold text-red-600">{error}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-bold"
        >
          تلاش دوباره
        </button>
      </>
    );
  }

  return <div className="bg-white rounded-xl shadow p-8 text-center">{content}</div>;
}

export default OrderListStatus;
