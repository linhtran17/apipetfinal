const { Sequelize } = require('sequelize');

// Khởi tạo kết nối Sequelize với MySQL
const sequelize = new Sequelize('petstore', 'root', 'admin!234', {
    host: '109.199.99.114',
    dialect: 'mysql',
    logging: false,
});

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => {
        console.log('Kết nối thành công với MySQL qua Sequelize!');
    })
    .catch((err) => {
        console.error('Không thể kết nối đến database:', err);
    });

module.exports = sequelize;
