const express = require('express');
const orderCtrl = require("../ctrls/order.ctrl");

const router = express.Router();

router.get('/', orderCtrl.find);
router.get('/:id', orderCtrl.findById);
router.post('/', orderCtrl.userOrder);
router.put('/:id', orderCtrl.update);
router.delete('/:id', orderCtrl.deleteById);

// Thêm API thanh toán VNPay
router.post('/:id/pay', orderCtrl.pay); // Xử lý yêu cầu thanh toán VNPay
router.get('/vnpay_return', orderCtrl.vnpayReturn); // Xử lý callback sau khi thanh toán

module.exports = router;
