import { createContext, useContext, useState } from "react";
import CustomerAuthContext from "./CustomerAuthContext";
import { addFavoriteService, removeFavoriteService } from "../services/customerAuthService";

const FavoritesContext = createContext();

// «علاقه‌مندی‌های من» مشتری واردشده (شناسه‌ی محصول‌ها روی سرور، داخل حساب مشتری)
export function FavoritesProvider({ children }) {
  const { customer } = useContext(CustomerAuthContext);
  // تغییرات همین سشن، به نام همون مشتری؛ با ورود/خروج، لیست از پروفایل مشتری فعلی خونده می‌شه
  const [changed, setChanged] = useState({ ownerId: null, list: [] });

  const favorites =
    customer && changed.ownerId === customer.id ? changed.list : customer?.favorites || [];

  const setFavorites = (list) => setChanged({ ownerId: customer?.id, list });

  const isFavorite = (productId) => favorites.includes(productId);

  // تغییر فوری در صفحه؛ اگر سرور خطا داد به حالت قبل برمی‌گرده
  async function toggleFavorite(productId) {
    if (!customer) return;

    const wasFavorite = favorites.includes(productId);
    const previous = favorites;

    setFavorites(
      wasFavorite ? favorites.filter((id) => id !== productId) : [...favorites, productId],
    );

    try {
      const saved = wasFavorite
        ? await removeFavoriteService(productId)
        : await addFavoriteService(productId);

      setFavorites(saved || []);
    } catch (error) {
      console.log("خطا در ذخیره‌ی علاقه‌مندی", error);
      setFavorites(previous);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
