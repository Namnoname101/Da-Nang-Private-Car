/**
 * MIDDLEWARE: Xác thực JWT
 * Bảo vệ các route cần đăng nhập (POST, PUT, DELETE)
 * Client gửi token qua header: Authorization: Bearer <token>
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  try {
    // Lấy header Authorization
    const authHeader = req.headers.authorization;

    // Kiểm tra header có tồn tại không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực. Vui lòng đăng nhập.',
      });
    }

    // Tách token từ header "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gắn thông tin user vào request để các controller sử dụng
    req.user = decoded;

    // Cho phép request đi tiếp
    next();
  } catch (error) {
    // Token hết hạn hoặc không hợp lệ
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn. Vui lòng đăng nhập lại.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ. Vui lòng đăng nhập lại.',
    });
  }
};

module.exports = authMiddleware;
