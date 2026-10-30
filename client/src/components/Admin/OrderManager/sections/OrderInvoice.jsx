import { forwardRef } from "react";

import brand from "../../../../data/brand";
import { formatToman, orderDateLabel } from "../helpers/orderSummary";
import { lineTotal, splitAvailability } from "../helpers/orderInvoice";
import { INVOICE_WIDTH } from "../hooks/useOrderPdf";
import { formatViscosity } from "../../../../utils/specLabel";
import { formatVolume } from "../../../../utils/formatVolume";
import { toPersianDigits } from "../../../../utils/digits";

// رنگ‌ها hex و استایل‌ها inline تا عکس PDF مستقل از تم (شب/روز) و کلاس‌های Tailwind باشه
const cell = { border: "1px solid #d1d5db", padding: "6px 8px", verticalAlign: "top" };
const head = { ...cell, background: "#0f1b2d", color: "#ffffff", fontWeight: 700 };

const itemTitle = (item) =>
  [
    item.productName,
    item.brand,
    formatViscosity(item.viscosity),
    item.volume && formatVolume(item.volume, "fa"),
  ]
    .filter(Boolean)
    .join(" · ");

// فاکتور نهایی سفارش برای PDF: فقط اقلام موجود در جمع، ناموجودها جدا پایین فاکتور
const OrderInvoice = forwardRef(function OrderInvoice({ order }, ref) {
  const { available, unavailable } = splitAvailability(order.items);
  const total = available.reduce((sum, item) => sum + lineTotal(item), 0);

  return (
    <div
      ref={ref}
      dir="rtl"
      style={{
        width: INVOICE_WIDTH,
        padding: 32,
        background: "#ffffff",
        color: "#111827",
        fontFamily: '"Vazirmatn", sans-serif',
        fontSize: 13,
        lineHeight: 1.7,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #fbbf24", paddingBottom: 12 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{brand.name}</div>
          <div style={{ color: "#4b5563" }}>{brand.tagline}</div>
        </div>

        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>فاکتور سفارش</div>
          <div>شماره: {String(order.id).slice(0, 8)}</div>
          <div>{orderDateLabel(order)}</div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        <div><b>مشتری:</b> {order.customer?.name}</div>
        <div><b>تلفن:</b> <span dir="ltr">{order.customer?.phone}</span></div>
        {order.customer?.area && <div><b>منطقه:</b> {order.customer.area}</div>}
        {order.customer?.address && (
          <div style={{ gridColumn: "1 / -1" }}><b>آدرس:</b> {order.customer.address}</div>
        )}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr>
            <th style={head}>ردیف</th>
            <th style={head}>محصول</th>
            <th style={head}>تعداد</th>
            <th style={head}>پرداخت</th>
            <th style={head}>قیمت واحد</th>
            <th style={head}>جمع</th>
          </tr>
        </thead>

        <tbody>
          {available.map((item, index) => (
            <tr key={index} style={{ background: index % 2 ? "#f9fafb" : "#ffffff" }}>
              <td style={{ ...cell, textAlign: "center" }}>{toPersianDigits(index + 1)}</td>
              <td style={cell}>
                <div style={{ fontWeight: 700 }} dir="auto">{itemTitle(item)}</div>
                {item.giftQty > 0 && (
                  <div style={{ color: "#b45309", fontWeight: 700 }}>
                    🎁 هدیه: {toPersianDigits(item.giftQty)} کارتن
                  </div>
                )}
              </td>
              <td style={{ ...cell, whiteSpace: "nowrap" }}>
                {toPersianDigits(item.quantity)} {item.orderType === "carton" ? "کارتن" : "عدد"}
                {item.orderType === "carton" && (
                  <div style={{ color: "#6b7280" }}>({toPersianDigits(item.totalCount)} عدد)</div>
                )}
              </td>
              <td style={cell}>{item.paymentType === "check" ? "اعتباری" : "نقدی"}</td>
              <td style={{ ...cell, whiteSpace: "nowrap" }}>{formatToman(item.price)}</td>
              <td style={{ ...cell, whiteSpace: "nowrap", fontWeight: 700 }}>{formatToman(lineTotal(item))}</td>
            </tr>
          ))}

          {available.length === 0 && (
            <tr>
              <td colSpan={6} style={{ ...cell, textAlign: "center", color: "#6b7280" }}>
                هیچ قلمی از این سفارش موجود نیست
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 8, fontSize: 16, fontWeight: 800 }}>
        مبلغ قابل پرداخت: {formatToman(total)}
      </div>

      {unavailable.length > 0 && (
        <div style={{ marginTop: 16, padding: "10px 14px", border: "1px solid #fca5a5", background: "#fef2f2", borderRadius: 8 }}>
          <div style={{ fontWeight: 800, color: "#b91c1c" }}>
            اقلام ناموجود (ارسال نمی‌شود و در مبلغ حساب نشده):
          </div>
          {unavailable.map((item, index) => (
            <div key={index} dir="auto">
              • {itemTitle(item)} — {toPersianDigits(item.quantity)}{" "}
              {item.orderType === "carton" ? "کارتن" : "عدد"}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20, color: "#4b5563", fontSize: 12, borderTop: "1px solid #e5e7eb", paddingTop: 8 }}>
        {brand.address} — تلفن: <span dir="ltr">{brand.landline}</span> — {brand.siteUrl.replace("https://", "")}
      </div>
    </div>
  );
});

export default OrderInvoice;
