import { useContext, useMemo, useState } from "react";

import orderStats from "../../helpers/orderStats";
import OrderContext from "../../../../context/OrderContext";
import useOrdersAutoRefresh from "../../../../hooks/useOrdersAutoRefresh";
import {
  ALL_MONTHS,
  ALL_STATUSES,
  matchesFilters,
  orderMonthOptions,
  sortNewestFirst,
} from "../helpers/orderListFilters";

// هر بار چند سفارش نشون داده می‌شه؛ بقیه با «نمایش بیشتر»
const PAGE_SIZE = 30;

const statuses = ["جدید", "تماس گرفته شد", "آماده ارسال", "ارسال شد", "تحویل شد"];

function useOrderManager() {
  const {
    orders,
    loadingOrders,
    loadError,
    loadOrders,
    updateOrderStatus,
    setOrderDone,
    deleteOrder,
  } = useContext(OrderContext);

  const [search, setSearchState] = useState("");
  const [filterStatus, setFilterStatusState] = useState(ALL_STATUSES);
  const [filterMonth, setFilterMonthState] = useState(ALL_MONTHS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // سفارش‌های باز (آکاردئون)؛ پیش‌فرض همه بسته. با بروزرسانی خودکار لیست، باز بودن می‌مونه
  const [openIds, setOpenIds] = useState(() => new Set());

  useOrdersAutoRefresh(loadOrders);

  // هر تغییر فیلتر از صفحه‌ی اول لیست شروع می‌شه
  const withPageReset = (setter) => (value) => {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  };

  const sortedOrders = useMemo(() => sortNewestFirst(orders), [orders]);

  const monthOptions = useMemo(() => orderMonthOptions(sortedOrders), [sortedOrders]);

  const filteredOrders = useMemo(
    () =>
      sortedOrders.filter((order) =>
        matchesFilters(order, { search, status: filterStatus, month: filterMonth }),
      ),
    [sortedOrders, search, filterStatus, filterMonth],
  );

  const dashboard = useMemo(() => orderStats(orders), [orders]);

  function toggleOrder(id) {
    setOpenIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  }

  return {
    orders,

    loadingOrders,

    loadError,

    loadOrders,

    updateOrderStatus,

    setOrderDone,

    deleteOrder,

    search,

    setSearch: withPageReset(setSearchState),

    filterStatus,

    setFilterStatus: withPageReset(setFilterStatusState),

    filterMonth,

    setFilterMonth: withPageReset(setFilterMonthState),

    monthOptions,

    statuses,

    filteredOrders,

    visibleOrders: filteredOrders.slice(0, visibleCount),

    showMore: () => setVisibleCount((count) => count + PAGE_SIZE),

    isOpen: (id) => openIds.has(id),

    toggleOrder,

    dashboard,
  };
}

export default useOrderManager;
