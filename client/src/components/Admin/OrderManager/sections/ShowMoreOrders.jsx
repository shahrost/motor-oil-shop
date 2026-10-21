import { toPersianDigits } from "../../../../utils/jalaliDate";

// «نمایش بیشتر» زیر لیست + تعداد نمایش‌داده‌شده از کل
function ShowMoreOrders({ shown, total, onShowMore }) {
  return (
    <div className="text-center pt-2">
      <p className="text-sm text-gray-600 mb-3">
        {toPersianDigits(shown)} از {toPersianDigits(total)} سفارش
      </p>

      {shown < total && (
        <button
          type="button"
          onClick={onShowMore}
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-lg"
        >
          نمایش بیشتر
        </button>
      )}
    </div>
  );
}

export default ShowMoreOrders;
