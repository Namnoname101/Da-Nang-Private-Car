/**
 * PAGE: PostFormPage
 * Trang tạo mới / chỉnh sửa bài viết
 * - Nếu URL có :id → chế độ Sửa (load dữ liệu cũ)
 * - Nếu không có :id → chế độ Tạo mới
 * - Sử dụng component PostForm
 */

import React, { useState, useEffect } from 'react';
import { Form, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import axiosClient from '../api/axiosClient';

const PostFormPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL (nếu đang sửa)
  const isEdit = !!id; // true = đang sửa, false = tạo mới

  /**
   * Nếu đang ở chế độ Sửa, load dữ liệu bài viết cũ
   */
  useEffect(() => {
    if (isEdit) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setPageLoading(true);
      const response = await axiosClient.get(`/posts/${id}`);

      if (response.data.success) {
        const post = response.data.data;
        // Điền dữ liệu cũ vào form
        form.setFieldsValue({
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          content: post.content,
          thumbnail: post.thumbnail,
          status: post.status,
        });
      }
    } catch (error) {
      message.error('Không tìm thấy bài viết.');
      navigate('/posts');
    } finally {
      setPageLoading(false);
    }
  };

  /**
   * Xử lý khi submit form
   * - Tạo mới: POST /api/posts
   * - Cập nhật: PUT /api/posts/:id
   */
  const handleFinish = async (values) => {
    try {
      setLoading(true);

      let response;
      if (isEdit) {
        // Cập nhật bài viết
        response = await axiosClient.put(`/posts/${id}`, values);
      } else {
        // Tạo bài viết mới
        response = await axiosClient.post('/posts', values);
      }

      if (response.data.success) {
        message.success(
          isEdit ? 'Cập nhật bài viết thành công! ✅' : 'Tạo bài viết thành công! 🎉'
        );
        navigate('/posts');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị loading khi đang tải dữ liệu
  if (pageLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
      }}>
        <Spin size="large" tip="Đang tải bài viết..." />
      </div>
    );
  }

  return (
    <PostForm
      form={form}
      onFinish={handleFinish}
      loading={loading}
      isEdit={isEdit}
      onBack={() => navigate('/posts')}
    />
  );
};

export default PostFormPage;
