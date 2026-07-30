import { useState } from "react";

function OrderButtons({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("نقدی");

  const orderText = `
سلام

برای محصول:
${product.name}

برند:
${product.brand}

گرید:
${product.viscosity}

تعداد:
${quantity} عدد

نوع پرداخت:
${payment}

لطفاً قیمت روز و شرایط ارسال را اعلام کنید.
`;

  return (
    <div className="mt-6">
      {/* تعداد */}

      <div className="flex items-center gap-4 mb-4">
        <label className="font-bold">تعداد:</label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded-lg p-2 w-24"
        />
      </div>

      {/* پرداخت */}

      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setPayment("نقدی")}
          className={
            payment === "نقدی"
              ? "bg-green-600 text-white px-5 py-2 rounded-lg"
              : "bg-gray-200 px-5 py-2 rounded-lg"
          }
        >
          نقدی
        </button>

        <button
          onClick={() => setPayment("اعتباری")}
          className={
            payment === "اعتباری"
              ? "bg-blue-600 text-white px-5  rounded-lg"
              : "bg-gray-200 px-5 py-2 rounded-lg"
          }
        >
          اعتباری{" "}
        </button>
      </div>

      {/* واتساپ */}

      <a
        href={`https://wa.me/989198334264?text=${encodeURIComponent(orderText)}`}
        target="_blank"
        rel="noreferrer"
        className="block text-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
      >
        🟢 سفارش واتساپ
      </a>

      {/* پیامک */}

      <a
        href={`sms:09198334264?body=${encodeURIComponent(orderText)}`}
        className="block text-center bg-gray-800 text-white px-8 py-3 rounded-xl mt-3"
      >
        💬 پیامک سفارش
      </a>

      {/* تلگرام */}

      <a
        href={`https://t.me/YOUR_USERNAME`}
        target="_blank"
        rel="noreferrer"
        className="block text-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl mt-3"
      >
        ✈️ سفارش تلگرام
      </a>

      {/* ایتا */}

      <a
        href="https://eitaa.com/YOUR_ID"
        target="_blank"
        rel="noreferrer"
        className="block text-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl mt-3"
      >
        🟣 سفارش ایتا
      </a>

      {/* روبیکا */}

      <a
        href="https://rubika.ir/YOUR_ID"
        target="_blank"
        rel="noreferrer"
        className="block text-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl mt-3"
      >
        🔵 سفارش روبیکا
      </a>
    </div>
  );
}

export default OrderButtons;
