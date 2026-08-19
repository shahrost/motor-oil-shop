import { useContext, useMemo } from "react";
import { ProductContext } from "../../../context";

function useViscosity() {
  const { products } = useContext(ProductContext);

  const viscosities = useMemo(() => {
    return [...new Set(products.map((product) => product.viscosity))];
  }, [products]);

  function getProductCount(viscosity) {
    return products.filter((product) => product.viscosity === viscosity).length;
  }

  return {
    viscosities,
    getProductCount,
  };
}

export default useViscosity;
