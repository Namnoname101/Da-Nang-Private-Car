import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL: trang admin sẽ nằm tại danangcartours.com/editblog/
  base: '/editblog/',
  build: {
    // Build output trực tiếp vào thư mục editblog/ của website chính
    outDir: '../../editblog',
    emptyOutDir: true,
  },
})
