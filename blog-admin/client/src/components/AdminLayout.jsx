/**
 * COMPONENT: AdminLayout
 * Layout chính cho trang quản trị
 * Bao gồm: Sidebar menu + Header + Content area
 */

import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Dropdown, theme } from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  // State quản lý thu gọn sidebar
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token: themeToken } = theme.useToken();

  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem('blog_admin_user') || '{}');

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('blog_admin_token');
    localStorage.removeItem('blog_admin_user');
    navigate('/login');
  };

  // Menu items cho sidebar
  const menuItems = [
    {
      key: '/posts',
      icon: <FileTextOutlined />,
      label: 'Danh sách bài viết',
    },
    {
      key: '/posts/create',
      icon: <PlusOutlined />,
      label: 'Thêm bài viết',
    },
  ];

  // Dropdown menu cho avatar user
  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ====== SIDEBAR ====== */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          background: '#001529',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '0 16px',
        }}>
          <DashboardOutlined style={{ color: '#d4a843', fontSize: 24, marginRight: collapsed ? 0 : 10 }} />
          {!collapsed && (
            <Text strong style={{ color: '#d4a843', fontSize: 14, whiteSpace: 'nowrap' }}>
              Blog Admin
            </Text>
          )}
        </div>

        {/* Menu điều hướng */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>

      {/* ====== MAIN AREA ====== */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        {/* Header */}
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 99,
        }}>
          {/* Nút thu gọn sidebar */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />

          {/* Thông tin user + Dropdown đăng xuất */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar icon={<UserOutlined />} style={{ background: '#d4a843' }} />
              <Text strong>{user.username || 'Admin'}</Text>
            </div>
          </Dropdown>
        </Header>

        {/* Khu vực nội dung chính */}
        <Content style={{
          margin: 24,
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          minHeight: 360,
        }}>
          {/* Outlet sẽ render component con (PostList, PostForm,...) */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
