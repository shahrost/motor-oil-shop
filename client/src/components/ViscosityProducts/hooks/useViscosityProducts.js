import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../../context";

function useViscosityProducts() {
  const { viscosity } = useParams();
  const { products } = useContext(ProductContext);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.viscosity === viscosity);
  }, [products, viscosity]);

  return {
    viscosity,
    filteredProducts,
  };
}

export default useViscosityProducts;
