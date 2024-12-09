// Import thư viện Express và các controller cần thiết
const express = require('express');
const orderCtrl = require("../ctrls/order.ctrl");
const dashboardCtrl = require("../ctrls/dashboard.ctrl"); 

const router = express.Router();

// Route để lấy thống kê số lượng theo trạng thái đơn hàng
router.get('/quantity-statistics', dashboardCtrl.quantityStatisticsByOrderStatus);

// Route để lấy các đơn hàng mới nhất
router.get('/latest-orders', dashboardCtrl.latestOrders);

// Route để lấy thông tin chi tiết của một đơn hàng theo mã đơn hàng (ID)
router.get('/order/:id', orderCtrl.findById);

// Route để cập nhật thông tin của một đơn hàng dựa trên mã đơn hàng (ID)
router.put('/order/:id', orderCtrl.update);

module.exports = router;
