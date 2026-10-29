import { formatToman } from "../helpers/orderSummary";
import { formatApi, formatViscosity } from "../../../../utils/specLabel";
import { formatVolume } from "../../../../utils/formatVolume";

// مشخصات فنی یک قلم (فقط اونهایی که مقدار دارن) تا معلوم باشه دقیقاً چه روغنی سفارش داده شده
function itemSpecs(item) {
  return [
    ["برند", item.brand],
    ["گرید", formatViscosity(item.viscosity)],
    ["API", formatApi(item.api)],
    ["ACEA", item.acea],
    ["نوع روغن", item.oilType],
    ["حجم", item.volume && formatVolume(item.volume, "fa")],
    ["دسته", item.category],
    ["کد کالا", item.sku],
  ].filter(([, value]) => value);
}

function OrderProducts({ items }) {
  return (
    <section>
      <h3 className="font-bold text-lg mb-3">🛒 محصولات سفارش</h3>

      <div className="space-y-3">
        {items?.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 bg-gray-50">
            <p className="font-extrabold text-base">{item.productName}</p>

            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {itemSpecs(item).map(([label, value]) => (
                <span key={label} className="bg-white border border-gray-300 rounded-lg px-2 py-1">
                  <span className="text-gray-500">{label}:</span>{" "}
                  <b dir="auto">{value}</b>
                </span>
              ))}
            </div>

            {item.vehicle && (
              <p className="mt-2">
                <b>خودرو:</b> {item.vehicle}
              </p>
            )}

            <p className="mt-2">
              <b>واحد خرید:</b> {item.orderType === "carton" ? "کارتن" : "عدد"}
            </p>

            <p
              className={
                item.paymentType === "cash"
                  ? "mt-2 text-green-700 font-bold"
                  : "mt-2 text-blue-700 font-bold"
              }
            >
              <b>پرداخت:</b>{" "}
              {item.paymentType === "check" ? "📝 اعتباری" : "💵 نقدی"}
            </p>

            <p className="mt-2">
              <b>تعداد:</b> {item.quantity}
            </p>

            <p className="mt-2">
              <b>تعداد نهایی:</b> {item.totalCount} عدد
            </p>

            <p className="mt-2">
              <b>قیمت واحد:</b> {formatToman(item.price)}
            </p>

            <p className="mt-2 font-bold">
              <b>جمع ردیف:</b> {formatToman(Number(item.price || 0) * Number(item.totalCount || 0))}
            </p>

            {item.giftQty > 0 && (
              <p className="mt-3 bg-amber-100 border border-amber-400 text-amber-800 font-bold rounded-lg p-2">
                🎁 هدیه این سفارش: {item.giftQty} کارتن
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderProducts;
