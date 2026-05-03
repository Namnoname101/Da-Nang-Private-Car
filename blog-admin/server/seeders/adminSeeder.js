/**
 * SEEDER: Tạo tài khoản Admin mặc định
 * Chạy 1 lần khi setup hệ thống: npm run seed
 * 
 * Tài khoản mặc định:
 *   Username: admin
 *   Password: admin123
 */

const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const AdminUser = require('../models/AdminUser');

async function seedAdmin() {
  try {
    // Kết nối database
    await sequelize.authenticate();
    console.log('✅ Kết nối database thành công!');

    // Đồng bộ bảng (tạo nếu chưa có)
    await sequelize.sync();

    // Kiểm tra đã có admin chưa
    const existingAdmin = await AdminUser.findOne({ where: { username: 'admin' } });
    if (existingAdmin) {
      console.log('⚠️  Tài khoản admin đã tồn tại. Bỏ qua.');
      process.exit(0);
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Tạo tài khoản admin
    await AdminUser.create({
      username: 'admin',
      password: hashedPassword,
    });

    console.log('✅ Tạo tài khoản admin thành công!');
    console.log('   👤 Username: admin');
    console.log('   🔑 Password: admin123');
    console.log('   ⚠️  Hãy đổi mật khẩu sau khi đăng nhập!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi tạo tài khoản admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();
