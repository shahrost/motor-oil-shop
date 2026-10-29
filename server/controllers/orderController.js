const orderService = require("../services/orderService");

const orderExportService = require("../services/orderExportService");

const apiResponse = require("../utils/apiResponse");

async function getOrders(req, res, next) {
  try {
    const orders = await orderService.getOrders();

    return apiResponse.success(res, orders);
  } catch (error) {
    next(error);
  }
}

// فایل اکسل سفارش‌های یک ماه شمسی (?year=1405&month=7)
async function exportOrdersExcel(req, res, next) {
  try {
    const { workbook, fileName, asciiFileName } = await orderExportService.buildMonthlyWorkbook(
      req.query.year,
      req.query.month,
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    );

    res.setHeader("Cache-Control", "no-store");

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.body, req.customerId);

    return apiResponse.created(res, order);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );

    return apiResponse.success(res, order);
  } catch (error) {
    next(error);
  }
}

async function setOrderDone(req, res, next) {
  try {
    const order = await orderService.setOrderDone(req.params.id, req.body.done);

    return apiResponse.success(res, order);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    await orderService.deleteOrder(req.params.id);

    return apiResponse.success(res, null, "سفارش حذف شد");
  } catch (error) {
    next(error);
  }
}

async function deleteAllOrders(req, res, next) {
  try {
    await orderService.deleteAllOrders();

    return apiResponse.success(res, null, "تمام سفارش‌ها حذف شدند");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrders,
  exportOrdersExcel,
  createOrder,
  updateOrderStatus,
  setOrderDone,
  deleteOrder,
  deleteAllOrders,
};
