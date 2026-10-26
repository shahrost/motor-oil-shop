import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard";

// محصول‌های «علاقه‌مندی‌های من» با همون کارت محصول (قلب روی کارت حذفشون می‌کنه)
function FavoritesList({ products, loading, t }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h1 className="text-xl font-extrabold mb-5 flex items-center gap-2"><Heart /> {t("header.accountMenu.favorites")}</h1>

      {loading && <p className="text-gray-600">{t("account.loading")}</p>}

      {!loading && products.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-600">{t("favorites.empty")}</p>

          <Link
            to="/products"
            className="inline-block mt-5 bg-yellow-400 text-gray-950 px-8 py-3 rounded-xl font-bold"
          >
            {t("common.viewProducts")}
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
