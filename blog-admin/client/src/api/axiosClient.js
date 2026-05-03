/**
 * CẤU HÌNH AXIOS CLIENT
 * Tạo instance Axios với base URL và tự động gắn JWT token
 */

import axios from 'axios';

// Tạo Axios instance với cấu hình mặc định
// URL được lấy từ biến môi trường VITE_API_URL (trong file .env)
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // Timeout 30 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR: Tự động gắn JWT token vào mỗi request
 * Lấy token từ localStorage
 */
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('blog_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTOR: Xử lý response lỗi
 * Nếu token hết hạn (401), tự động chuyển về trang đăng nhập
 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('blog_admin_token');
      localStorage.removeItem('blog_admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
