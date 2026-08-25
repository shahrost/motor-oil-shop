import ProductContext from "./ProductContext";
import useProducts from "./hooks/useProducts";

function ProductProvider({ children }) {
  const {
    products,
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
