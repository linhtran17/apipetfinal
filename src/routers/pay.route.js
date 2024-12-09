const express = require("express");
const { createPay } = require("../utils");
const { TZ, APP_VNP_URL_STATUS } = require("../config");
const orderDao = require("../dao/order.dao");
const { or } = require("sequelize");
const router = express.Router();


router.post("/", async (req, res) => {
    process.env.TZ = TZ
    const ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    const link = await createPay({ ...req.body, ipAddr });
    res.json({ link })
})

router.get("/", async (req, res) => {
    try {
        const payData = JSON.stringify(req.query)
        const id = req.query?.vnp_TxnRef
        let message = ""
        if (id) {
            const order = (await orderDao.updatePayOrder(Number(id), { payStatus: req.query?.vnp_ResponseCode, payData }))?.toJSON()
            if (order)
                message = `orderID: ${order.id} voi so tien: ${order.total} thanh cong`
        }
        res.redirect(`${APP_VNP_URL_STATUS}?code=${req.query?.vnp_ResponseCode || ''}&message=${message}`)
    } catch (error) {
        res.status(401).json({ error });
    }
})

module.exports = router