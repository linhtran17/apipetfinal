const express = require('express');
const { Op } = require('sequelize');//toán tử thực hiện truy vấn like or between
const newDao = require('../dao/news.dao');

const router = express.Router();

// Tạo tin tức mới (Create)
router.post('/', async (req, res) => {
    try {
        const newNews = await newDao.add(req.body);
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi thêm tin tức.' });
    }
});

// Lấy danh sách tin tức (Read)
router.get('/', async (req, res) => {
    try {
        const where = {}
        if (req.query?.status) {
            where.status = req.query.status
        }

        if (req.query?.search) {
            where[Op.or] = [
                {tieude: {[Op.like]: `%${req.query.search}%` }},
                // {content: {[Op.like]: `%${req.query.search}%`}},
            ]
        }
        const newsList = await newDao.find(where, req.query);
        res.json(newsList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách tin tức.' });
    }
});

// Lấy tin tức theo ID (Read by ID)
router.get('/:id', async (req, res) => {
    try {
        const news = await newDao.findById(req.params.id);
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tức.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin tin tức.' });
    }
});

// Cập nhật tin tức (Update)
router.put('/:id', async (req, res) => {
    try {
        const news = await newDao.update(req.params.id, req.body);
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tức.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật tin tức.' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { tieude, hinhanh, noidung, description } = req.body;
        const news = await News.findByPk(req.params.id);

        if (news) {
            news.tieude = tieude;
            news.hinhanh = hinhanh;
            news.noidung = noidung;
            news.description = description;
            await news.save();
            res.json(news);
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm.' });
    }
});

// Xóa tin tức (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const news = await newDao.remove(req.params.id);

        if (news) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tức.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa tin tức.' });
    }
});

module.exports = router;
