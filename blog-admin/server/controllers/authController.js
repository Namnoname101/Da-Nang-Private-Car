/**
 * CONTROLLER: Auth (Xác thực)
 * Xử lý đăng nhập và tạo tài khoản admin
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
require('dotenv').config();

/**
 * ĐĂNG NHẬP
 * POST /api/auth/login
 * Body: { username, password }
 * Response: { success, message, token }
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên đăng nhập và mật khẩu.',
      });
    }

    // Tìm user trong database
    const user = await AdminUser.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tên đăng nhập không tồn tại.',
      });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không đúng.',
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Trả về token
    res.json({
      success: true,
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Vui lòng thử lại.',
    });
  }
};

/**
 * TẠO TÀI KHOẢN ADMIN
 * POST /api/auth/register
 * Body: { username, password }
 * (Chỉ dùng khi setup ban đầu)
 */
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.',
      });
    }

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await AdminUser.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Tên đăng nhập đã tồn tại.',
      });
    }

    // Mã hóa mật khẩu với bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = await AdminUser.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Tạo tài khoản admin thành công!',
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error('Lỗi tạo tài khoản:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Vui lòng thử lại.',
    });
  }
};

module.exports = { login, register };
