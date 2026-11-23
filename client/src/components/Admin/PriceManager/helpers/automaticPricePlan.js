import { priceInToman, productLabel, suggestTableProduct } from "./priceListHelpers.js";
import { supplierHasBrand } from "./priceIdentity.js";

export function isCashDiscount(value) {
  return Number.isInteger(value) && value >= 1 && value <= 90;
}

export function automaticPricePlan(pages, products, cashDiscountPercent) {
  if (!isCashDiscount(cashDiscountPercent)) throw new Error("درصد تخفیف نقدی را از ۱ تا ۹۰ انتخاب کنید.");
  const changes = [], unchanged = [], skipped = [], suppliers = new Set();
  const seen = new Map(), contradictory = new Set();
  for (const page of pages) {
    if (!page.table?.rows?.length) {
      skipped.push({ page: page.page, source: "صفحهٔ " + page.page,
        reason: page.readError || "ردیفی با مبلغ و مشخصات کافی پیدا نشد؛ عنوان ستون‌ها، کد یا مشخصات کالا باید در عکس یا PDF دیده شود." });
      continue;
    }
    const table = page.table;
    if (table.supplier) suppliers.add(table.supplier);
    if (table.unreadable) skipped.push({ page: page.page, source: `صفحه ${page.page}`,
      reason: `${table.unreadable} مبلغ در فایل به‌طور یکتا خوانده نشد؛ جدول واضح‌تر را انتخاب کنید.` });
    for (const row of table.rows) {
      const skip = (reason) => skipped.push({ page: page.page, source: row.source, reason });
      if (!["rial", "toman"].includes(table.unit) || !["item", "carton"].includes(table.basis)) {
        skip("واحد یا مبنای قیمت این لیست قابل تشخیص نیست."); continue;
      }
      if (page.image && !row.verifiedPrice) { skip("مبلغ این ردیف در عکس واضح نیست."); continue; }
      if (page.image && row.verifiedIdentity === false) { skip("حجم یا مشخصات این ردیف در دو بار خواندن یکسان نبود."); continue; }
      const supplier = row.supplier || table.supplier;
      const product = suggestTableProduct({ ...row, supplier }, products);
      if (!product) { skip("کالای متناظر به‌طور یکتا شناسایی نشد."); continue; }
      // Previously held by the owner pending confirmation; a generic upload does not release it.
      if (product.sku === "AL-ENG-011-20L") { skip("این کالا قبلاً تا تأیید قیمت متوقف شده است."); continue; }
      if (supplier && !supplierHasBrand(supplier, product.brand)) { skip("شرکت کالا با لیست یکسان نیست."); continue; }
      suppliers.add(product.brand);
      const list = priceInToman(row.amount, table.unit, table.basis, row.carton);
      if (list === null) { skip("مبلغ نامعتبر است."); continue; }
      const oldList = Number(product.priceCheck || product.price || 0);
      if (page.image && oldList > 0 && list > 0 && (list / oldList > 2 || list / oldList < 0.5)) {
        skip("تغییر مبلغ خوانده‌شده از عکس غیرعادی است؛ PDF اصلی یا عکس واضح‌تر را انتخاب کنید."); continue;
      }
      // Apply once to the uploaded list, never to the already-discounted cash price.
      const prices = { priceCheck: list, price: Math.round(list * (100 - cashDiscountPercent) / 100) };
      const change = { id: product.id, ...prices,
        expectedPrice: Number(product.price || 0), expectedPriceCheck: Number(product.priceCheck || 0) };
      const item = { ...change, label: productLabel(product), source: row.source };
      if (seen.has(item.id)) {
        const previous = seen.get(item.id);
        if (previous.price !== item.price || previous.priceCheck !== item.priceCheck) contradictory.add(item.id);
        continue;
      }
      seen.set(item.id, item);
    }
  }
  for (const item of seen.values()) {
    if (contradictory.has(item.id)) skipped.push({ source: item.source, reason: "دو قیمت متفاوت برای یک کالا در فایل دیده شد." });
    else if (item.price === item.expectedPrice && item.priceCheck === item.expectedPriceCheck) unchanged.push(item);
    else changes.push(item);
  }
  return { changes, unchanged, skipped, suppliers: [...suppliers], cashDiscountPercent };
}
