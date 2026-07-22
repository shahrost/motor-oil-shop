import { createContext, useState } from "react";
import productsData from "../data/products";

const ProductContext = createContext();


export function ProductProvider({ children }) {

  const [products, setProducts] = useState(productsData);


  function addProduct(product) {

    setProducts([
      ...products,
      {
        ...product,
        id: Date.now(),
      },
    ]);

  }


  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );

}


export default ProductContext;