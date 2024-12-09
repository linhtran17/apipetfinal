const express = require("express");
const { Op } = require("sequelize");
const userDao = require("../dao/users.dao"); // Đường dẫn đến file users.dao.js

const router = express.Router();

// Tạo người dùng mới (Create)
router.post("/signup", async (req, res) => {
  try {
    const newUser = await userDao.create(req.body);
    if (!newUser) {
      return res.status(400).json({ error: "Không thể tạo người dùng." });
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Lỗi khi tạo người dùng." });
  }
});
// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  try {
    const { user, token } = await userDao.login(req.body);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: "Lỗi khi đăng nhập." });
  }
});
router.get("/", async (req, res) => {
  try {
    const where = {};

    // Bộ lọc theo vai trò
    if (req.query?.role) {
      where.role = req.query.role;
    }

    // Tìm kiếm theo tên người dùng
    if (req.query?.username) {
      where[Op.or] = [{ username: { [Op.like]: `%${req.query.username}%` } }];
    }

    const usersList = await userDao.find(where, req.query);
    res.json(usersList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng." });
  }
});

// Lấy thông tin người dùng theo ID (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const user = await userDao.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Không tìm thấy người dùng." });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng." });
  }
});

// Cập nhật thông tin người dùng (Update)
router.put("/:id", async (req, res) => {
  try {
    const user = await userDao.update(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Không tìm thấy người dùng." });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật thông tin người dùng." });
  }
});

// Xóa người dùng (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const result = await userDao.remove(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Không tìm thấy người dùng." });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa người dùng." });
  }
});

module.exports = router;
