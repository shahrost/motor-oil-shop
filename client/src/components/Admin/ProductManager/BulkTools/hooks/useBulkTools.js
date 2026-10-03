import { useState, useContext } from "react";
import { ProductContext } from "../../../../../context";
import {
  uploadProductImagesService,
  importProductsService,
  bulkUpdatePricesService,
} from "../../../../../services/productService";

function useBulkTools() {
  const { reloadProducts } = useContext(ProductContext);

  const [importFile, setImportFile] = useState(null);
  const [importImages, setImportImages] = useState([]);
  const [removeMissing, setRemoveMissing] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");
  const [importProgress, setImportProgress] = useState("");

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

    if (
      removeMissing &&
      !window.confirm(
        "همه‌ی محصولاتی که در این فایل اکسل نیستند برای همیشه حذف می‌شوند. ادامه می‌دهید؟",
      )
    ) {
      return;
    }

    setImportLoading(true);
    setImportError("");
    setImportResult(null);

    try {
      setImportProgress("");

      const uploaded = await uploadProductImagesService(importImages, (done) =>
        setImportProgress(
          `در حال آپلود عکس‌ها: ${done} از ${importImages.length}`,
        ),
      );

      const response = await importProductsService(
        importFile,
        uploaded,
        removeMissing,
        (stage) => setImportProgress(`در حال ایمپورت: ${stage}...`),
      );
      setImportResult(response.data);
      await reloadProducts();
    } catch (error) {
      const status = error.response?.status;

      setImportError(
        error.response?.data?.message ||
          `خطا در ایمپورت محصولات (${status ? `کد ${status}` : error.message})`,
      );
    } finally {
      setImportProgress("");
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
    removeMissing,
    setRemoveMissing,
    importResult,
    importLoading,
    importError,
    importProgress,
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
