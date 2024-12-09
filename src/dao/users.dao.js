const { Op } = require("sequelize");
const Users = require("../models/users"); // Model của bảng "Users"
const bcrypt = require("bcrypt"); // Dùng bcrypt để mã hóa mật khẩu
const jwt = require("jsonwebtoken");

const { JWT_EXPIRES_IN, JWT_SECRET_KEY } = require("../config")

const USER_FIELD = ["id", "username", "email", "role", "last_login", "address"]

function createToken(user) {
  const data = { id: user.id, email: user.email, role: user?.role || 'customer', username: user?.username };
  const token = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token
}

// Hàm tính toán giờ địa phương
function getLocalTime() {
  const now = new Date();
  const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ
  return localTime.toISOString();
}

// Hàm tạo người dùng mới Sign-up
async function create(data) {
  const { username, password, email, role, address, phone } = data;

  if (!username || !email || !password) {
    throw new Error("Vui lòng điền đầy đủ các trường bắt buộc.");
  }

  try {
    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email đã được sử dụng.");
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = getLocalTime(); // Sử dụng hàm tính toán giờ địa phương

    // Tạo người dùng mới với thông tin đã mã hóa mật khẩu
    const user = await Users.create({
      phone: phone || "",
      username, // Sửa tên trường thành chữ thường
      password: hashedPassword, // Sửa tên trường thành chữ thường
      email, // Sửa tên trường thành chữ thường
      role: role || "customer", // Giá trị mặc định là "customer" nếu không có role được truyền vào
      address, // Sửa tên trường thành chữ thường
      create_at: now, // Sử dụng thời gian đã chuyển đổi
      last_login: now, // Sử dụng thời gian đã chuyển đổi
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Ném lỗi ra để được xử lý ở phần khác
  }
}

//Ham đăng nhập
async function login(data) {
  const { email, password } = data;
  const user = await Users.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("Email không tồn tại");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Mật khẩu không chính xác");
  }
  const token = createToken(user);
  return { user, token };
}
// Hàm tìm kiếm người dùng với phân trang và lọc
async function find(myParams = {}, order = []) {
  let { page = 1, limit = 100 } = myParams;
  page = parseInt(page);
  limit = parseInt(limit);

  const where = {};

  // Bộ lọc theo vai trò (role)
  if (myParams?.role) {
    where.role = myParams.role;
  }

  // Bộ lọc theo tên người dùng (username)
  if (myParams?.username) {
    where.username = { [Op.like]: `%${myParams.username}%` };
  }

  const offset = (page - 1) * limit;
  try {
    const users = await Users.findAndCountAll({
      where,
      limit,
      offset,
      order: order.length ? order : [["id", "ASC"]], // Đảm bảo order là mảng hoặc sử dụng phương thức hợp lệ
    });

    const totalPages = Math.ceil(users.count / limit); // Tính tổng số trang
    return {
      total: users.count,
      totalPages: totalPages,
      currentPage: page,
      list: users.rows, // Trả về danh sách người dùng
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Hàm tìm người dùng theo ID
async function findById(id) {
  try {
    const users = await Users.findByPk(id, {
      attributes: USER_FIELD, // Đảm bảo đúng tên trường
    });
    return users;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
}

// Hàm tìm người dùng theo ID
function findByEmail(email) {
  return Users.findOne({ where: { email }, attributes: USER_FIELD, });
}

function findByUsername(username) {
  return Users.findOne({ where: { username }, attributes: USER_FIELD });
}

// Hàm cập nhật thông tin người dùng
async function update(id, data) {
  const { username, email, role, address, phone } = data;
  const user = await findById(id);

  if (user) {
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    try {
      const now = getLocalTime(); // Sử dụng hàm tính toán giờ địa phương
      user.last_login = now; // Cập nhật thời gian đăng nhập cuối cùng
      await user.save();
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }
  return null;
}

// Hàm xóa người dùng
async function remove(id) {
  const users = await findById(id);
  if (users) {
    try {
      await users.destroy(); // Xóa người dùng khỏi cơ sở dữ liệu
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
  return false;
}

module.exports = {
  create,
  login,
  find,
  findById,
  update,
  remove,
  createToken,
  findByEmail,
  findByUsername
};
