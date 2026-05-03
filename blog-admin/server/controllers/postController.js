/**
 * CONTROLLER: Post (Bài viết)
 * Xử lý CRUD cho bài viết blog
 */

const { Op } = require('sequelize');
const Post = require('../models/Post');
const slugify = require('../utils/slugify');

/**
 * LẤY DANH SÁCH BÀI VIẾT (có phân trang)
 * GET /api/posts?page=1&limit=10&status=published&search=keyword
 */
const getAll = async (req, res) => {
  try {
    // Lấy tham số phân trang từ query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status; // Lọc theo trạng thái
    const search = req.query.search;  // Tìm kiếm theo tiêu đề

    // Xây dựng điều kiện WHERE
    const whereCondition = {};
    if (status) {
      whereCondition.status = status;
    }
    if (search) {
      whereCondition.title = { [Op.like]: `%${search}%` };
    }

    // Truy vấn database với phân trang
    const { count, rows } = await Post.findAndCountAll({
      where: whereCondition,
      order: [['created_at', 'DESC']], // Mới nhất lên đầu
      limit,
      offset,
      attributes: ['id', 'title', 'slug', 'summary', 'thumbnail', 'status', 'created_at', 'updated_at'],
    });

    // Tính toán thông tin phân trang
    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách bài viết:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách bài viết.',
    });
  }
};

/**
 * LẤY CHI TIẾT BÀI VIẾT THEO ID
 * GET /api/posts/:id
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết.',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Lỗi lấy chi tiết bài viết:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy chi tiết bài viết.',
    });
  }
};

/**
 * TẠO BÀI VIẾT MỚI
 * POST /api/posts
 * Body: { title, summary, content, thumbnail, status }
 * Slug sẽ được tự động tạo từ title
 */
const create = async (req, res) => {
  try {
    const { title, summary, content, thumbnail, status } = req.body;

    // Kiểm tra tiêu đề bắt buộc
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Tiêu đề bài viết không được để trống.',
      });
    }

    // Tự động tạo slug từ title
    let slug = slugify(title);

    // Kiểm tra slug đã tồn tại chưa, nếu trùng thì thêm số
    let slugExists = await Post.findOne({ where: { slug } });
    let counter = 1;
    while (slugExists) {
      slug = `${slugify(title)}-${counter}`;
      slugExists = await Post.findOne({ where: { slug } });
      counter++;
    }

    // Tạo bài viết mới
    const newPost = await Post.create({
      title,
      slug,
      summary: summary || null,
      content: content || null,
      thumbnail: thumbnail || null,
      status: status || 'draft',
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Tạo bài viết thành công!',
      data: newPost,
    });
  } catch (error) {
    console.error('Lỗi tạo bài viết:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo bài viết.',
    });
  }
};

/**
 * CẬP NHẬT BÀI VIẾT
 * PUT /api/posts/:id
 * Body: { title, summary, content, thumbnail, status }
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, thumbnail, status } = req.body;

    // Tìm bài viết cần cập nhật
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết.',
      });
    }

    // Nếu title thay đổi, tạo slug mới
    let slug = post.slug;
    if (title && title !== post.title) {
      slug = slugify(title);
      // Kiểm tra slug trùng (trừ bài viết hiện tại)
      let slugExists = await Post.findOne({
        where: { slug, id: { [Op.ne]: id } },
      });
      let counter = 1;
      while (slugExists) {
        slug = `${slugify(title)}-${counter}`;
        slugExists = await Post.findOne({
          where: { slug, id: { [Op.ne]: id } },
        });
        counter++;
      }
    }

    // Cập nhật dữ liệu
    await post.update({
      title: title || post.title,
      slug,
      summary: summary !== undefined ? summary : post.summary,
      content: content !== undefined ? content : post.content,
      thumbnail: thumbnail !== undefined ? thumbnail : post.thumbnail,
      status: status || post.status,
      updated_at: new Date(),
    });

    res.json({
      success: true,
      message: 'Cập nhật bài viết thành công!',
      data: post,
    });
  } catch (error) {
    console.error('Lỗi cập nhật bài viết:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật bài viết.',
    });
  }
};

/**
 * XÓA BÀI VIẾT
 * DELETE /api/posts/:id
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm bài viết cần xóa
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết.',
      });
    }

    // Xóa bài viết
    await post.destroy();

    res.json({
      success: true,
      message: 'Xóa bài viết thành công!',
    });
  } catch (error) {
    console.error('Lỗi xóa bài viết:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xóa bài viết.',
    });
  }
};

module.exports = { getAll, getById, create, update, remove };
