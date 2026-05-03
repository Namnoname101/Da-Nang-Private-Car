/**
 * MIDDLEWARE: Upload File
 * Sử dụng Multer để xử lý file upload từ client
 * Lưu file tạm vào bộ nhớ (memory) trước khi gửi lên Cloudinary
 */

const multer = require('multer');

// Cấu hình Multer: lưu file vào memory (không lưu vào ổ cứng)
const storage = multer.memoryStorage();

// Bộ lọc file: chỉ cho phép upload ảnh
const fileFilter = (req, file, cb) => {
  // Danh sách MIME types cho phép
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Chấp nhận file
  } else {
    cb(new Error('Chỉ được upload file ảnh (JPEG, PNG, GIF, WebP)'), false);
  }
};

// Khởi tạo middleware upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
});

module.exports = upload;
