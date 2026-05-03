/**
 * ==========================================
 * APP.JS — Entry Point cho Backend API
 * Hệ thống quản lý Blog — Da Nang Private Car Tours
 * ==========================================
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import cấu hình database
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Khởi tạo Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE TOÀN CỤC
// ==========================================

// Cho phép CORS từ mọi origin (cần thiết khi frontend và backend ở domain/port khác nhau)
// Khi production: có thể giới hạn lại origin cụ thể nếu muốn
app.use(cors({
  origin: true, // Cho phép tất cả origin
  credentials: true,
}));

// Parse JSON body
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded body
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==========================================
// ĐĂNG KÝ ROUTES
// ==========================================

// Route xác thực (đăng nhập/đăng ký)
app.use('/api/auth', authRoutes);

// Route quản lý bài viết
app.use('/api/posts', postRoutes);

// Route upload ảnh
app.use('/api/upload', uploadRoutes);

// Route kiểm tra server hoạt động
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Blog API Server đang hoạt động! 🚀',
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// XỬ LÝ LỖI TOÀN CỤC
// ==========================================

// Xử lý route không tồn tại (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy route: ${req.method} ${req.url}`,
  });
});

// Xử lý lỗi chung (500)
app.use((err, req, res, next) => {
  console.error('Lỗi server:', err);

  // Lỗi Multer (upload file quá lớn)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File ảnh quá lớn. Giới hạn tối đa 5MB.',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Lỗi server nội bộ. Vui lòng thử lại.',
  });
});

// ==========================================
// KHỞI ĐỘNG SERVER
// ==========================================

async function startServer() {
  try {
    // Kết nối database
    await sequelize.authenticate();
    console.log('✅ Kết nối MySQL thành công!');

    // Đồng bộ bảng (tạo bảng nếu chưa có)
    await sequelize.sync({ alter: true });
    console.log('✅ Đồng bộ database thành công!');

    // Khởi động server
    app.listen(PORT, () => {
      console.log('==========================================');
      console.log(`🚀 Blog API Server đang chạy tại:`);
      console.log(`   http://localhost:${PORT}`);
      console.log(`   Health check: http://localhost:${PORT}/api/health`);
      console.log('==========================================');
    });
  } catch (error) {
    console.error('❌ Không thể kết nối database:', error.message);
    console.error('   Kiểm tra lại thông tin MySQL trong file .env');
    process.exit(1);
  }
}

startServer();
