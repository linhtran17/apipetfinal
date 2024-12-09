const { DataTypes } = require("sequelize"); //ket nối data
const sequelize = require("../database"); // lấy từ file database.js

const Users = sequelize.define('User',
  {
    // Định nghĩa các cột cho bảng Users
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "customer", // Giá trị mặc định là 'customer'
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Mặc định là thời gian hiện tại
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Ngày tạo mặc định là thời gian hiện tại
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Users", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không thêm createdAt và updatedAt tự động
  }
);

module.exports = Users;
