const express = require('express');
const productDao = require('../dao/product.dao');
const Product = require("../models/product")
const { Op } = require('sequelize');
const checkRole = require('../middleware/role.mw');

const router = express.Router();

// Tạo sản phẩm mới (Create)
router.post('/', async (req, res) => {
    try {
        const newProduct = await productDao.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Lỗi khi thêm sản phẩm.' });
    }
});

// Lấy danh sách sản phẩm (Read)
router.get('/', async (req, res) => {
    try {
        const data = await productDao.find(req.query)
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm.' });
    }
});

// Lấy sản phẩm theo ID (Read by ID)
router.get('/:id', async (req, res) => {
    try {
        const product = await productDao.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm.' });
    }
});

// Cập nhật sản phẩm (Update)
router.put('/:id', async (req, res) => {
    try {
        const { name, picture, cat_pro, cat_pet, price, discount, sale, description } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (product) {
            product.name = name;
            product.picture = picture;
            product.cat_pro = cat_pro;
            product.cat_pet = cat_pet;
            product.price = price;
            product.discount = discount;
            product.sale = sale;
            product.description = description;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm.' });
    }
});

// Xóa sản phẩm (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (product) {
            await product.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa sản phẩm.' });
    }
});

module.exports = router;
