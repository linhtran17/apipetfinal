const { sum } = require("lodash");
const sequelize = require('../database');
const Order = require("../models/orders");
const OrderDetail = require("../models/orderDetails");
const { QueryTypes } = require("sequelize");

async function add(data) {
    const { fullname, phone, note, deliveryAddress, username, email, products, pay } = data;
    // thanh tien
    const total = sum(products.map(({ discount, price, quantity }) =>
        (quantity * price - (quantity * price / 100 * discount))
    ));

    const transaction = await sequelize.transaction();
    try {
        const order = await Order.create({
            fullname, phone, note, deliveryAddress, username, email, total, pay: pay?.pay || ""
        }, { transaction });

        const orderDetails = products.map(({ discount, price, quantity, id, note }) => ({
            productId: id,
            orderId: order.id,
            discount, price, quantity, note: note || ""
        }));

        await OrderDetail.bulkCreate(orderDetails, { transaction });
        await transaction.commit();
        return { status: true, message: "Tạo đơn hàng thành công!", order: { orderId: order.id, amount: total } };
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
    }
}

async function find(where, params = {}) {
    let { page = 1, limit = 10, orderBy } = params;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    try {
        const items = await Order.findAndCountAll({
            where: where || {},
            limit: limit,
            offset: offset,
            order: [[orderBy || "orderAt", "DESC"]]
        });

        const totalPages = Math.ceil(items.count / limit);

        return {
            total: items.count,
            totalPages: totalPages,
            currentPage: page,
            list: items.rows
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function findById(id) {
    return await Order.findByPk(id);
}

async function update(id, data) {
    const { status } = data;
    const items = await findById(id);

    if (items) {
        items.status = status;
        items.updateAt = new Date();

        if (status == "deliveried") {
            items.deliveryAt = new Date();
        }

        await items.save();
        return items;
    }
    return null;
}


async function updatePayOrder(id, { payStatus, payData }) {
    const item = await findById(id);
    if (item) {
        item.updateAt = new Date();
        item.payStatus = payStatus
        item.payData = payData
        await item.save();
        return item;
    }
    return null;
}

async function remove(id) {
    const item = await findById(id);
    if (item && item.status !== "deliveried") {
        await item.destroy();
        return true;
    }

    return false;
}

async function quantityStatisticsByOrderStatus() {
    const SQL = `SELECT o.status, COUNT(*) total FROM orders o GROUP BY o.status`;
    const data = await sequelize.query(SQL, {
        type: QueryTypes.SELECT,
        replacements: {}
    });

    return data;
}

module.exports = {
    add,
    find,
    findById,
    update,
    remove,
    quantityStatisticsByOrderStatus,
    updatePayOrder
};
