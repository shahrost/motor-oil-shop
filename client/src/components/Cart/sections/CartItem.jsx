import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import GiftBadge from "../../common/GiftBadge";
import ProductPrice from "../../common/ProductPrice";
import { formatViscosity } from "../../../utils/specLabel";
import CartItemOptions from "./CartItemOptions";
import useCartItem from "../../../hooks/useCartItem";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";

function CartItem({ item, index }) {
  const { t } = useContext(LanguageContext);
  const {
    name,
    brandLabel,
    giftQty,
    setQuantity,
    setOrderType,
    setPaymentType,
    remove,
  } = useCartItem(item, index);

  return (
    <div className="bg-white rounded-3xl shadow p-5 grid md:grid-cols-4 gap-5">
      <div className="bg-gray-50 rounded-2xl p-3">
        <img
          src={getProductImageSrc(item)}
          alt={name}
          onError={handleProductImageError(item)}
          className="w-full h-32 object-contain"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-black">{name}</h2>

        <p className="mt-2 text-gray-500">
          {t("common.brand")}
          <b className="text-black"> {brandLabel}</b>
        </p>

        {item.viscosity && (
          <p className="text-gray-500">
            {t("common.viscosity")}
            <b className="text-black"> {formatViscosity(item.viscosity)}</b>
          </p>
        )}
      </div>

      <CartItemOptions
        item={item}
        onQuantityChange={setQuantity}
        onOrderTypeChange={setOrderType}
        onPaymentTypeChange={setPaymentType}
      />

      <div className="flex flex-col justify-between">
        <ProductPrice
          product={item}
          paymentType={item.paymentType}
          orderType={item.orderType}
          className="text-gray-950 text-xl sm:text-2xl font-extrabold"
        />

        <GiftBadge giftQty={giftQty} className="rounded-lg p-2 text-sm" />

        <button
          onClick={remove}
          className="bg-red-600 text-white rounded-xl py-3 font-bold"
        >
          {t("cart.removeItem")}
        </button>
      </div>
    </div>
  );
}

export default CartItem;
