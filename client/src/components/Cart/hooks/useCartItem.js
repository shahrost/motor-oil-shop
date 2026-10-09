import { useContext } from "react";
import CartContext from "../../../context/CartContext";
import LanguageContext from "../../../context/LanguageContext";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { calcPromotionGift } from "../../../utils/promotionCalc";
import { getProductPrice } from "../../../utils/productPrice";

// داده‌ی نمایشی و تغییرات یک ردیف سبد (ردیف با index شناخته می‌شه)
function useCartItem(item, index) {
  const { removeFromCart, updateQuantity, changeOrderType, changePaymentType } =
    useContext(CartContext);
  const { language } = useContext(LanguageContext);

  return {
    name: getProductNameLabel(item.name, language),
    brandLabel: getBrandLabel(item.brand, language),
    priceLabel: formatPrice(getProductPrice(item, item.paymentType), language),
    giftQty: calcPromotionGift(
      item.promotion,
      item.orderType,
      item.quantity,
      item.paymentType,
    ),
    setQuantity: (value) => updateQuantity(item.id, value, index),
    setOrderType: (value) => changeOrderType(item.id, value, index),
    setPaymentType: (value) => changePaymentType(item.id, value, index),
    remove: () => removeFromCart(item.id, index),
  };
}

export default useCartItem;
