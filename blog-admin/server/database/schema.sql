-- ==========================================
-- SCHEMA DATABASE CHO HỆ THỐNG BLOG
-- Da Nang Private Car Tours
-- ==========================================

-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS danang_blog
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE danang_blog;

-- ==========================================
-- BẢNG POSTS: Lưu trữ bài viết blog
-- ==========================================
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL COMMENT 'Tiêu đề bài viết',
  slug VARCHAR(500) NOT NULL UNIQUE COMMENT 'Đường dẫn SEO-friendly (tự động từ title)',
  summary TEXT COMMENT 'Tóm tắt ngắn hiển thị trên danh sách',
  content LONGTEXT COMMENT 'Nội dung chi tiết (HTML từ CKEditor)',
  thumbnail VARCHAR(1000) COMMENT 'URL ảnh đại diện (Cloudinary)',
  status ENUM('draft', 'published') DEFAULT 'draft' COMMENT 'Trạng thái: bản nháp hoặc đã xuất bản',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_slug (slug),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- BẢNG ADMIN_USERS: Tài khoản quản trị
-- ==========================================
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE COMMENT 'Tên đăng nhập',
  password VARCHAR(255) NOT NULL COMMENT 'Mật khẩu đã mã hóa bcrypt',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
