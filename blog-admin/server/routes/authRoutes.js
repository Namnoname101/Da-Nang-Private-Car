/**
 * ROUTES: Auth (Xác thực)
 * Định nghĩa các endpoint liên quan đến đăng nhập/đăng ký
 */

const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// POST /api/auth/login — Đăng nhập, trả về JWT token
router.post('/login', login);

// POST /api/auth/register — Tạo tài khoản admin mới
router.post('/register', register);

module.exports = router;
