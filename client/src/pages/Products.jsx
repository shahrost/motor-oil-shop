import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center">محصولات روغن موتور</h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
