const { Op } = require('sequelize');
const Product = require('../models/product');
const CatPro = require('../models/CategoryProducts');
const CatPet = require('../models/CategoryPets');
const { keyBy } = require('lodash');
const HOST_BASE = process.env.HOST_BASE || "http://localhost:8000";

async function create(data) {
    const { name, picture, cat_pro, cat_pet, price, discount, sale } = data;
    const item = await Product.create({ name, picture, cat_pro, cat_pet, price, discount, sale });
    return item;
}

async function find(myParams = {}, order = []) {
    let { page = 1, limit = 10 } = myParams;
    page = parseInt(page)
    limit = parseInt(limit)

    const where = {}

    if (myParams?.sale) {
        where.sale = myParams.sale
    }

    if (myParams?.cat_pet) {
        where.cat_pet = myParams.cat_pet
    }

    if (myParams?.cat_pro) {
        where.cat_pro = Number(myParams.cat_pro)
    }

    if (myParams?.s) {
        where.name = { [Op.like]: `%${myParams.s}%` }
    }

    const offset = (page - 1) * limit;
    try {
        const items = await Product.findAndCountAll({
            where,
            limit,
            offset,
            order: order || [],
        });

        const catPetIds = items.rows.map(({ cat_pet }) => cat_pet)
        let catPets = await CatPet.findAll({ where: { id: catPetIds }, attributes: ["id", "name"] });
        catPets = keyBy(catPets.map(({ id, name }) => ({ id, name })), "id");


        const catProIds = items.rows.map(({ cat_pro }) => cat_pro)
        let catPros = await CatPro.findAll({ where: { id: catProIds }, attributes: ["id", "name"] });
        catPros = keyBy(catPros.map(({ id, name }) => ({ id, name })), "id");

        const newList = items.rows.map(item => {
            const newObject = item.toJSON()
            if (catPets[`${newObject.cat_pet}`]) {
                newObject["catPet"] = catPets[`${newObject.cat_pet}`];
            }

            if (catPros[`${item.cat_pro}`]) {
                newObject["catPro"] = catPros[`${item.cat_pro}`];
            }
            if (newObject.picture) {
                newObject.picture = `${HOST_BASE}${newObject.picture}`
            }
            return newObject;
        })

        const totalPages = Math.ceil(items.count / limit); // Tính tổng số trang
        return {
            total: items.count,
            totalPages: totalPages,
            currentPage: page,
            list: newList
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function findById(id) {
    const item = await Product.findByPk(id);
    if (item) {
        const newItem = item.toJSON()
        const catPet = await CatPet.findByPk(newItem.cat_pet, { attributes: ["id", "name"] })
        const catPro = await CatPro.findByPk(newItem.cat_pro, { attributes: ["id", "name"] })
        newItem["catPet"] = catPet?.toJSON();
        newItem["catPro"] = catPro?.toJSON();
        return newItem;
    }

    return item;
};

async function update(id, data) {
    const { name, status } = data;
    const item = await findById(id);

    if (item) {
        if (name)
            item.name = name;
        if (status) {
            item.status = status
        }
        await item.save();
        return item;

    }
    return null;
}

async function remove(id) {
    const item = await update(id, { status: 1 });
    if (item) {
        return true;
    }

    return false
}

module.exports = {
    create,
    find,
    findById,
    update, remove
};