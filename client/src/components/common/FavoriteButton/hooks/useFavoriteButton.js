import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomerAuthContext from "../../../../context/CustomerAuthContext";
import FavoritesContext from "../../../../context/FavoritesContext";

// قلب علاقه‌مندی: مشتری واردنشده به صفحه‌ی ورود می‌ره
function useFavoriteButton(productId) {
  const { customer } = useContext(CustomerAuthContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  function onClick(e) {
    // روی کارت‌هایی که خودشون لینک‌اند، کلیک قلب صفحه‌ی محصول رو باز نکنه
    e.preventDefault();
    e.stopPropagation();

    if (!customer) {
      navigate("/account-login");
      return;
    }

    toggleFavorite(productId);
  }

  return { active: isFavorite(productId), onClick };
}

export default useFavoriteButton;
