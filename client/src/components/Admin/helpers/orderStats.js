function orderStats(orders) {
  let totalSales = 0;

  let totalProducts = 0;

  let cashOrders = 0;

  let checkOrders = 0;

  let brandCount = {};

  let productCount = {};

  let customerPhones = new Set();

  orders.forEach((order) => {
    totalSales += Number(order.totalPrice || 0);

    if (order.customer?.phone) {
      customerPhones.add(order.customer.phone);
    }

    let hasCash = false;

    let hasCheck = false;

    order.items?.forEach((item) => {
      totalProducts += Number(item.totalCount || 0);

      if (item.paymentType === "cash") {
        hasCash = true;
      }

      if (item.paymentType === "check") {
        hasCheck = true;
      }

      if (item.brand) {
        brandCount[item.brand] =
          (brandCount[item.brand] || 0) + Number(item.totalCount || 0);
      }

      if (item.productName) {
        productCount[item.productName] =
          (productCount[item.productName] || 0) + Number(item.totalCount || 0);
      }
    });

    if (hasCash) {
      cashOrders++;
    }

    if (hasCheck) {
      checkOrders++;
    }
  });

  const bestBrand = Object.entries(brandCount).sort((a, b) => b[1] - a[1])[0];

  const bestProduct = Object.entries(productCount).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return {
    totalSales,

    totalProducts,

    cashOrders,

    checkOrders,

    totalCustomers: customerPhones.size,

    bestBrand: bestBrand ? bestBrand[0] : "ندارد",

    bestProduct: bestProduct ? bestProduct[0] : "ندارد",
  };
}

export default orderStats;
