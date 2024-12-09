const { Op } = require("sequelize");
const Contact = require("../models/Contact");

// Hàm tính toán giờ địa phương
function getLocalTime() {
  const now = new Date();
  const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ
  return localTime.toISOString();
}

// Thêm liên hệ mới (Create)
async function add(data) {
  const { name, email, phone, content, status } = data;
  const now = getLocalTime(); // Sử dụng hàm tính toán giờ địa phương
  const item = await Contact.create({
    name,
    email,
    phone,
    content,
    status,
    created_at: now,
    updated_at: now,
  });
  return item;
}

// Lấy danh sách liên hệ (Read)
async function find(where = {}, params = {}) {
  let { page = 1, limit = 10 } = params;
  page = parseInt(page);
  limit = parseInt(limit);
  const offset = (page - 1) * limit;

  try {
    const items = await Contact.findAndCountAll({
      where,
      limit,
      offset,
    });

    const totalPages = Math.ceil(items.count / limit); // Tính tổng số trang

    return {
      total: items.count,
      totalPages,
      currentPage: page,
      list: items.rows, // Trả về danh sách liên hệ
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Lấy liên hệ theo ID (Read by ID)
async function findById(id) {
  const item = await Contact.findByPk(id);
  return item;
}

// Cập nhật thông tin liên hệ (Update)
async function update(id, data) {
  const { name, email, phone, content, status } = data;
  const item = await findById(id);

  if (item) {
    const now = getLocalTime(); // Sử dụng hàm tính toán giờ địa phương
    item.name = name || item.name;
    item.email = email || item.email;
    item.phone = phone || item.phone;
    item.content = content || item.content;
    item.status = status !== undefined ? status : item.status;
    item.updated_at = now;
    await item.save();
    return item;
  }
  return null;
}

// Xóa liên hệ (Delete)
async function remove(id) {
  const item = await findById(id);
  if (item) {
    await item.destroy();
    return true;
  }
  return false;
}

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
};
