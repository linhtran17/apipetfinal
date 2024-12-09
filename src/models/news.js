const { DataTypes } = require('sequelize');
const sequelize = require('../database');



const News = sequelize.define('news', {
    //sequelize đại diện cho một bảng trong cơ sở dữ liệu
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,// tự động tăng giá trị
        primaryKey: true
    },
    tieude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noidung: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hinhanh: {
        type: DataTypes.STRING,
        allowNull: true // Hình ảnh có thể không có
    },
    published_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Ngày đăng mặc định là hiện tại
    },
    status: {
        type: DataTypes.ENUM('published', 'draft'),
        allowNull: false,
        defaultValue: 'draft' // Mặc định là 'draft'
    }, description: {
        type: DataTypes.TEXT,
        allowNull: true
    }, description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'news',
    timestamps: false // Không tự động thêm timestamp (createdAt, updatedAt)
});

module.exports = News;
//để xuất một biến, hàm, hoặc lớp từ một tệp để có thể sử dụng trong các tệp khác.