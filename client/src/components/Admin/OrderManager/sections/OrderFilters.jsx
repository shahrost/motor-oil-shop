function OrderFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  statuses,
}) {
  return (
    <section className="bg-white rounded-xl shadow p-5 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو نام، موبایل، منطقه یا محصول..."
        className="
        border
        p-3
        rounded-lg
        w-full
        mb-4
        "
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="
        border
        p-3
        rounded-lg
        w-full
        "
      >
        <option value="همه">همه سفارش‌ها</option>

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
