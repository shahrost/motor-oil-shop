import ProductCard from "../../ProductCard";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow">
        <p className="text-xl font-bold text-gray-700">محصولی پیدا نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="animate-[fadeIn_0.4s_ease]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
