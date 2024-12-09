
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Model = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username : {
        type: DataTypes.STRING,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('created', 'pending', "published","deliveried", "cancel"),
        allowNull: true,
        defaultValue: "created"
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    orderAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deliveryAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    pay: {
        type: DataTypes.STRING,
    },
    payStatus: {
        type: DataTypes.STRING,
    },
    payData: {
        type: DataTypes.TEXT
    },
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Model;
