const express = require("express");
const { Op } = require("sequelize");
const contactDao = require("../dao/Contact.dao");

const router = express.Router();

// Tạo liên hệ mới (Create)
router.post("/", async (req, res) => {
  try {
    const newContact = await contactDao.add(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm liên hệ." });
  }
});

// Lấy danh sách liên hệ (Read)
router.get("/", async (req, res) => {
  try {
    const where = {};

    if (req.query?.status) {
      where.status = req.query.status;
    }

    if (req.query?.search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${req.query.search}%` } },
        { email: { [Op.like]: `%${req.query.search}%` } },
        { phone: { [Op.like]: `%${req.query.search}%` } },
        { content: { [Op.like]: `%${req.query.search}%` } },
      ];
    }

    const contactList = await contactDao.find(where, req.query);
    res.json(contactList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách liên hệ." });
  }
});

// Lấy liên hệ theo ID (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const contact = await contactDao.findById(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: "Không tìm thấy liên hệ." });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông tin liên hệ." });
  }
});

// Cập nhật liên hệ (Update)
router.put("/:id", async (req, res) => {
  try {
    const contact = await contactDao.update(req.params.id, req.body);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: "Không tìm thấy liên hệ." });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật liên hệ." });
  }
});

// Xóa liên hệ (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const contact = await contactDao.remove(req.params.id);
    if (contact) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Không tìm thấy liên hệ." });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa liên hệ." });
  }
});

module.exports = router;
