// شناسه‌ی مشتری (از توکن)، وضعیت، تاریخ، قیمت‌ها و هدیه‌ها رو سرور خودش تعیین می‌کنه؛
// اینجا فقط انتخاب‌های مشتری فرستاده می‌شه. productName فقط برای پیام خطای خوانا در سروره
function buildOrderData(cart, customer) {
  return {
    customer,

    items: cart.map((item) => ({
      productId: item.id,

      productName: item.name,

      vehicle: item.vehicle || "",

      orderType: item.orderType || "number",

      paymentType: item.paymentType || "cash",

      quantity: item.quantity,
    })),
  };
}

export default buildOrderData;
