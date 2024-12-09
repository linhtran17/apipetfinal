const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import kết nối từ database.js

const CategoryPets = sequelize.define('CategoryPets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    modelName: "CategoryPets",
    tableName: 'CategoryPets',
    timestamps: false
});

module.exports = CategoryPets;
