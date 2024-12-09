const express = require('express');
const { Op } = require('sequelize');
const newDao = require('../dao/news.dao');
const catPetDao = require("../dao/CategoryPet.dao")
const productDao = require("../dao/product.dao");
const productCtrl = require("../ctrls/product.ctrl")
const orderCtrl = require("../ctrls/order.ctrl");
const verifyToken = require('../middleware/auth.mw');

const router = express.Router();

// News
router.get('/news', async (req, res) => {
    try {
        const where = {}
        if (req.query?.status) {
            where.status = req.query.status
        }

        if (req.query?.search) {
            where[Op.or] = [
                {title: {[Op.like]: `%${req.query.search}%` }},
                // {content: {[Op.like]: `%${req.query.search}%`}},
            ]
        }
        const newsList = await newDao.find(where, req.query);
        res.json(newsList);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách tin tức.' });
    }
});

// Lấy tin tức theo ID (Read by ID)
router.get('/new/:id', async (req, res) => {
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


// Products
router.get('/products', productCtrl.products);
router.get('/product-dogs', productCtrl.productDogs, productCtrl.products);
router.get('/product-cats', productCtrl.productCats, productCtrl.products);
router.get('/product-hot', productCtrl.productHots, productCtrl.products);
router.get('/product-top', productCtrl.productOurs, productCtrl.products);

// Lấy sản phẩm theo ID (Read by ID)
router.get('/product/:id', async (req, res) => {
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

router.get('/cat-pet', async (req, res) => {
    try {
        const data = await catPetDao.find();
        if (data && data.list) {
            res.json(data.list);
        } else {
            res.status(404).json({ error: 'Không tìm thấy.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin.' });
    }
});

router.post("/order", verifyToken, orderCtrl.userOrder)
router.get("/my-order", verifyToken, orderCtrl.myOrder, orderCtrl.find)

module.exports = router;