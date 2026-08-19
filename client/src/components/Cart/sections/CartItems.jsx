import CartItem from "./CartItem";

function CartItems({
  cart,
  removeFromCart,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  return (
    <div className="space-y-5">
      {cart.map((item, index) => (
        <CartItem
          key={`${item.id}-${index}`}
          item={item}
          index={index}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          changeOrderType={changeOrderType}
          changePaymentType={changePaymentType}
        />
      ))}
    </div>
  );
}

export default CartItems;
