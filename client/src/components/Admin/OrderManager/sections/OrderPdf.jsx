import { FileText, Share2, Download } from "lucide-react";

import OrderInvoice from "./OrderInvoice";
import useOrderPdf from "../hooks/useOrderPdf";

// ساخت فاکتور PDF نهایی (بدون اقلام ناموجود) و ارسال یا دانلودش
function OrderPdf({ order }) {
  const { invoiceRef, rendering, file, error, canShare, build, share, download } = useOrderPdf(order);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={build}
          disabled={rendering}
          className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-60"
        >
          <FileText className="w-5 h-5" aria-hidden="true" />
          {rendering ? "در حال ساخت PDF…" : file ? "ساخت دوباره‌ی PDF" : "ساخت فاکتور PDF"}
        </button>

        {file && canShare && (
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Share2 className="w-5 h-5" aria-hidden="true" />
            ارسال PDF
          </button>
        )}

        {file && (
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            دانلود PDF
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

      {/* بیرون از دید؛ فقط برای عکس گرفتن موقع ساخت PDF */}
      {rendering && (
        <div aria-hidden="true" style={{ position: "fixed", top: 0, left: -10000 }}>
          <OrderInvoice ref={invoiceRef} order={order} />
        </div>
      )}
    </div>
  );
}

export default OrderPdf;
