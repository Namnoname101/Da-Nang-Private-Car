/**
 * ROUTES: Upload (Tải ảnh)
 * Endpoint upload ảnh lên Cloudinary
 * Được bảo vệ bởi JWT middleware
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');

// POST /api/upload — Upload 1 ảnh (field name: "image")
// Middleware chain: JWT xác thực → Multer parse file → Controller xử lý
router.post('/', authMiddleware, upload.single('image'), uploadImage);

module.exports = router;
