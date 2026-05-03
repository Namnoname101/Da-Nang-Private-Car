/**
 * APP.JSX — Router chính
 * Quản lý điều hướng giữa các trang:
 * - /login → Trang đăng nhập
 * - /posts → Danh sách bài viết (cần đăng nhập)
 * - /posts/create → Tạo bài viết mới (cần đăng nhập)
 * - /posts/edit/:id → Sửa bài viết (cần đăng nhập)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostFormPage from './pages/PostFormPage';

/**
 * Component bảo vệ route
 * Kiểm tra đã đăng nhập chưa (có token trong localStorage)
 * Nếu chưa → redirect về /login
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('blog_admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * Cấu hình theme Ant Design
 * Sử dụng màu vàng gold (#d4a843) làm màu chính
 * phù hợp với branding của website du lịch
 */
const themeConfig = {
  token: {
    colorPrimary: '#d4a843',
    borderRadius: 8,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      colorPrimaryHover: '#c19a3a',
    },
    Table: {
      headerBg: '#fafafa',
    },
  },
};

const App = () => {
  return (
    <ConfigProvider theme={themeConfig} locale={viVN}>
      {/* basename="/editblog" → app chạy tại danangcartours.com/editblog/ */}
      <BrowserRouter basename="/editblog">
        <Routes>
          {/* Route công khai: Đăng nhập */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes được bảo vệ: Cần đăng nhập */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Trang mặc định → Danh sách bài viết */}
            <Route index element={<Navigate to="/posts" replace />} />

            {/* Danh sách bài viết */}
            <Route path="posts" element={<PostListPage />} />

            {/* Tạo bài viết mới */}
            <Route path="posts/create" element={<PostFormPage />} />

            {/* Sửa bài viết */}
            <Route path="posts/edit/:id" element={<PostFormPage />} />
          </Route>

          {/* Route không tồn tại → Redirect về trang chính */}
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
