import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext";
import { fetchBrandSales, setBrandSale } from "../../../../services/brandSaleService";
import { brandNames, closedBrandNames, updateClosedBrands } from "../helpers/brandSales";

export default function useBrandSales() {
  const { products, reloadProducts } = useContext(ProductContext);
  const [selected, setSelected] = useState("");
  const [closedBrands, setClosedBrands] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const closed = closedBrands.includes(selected);

  useEffect(() => {
    let active = true;
    fetchBrandSales().then((rows) => { if (active) setClosedBrands(closedBrandNames(rows)); })
      .catch(() => { if (active) setError("وضعیت فروش دریافت نشد؛ دوباره تلاش کنید."); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, []);

  async function load() {
    setBusy(true); setError("");
    try {
      setClosedBrands(closedBrandNames(await fetchBrandSales()));
      await reloadProducts();
    } catch { setError("وضعیت فروش دریافت نشد؛ دوباره تلاش کنید."); }
    finally { setBusy(false); }
  }

  async function save() {
    if (!selected || busy || error) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const saved = await setBrandSale(selected, !closed);
      setClosedBrands((previous) => updateClosedBrands(previous, saved));
      setMessage(saved.closed ? `فروش ${saved.brand} بسته شد؛ استعلام قیمت با پیامک فعال است.` : `فروش ${saved.brand} باز شد؛ قیمت‌های موجود نمایش داده می‌شوند.`);
      await reloadProducts();
    } catch { setError("وضعیت ثبت قطعی نشد؛ ابتدا دریافت دوباره وضعیت را بزنید."); }
    finally { setBusy(false); }
  }

  function select(brand) {
    setSelected(brand);
    setMessage("");
  }

  return { selected, select, closedBrands, closed, busy, error, message, load, save,
    brands: brandNames(products, closedBrands) };
}
