import { useEffect, useRef, useState } from "react";

import downloadBlob from "../../../../utils/downloadBlob";

// عرض صفحه‌ی A4 به پیکسل (۹۶dpi)؛ فاکتور با همین عرض رندر می‌شه
export const INVOICE_WIDTH = 794;

const A4_RATIO = 297 / 210;

const pdfFileName = (order) => `فاکتور-${String(order.id).slice(0, 8)}.pdf`;

// عکس فاکتور ← PDF چندصفحه‌ای A4 (متن فارسی با فونت سایت درست دیده می‌شه، چون مرورگر رسمش می‌کنه)
async function renderPdf(element) {
  // کتابخونه‌ها فقط موقع ساخت PDF لود می‌شن تا پنل سنگین نشه
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  await document.fonts?.ready;

  const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#ffffff" });

  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  const pageHeight = 297;
  const pageHeightPx = Math.floor(canvas.width * A4_RATIO);

  for (let top = 0; top < canvas.height; top += pageHeightPx) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - top);
    const page = document.createElement("canvas");

    page.width = canvas.width;
    page.height = sliceHeight;
    page.getContext("2d").drawImage(canvas, 0, top, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    if (top > 0) pdf.addPage();

    pdf.addImage(
      page.toDataURL("image/jpeg", 0.92),
      "JPEG",
      0,
      0,
      pageWidth,
      (sliceHeight / pageHeightPx) * pageHeight,
    );
  }

  return pdf.output("blob");
}

// ساخت فاکتور PDF یک سفارش، بعد ارسال (منوی اشتراک گوشی: واتساپ، تلگرام…) یا دانلود.
// ساخت و ارسال دو کلیک جدان: مرورگر share رو فقط درست بعد از کلیک کاربر اجازه می‌ده
function useOrderPdf(order) {
  const invoiceRef = useRef(null);

  const [rendering, setRendering] = useState(false);
  const [built, setBuilt] = useState(null);
  const [error, setError] = useState("");

  // فایل با همون نسخه‌ی سفارش نگه داشته می‌شه؛ هر تغییری (مثلاً تیک ناموجود) فاکتور رو کهنه می‌کنه
  const file = built?.order === order ? built.file : null;

  // فاکتور فقط موقع ساخت (بیرون از دید) رندر می‌شه؛ بعد از رندرش عکس گرفته می‌شه
  useEffect(() => {
    if (!rendering || !invoiceRef.current) return;

    let cancelled = false;

    renderPdf(invoiceRef.current)
      .then((blob) => {
        if (!cancelled) {
          setBuilt({ order, file: new File([blob], pdfFileName(order), { type: "application/pdf" }) });
        }
      })
      .catch((err) => {
        console.log("خطا در ساخت PDF", err);
        if (!cancelled) setError("ساخت PDF انجام نشد؛ دوباره امتحان کنید");
      })
      .finally(() => {
        if (!cancelled) setRendering(false);
      });

    return () => {
      cancelled = true;
    };
  }, [rendering, order]);

  function build() {
    setError("");
    setRendering(true);
  }

  const canShare =
    !!file && typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });

  async function share() {
    try {
      await navigator.share({ files: [file], title: file.name });
    } catch (err) {
      // بستن منوی اشتراک خطا نیست
      if (err?.name !== "AbortError") setError("ارسال انجام نشد؛ فایل رو دانلود کنید");
    }
  }

  function download() {
    downloadBlob(file, file.name);
  }

  return { invoiceRef, rendering, file, error, canShare, build, share, download };
}

export default useOrderPdf;
