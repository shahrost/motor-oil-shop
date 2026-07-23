import { useState, useContext } from "react";
import OrderContext from "../context/OrderContext";

function OrderForm({ product }) {
  const { addOrder } = useContext(OrderContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    quantity: 1,
    payment: "نقدی",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const order = {
      customerName: form.name,

      phone: form.phone,

      city: form.city,

      productId: product.id,

      productName: product.name,

      quantity: Number(form.quantity),

      payment: form.payment,

      description: form.description,

      price: product.price,
    };

    addOrder(order);

    alert("سفارش شما ثبت شد");

    setForm({
      name: "",
      phone: "",
      city: "",
      quantity: 1,
      payment: "نقدی",
      description: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-5 rounded-xl mt-6"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-5">ثبت سفارش</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="نام مشتری"
        className="w-full border p-3 rounded-lg mb-3"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="شماره تماس"
        className="w-full border p-3 rounded-lg mb-3"
      />

      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="شهر یا منطقه"
        className="w-full border p-3 rounded-lg mb-3"
      />

      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        min="1"
        className="w-full border p-3 rounded-lg mb-3"
      />

      <select
        name="payment"
        value={form.payment}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-3"
      >
        <option>نقدی</option>

        <option>چک</option>

        <option>کارت به کارت</option>
      </select>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="توضیحات سفارش"
        className="w-full border p-3 rounded-lg mb-3"
      />

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
        ثبت سفارش
      </button>
    </form>
  );
}

export default OrderForm;
