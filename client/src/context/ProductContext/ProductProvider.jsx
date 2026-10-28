import ProductContext from "./ProductContext";
import useProducts from "./hooks/useProducts";

// products, loading, loadError, retryProducts و توابع ادمین (add/update/delete/reset/reload)
function ProductProvider({ children }) {
  const value = useProducts();

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export default ProductProvider;
