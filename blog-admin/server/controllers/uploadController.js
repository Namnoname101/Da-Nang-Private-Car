/**
 * CONTROLLER: Upload (Tải ảnh lên)
 * Xử lý upload ảnh lên Cloudinary
 */

const cloudinary = require('../config/cloudinary');

/**
 * UPLOAD ẢNH LÊN CLOUDINARY
 * POST /api/upload
 * Content-Type: multipart/form-data
 * Field: image (file ảnh)
 * Response: { success, url }
 */
const uploadImage = async (req, res) => {
  try {
    // Kiểm tra có file không
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy file ảnh. Vui lòng chọn ảnh để upload.',
      });
    }

    // Upload file từ buffer lên Cloudinary
    // Sử dụng upload_stream vì file nằm trong memory (multer memoryStorage)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'danang-blog',           // Thư mục trên Cloudinary
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },      // Tự động tối ưu chất lượng
            { fetch_format: 'auto' },       // Tự động chọn format tốt nhất
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Gửi buffer data vào stream
      uploadStream.end(req.file.buffer);
    });

    // Trả về URL ảnh đã upload
    res.json({
      success: true,
      message: 'Upload ảnh thành công!',
      data: {
        url: result.secure_url,          // URL HTTPS
        public_id: result.public_id,      // ID trên Cloudinary (dùng để xóa)
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
      },
    });
  } catch (error) {
    console.error('Lỗi upload ảnh:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh lên Cloudinary. Vui lòng thử lại.',
    });
  }
};

module.exports = { uploadImage };
