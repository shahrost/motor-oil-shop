import useOrderManager from "./hooks/useOrderManager";

import {
  OrderDashboard,
  OrderExport,
  OrderFilters,
  OrderRowHeader,
  OrderRow,
  OrderListStatus,
  ShowMoreOrders,
} from "./sections";

function OrderManager() {
  const {
    orders,
    loadingOrders,
    loadError,
    loadOrders,
    filteredOrders,
    visibleOrders,
    showMore,
    isOpen,
    toggleOrder,
    dashboard,

    search,
    setSearch,

    filterStatus,
    setFilterStatus,

    filterMonth,
    setFilterMonth,
    monthOptions,

    statuses,

    updateOrderStatus,
    setOrderDone,
    setItemUnavailable,
    deleteOrder,
  } = useOrderManager();

  return (
    <section>
      <OrderDashboard orders={orders} dashboard={dashboard} />

      <OrderExport />

      <OrderFilters
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        statuses={statuses}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        monthOptions={monthOptions}
      />

      {loadingOrders || loadError || filteredOrders.length === 0 ? (
        <OrderListStatus loading={loadingOrders} error={loadError} onRetry={loadOrders} />
      ) : (
        <div className="space-y-2">
          <OrderRowHeader />

          {visibleOrders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              open={isOpen(order.id)}
              onToggle={() => toggleOrder(order.id)}
              statuses={statuses}
              updateOrderStatus={updateOrderStatus}
              onToggleDone={() => setOrderDone(order.id, !order.done)}
              setItemUnavailable={setItemUnavailable}
              deleteOrder={deleteOrder}
            />
          ))}

          <ShowMoreOrders
            shown={visibleOrders.length}
            total={filteredOrders.length}
            onShowMore={showMore}
          />
        </div>
      )}
    </section>
  );
}

export default OrderManager;
