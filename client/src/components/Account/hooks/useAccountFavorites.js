import { useContext } from "react";
import { ProductContext } from "../../../context";
import FavoritesContext from "../../../context/FavoritesContext";

// «علاقه‌مندی‌های من»: محصول‌های لیست محصولات که شناسه‌شون در علاقه‌مندی‌های مشتریه
// (به ترتیب افزودن؛ محصول حذف‌شده از فروشگاه خودبه‌خود نمایش داده نمی‌شه)
function useAccountFavorites() {
  const { products, loading } = useContext(ProductContext);
  const { favorites } = useContext(FavoritesContext);

  const byId = new Map(products.map((product) => [product.id, product]));

  return {
    loading,
    favoriteProducts: favorites.map((id) => byId.get(id)).filter(Boolean),
  };
}

export default useAccountFavorites;
