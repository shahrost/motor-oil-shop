import { useState, useContext } from "react";
import { ProductContext } from "../../../../../context";
import {
  importProductsService,
  bulkUpdatePricesService,
} from "../../../../../services/productService";

function useBulkTools() {
  const { reloadProducts } = useContext(ProductContext);

  const [importFile, setImportFile] = useState(null);
  const [importImages, setImportImages] = useState([]);
  const [importResult, setImportResult] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");

  const [priceFile, setPriceFile] = useState(null);
  const [priceResult, setPriceResult] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState("");

  async function submitImport(e) {
    e.preventDefault();

    if (!importFile) {
      setImportError("فایل اکسل را انتخاب کنید");
      return;
    }

    setImportLoading(true);
    setImportError("");
    setImportResult(null);

    try {
      const response = await importProductsService(importFile, importImages);
      setImportResult(response.data);
      await reloadProducts();
    } catch (error) {
      setImportError(
        error.response?.data?.message || "خطا در ایمپورت محصولات",
      );
    } finally {
      setImportLoading(false);
    }
  }

  async function submitPriceUpdate(e) {
    e.preventDefault();

    if (!priceFile) {
      setPriceError("فایل قیمت‌ها را انتخاب کنید");
      return;
    }

    setPriceLoading(true);
    setPriceError("");
    setPriceResult(null);

    try {
      const response = await bulkUpdatePricesService(priceFile);
      setPriceResult(response.data);
      await reloadProducts();
    } catch (error) {
      setPriceError(
        error.response?.data?.message || "خطا در بروزرسانی قیمت‌ها",
      );
    } finally {
      setPriceLoading(false);
    }
  }

  return {
    importFile,
    setImportFile,
    importImages,
    setImportImages,
    importResult,
    importLoading,
    importError,
    submitImport,

    priceFile,
    setPriceFile,
    priceResult,
    priceLoading,
    priceError,
    submitPriceUpdate,
  };
}

export default useBulkTools;
