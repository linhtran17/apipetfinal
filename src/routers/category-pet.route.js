const express = require('express');
const { Op } = require('sequelize');
const catDao = require('../dao/CategoryPet.dao');

const router = express.Router();

// Tạo mới (Create)
router.post('/', async (req, res) => {
    try {
        const newItem = await catDao.add(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi thêm.' });
    }
});

// Lấy danh sách (Read)
router.get('/', async (req, res) => {
    try {
        const where = {}
        if (req.query?.status) {
            where.status = req.query.status
        }

        if (req.query?.search) {
            where[Op.or] = [
                { name: {[Op.like]: `%${req.query.search}%` }},
                // {content: {[Op.like]: `%${req.query.search}%`}},
            ]
        }
        const CategoryPetList = await catDao.find(where, req.query);
        res.json(CategoryPetList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách.' });
    }
});

// Lấy theo ID (Read by ID)
router.get('/:id', async (req, res) => {
    try {
        const CategoryPet = await catDao.findById(req.params.id);
        if (CategoryPet) {
            res.json(CategoryPet);
        } else {
            res.status(404).json({ error: 'Không tìm thấy.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin.' });
    }
});

// Cập nhật (Update)
router.put('/:id', async (req, res) => {
    try {
        const CategoryPet = await catDao.update(req.params.id, req.body);
        if (CategoryPet) {
            res.json(CategoryPet);
        } else {
            res.status(404).json({ error: 'Không tìm thấy.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật.' });
    }
});

// Xóa (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const CategoryPet = await catDao.remove(req.params.id);
        if (CategoryPet) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Không tìm thấy.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa.' });
    }
});

module.exports = router;
