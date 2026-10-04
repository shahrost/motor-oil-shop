import { useContext, useState } from "react";

import { ProductContext } from "../../../../../context";
import { bulkUpdatePricesService } from "../../../../../services/productImportService";

// بروزرسانی گروهی قیمت‌ها از روی فایل اکسل (کد محصول + قیمت)
function usePriceUpdate() {
  const { reloadProducts } = useContext(ProductContext);

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!file) {
      setError("فایل قیمت‌ها را انتخاب کنید");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await bulkUpdatePricesService(file);
      setResult(response.data);
      await reloadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "خطا در بروزرسانی قیمت‌ها");
    } finally {
      setLoading(false);
    }
  }

  return { setFile, result, loading, error, submit };
}

export default usePriceUpdate;
