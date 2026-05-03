/**
 * MODEL: Post (Bài viết)
 * Định nghĩa cấu trúc bảng posts trong database
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Tiêu đề bài viết
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Tiêu đề không được để trống' },
    },
  },
  // Slug (đường dẫn SEO) - tự động tạo từ title
  slug: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
  },
  // Tóm tắt ngắn gọn
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Nội dung chi tiết (HTML từ CKEditor)
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  // URL ảnh đại diện (từ Cloudinary)
  thumbnail: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  // Trạng thái: bản nháp hoặc đã xuất bản
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
  },
  // Thời gian tạo
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  // Thời gian cập nhật
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'posts',
  timestamps: false,  // Tự quản lý created_at và updated_at
});

module.exports = Post;
