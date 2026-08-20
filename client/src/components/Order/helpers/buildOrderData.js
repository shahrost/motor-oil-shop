function buildOrderData(cart, customer, cartTotal, customerId) {
  return {
    customerId: customerId || "",

    customer,

    items: cart.map((item) => ({
      productId: item.id,

      productName: item.name,

      brand: item.brand,

      viscosity: item.viscosity,

      volume: item.volume,

      orderType: item.orderType || "number",

      paymentType: item.paymentType || "cash",

      quantity: item.quantity,

      totalCount:
        item.orderType === "carton"
          ? Number(item.quantity) * Number(item.cartonCount || 1)
          : Number(item.quantity),

      price: item.price,
    })),

    totalPrice: cartTotal,

    status: "جدید",

    date: new Date().toLocaleString("fa-IR"),
  };
}

export default buildOrderData;
