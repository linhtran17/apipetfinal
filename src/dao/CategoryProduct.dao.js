const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');
const CategoryProduct = require('../models/CategoryProducts');

async function add(data) {
    const { name, cat_pet } = data;
    const item = await CategoryProduct.create({ name, cat_pet });
    return item;
}

async function find(where, params = {}) {
    let { page = 1, limit = 10, cat_pet } = params;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    if (!where) {
        where = {};
    }

    where.status = 0;

    try {
        let whereJoin = " cp.status = :status "
        const replacements = { status: 0 }
        if (cat_pet) {
            whereJoin = ` ${whereJoin} AND cat_pet = :cat_pet `
            replacements.cat_pet = cat_pet;
        }
        // Truy vấn tổng số bản ghi từ cơ sở dữ liệu
        const totalItems = await sequelize.query(`
            SELECT COUNT(*) as totalCount
            FROM CategoryProducts cp
            LEFT JOIN CategoryPets pet ON pet.id = cp.cat_pet
            WHERE ${whereJoin}
        `, {
            replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        const total = totalItems[0].totalCount; // Tổng số bản ghi
        const totalPages = Math.ceil(total / limit); // Tổng số trang

        // Truy vấn lấy dữ liệu của các bản ghi theo trang

        const SQL = `
            SELECT cp.*, pet.name as petName 
            FROM CategoryProducts cp
            LEFT JOIN CategoryPets pet ON pet.id = cp.cat_pet
            WHERE ${whereJoin} 
            ORDER BY cp.id ASC
            LIMIT :limit OFFSET :offset
        `;

        const items = await sequelize.query(SQL, {
            replacements: { ...replacements, offset, limit },
            type: Sequelize.QueryTypes.SELECT,
        });

        return {
            total: total, // Tổng số bản ghi
            totalPages: totalPages, // Tổng số trang
            currentPage: page, // Trang hiện tại
            list: items // Danh sách các bản ghi
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function finda(where, params = {}) {
    let { page = 1, limit = 10 } = params;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    if (!where) {
        where = {};
    }

    where.status = 0;

    try {
        // Truy vấn lấy dữ liệu theo thứ tự giảm dần của id
        const SQL = `
            SELECT cp.*, pet.name as petName 
            FROM CategoryProducts cp
            LEFT JOIN CategoryPets pet ON pet.id = cp.cat_pet
            WHERE cp.status = :status
            ORDER BY cp.id DESC
            LIMIT :limit OFFSET :offset
        `;

        const items = await sequelize.query(SQL, {
            replacements: { limit, offset, status: 0 },
            type: Sequelize.QueryTypes.SELECT,
        });

        // Truy vấn tổng số bản ghi để tính số trang
        const totalItems = await sequelize.query(`
            SELECT COUNT(*) as totalCount
            FROM CategoryProducts cp
            LEFT JOIN CategoryPets pet ON pet.id = cp.cat_pet
            WHERE cp.status = :status
        `, {
            replacements: { status: 0 },
            type: Sequelize.QueryTypes.SELECT
        });

        const total = totalItems[0].totalCount; // Tổng số bản ghi
        const totalPages = Math.ceil(total / limit); // Tính tổng số trang

        return {
            total: total, // Tổng số bản ghi
            totalPages: totalPages, // Tổng số trang
            currentPage: page, // Trang hiện tại
            list: items // Danh sách các bản ghi
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function findById(id) {
    const item = await CategoryProduct.findByPk(id, { attributes: ["name", "id", "cat_pet"] });
    return item;
}

async function update(id, data) {
    const { name, status, cat_pet } = data;
    const item = await findById(id);

    if (item) {
        if (name) item.name = name;
        if (cat_pet) item.cat_pet = cat_pet;
        if (status) item.status = status;

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
    return false;
}

module.exports = {
    add,
    find,
    finda,
    findById,
    update,
    remove
};
