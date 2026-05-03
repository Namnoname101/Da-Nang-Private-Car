/**
 * CẤU HÌNH CLOUDINARY
 * Dùng để upload và quản lý ảnh trên cloud
 */

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cấu hình Cloudinary với thông tin từ .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
