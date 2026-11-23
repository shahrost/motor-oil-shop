import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext";
import { fetchProducts } from "../../../../services/productService";
import { applyMobilePrices } from "../../../../services/mobilePriceService";
import { automaticPricePlan, isCashDiscount } from "../helpers/automaticPricePlan";

export default function usePriceManager() {
  const { reloadProducts } = useContext(ProductContext);
  const [busy, setBusy] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState([]);
  const [cashDiscount, setCashDiscount] = useState("");
  const [waitingForDiscount, setWaitingForDiscount] = useState(false);
  const [waitingForUnit, setWaitingForUnit] = useState(false);
  const pendingPages = useRef(null);
  const pendingFile = useRef(null), discount = useRef(null);
  const running = useRef(false), mounted = useRef(true), controller = useRef(null), previews = useRef([]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
      previews.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function chooseDiscount(value) {
    if (running.current) return;
    setCashDiscount(value);
    discount.current = Number(value);
    if (pendingPages.current) pendingPages.current.percent = discount.current;
    if (pendingFile.current && isCashDiscount(discount.current)) run(pendingFile.current, discount.current);
  }

  async function run(file, percent = discount.current, preparedPages = null, unit = "") {
    if (!file || running.current) return;
    if (!preparedPages) {
      previews.current.forEach((url) => URL.revokeObjectURL(url));
      previews.current = [];
      setPages([]);
    }
    pendingPages.current = null; setWaitingForUnit(false);
    setResult(null); setError(""); setFileName(file.name);
    if (!isCashDiscount(percent)) {
      pendingFile.current = file;
      setWaitingForDiscount(true);
      return;
    }
    pendingFile.current = null;
    setWaitingForDiscount(false);
    running.current = true;
    controller.current = new AbortController();
    setBusy("reading"); setProgress("در حال خواندن لیست…"); setError(""); setResult(null); setFileName(file.name);
    let report;
    try {
      setProgress("دریافت برندها و شناسه‌های کالاهای سایت…");
      const catalog = await fetchProducts();
      controller.current.signal.throwIfAborted();
      const { readPriceFile } = await import("../helpers/readPriceFile");
      const nextPages = preparedPages || await readPriceFile(file, {
        products: catalog.data || [],
        signal: controller.current.signal,
        onProgress: (message) => { if (mounted.current) setProgress(message); },
      });
      if (!mounted.current) { nextPages.forEach((page) => URL.revokeObjectURL(page.preview)); return; }
      if (!preparedPages) previews.current.forEach((url) => URL.revokeObjectURL(url));
      previews.current = nextPages.map((page) => page.preview);
      setPages(nextPages);
      if (!unit && nextPages.some((page) => page.table?.rows?.length && !page.table.unit)) {
        pendingPages.current = { file, pages: nextPages, percent };
        setWaitingForUnit(true);
        return;
      }
      setProgress("تشخیص کالاها و دریافت آخرین قیمت‌های سایت…");
      // Read fresh prices after OCR, not from the possibly old page/draft.
      const response = await fetchProducts();
      controller.current.signal.throwIfAborted();
      const plan = automaticPricePlan(nextPages.map((page) => page.table
        ? { ...page, table: { ...page.table, unit: page.table.unit || unit } } : page), response.data || [], percent);
      report = { ...plan, updated: [], unchanged: [...plan.unchanged], conflicts: [], failed: [] };
      if (mounted.current) { setBusy("saving"); setResult({ ...report }); }
      const byId = new Map(plan.changes.map((item) => [item.id, item]));
      for (let offset = 0; offset < plan.changes.length; offset += 100) {
        if (mounted.current) setProgress(`ثبت خودکار قیمت‌ها — ${Math.min(offset + 100, plan.changes.length).toLocaleString("fa-IR")} از ${plan.changes.length.toLocaleString("fa-IR")} کالا`);
        const changes = plan.changes.slice(offset, offset + 100).map(({ id, price, priceCheck, expectedPrice, expectedPriceCheck }) => ({ id, price, priceCheck, expectedPrice, expectedPriceCheck }));
        const saved = await applyMobilePrices("prices", changes);
        for (const type of ["updated", "unchanged", "conflicts", "failed"]) report[type].push(...saved[type].map((row) => ({ ...byId.get(row.id), ...row })));
        if (mounted.current) setResult({ ...report });
      }
      if (mounted.current) setProgress("");
      await reloadProducts();
    } catch (err) {
      if (mounted.current && !controller.current.signal.aborted) {
        setError(err.response?.data?.message || (report
          ? "ارتباط هنگام ثبت قطع شد؛ ممکن است بخشی از قیمت‌ها ثبت شده باشد. برای تکمیل، همین فایل را دوباره انتخاب کنید."
          : err.message || "فایل خوانده نشد؛ عکس واضح‌تر یا PDF اصلی شرکت را انتخاب کنید."));
      }
      if (report) await reloadProducts();
    } finally {
      running.current = false;
      if (mounted.current) { setBusy(""); setProgress(""); }
    }
  }
  async function undo() {
    if (running.current || !result?.updated.length) return;
    running.current = true;
    setBusy("saving"); setProgress("برگرداندن قیمت‌های این فایل…"); setError("");
    const restored = new Set();
    try {
      for (let offset = 0; offset < result.updated.length; offset += 100) {
        const batch = result.updated.slice(offset, offset + 100).map((row) => ({ id: row.id,
          price: row.expectedPrice, priceCheck: row.expectedPriceCheck,
          expectedPrice: row.price, expectedPriceCheck: row.priceCheck }));
        const saved = await applyMobilePrices("prices", batch);
        for (const row of [...saved.updated, ...saved.unchanged]) restored.add(row.id);
      }
      if (mounted.current) setResult((previous) => ({ ...previous,
        restored: (previous.restored || 0) + restored.size,
        updated: previous.updated.filter((item) => !restored.has(item.id)) }));
      if (mounted.current && restored.size < result.updated.length) setError("برگرداندن همه قیمت‌ها کامل نشد؛ قیمت‌هایی که بعداً تغییر کرده‌اند بازنویسی نمی‌شوند.");
      await reloadProducts();
    } catch {
      if (mounted.current) setError("برگرداندن همه قیمت‌ها کامل نشد؛ قیمت‌هایی که بعداً تغییر کرده‌اند بازنویسی نمی‌شوند.");
      await reloadProducts();
    } finally {
      running.current = false;
      if (mounted.current) { setBusy(""); setProgress(""); }
    }
  }
  function cancel() {
    controller.current?.abort();
    pendingFile.current = null;
    setWaitingForDiscount(false);
    pendingPages.current = null; setWaitingForUnit(false);
  }
  function chooseUnit(unit) {
    const pending = pendingPages.current;
    if (!pending || !["rial", "toman"].includes(unit)) return;
    run(pending.file, pending.percent, pending.pages, unit);
  }
  return { run, undo, busy, progress, error, result, fileName, pages, cancel,
    cashDiscount, chooseDiscount, waitingForDiscount, waitingForUnit, chooseUnit };
}
