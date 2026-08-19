import { useContext, useEffect, useMemo } from "react";
import DashboardCard from "./DashboardCard";
import OrderContext from "../../../context/OrderContext";
import orderStats from "../OrderManager/helpers/orderStats";

function Dashboard() {
  const { orders, loadOrders } = useContext(OrderContext);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const stats = useMemo(() => orderStats(orders), [orders]);

  const cards = [
    {
      title: "کل سفارش‌ها",
      value: orders.length,
      icon: "📦",
      color: "bg-white",
    },

    {
      title: "فروش کل",
      value: `${stats.totalSales.toLocaleString()} تومان`,
      icon: "💰",
      color: "bg-green-100",
    },

    {
      title: "محصولات فروخته شده",
      value: stats.totalProducts,
      icon: "🛢️",
      color: "bg-blue-100",
    },

    {
      title: "مشتریان",
      value: stats.totalCustomers,
      icon: "👥",
      color: "bg-yellow-100",
    },
  ];

  return (
    <section className="mb-10">
      <h2
        className="
      text-2xl
      font-bold
      mb-5
      "
      >
        داشبورد
      </h2>

      <div
        className="
      grid
      md:grid-cols-2
      lg:grid-cols-4
      gap-5
      "
      >
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
