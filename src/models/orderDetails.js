const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Model = sequelize.define('order_details', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'order_details',
    timestamps: false
});

module.exports = Model;