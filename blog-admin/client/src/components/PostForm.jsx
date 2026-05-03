/**
 * COMPONENT: PostForm
 * Form tạo/sửa bài viết
 * - Ant Design Form layout chuẩn
 * - Tích hợp Quill editor cho nội dung (tương thích React 19)
 * - Auto-slug từ Title
 * - Upload ảnh đại diện
 */

import React from 'react';
import { Form, Input, Select, Button, Space, Divider, Typography } from 'antd';
import { SaveOutlined, SendOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import RichTextEditor from './RichTextEditor';
import ThumbnailUpload from './ThumbnailUpload';
import { slugify } from '../utils/slugify';

const { TextArea } = Input;
const { Title: AntTitle } = Typography;

const PostForm = ({ form, onFinish, loading, isEdit = false, onBack }) => {
  /**
   * Theo dõi field Title để tự động tạo Slug
   */
  const handleTitleChange = (e) => {
    const title = e.target.value;
    // Tự động tạo slug từ title
    const autoSlug = slugify(title);
    form.setFieldsValue({ slug: autoSlug });
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
            Quay lại
          </Button>
          <AntTitle level={4} style={{ margin: 0 }}>
            {isEdit ? '✏️ Chỉnh sửa bài viết' : '📝 Tạo bài viết mới'}
          </AntTitle>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: 'draft' }}
        size="large"
      >
        {/* ====== TIÊU ĐỀ ====== */}
        <Form.Item
          name="title"
          label="Tiêu đề bài viết"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input
            placeholder="Nhập tiêu đề bài viết..."
            onChange={handleTitleChange}
            maxLength={500}
            showCount
          />
        </Form.Item>

        {/* ====== SLUG (Tự động từ Title) ====== */}
        <Form.Item
          name="slug"
          label="Đường dẫn (Slug)"
          tooltip="Tự động tạo từ tiêu đề. Bạn có thể chỉnh sửa nếu muốn."
          rules={[{ required: true, message: 'Slug không được để trống!' }]}
        >
          <Input
            placeholder="duong-dan-bai-viet"
            addonBefore="/"
            style={{ fontFamily: 'monospace' }}
          />
        </Form.Item>

        {/* ====== TÓM TẮT ====== */}
        <Form.Item
          name="summary"
          label="Tóm tắt"
          tooltip="Đoạn mô tả ngắn hiển thị trên danh sách bài viết"
        >
          <TextArea
            placeholder="Nhập tóm tắt ngắn gọn cho bài viết..."
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>

        {/* ====== ẢNH ĐẠI DIỆN ====== */}
        <Form.Item
          name="thumbnail"
          label="Ảnh đại diện (Thumbnail)"
          tooltip="Ảnh hiển thị trên danh sách và khi chia sẻ bài viết"
        >
          <ThumbnailUpload />
        </Form.Item>

        <Divider />

        {/* ====== NỘI DUNG (Quill Editor) ====== */}
        <Form.Item
          name="content"
          label="Nội dung bài viết"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
        >
          <RichTextEditor placeholder="Viết nội dung bài viết tại đây..." />
        </Form.Item>

        <Divider />

        {/* ====== TRẠNG THÁI ====== */}
        <Form.Item
          name="status"
          label="Trạng thái"
          style={{ maxWidth: 300 }}
        >
          <Select>
            <Select.Option value="draft">📄 Bản nháp (Draft)</Select.Option>
            <Select.Option value="published">✅ Xuất bản (Published)</Select.Option>
          </Select>
        </Form.Item>

        {/* ====== NÚT HÀNH ĐỘNG ====== */}
        <Form.Item>
          <Space size="middle">
            <Button
              type="primary"
              htmlType="submit"
              icon={isEdit ? <SaveOutlined /> : <SendOutlined />}
              loading={loading}
              size="large"
              style={{
                background: '#d4a843',
                borderColor: '#d4a843',
                minWidth: 160,
              }}
            >
              {isEdit ? 'Cập nhật bài viết' : 'Tạo bài viết'}
            </Button>
            <Button onClick={onBack} size="large">
              Hủy
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
