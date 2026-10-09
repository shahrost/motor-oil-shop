import CartItem from "./CartItem";

function CartItems({ cart }) {
  return (
    <div className="space-y-5">
      {cart.map((item, index) => (
        <CartItem key={`${item.id}-${index}`} item={item} index={index} />
      ))}
    </div>
  );
}

export default CartItems;
