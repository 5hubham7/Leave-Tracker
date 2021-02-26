const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Holiday.findAll();
    // return db.sequelize.query("SELECT * FROM `holidays`", {
    //     type: QueryTypes.SELECT,
    // });
}

async function getById(holiday_id) {
    return await getHoliday(holiday_id);
}

async function create(params) {
    await db.Holiday.create(params);
}

async function update(holiday_id, params) {
    const holiday = await getHoliday(holiday_id);

    Object.assign(holiday, params);
    await holiday.save();
}

async function _delete(holiday_id) {
    const holiday = await getHoliday(holiday_id);
    await holiday.destroy();
}

async function getHoliday(holiday_id) {
    const holiday = await db.Holiday.findByPk(holiday_id);
    if (!holiday) throw "Public Holiday not found";
    return holiday;
}
