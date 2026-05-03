/**
 * CẤU HÌNH KẾT NỐI DATABASE
 * Sử dụng Sequelize ORM kết nối MySQL
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Khởi tạo kết nối Sequelize tới MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Tên database
  process.env.DB_USER,   // Username MySQL
  process.env.DB_PASS,   // Password MySQL
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Tắt log SQL query (bật = console.log)
    timezone: '+07:00', // Múi giờ Việt Nam
    define: {
      timestamps: false, // Tự quản lý timestamps
      underscored: true, // Dùng snake_case cho tên cột
    },
    pool: {
      max: 10,      // Số kết nối tối đa
      min: 0,
      acquire: 30000, // Thời gian chờ kết nối (ms)
      idle: 10000,    // Thời gian idle trước khi đóng (ms)
    },
  }
);

module.exports = sequelize;
