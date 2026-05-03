/**
 * ROUTES: Post (Bài viết)
 * Định nghĩa các endpoint CRUD cho bài viết blog
 * Các route POST/PUT/DELETE được bảo vệ bởi JWT middleware
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../controllers/postController');

// ============================
// PUBLIC ROUTES (Không cần đăng nhập)
// ============================

// GET /api/posts — Lấy danh sách bài viết (có phân trang)
router.get('/', getAll);

// GET /api/posts/:id — Lấy chi tiết 1 bài viết
router.get('/:id', getById);

// ============================
// PROTECTED ROUTES (Cần JWT token)
// ============================

// POST /api/posts — Tạo bài viết mới
router.post('/', authMiddleware, create);

// PUT /api/posts/:id — Cập nhật bài viết
router.put('/:id', authMiddleware, update);

// DELETE /api/posts/:id — Xóa bài viết
router.delete('/:id', authMiddleware, remove);

module.exports = router;
