/**
 * MODEL: AdminUser (Tài khoản quản trị)
 * Định nghĩa cấu trúc bảng admin_users
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Tên đăng nhập
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Tên đăng nhập không được để trống' },
    },
  },
  // Mật khẩu (đã mã hóa bcrypt)
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  // Thời gian tạo
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'admin_users',
  timestamps: false,
});

module.exports = AdminUser;
