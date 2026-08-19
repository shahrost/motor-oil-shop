import { Link } from "react-router-dom";

function CartEmpty() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-bold">سبد خرید خالی است</h2>

        <Link
          to="/products"
          className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          مشاهده محصولات
        </Link>
      </div>
    </div>
  );
}

export default CartEmpty;
