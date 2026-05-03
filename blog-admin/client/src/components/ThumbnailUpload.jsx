/**
 * COMPONENT: ThumbnailUpload
 * Upload ảnh đại diện cho bài viết
 * - Chọn file từ máy tính
 * - Hiển thị preview trước khi upload
 * - Upload lên Cloudinary qua API /api/upload
 */

import React, { useState } from 'react';
import { Upload, Button, message, Image, Spin } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosClient from '../api/axiosClient';

const ThumbnailUpload = ({ value, onChange }) => {
  // State quản lý trạng thái loading
  const [uploading, setUploading] = useState(false);

  /**
   * Xử lý khi chọn file
   * Upload file lên Cloudinary thông qua Backend API
   */
  const handleUpload = async (info) => {
    const file = info.file;

    // Kiểm tra loại file
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ được upload file ảnh!');
      return;
    }

    // Kiểm tra dung lượng (< 5MB)
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Ảnh phải nhỏ hơn 5MB!');
      return;
    }

    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);

      // Gọi API upload
      const response = await axiosClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        // Gọi onChange để cập nhật giá trị trong Form
        onChange && onChange(imageUrl);
        message.success('Upload ảnh thành công!');
      }
    } catch (error) {
      console.error('Lỗi upload:', error);
      message.error('Upload ảnh thất bại. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  /**
   * Xóa ảnh đã upload
   */
  const handleRemove = () => {
    onChange && onChange('');
  };

  return (
    <div>
      {/* Nếu đã có ảnh, hiển thị preview */}
      {value ? (
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: 12,
        }}>
          <Image
            src={value}
            alt="Ảnh đại diện"
            style={{
              maxWidth: 300,
              maxHeight: 200,
              objectFit: 'cover',
              borderRadius: 8,
              border: '1px solid #d9d9d9',
            }}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            Xóa
          </Button>
        </div>
      ) : null}

      {/* Nút upload */}
      <div>
        <Upload
          beforeUpload={() => false}
          onChange={handleUpload}
          showUploadList={false}
          accept="image/*"
          maxCount={1}
        >
          <Button
            icon={<UploadOutlined />}
            loading={uploading}
            type={value ? 'default' : 'primary'}
          >
            {uploading ? 'Đang upload...' : value ? 'Thay đổi ảnh' : 'Chọn ảnh đại diện'}
          </Button>
        </Upload>
      </div>

      {/* Hiển thị URL ảnh nếu có */}
      {value && (
        <div style={{
          marginTop: 8,
          fontSize: 12,
          color: '#888',
          wordBreak: 'break-all',
        }}>
          URL: {value}
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
