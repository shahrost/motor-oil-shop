import useOrderManager from "./hooks/useOrderManager";

import OrderDashboard from "./sections/OrderDashboard";
import OrderFilters from "./sections/OrderFilters";
import OrderCard from "./sections/OrderCard";
import OrderListStatus from "./sections/OrderListStatus";

function OrderManager() {
  const {
    orders,
    loadingOrders,
    loadError,
    loadOrders,
    filteredOrders,
    dashboard,

    search,
    setSearch,

    filterStatus,
    setFilterStatus,

    statuses,

    updateOrderStatus,
    deleteOrder,
  } = useOrderManager();

  return (
    <section>
      <OrderDashboard orders={orders} dashboard={dashboard} />

      <OrderFilters
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        statuses={statuses}
      />

      <div className="space-y-5">
        {loadingOrders || loadError || filteredOrders.length === 0 ? (
          <OrderListStatus
            loading={loadingOrders}
            error={loadError}
            onRetry={loadOrders}
          />
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              statuses={statuses}
              updateOrderStatus={updateOrderStatus}
              deleteOrder={deleteOrder}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default OrderManager;
