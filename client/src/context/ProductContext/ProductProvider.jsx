import ProductContext from "./ProductContext";
import useProducts from "./hooks/useProducts";

function ProductProvider({ children }) {
  const {
    products,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    resetProducts,
    reloadProducts,
  } = useProducts();

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        deleteProduct,
        updateProduct,
        resetProducts,
        reloadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
