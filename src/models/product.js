const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import kết nối từ database.js

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cat_pro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "CategoryProducts",
            key: "id"
        }
    },
    cat_pet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "CategoryPets",
            key: "id"
        }
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    discount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    sale: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;
