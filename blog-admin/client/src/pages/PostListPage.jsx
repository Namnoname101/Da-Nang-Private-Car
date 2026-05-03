/**
 * PAGE: PostListPage
 * Trang danh sách bài viết
 * - AntD Table với các cột: Ảnh, Tiêu đề, Ngày tạo, Trạng thái, Hành động
 * - Phân trang (server-side pagination)
 * - Nút Thêm bài viết mới
 * - Xác nhận xóa bằng Modal.confirm
 * - Thông báo kết quả bằng message
 */

import React, { useState, useEffect } from 'react';
import {
  Table, Button, Tag, Space, Avatar, Typography, Modal,
  message, Input, Select, Tooltip, Popconfirm,
} from 'antd';
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  SearchOutlined, EyeOutlined, FileImageOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const PostListPage = () => {
  // State quản lý dữ liệu
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  /**
   * Gọi API lấy danh sách bài viết
   */
  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      // Xây dựng query params
      const params = { page, limit };
      if (searchText) params.search = searchText;
      if (filterStatus) params.status = filterStatus;

      const response = await axiosClient.get('/posts', { params });

      if (response.data.success) {
        setPosts(response.data.data);
        setPagination({
          current: response.data.pagination.currentPage,
          pageSize: response.data.pagination.itemsPerPage,
          total: response.data.pagination.totalItems,
        });
      }
    } catch (error) {
      message.error('Lỗi khi tải danh sách bài viết.');
      console.error('Lỗi fetchPosts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchPosts khi component mount hoặc filter thay đổi
  useEffect(() => {
    fetchPosts(1, pagination.pageSize);
  }, [searchText, filterStatus]);

  /**
   * Xử lý khi thay đổi trang (pagination)
   */
  const handleTableChange = (paginationConfig) => {
    fetchPosts(paginationConfig.current, paginationConfig.pageSize);
  };

  /**
   * Xử lý xóa bài viết
   */
  const handleDelete = async (id, title) => {
    try {
      const response = await axiosClient.delete(`/posts/${id}`);
      if (response.data.success) {
        message.success(`Đã xóa bài viết "${title}" thành công!`);
        // Refresh danh sách
        fetchPosts(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error('Xóa bài viết thất bại.');
      console.error('Lỗi xóa:', error);
    }
  };

  /**
   * Định nghĩa các cột cho Table
   */
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 80,
      render: (thumbnail) => (
        thumbnail ? (
          <Avatar
            src={thumbnail}
            shape="square"
            size={50}
            style={{ borderRadius: 6 }}
          />
        ) : (
          <Avatar
            icon={<FileImageOutlined />}
            shape="square"
            size={50}
            style={{
              borderRadius: 6,
              background: '#f0f0f0',
              color: '#bbb',
            }}
          />
        )
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (title, record) => (
        <div>
          <Text strong style={{ display: 'block', marginBottom: 2 }}>
            {title}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            /{record.slug}
          </Text>
        </div>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 140,
      render: (date) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {dayjs(date).format('DD/MM/YYYY HH:mm')}
        </Text>
      ),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag
          color={status === 'published' ? 'green' : 'orange'}
          style={{ borderRadius: 12, fontWeight: 500 }}
        >
          {status === 'published' ? '✅ Đã xuất bản' : '📄 Bản nháp'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          {/* Nút Sửa */}
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              size="small"
              onClick={() => navigate(`/posts/edit/${record.id}`)}
            />
          </Tooltip>

          {/* Nút Xóa với xác nhận */}
          <Popconfirm
            title="Xóa bài viết"
            description={`Bạn có chắc muốn xóa "${record.title}"?`}
            onConfirm={() => handleDelete(record.id, record.title)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* ====== HEADER ====== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <Title level={4} style={{ margin: 0 }}>
          📋 Danh sách bài viết
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate('/posts/create')}
          style={{
            background: '#d4a843',
            borderColor: '#d4a843',
            fontWeight: 600,
          }}
        >
          Thêm bài viết mới
        </Button>
      </div>

      {/* ====== BỘ LỌC ====== */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 20,
        flexWrap: 'wrap',
      }}>
        <Input
          placeholder="Tìm kiếm theo tiêu đề..."
          prefix={<SearchOutlined />}
          style={{ maxWidth: 320 }}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          placeholder="Lọc trạng thái"
          style={{ minWidth: 180 }}
          allowClear
          onChange={(value) => setFilterStatus(value || '')}
          options={[
            { value: 'published', label: '✅ Đã xuất bản' },
            { value: 'draft', label: '📄 Bản nháp' },
          ]}
        />
      </div>

      {/* ====== BẢNG DỮ LIỆU ====== */}
      <Table
        columns={columns}
        dataSource={posts}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / ${total} bài viết`,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: 'Chưa có bài viết nào. Hãy tạo bài viết đầu tiên! ✍️',
        }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
      />
    </div>
  );
};

export default PostListPage;
