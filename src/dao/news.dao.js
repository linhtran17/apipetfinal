const News = require('../models/news');

async function add(data) {
    const { tieude, noidung, hinhanh, published_date, status,description } = data;
    const item = await News.create({ tieude, noidung, hinhanh, published_date, status,description });// bản ghi vừa thêm được lưu vào items
    return item;//bản ghi vừa được lưu vào
}

// Lấy danh sách tin tức (Read)
async function find(where, params = {}) {

    let { page = 1, limit = 10 } = params;//page trang hiện tại - limit số bản ghi
    page = parseInt(page)
    limit = parseInt(limit)// chuyển sang số nguyên để tính toán cho chính xác
    const offset = (page - 1) * limit;

    try {
        const items = await News.findAndCountAll({
            where: where || {},
            limit: limit,//Giới hạn số lượng bản ghi trên mỗi trang.
            offset: offset//Vị trí bắt đầu để lấy bản ghi trên trang hiện tại.
        });

        const totalPages = Math.ceil(items.count / limit); // Tính tổng số trang

        return {
            total: items.count,//Tổng số bản ghi tìm thấy.
            totalPages: totalPages,//Tổng số trang tìm thấy.
            currentPage: page,//trang hiện tại
            list: items.rows // Trả về danh sách người dùng
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Lấy tin tức theo ID (Read by ID)
async function findById(id) {
    const items = await News.findByPk(id);
    return items;
};

// Cập nhật tin tức (Update)
async function update(id, data) {
    const { tieude, noidung, hinhanh, published_date, status,description } = data;
    const items = await findById(id);

    if (items) {
        items.tieude = tieude;
        items.noidung = noidung;
        items.hinhanh = hinhanh;
        items.published_date = published_date;
        items.status = status;
        items.description = description;
        await items.save();
        return items;

    }
    return null;
}

// Xóa tin tức (Delete)
async function remove(id) {
    const items = await findById(id);
    if (items) {
        await items.destroy();
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