// import { useMemo, useState } from "react";
// import { useContext } from "react";
// import orderStats from "../helpers/orderStats";
// import OrderContext from "../../../../context/OrderContext";

// function useOrderManager() {
//   const { orders, updateOrderStatus, deleteOrder } = useContext(OrderContext);

//   const [search, setSearch] = useState("");

//   const [filterStatus, setFilterStatus] = useState("همه");

//   const statuses = [
//     "جدید",
//     "تماس گرفته شد",
//     "آماده ارسال",
//     "ارسال شد",
//     "تحویل شد",
//   ];

//   const filteredOrders = useMemo(() => {
//     return orders
//       .filter((order) => {
//         const text = search.toLowerCase();

//         const productsText = order.items
//           ?.map((item) => item.productName)
//           .join(" ")
//           .toLowerCase();

//         const searchMatch =
//           order.customer?.name?.toLowerCase().includes(text) ||
//           order.customer?.phone?.includes(text) ||
//           order.customer?.area?.toLowerCase().includes(text) ||
//           productsText?.includes(text);

//         const statusMatch =
//           filterStatus === "همه" || order.status === filterStatus;

//         return searchMatch && statusMatch;
//       })
//       .reverse();
//   }, [orders, search, filterStatus]);

//   const dashboard = useMemo(() => orderStats(orders), [orders]);

//   return {
//     orders,

//     updateOrderStatus,

//     deleteOrder,

//     search,

//     setSearch,

//     filterStatus,

//     setFilterStatus,

//     statuses,

//     filteredOrders,

//     dashboard,
//   };
// }

// export default useOrderManager;
//-----------------------------------------
import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";

import orderStats from "../helpers/orderStats";
import OrderContext from "../../../../context/OrderContext";

function useOrderManager() {
  const { orders, loadOrders, updateOrderStatus, deleteOrder } =
    useContext(OrderContext);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("همه");

  const statuses = [
    "جدید",
    "تماس گرفته شد",
    "آماده ارسال",
    "ارسال شد",
    "تحویل شد",
  ];

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const text = search.toLowerCase();

        const productsText = order.items
          ?.map((item) => item.productName)
          .join(" ")
          .toLowerCase();

        const searchMatch =
          order.customer?.name?.toLowerCase().includes(text) ||
          order.customer?.phone?.includes(text) ||
          order.customer?.area?.toLowerCase().includes(text) ||
          productsText?.includes(text);

        const statusMatch =
          filterStatus === "همه" || order.status === filterStatus;

        return searchMatch && statusMatch;
      })
      .reverse();
  }, [orders, search, filterStatus]);

  const dashboard = useMemo(() => orderStats(orders), [orders]);

  return {
    orders,

    updateOrderStatus,

    deleteOrder,

    search,

    setSearch,

    filterStatus,

    setFilterStatus,

    statuses,

    filteredOrders,

    dashboard,
  };
}

export default useOrderManager;
