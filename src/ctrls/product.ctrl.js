const productDao = require("../dao/product.dao");
const CatProDao = require("../dao/CategoryProduct.dao")

module.exports = {
    products: async function (req, res) {
        try {
            const products = await productDao.find(req.query, req.order || [])
            if (req.query?.cat_pet) {
                const cats = await CatProDao.find({}, { cat_pet: req.query.cat_pet, limit: 100 })
                res.json({ ...products, cats })
            } else {
                res.json(products);
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm.' });
        }
    },
    productDogs: async function (req, res, next) {
        req.query.cat_pet = 1;
        next()
    },
    productCats: async function (req, res, next) {
        req.query.cat_pet = 2;
        next()
    },
    productHots: async function (req, res, next) {
        req.order = [["discount", "DESC"]];
        next()
    },
    productOurs: async function (req, res, next) {
        req.order = [["id", "DESC"]];
        next()
    },

    productById: async (req, res) => {

    }
}