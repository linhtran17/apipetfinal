const sequelize = require('../database');
const { QueryTypes } = require("sequelize");


// Lấy danh sách tin tức (Read)
async function findBy(orderId) {
    try {
        const SQL = `SELECT od.orderId, od.productId , p.name, od.quantity, od.discount, od.price, (od.quantity * od.price - (od.quantity * od.price / 100 * od.discount)) as total, (od.quantity * od.price / 100 * od.discount) as discountTotal, (od.quantity * od.price) AS tmpTotal FROM order_details od 
                     LEFT JOIN products p ON p.id  = od.productId
                     WHERE od.orderId =  :orderId`
        const items = await sequelize.query(SQL, {
            replacements: { orderId },
            type: QueryTypes.SELECT,
        });

        return items || []
    } catch (error) {
        return [];
    }
}


module.exports = {
    findBy,
};