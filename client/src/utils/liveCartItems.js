// فیلدهای قیمت‌گذاری و نمایش محصول که ممکنه بعد از افزودن به سبد عوض بشن
const LIVE_FIELDS = [
  "name",
  "price",
  "priceCheck",
  "cartonCount",
  "promotion",
  "image",
  "isActive",
];

// سبد در localStorage نسخه‌ی محصول لحظه‌ی افزودن رو داره؛ با این تابع قیمت و طرح فروش هر ردیف
// از لیست فعلی محصولات خونده می‌شه تا مشتری همون مبلغی رو ببینه که سرور ثبت می‌کنه.
// محصولی که در لیست نیست (هنوز لود نشده یا حذف شده) همون نسخه‌ی ذخیره‌شده می‌مونه
function liveCartItems(cart, products) {
  if (!products.length) return cart;

  const byId = new Map(products.map((product) => [product.id, product]));

  return cart.map((item) => {
    const live = byId.get(item.id);
    if (!live) return item;

    const fresh = { ...item };
    LIVE_FIELDS.forEach((field) => {
      if (field in live) fresh[field] = live[field];
    });

    return fresh;
  });
}

export default liveCartItems;
