import useOrderManager from "./hooks/useOrderManager";

import OrderDashboard from "./sections/OrderDashboard";
import OrderFilters from "./sections/OrderFilters";
import OrderCard from "./sections/OrderCard";

function OrderManager() {
  const {
    orders,
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
        {filteredOrders.length === 0 ? (
          <div
            className="
          bg-white
          rounded-xl
          shadow
          p-8
          text-center
          "
          >
            <p
              className="
            text-xl
            font-bold
            text-gray-600
            "
            >
              سفارشی پیدا نشد
            </p>
          </div>
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
