import { ALL_MONTHS, ALL_STATUSES } from "../helpers/orderListFilters";

const FIELD_CLASS = "border p-3 rounded-lg w-full bg-white text-black";

// جستجو (نام، شماره تماس، منطقه یا محصول) + فیلتر وضعیت و ماه شمسی
function OrderFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  statuses,
  filterMonth,
  setFilterMonth,
  monthOptions,
}) {
  return (
    <section className="bg-white rounded-xl shadow p-4 sm:p-5 mb-4 grid gap-3 sm:grid-cols-4">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو نام یا شماره تماس مشتری..."
        className={`${FIELD_CLASS} sm:col-span-2`}
      />

      <select
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
        className={FIELD_CLASS}
        aria-label="ماه"
      >
        <option value={ALL_MONTHS}>همه ماه‌ها</option>

        {monthOptions.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className={FIELD_CLASS}
        aria-label="وضعیت"
      >
        <option value={ALL_STATUSES}>همه وضعیت‌ها</option>

        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </section>
  );
}

export default OrderFilters;
