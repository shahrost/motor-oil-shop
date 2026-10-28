import ProductPrice from "../../common/ProductPrice";
import AddToCartButton from "../../common/AddToCartButton";
import WhatsAppInquiry from "../../common/WhatsAppInquiry";

// نوار ثابت پایین صفحه‌ی محصول روی موبایل/تبلت (زیر lg): قیمت با واحد و روش پرداخت انتخاب‌شده
// + «افزودن به سبد» (محصول بی‌قیمت: «استعلام در واتساپ»)، تا بعد از خوندن توضیحات لازم نباشه
// برگرده بالا. sticky (نه fixed) و آخرین بخش صفحه: تا ته محتوا پایین صفحه می‌چسبه و روی فوتر نمی‌افته.
// padding پایین با safe-area آیفون
function StickyPurchaseBar({ product, purchase, t }) {
  return (
    <div className="lg:hidden sticky bottom-0 z-40 -mx-5 mt-8 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgb(11_20_36/0.08)] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="@container max-w-7xl mx-auto flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <ProductPrice
            product={product}
            paymentType={purchase.paymentType}
            orderType={purchase.orderType}
            className="text-lg font-extrabold text-gray-950"
            noteClassName="text-[11px] truncate"
          />
        </div>

        <div className="@container w-44 shrink-0">
          {purchase.priceAvailable ? (
            <AddToCartButton added={purchase.added} onClick={purchase.handleAddCart} t={t} />
          ) : (
            <WhatsAppInquiry product={product} t={t} className="" />
          )}
        </div>
      </div>
    </div>
  );
}

export default StickyPurchaseBar;
