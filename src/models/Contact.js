const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Tự động tăng
      primaryKey: true, // Khóa chính
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Không được để trống
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Không được để trống
    },
     phone: { // Đổi 'title' thành 'phone'
      type: DataTypes.STRING, // Lưu số điện thoại dạng chuỗi
      allowNull: false, // Không được để trống
      validate: {
        isNumeric: true, // Chỉ cho phép số
        len: [10, 15], // Chiều dài số điện thoại (ví dụ: từ 10-15 ký tự)
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Không được để trống
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0, // Mặc định là 0 (chưa xử lý), 1 là đã xử lý
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Mặc định là ngày hiện tại
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Mặc định là ngày hiện tại
    },
  },
  {
    tableName: "contacts", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không tự động thêm createdAt và updatedAt
  }
);

module.exports = Contact;
