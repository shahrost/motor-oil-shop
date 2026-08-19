import { Link } from "react-router-dom";

function ContactActions() {
  return (
    <div className="text-center mt-10">
      <a
        href="https://wa.me/989198334264"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold"
      >
        پیام در واتساپ
      </a>

      <Link
        to="/products"
        className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold mr-4"
      >
        مشاهده محصولات
      </Link>
    </div>
  );
}

export default ContactActions;
