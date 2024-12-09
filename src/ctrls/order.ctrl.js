const axios = require('axios');
const crypto = require('crypto');
const orderDao = require("../dao/order.dao");
const orderDetailDao = require("../dao/order-detail.dao");
const { forEach } = require("lodash");
const { createPay } = require('../utils');
const { TZ } = require('../config');

module.exports = {
  userOrder: async function (req, res) {
    try {
      const { pay } = req.body;
      const result = await orderDao.add({ username: req.user?.username || "anonymous", ...req.body });

      let link = ""
      if (pay?.pay && pay?.bankCode && result?.order) {
        process.env.TZ = TZ
        const ipAddr = req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;
        link = await createPay({ ...result.order, bankCode: pay.bankCode, ipAddr })
      }


      return res.status(200).json({ ...result, link });
    } catch (error) {
      return res.status(404).json({ error: 'Thao tác không thành công' });
    }
  },

  myOrder: function (req, res, next) {
     req.query.username = req?.user?.username || "-"
     next()
  },
  find: async function (req, res) {
    try {
      const where = {};
      if (req.query.status) {
        where.status = req.query.status;
      }
      if (req.query.username) {
        where.username = req.query.username
      }
      const result = await orderDao.find(where, req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: 'Thao tác không thành công' });
    }
  },

  findById: async function (req, res) {
    try {
      const order = await orderDao.findById(req.params.id);
      const products = await orderDetailDao.findBy(req.params.id);
      let discountTotal = 0;
      let tmpTotal = 0;

      forEach(products, (item) => {
        discountTotal += item.discountTotal;
        tmpTotal += item.tmpTotal;
      });

      return res.status(200).json({ ...order.toJSON(), products, discountTotal, tmpTotal });
    } catch (error) {
      return res.status(404).json({ error: 'Thao tác không thành công' });
    }
  },

  update: async function (req, res) {
    try {
      const model = await orderDao.update(req.params.id, req.body);
      if (model) {
        res.json(model);
      } else {
        res.status(404).json({ error: 'Không tìm thấy.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi cập nhật.' });
    }
  },

  pay: async function (req, res) {
    const { orderId, amount, returnUrl } = req.body;
    const vnp_TmnCode = process.env.VNP_TMNCode;
    const vnp_HashSecret = process.env.VNP_HashSecret;
    const vnp_Url = process.env.VNP_Url;
    const vnp_ReturnUrl = returnUrl || process.env.VNP_ReturnUrl;

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnp_TmnCode,
      vnp_Amount: amount * 100, // VNPay yêu cầu amount phải là giá trị tính bằng đồng (VNĐ)
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán cho đơn hàng ${orderId}`,
      vnp_OrderType: "billpayment",
      vnp_Locale: "vn",
      vnp_ReturnUrl: vnp_ReturnUrl,
      vnp_IpAddr: req.ip,
      vnp_CreateDate: new Date().toISOString().replace(/[-:.]/g, ""),
    };

    const secretKey = vnp_HashSecret;
    const queryString = Object.keys(vnp_Params)
      .sort()
      .map((key) => `${key}=${vnp_Params[key]}`)
      .join("&");

    const hashData = queryString + secretKey;
    const vnp_SecureHash = crypto
      .createHash("sha256")
      .update(hashData)
      .digest("hex");

    vnp_Params["vnp_SecureHash"] = vnp_SecureHash;

    const vnp_UrlPayment = `${vnp_Url}?${new URLSearchParams(vnp_Params).toString()}`;
    res.redirect(vnp_UrlPayment);
  },

  vnpayReturn: async function (req, res) {
    const vnp_ResponseCode = req.query.vnp_ResponseCode;
    const vnp_TxnRef = req.query.vnp_TxnRef;
    const vnp_SecureHash = req.query.vnp_SecureHash;
    const secretKey = process.env.VNP_HashSecret;

    // Tạo lại chuỗi để kiểm tra hash
    const queryString = Object.keys(req.query)
      .filter((key) => key !== "vnp_SecureHash")
      .sort()
      .map((key) => `${key}=${req.query[key]}`)
      .join("&");

    const hashData = queryString + secretKey;
    const checkSecureHash = crypto
      .createHash("sha256")
      .update(hashData)
      .digest("hex");

    if (checkSecureHash === vnp_SecureHash) {
      if (vnp_ResponseCode === "00") {
        res.send("Thanh toán thành công");
      } else {
        res.send("Thanh toán thất bại");
      }
    } else {
      res.send("Thông tin thanh toán không hợp lệ");
    }
  },

  deleteById: async function (req, res) {
    // Xử lý logic xóa đơn hàng nếu cần
  }
};
