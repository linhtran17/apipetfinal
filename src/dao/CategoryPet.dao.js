const CategoryPet = require('../models/CategoryPets');

async function add(data) {
    const { name } = data;
    const item = await CategoryPet.create({ name });
    return item;
}

async function find(where, params = {}) {

    let { page = 1, limit = 10 } = params;
    page = parseInt(page)
    limit = parseInt(limit)
    const offset = (page - 1) * limit;

    if (!where) {
        where = {}
    }

    where.status = 0
    try {
        const items = await CategoryPet.findAndCountAll({
            where: where || {},
            attributes: ["name", "id"],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(items.count / limit); // Tính tổng số trang

        return {
            total: items.count,
            totalPages: totalPages,
            currentPage: page,
            list: items.rows // Trả về danh sách người dùng
        };
    } catch (error) {
        return null;
    }
}

async function findById(id) {
    const item = await CategoryPet.findByPk(id, {attributes: ["name", "id"],});
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
    const item = await update(id, {status: 1});
    if (item) {
        return true;
    }

    return false
}

module.exports = {
    add,
    find,
    findById,
    update, remove
};