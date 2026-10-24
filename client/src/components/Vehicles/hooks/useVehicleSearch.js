import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchVehicleSearchList } from "../../../services/vehicleService";
import { getVehicleDataCache } from "../../../services/vehicleDataCache";
import { searchVehicleBrands, searchVehicles } from "../../../utils/vehicleBrands";

const KEY = "all";
const PAGE_SIZE = 60;

// جستجوی خودرو در همه‌ی برندها (صفحه‌ی «خودروها»)، فارسی یا انگلیسی (پراید / pride).
// لیست سبک خودروها فقط وقتی گرفته می‌شه که کاربر سراغ جستجو بیاد (focus یا تایپ) و بعد در
// کش مشترک صفحه‌های خودرو می‌مونه؛ جستجو در مرورگر و فوریه. عبارت در آدرس (?q=) است تا با
// Back از صفحه‌ی خودرو همون نتیجه‌ها برگرده.
function useVehicleSearch(brands) {
  const [searchParams, setSearchParams] = useSearchParams();
  const cache = getVehicleDataCache(fetchVehicleSearchList);

  // state محلی تا تایپ روان بمونه؛ آدرس آینه‌اش می‌شه
  const [search, setSearchState] = useState(() => searchParams.get("q") || "");
  const [wanted, setWanted] = useState(() => Boolean(search.trim()));
  const [failed, setFailed] = useState(false);
  const [list, setList] = useState(() => cache.get(KEY));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const next = new URLSearchParams(search.trim() ? { q: search } : {});

    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [search, searchParams, setSearchParams]);

  useEffect(() => {
    if (!wanted || cache.has(KEY)) return;

    let cancelled = false;

    fetchVehicleSearchList()
      .then((loaded) => {
        cache.set(KEY, loaded);

        if (!cancelled) setList(loaded);
      })
      .catch((error) => {
        console.log("خطا در دریافت لیست خودروها برای جستجو", error);

        // دفعه‌ی بعد (focus یا تایپ دوباره) دوباره تلاش می‌شه
        if (!cancelled) {
          setFailed(true);
          setWanted(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [wanted, cache]);

  const prepare = () => {
    if (wanted) return;

    setFailed(false);
    setWanted(true);
  };

  const setSearch = (value) => {
    setSearchState(value);
    setVisibleCount(PAGE_SIZE);
    prepare();
  };

  const active = search.trim() !== "";

  const results = useMemo(
    () => (active && list ? searchVehicles(list, search) : []),
    [active, list, search],
  );

  const matchedBrands = useMemo(
    () => (active && brands ? searchVehicleBrands(brands, search) : []),
    [active, brands, search],
  );

  return {
    search,
    setSearch,
    prepare,
    active,
    loading: active && !list && !failed,
    failed: active && failed,
    matchedBrands,
    vehicles: results.slice(0, visibleCount),
    total: results.length,
    showMore: () => setVisibleCount((count) => count + PAGE_SIZE),
  };
}

export default useVehicleSearch;
