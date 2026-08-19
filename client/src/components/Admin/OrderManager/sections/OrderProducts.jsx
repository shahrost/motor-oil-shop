function OrderProducts({ items }) {
  return (
    <section>
      <h3 className="font-bold text-lg mb-3">🛒 محصولات سفارش</h3>

      <div className="space-y-3">
        {items?.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 bg-gray-50">
            <p>
              <b>محصول:</b> {item.productName}
            </p>

            <p className="mt-2">
              <b>برند:</b> {item.brand}
            </p>

            <p className="mt-2">
              <b>گرید:</b> {item.viscosity}
            </p>

            <p className="mt-2">
              <b>حجم:</b> {item.volume}
            </p>

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
              <b>قیمت واحد:</b> {Number(item.price || 0).toLocaleString()}
              تومان
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderProducts;
