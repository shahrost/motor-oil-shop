import { Star } from "lucide-react";
import ProductCard from "../../ProductCard";

// شبکه‌ی کارت‌های فشرده‌ی محصولات پیشنهادی خودرو. highlightLabel: اولین محصول
// (بالاترین اولویت لینک خودرو) با قاب کهربایی و این عنوان برجسته می‌شه
function OilGrid({ products, highlightLabel }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-6">
      {products.map((product, index) =>
        highlightLabel && index === 0 ? (
          <div key={product.id} className="flex flex-col rounded-2xl bg-yellow-400 p-1 pt-0 shadow-md">
            {/* bg-yellow روی خود متن تا قانون حالت شب رنگش رو روشن نکنه */}
            <p className="bg-yellow-400 text-gray-950 py-1 text-xs font-extrabold flex items-center justify-center gap-1">
              <Star size={16} fill="currentColor" />
              {highlightLabel}
            </p>

            <div className="flex-1">
              <ProductCard product={product} />
            </div>
          </div>
        ) : (
          <ProductCard key={product.id} product={product} />
        ),
      )}
    </div>
  );
}

export default OilGrid;
