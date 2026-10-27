import { useState } from "react";

import { downloadOrdersExcel } from "../../../../services/orderService";
import downloadBlob from "../../../../utils/downloadBlob";
import { currentJalaliMonth } from "../../../../utils/jalaliDate";
import { toPersianDigits } from "../../../../utils/digits";

// سال‌های قابل انتخاب: از ۱۴۰۴ (شروع فروش آنلاین) تا سال جاری
const FIRST_YEAR = 1404;

function yearOptions(currentYear) {
  const years = [];

  for (let year = currentYear; year >= Math.min(FIRST_YEAR, currentYear); year -= 1) {
    years.push(year);
  }

  return years;
}

// «سفارشات-۱۴۰۵-۰۷.xlsx»
const excelFileName = (year, month) =>
  `سفارشات-${toPersianDigits(year)}-${toPersianDigits(String(month).padStart(2, "0"))}.xlsx`;

// انتخاب ماه/سال شمسی (پیش‌فرض ماه جاری) و دریافت اکسل سفارش‌های همون ماه از سرور
function useOrderExport() {
  const [{ year: currentYear, month: currentMonth }] = useState(currentJalaliMonth);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [downloading, setDownloading] = useState(false);

  // { type: "error" | "info", text }
  const [message, setMessage] = useState(null);

  async function download() {
    setDownloading(true);
    setMessage(null);

    try {
      const blob = await downloadOrdersExcel(year, month);

      downloadBlob(blob, excelFileName(year, month));
    } catch (error) {
      // ۴۰۴ یعنی این ماه سفارشی نداره (پیام از سرور)
      setMessage({ type: error.status === 404 ? "info" : "error", text: error.message });
    } finally {
      setDownloading(false);
    }
  }

  return {
    year,
    setYear: (value) => {
      setYear(Number(value));
      setMessage(null);
    },
    month,
    setMonth: (value) => {
      setMonth(Number(value));
      setMessage(null);
    },
    years: yearOptions(currentYear),
    downloading,
    message,
    download,
  };
}

export default useOrderExport;
