/**
 * PAGE: LoginPage
 * Trang đăng nhập cho admin
 * - Form đăng nhập (username/password)
 * - Lưu JWT token vào localStorage
 * - Redirect sang danh sách bài viết sau khi đăng nhập thành công
 */

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Xử lý đăng nhập
   * Gọi API POST /api/auth/login
   */
  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const response = await axiosClient.post('/auth/login', {
        username: values.username,
        password: values.password,
      });

      if (response.data.success) {
        // Lưu token và thông tin user vào localStorage
        localStorage.setItem('blog_admin_token', response.data.token);
        localStorage.setItem('blog_admin_user', JSON.stringify(response.data.user));

        message.success('Đăng nhập thành công! 🎉');

        // Chuyển sang trang danh sách bài viết
        navigate('/posts');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a1d37 0%, #1a365d 50%, #0a1d37 100%)',
      padding: 20,
    }}>
      <Card
        style={{
          width: 420,
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          border: 'none',
        }}
        bodyStyle={{ padding: '40px 36px' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4a843, #b8942e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 28,
          }}>
            🚗
          </div>
          <Title level={3} style={{ margin: '0 0 4px', color: '#0a1d37' }}>
            Blog Admin
          </Title>
          <Text type="secondary">
            Da Nang Private Car Tours
          </Text>
        </div>

        {/* Form đăng nhập */}
        <Form
          layout="vertical"
          onFinish={handleLogin}
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#bbb' }} />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bbb' }} />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={<LoginOutlined />}
              style={{
                height: 48,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #d4a843, #b8942e)',
                border: 'none',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid #f0f0f0',
        }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            © 2026 Private Car Tours Da Nang
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
