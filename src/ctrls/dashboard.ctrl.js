const orderDao = require("../dao/order.dao")

module.exports = {
    quantityStatisticsByOrderStatus: async function (req, res) {
        const data = await orderDao.quantityStatisticsByOrderStatus()
        const result = {
            created: 0, pending: 0, published: 0, deliveried:0 ,cancel: 0
        }
        if (data) {
            for (let index = 0; index < data.length; index++) {
                result[data[index].status] = data[index].total;
            }
        }

        return res.status(200).json(result);
    },
    latestOrders: async function (req, res) {
        const data = await orderDao.find({ status: "created" }, { orderBy: "orderAt" })
        return res.status(200).json(data);
    },

}