const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const CategoryPets = require('./CategoryPets'); 

const CategoryProducts = sequelize.define('CategoryProducts', {
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
    cat_pet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "CategoryPets",
            key: "id"
        }
    },
}, {
    modelName: "CategoryProducts",
    tableName: 'CategoryProducts',
    timestamps: false
});

// Định nghĩa mối quan hệ
CategoryProducts.belongsTo(CategoryPets, {
    foreignKey: 'cat_pet',
    as: 'catPet'
});

module.exports = CategoryProducts;
