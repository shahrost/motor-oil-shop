import ProductRowCard from "../../ProductCard/ProductRowCard";

// شبکه‌ی کارت‌های فشرده‌ی محصولات پیشنهادی خودرو
function OilGrid({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-6">
      {products.map((product) => (
        <ProductRowCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default OilGrid;
