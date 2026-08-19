import ProductContext from "./ProductContext";
import useProducts from "./hooks/useProducts";

function ProductProvider({ children }) {
  const { products, addProduct, deleteProduct, updateProduct, resetProducts } =
    useProducts();

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
