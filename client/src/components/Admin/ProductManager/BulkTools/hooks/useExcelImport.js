import { useState } from "react";

// روند مشترک ایمپورت گروهی (محصولات و خودروها):
// انتخاب اکسل و عکس‌ها ← تأیید حذف موارد غایب ← آپلود دسته‌ای عکس‌ها ← ایمپورت پس‌زمینه با نمایش مرحله
function useExcelImport({ uploadImages, runImport, reload, confirmRemoveMessage, errorLabel }) {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [removeMissing, setRemoveMissing] = useState(false);
  // فقط موارد جدید ساخته بشن و محصولات موجود دست نخورن (فقط ایمپورت محصولات)
  const [onlyNew, setOnlyNew] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!file) {
      setError("فایل اکسل را انتخاب کنید");
      return;
    }

    if (removeMissing && !window.confirm(confirmRemoveMessage)) return;

    setLoading(true);
    setError("");
    setResult(null);
    setProgress("");

    try {
      const uploaded = await uploadImages(images, (done) =>
        setProgress(`در حال آپلود عکس‌ها: ${done} از ${images.length}`),
      );

      const response = await runImport(
        file,
        uploaded,
        removeMissing,
        (stage) => setProgress(`در حال ایمپورت: ${stage}...`),
        { onlyNew },
      );

      setResult(response.data);
      await reload();
    } catch (err) {
      const status = err.response?.status;

      setError(
        err.response?.data?.message ||
          `${errorLabel} (${status ? `کد ${status}` : err.message})`,
      );
    } finally {
      setProgress("");
      setLoading(false);
    }
  }

  return {
    setFile,
    setImages,
    removeMissing,
    setRemoveMissing,
    onlyNew,
    setOnlyNew,
    result,
    loading,
    error,
    progress,
    submit,
  };
}

export default useExcelImport;
